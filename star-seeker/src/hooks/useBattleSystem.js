import { useState, useCallback, useEffect, useRef } from 'react';
import { BOSS_DATA } from '../utils/battle/battleData';
import { BATTLE_CONST } from '../utils/battle/constants';
import { getSynergyBonus, calculateBackRowSupport } from '../utils/battle/formulas';
import { executeAllyAction, executeBossAction } from '../utils/battle/turnLogic';

export const useBattleSystem = (party, activeSynergies) => {
  const [battleState, setBattleState] = useState('IDLE');
  const [logs, setLogs] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [allies, setAllies] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  
  const battleFlags = useRef({ johoReviveCount: 0 });
  const battleInterval = useRef(null);

  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev.slice(-4), msg]);
  }, []);

  const startBattle = useCallback(() => {
    const { atkBonusPct, defBonusPct, johoRevive } = getSynergyBonus(activeSynergies);
    battleFlags.current = { johoReviveCount: johoRevive ? 1 : 0 }; 

    const frontChars = party.front.filter(c => c !== null);
    const backChars = party.back.filter(c => c !== null);

    if (frontChars.length === 0) {
      addLog("전열에 배치된 캐릭터가 없습니다! 전투 불가능.");
      return;
    }

    const { addedAtk, addedHp } = calculateBackRowSupport(backChars);
    const battleAllies = [];
    const initAg = () => Math.floor(Math.random() * 200);

    frontChars.forEach(c => {
      const finalAtk = Math.floor(c.baseAtk * (1 + atkBonusPct / 100)) + addedAtk;
      const finalHp = c.baseHp + addedHp;
      battleAllies.push({ ...c, position: 'FRONT', maxHp: finalHp, hp: finalHp, atk: finalAtk, defPct: defBonusPct, spd: c.baseSpd, actionGauge: initAg(), isDead: false, buffs: [] });
    });

    backChars.forEach(c => {
      battleAllies.push({ ...c, position: 'BACK', maxHp: c.baseHp, hp: c.baseHp, atk: c.baseAtk, defPct: 0, spd: c.baseSpd, actionGauge: initAg(), isDead: false, buffs: [] });
    });

    setAllies(battleAllies);
    setEnemy({ ...BOSS_DATA, hp: BOSS_DATA.maxHp, spd: BOSS_DATA.spd, actionGauge: initAg() });
    setBattleState('FIGHTING');
    
    const startLogs = ['> 전투 개시!', '> 속도에 따라 턴이 진행됩니다.'];
    if (johoRevive) startLogs.push(`> [시너지] '조호' 활성: 부활권 ${battleFlags.current.johoReviveCount}회 지급됨`);
    setLogs(startLogs);
    setTurnCount(0);
  }, [party, activeSynergies, addLog]);


  // --- 턴 진행 로직 (수동 가속 기능 추가) ---
  const processTurn = useCallback((isManualStep = false) => {
    if (battleState !== 'FIGHTING') return;

    let currentAllies = [...allies];
    let currentEnemy = { ...enemy };
    
    // 유닛 리스트업 함수
    const getAllUnits = (al, en) => {
        let list = al.map((a, i) => ({ ...a, type: 'ALLY', index: i }));
        list.push({ ...en, type: 'BOSS' });
        return list;
    };

    let allUnits = getAllUnits(currentAllies, currentEnemy);
    let readyUnits = allUnits.filter(u => !u.isDead && u.actionGauge >= BATTLE_CONST.MAX_ACTION_GAUGE);

    // ★ 수동 모드일 때: 행동 가능한 유닛이 없다면, 생길 때까지 시간을 "점프" 시킵니다.
    if (isManualStep === true && readyUnits.length === 0) {
        // 1. 1000에 도달하기 위해 필요한 최소 틱(Tick) 계산
        let minTicksNeeded = Infinity;

        allUnits.forEach(u => {
            if (u.isDead) return;
            const tickAmount = u.spd * BATTLE_CONST.AG_TICK_RATE;
            const remaining = BATTLE_CONST.MAX_ACTION_GAUGE - u.actionGauge;
            // 남은 게이지 / 틱당 증가량 (올림 처리)
            const ticks = Math.max(0, Math.ceil(remaining / tickAmount));
            if (ticks < minTicksNeeded) minTicksNeeded = ticks;
        });

        // 2. 모든 유닛에게 해당 틱만큼 게이지 즉시 부여
        if (minTicksNeeded > 0 && minTicksNeeded !== Infinity) {
             currentAllies = currentAllies.map(a => {
                if (a.isDead) return a;
                return { ...a, actionGauge: a.actionGauge + (a.spd * BATTLE_CONST.AG_TICK_RATE * minTicksNeeded) };
            });
            if (!currentEnemy.isDead) {
                currentEnemy.actionGauge += (currentEnemy.spd * BATTLE_CONST.AG_TICK_RATE * minTicksNeeded);
            }
        }

        // 3. 상태 갱신 후 행동 가능 유닛 재확인
        allUnits = getAllUnits(currentAllies, currentEnemy);
        readyUnits = allUnits.filter(u => !u.isDead && u.actionGauge >= BATTLE_CONST.MAX_ACTION_GAUGE);
    }

    // --- 행동 단계 ---
    if (readyUnits.length > 0) {
        readyUnits.sort((a, b) => b.actionGauge - a.actionGauge);
        const actor = readyUnits[0];

        if (actor.type === 'ALLY') {
            const result = executeAllyAction(actor, currentAllies, currentEnemy);
            currentEnemy = result.newEnemy;
            currentAllies = result.newAllies;
            result.logs.forEach(log => addLog(log));

            // 행동 후 게이지 차감 (주의: 재행동 등으로 1000 넘는 경우 1000만 차감)
            if (currentAllies[actor.index].actionGauge >= BATTLE_CONST.MAX_ACTION_GAUGE) {
                currentAllies[actor.index].actionGauge -= BATTLE_CONST.MAX_ACTION_GAUGE;
            }

            if (result.isVictory) {
                setBattleState('VICTORY'); setEnemy(currentEnemy); setAllies(currentAllies); return;
            }
        } else if (actor.type === 'BOSS') {
            const result = executeBossAction(currentEnemy, currentAllies, battleFlags.current.johoReviveCount);
            currentAllies = result.newAllies;
            battleFlags.current.johoReviveCount = result.newReviveCount;
            result.logs.forEach(log => addLog(log));

            currentEnemy.actionGauge -= BATTLE_CONST.MAX_ACTION_GAUGE;

            if (result.isDefeat) {
                setBattleState('DEFEAT'); setEnemy(currentEnemy); setAllies(currentAllies); return;
            }
        }
        setTurnCount(prev => prev + 1);

    } else {
        // --- 대기 단계 (자동 모드일 때만 1틱씩 흐름) ---
        // 수동 모드일 때는 위에서 "점프"를 했으므로, 여기까지 왔다면 행동할 유닛이 생겼을 것임.
        // 따라서 이 else 블록은 "자동 모드"이거나 "수동인데 아직 아무도 준비 안된 찰나"에만 실행됨.
        
        currentAllies = currentAllies.map(a => {
            if (a.isDead) return a;
            return { ...a, actionGauge: a.actionGauge + (a.spd * BATTLE_CONST.AG_TICK_RATE) };
        });

        if (!currentEnemy.isDead) {
            currentEnemy.actionGauge += (currentEnemy.spd * BATTLE_CONST.AG_TICK_RATE);
        }
    }

    setEnemy(currentEnemy);
    setAllies(currentAllies);

  }, [battleState, enemy, allies, addLog]);

  useEffect(() => {
    // 자동 모드일 때만 인터벌 작동
    if (battleState === 'FIGHTING' && isAuto) {
      battleInterval.current = setInterval(() => processTurn(false), 100); 
    } else {
      if (battleInterval.current) clearInterval(battleInterval.current);
    }
    return () => { if (battleInterval.current) clearInterval(battleInterval.current); };
  }, [battleState, isAuto, processTurn]);

  return { battleState, logs, enemy, allies, startBattle, turnCount, processTurn, isAuto, setIsAuto };
};