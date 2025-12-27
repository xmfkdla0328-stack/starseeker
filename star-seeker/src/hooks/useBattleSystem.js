import { useState, useCallback, useEffect, useRef } from 'react';
import { BOSS_DATA } from '../utils/battle/battleData';
import { getSynergyBonus, calculateBackRowSupport } from '../utils/battle/formulas';
import { executeAllyAction, executeBossAction } from '../utils/battle/turnLogic'; // 함수 변경됨

export const useBattleSystem = (party, activeSynergies) => {
  const [battleState, setBattleState] = useState('IDLE');
  const [logs, setLogs] = useState([]);
  const [enemy, setEnemy] = useState(null); // 보스 데이터 (AG 포함)
  const [allies, setAllies] = useState([]);  // 아군 배열 (AG 포함)
  const [turnCount, setTurnCount] = useState(0); // 총 행동 횟수
  const [isAuto, setIsAuto] = useState(false);
  
  const battleFlags = useRef({ johoReviveCount: 0 });
  const battleInterval = useRef(null);

  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev.slice(-4), msg]);
  }, []);

  // --- 전투 시작 ---
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

    // ★ AG(행동 게이지)와 spd(속도) 초기화
    // 초기 AG는 0~200 사이 랜덤 부여 (전투 시작 시 약간의 랜덤성)
    const initAg = () => Math.floor(Math.random() * 200);

    frontChars.forEach(c => {
      const finalAtk = Math.floor(c.baseAtk * (1 + atkBonusPct / 100)) + addedAtk;
      const finalHp = c.baseHp + addedHp;
      battleAllies.push({ 
        ...c, position: 'FRONT', maxHp: finalHp, hp: finalHp, atk: finalAtk, defPct: defBonusPct, 
        spd: c.baseSpd, actionGauge: initAg(), // 속도/AG 추가
        isDead: false, buffs: [] 
      });
    });

    backChars.forEach(c => {
      battleAllies.push({ 
        ...c, position: 'BACK', maxHp: c.baseHp, hp: c.baseHp, atk: c.baseAtk, defPct: 0, 
        spd: c.baseSpd, actionGauge: initAg(), // 속도/AG 추가
        isDead: false, buffs: [] 
      });
    });

    setAllies(battleAllies);
    setEnemy({ 
        ...BOSS_DATA, 
        hp: BOSS_DATA.maxHp, 
        spd: BOSS_DATA.spd, 
        actionGauge: initAg() // 보스도 AG 추가
    });
    setBattleState('FIGHTING');
    
    const startLogs = ['> 전투 개시!', '> 속도에 따라 턴이 진행됩니다.'];
    if (johoRevive) startLogs.push(`> [시너지] '조호' 활성: 부활권 ${battleFlags.current.johoReviveCount}회 지급됨`);
    
    setLogs(startLogs);
    setTurnCount(0);
  }, [party, activeSynergies, addLog]);


  // --- ★ 속도 기반 턴 진행 (AG 시스템) ---
  const processTurn = useCallback(() => {
    if (battleState !== 'FIGHTING') return;

    // 1. 행동 가능한 유닛이 있는지 확인
    // 아군과 적군을 합쳐서 AG가 1000 이상인 유닛을 찾습니다.
    let currentAllies = [...allies];
    let currentEnemy = { ...enemy };
    
    // (1) 모든 유닛 리스트업 (참조 유지)
    // ally는 index로 식별, boss는 type='BOSS'
    let allUnits = currentAllies.map((a, i) => ({ ...a, type: 'ALLY', index: i }));
    allUnits.push({ ...currentEnemy, type: 'BOSS' });

    // (2) 행동 가능한 유닛 필터링 (사망자 제외)
    let readyUnits = allUnits.filter(u => !u.isDead && u.actionGauge >= 1000);

    if (readyUnits.length > 0) {
        // --- [행동 단계] ---
        // AG가 가장 높은 유닛 1명만 행동
        readyUnits.sort((a, b) => b.actionGauge - a.actionGauge);
        const actor = readyUnits[0];

        // 행동 처리
        if (actor.type === 'ALLY') {
            const result = executeAllyAction(actor, currentAllies, currentEnemy);
            currentEnemy = result.newEnemy;
            currentAllies = result.newAllies;
            result.logs.forEach(log => addLog(log));

            // 행동 후 AG 차감 (재행동 버프가 있으면 차감 안 함)
            // executeAllyAction에서 재행동 시 AG를 1000으로 설정해줬으므로, 
            // 여기서는 AG >= 1000 인 경우 1000을 빼는 기본 로직을 수행하되, 
            // 결과값(result.newAllies)의 AG를 우선시해야 함.
            
            // 하지만 executeAllyAction은 전체 배열을 리턴하므로,
            // 방금 행동한 캐릭터의 AG를 0으로 만드는 작업이 필요함.
            // 단, 박주옥의 스킬로 인해 AG가 1000이 된 캐릭터는 건드리면 안됨.
            
            // 로직 단순화: 행동한 캐릭터의 AG - 1000
            // 박주옥 효과는 "다른 캐릭터"의 AG를 채워준 것이므로 괜찮음.
            // 만약 본인이 재행동한다면? -> 여기서 체크 필요.
            
            // 안전하게: 행동한 본인의 AG만 1000 차감.
            if (currentAllies[actor.index].actionGauge >= 1000) {
                currentAllies[actor.index].actionGauge -= 1000;
            }

            if (result.isVictory) {
                setBattleState('VICTORY');
                setEnemy(currentEnemy);
                setAllies(currentAllies);
                return;
            }

        } else if (actor.type === 'BOSS') {
            const result = executeBossAction(currentEnemy, currentAllies, battleFlags.current.johoReviveCount);
            currentAllies = result.newAllies;
            battleFlags.current.johoReviveCount = result.newReviveCount;
            result.logs.forEach(log => addLog(log));

            // 보스 AG 차감
            currentEnemy.actionGauge -= 1000;

            if (result.isDefeat) {
                setBattleState('DEFEAT');
                setEnemy(currentEnemy);
                setAllies(currentAllies);
                return;
            }
        }
        
        setTurnCount(prev => prev + 1); // 실제 행동이 일어났을 때만 턴 카운트 증가

    } else {
        // --- [대기 단계] ---
        // 행동 가능한 유닛이 없으면, 모두의 AG를 속도만큼 증가시킴 (Tick)
        // 빠른 진행을 위해 한 번에 1000 도달자가 나올 때까지 시간을 흘릴 수도 있지만,
        // 시각적 흐름(인터벌)을 위해 1틱씩 증가시킴.
        
        // *팁: 너무 느리면 답답하므로, 기본 증가량을 크게 잡음 (속도 * 2)
        const TICK_MULTIPLIER = 2.0; 

        currentAllies = currentAllies.map(a => {
            if (a.isDead) return a;
            return { ...a, actionGauge: a.actionGauge + (a.spd * TICK_MULTIPLIER) };
        });

        if (!currentEnemy.isDead) {
            currentEnemy.actionGauge += (currentEnemy.spd * TICK_MULTIPLIER);
        }
    }

    // 상태 업데이트
    setEnemy(currentEnemy);
    setAllies(currentAllies);

  }, [battleState, enemy, allies, addLog]);

  useEffect(() => {
    // 수동 모드일 때도 게이지가 차오르는 것을 보여주려면 인터벌이 필요하지만,
    // "수동"의 의미가 "버튼 누를 때만 진행"이라면, 버튼 누를 때 processTurn 호출됨.
    // "자동"일 때는 스스로 계속 호출됨.
    if (battleState === 'FIGHTING' && isAuto) {
      battleInterval.current = setInterval(processTurn, 100); // 속도감 있게 0.1초 간격 (틱)
    } else {
      if (battleInterval.current) clearInterval(battleInterval.current);
    }
    return () => { if (battleInterval.current) clearInterval(battleInterval.current); };
  }, [battleState, isAuto, processTurn]);

  return { battleState, logs, enemy, allies, startBattle, turnCount, processTurn, isAuto, setIsAuto };
};