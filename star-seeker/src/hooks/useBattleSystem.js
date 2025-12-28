/**
 * 전투 시스템 통합 Hook
 * 분리된 상태 관리, 턴 컨트롤러, 자동 전투 모드를 통합
 */

import { useBattleState } from './useBattleState';
import { useBattleController } from './useBattleController';
import { useBattleAutoMode } from './useBattleAutoMode';

export const useBattleSystem = (party, activeSynergies) => {
  // 1. 전투 상태 관리
  const battleStateProps = useBattleState(party, activeSynergies);
  
  // 2. 턴 진행 로직
  const { processTurn, stepTurn } = useBattleController(battleStateProps);
  
  // 3. 자동 전투 모드
  const { isAuto, setIsAuto, toggleAuto } = useBattleAutoMode(
    battleStateProps.battleState, 
    processTurn
  );

  return { 
    battleState: battleStateProps.battleState,
    logs: battleStateProps.logs,
    enemy: battleStateProps.enemy,
    allies: battleStateProps.allies,
    startBattle: battleStateProps.startBattle,
    turnCount: battleStateProps.turnCount,
    processTurn,
    isAuto,
    setIsAuto,
    stepTurn,
    toggleAuto,
  };
};