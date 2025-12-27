import { useState, useCallback, useEffect, useRef } from 'react';
import { BOSS_DATA } from '../utils/battle/battleData';
import { BATTLE_CONST } from '../utils/battle/constants'; // ★ 상수 import
import { getSynergyBonus, calculateBackRowSupport } from '../utils/battle/formulas';
import { executeAllyAction, executeBossAction } from '../utils/battle/turnLogic';

export const useBattleSystem = (party, activeSynergies) => {
  // ... (상태 변수들은 동일) ...
  const [battleState, setBattleState] = useState('IDLE');
  const [logs, setLogs] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [allies, setAllies] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const battleFlags = useRef({ johoReviveCount: 0 });
  const battleInterval = useRef(null);
  const addLog = useCallback((msg) => setLogs(prev => [...prev.slice(-4), msg]), []);

  // ... (startBattle 함수 내부 로직 동일, initAg 숫자만 상수로 변경 가능하나 필수는 아님) ...
  const startBattle = useCallback(() => {
     // ... (생략: 이전과 동일) ...
     const { atkBonusPct, defBonusPct, johoRevive } = getSynergyBonus(activeSynergies);
     battleFlags.current = { johoReviveCount: johoRevive ? 1 : 0 }; 

     const frontChars = party.front.filter(c => c !== null);
     const backChars = party.back.filter(c => c !== null);

     if (frontChars.length === 0) { addLog("전열에 배치된 캐릭터가 없습니다!"); return; }

     const { addedAtk, addedHp } = calculateBackRowSupport(backChars);
     const battleAllies = [];
     const initAg = () => Math.floor(Math.random() * 200);

     // 캐릭터 생성 로직 (동일)
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


  // --- processTurn (상수 적용) ---
  const processTurn = useCallback(() => {
    if (battleState !== 'FIGHTING') return;

    let currentAllies = [...allies];
    let currentEnemy = { ...enemy };
    
    let allUnits = currentAllies.map((a, i) => ({ ...a, type: 'ALLY', index: i }));
    allUnits.push({ ...currentEnemy, type: 'BOSS' });

    // ★ 1000 대신 상수 사용
    let readyUnits = allUnits.filter(u => !u.isDead && u.actionGauge >= BATTLE_CONST.MAX_ACTION_GAUGE);

    if (readyUnits.length > 0) {
        readyUnits.sort((a, b) => b.actionGauge - a.actionGauge);
        const actor = readyUnits[0];

        if (actor.type === 'ALLY') {
            const result = executeAllyAction(actor, currentAllies, currentEnemy);
            currentEnemy = result.newEnemy;
            currentAllies = result.newAllies;
            result.logs.forEach(log => addLog(log));

            // 행동 게이지 차감 (상수 사용)
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
        // ★ 대기 시간 틱 증가 (상수 사용)
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
    if (battleState === 'FIGHTING' && isAuto) {
      battleInterval.current = setInterval(processTurn, 100); 
    } else {
      if (battleInterval.current) clearInterval(battleInterval.current);
    }
    return () => { if (battleInterval.current) clearInterval(battleInterval.current); };
  }, [battleState, isAuto, processTurn]);

  return { battleState, logs, enemy, allies, startBattle, turnCount, processTurn, isAuto, setIsAuto };
};