/**
 * 전투 턴 진행 로직 Hook
 * 턴 처리, 게이지 관리, 승패 판정 담당
 */

import { useCallback } from 'react';
import { BATTLE_CONST } from '../utils/battle/constants';
import { executeAllyAction, executeBossAction } from '../utils/battle/turnLogic';
import { getReadyUnits, calculateGaugeJump, updateActionGauges } from '../utils/battle/gaugeLogic';

export const useBattleController = (battleStateProps) => {
  const { 
    battleState, 
    setBattleState,
    enemy, 
    setEnemy,
    allies, 
    setAllies,
    setTurnCount,
    battleFlags,
    addLog 
  } = battleStateProps;

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

            // 행동 후 게이지 차감
            if (currentAllies[actor.index].actionGauge >= BATTLE_CONST.MAX_ACTION_GAUGE) {
                currentAllies[actor.index].actionGauge -= BATTLE_CONST.MAX_ACTION_GAUGE;
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

            currentEnemy.actionGauge -= BATTLE_CONST.MAX_ACTION_GAUGE;

            if (result.isDefeat) {
                setBattleState('DEFEAT'); 
                setEnemy(currentEnemy); 
                setAllies(currentAllies); 
                return;
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

  }, [battleState, enemy, allies, addLog, setBattleState, setEnemy, setAllies, setTurnCount, battleFlags]);

  const stepTurn = useCallback(() => {
    processTurn(true);
  }, [processTurn]);

  return {
    processTurn,
    stepTurn,
  };
};
