import { useState, useCallback, useEffect, useRef } from 'react';
import { BOSS_DATA } from '../utils/battle/battleData';
import { BATTLE_CONST } from '../utils/battle/constants';
import { getSynergyBonus, calculateBackRowSupport } from '../utils/battle/formulas';
import { executeAllyAction, executeBossAction } from '../utils/battle/turnLogic';
import { initializeBattleAllies, initializeBoss } from '../utils/battle/battleInitializer';
import { getReadyUnits, calculateGaugeJump, updateActionGauges } from '../utils/battle/gaugeLogic';

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

    const frontChars = party.front.filter((c) => c !== null);
    const backChars = party.back.filter((c) => c !== null);

    if (frontChars.length === 0) {
      addLog('전열에 배치된 캐릭터가 없습니다! 전투 불가능.');
      return;
    }

    const { addedAtk, addedHp } = calculateBackRowSupport(backChars);

    const battleAllies = initializeBattleAllies(
      frontChars,
      backChars,
      { atkBonusPct, defBonusPct },
      { addedAtk, addedHp }
    );

    setAllies(battleAllies);
    setEnemy(initializeBoss(BOSS_DATA));
    setBattleState('FIGHTING');

    const startLogs = ['> 전투 개시!', '> 속도에 따라 턴이 진행됩니다.'];
    if (johoRevive)
      startLogs.push(
        `> [시너지] '조호' 활성: 부활권 ${battleFlags.current.johoReviveCount}회 지급됨`
      );
    setLogs(startLogs);
    setTurnCount(0);
  }, [party, activeSynergies, addLog]);


  // --- 턴 진행 로직 (수동 가속 기능 추가) ---
  const processTurn = useCallback((isManualStep = false) => {
    if (battleState !== 'FIGHTING') return;

    let currentAllies = [...allies];
    let currentEnemy = { ...enemy };
    
    let readyUnits = getReadyUnits(currentAllies, currentEnemy, BATTLE_CONST);

    // ★ 수동 모드일 때: 행동 가능한 유닛이 없다면, 생길 때까지 시간을 "점프" 시킵니다.
    if (isManualStep === true && readyUnits.length === 0) {
      const jumped = calculateGaugeJump(currentAllies, currentEnemy, BATTLE_CONST);
      currentAllies = jumped.allies;
      currentEnemy = jumped.enemy;
      readyUnits = getReadyUnits(currentAllies, currentEnemy, BATTLE_CONST);
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
      const updated = updateActionGauges(currentAllies, currentEnemy, BATTLE_CONST);
      currentAllies = updated.allies;
      currentEnemy = updated.enemy;
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