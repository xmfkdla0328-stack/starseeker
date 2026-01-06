/**
 * BattleScreen 데이터 초기화 및 상태 관리 로직
 */
import { useBattleState } from '../hooks/useBattleState';
import { useTurnSystem } from '../hooks/useTurnSystem';
import { useBattleAction } from '../hooks/useBattleAction';
import { useBattleHandlers } from '../hooks/useBattleHandlers';
import { useBattleEffects } from '../hooks/useBattleEffects';
import { useTurnEffects } from '../hooks/useTurnEffects';
import { useBattleActionHandlers } from '../hooks/useBattleActionHandlers';
import { useBattleWrappers } from '../hooks/useBattleWrappers';
import { useUI } from '../context/useGameContext';

/**
 * BattleScreen에서 사용할 모든 상태와 핸들러를 초기화
 */
export const useBattleScreenState = (partyData, enemyData, missionType, handleAttackResult, extractionRewards, onVictory) => {
  const { setScreen } = useUI();

  // 전투 상태 훅
  const {
    battleStatus,
    battleSession,
    isPauseOpen,
    showRetreatConfirm,
    showMissionComplete,
    hasLoggedTurnInit,
    lastAdvancedTurnId,
    missionCompleteShown,
    battleStartTimeRef,
    setBattleStatus,
    setIsPauseOpen,
    setShowRetreatConfirm,
    setShowMissionComplete,
    resetBattle,
  } = useBattleState(partyData, enemyData);

  // 턴 시스템 훅
  const {
    turnQueue,
    setTurnQueue,
    partyState,
    setPartyState,
    activeTurn,
    activeCharacter,
    nextTurn,
    lastResolvedTurnId,
    setLastResolvedTurnId,
    isWaitingAnimation,
    setIsWaitingAnimation,
    resumeTurn,
  } = useTurnSystem(partyData, enemyData, battleSession);

  // 전투 액션 훅
  const {
    handleAttackComplete: onAttackComplete,
    handleEnemyAttackResult: onEnemyAttackResult,
    triggerSkillSelection,
  } = useBattleAction({
    setPartyState,
    setBattleStatus,
    setTurnQueue,
    partyDataLength: partyData?.length || 0,
    enemyMaxHp: enemyData?.maxHp || 100,
  });

  // 전투 효과 훅 (BGM, 효과음 등)
  useBattleEffects({
    battleStatus,
    missionCompleteShown,
    setShowMissionComplete,
    setIsPauseOpen,
    setShowRetreatConfirm,
  });

  // 전투 핸들러 훅
  const {
    handlePauseOpen,
    handleResumeBattle,
    handleRetreatClick,
    handleRetreatCancel,
    handleRetreatConfirm,
    handleBackToObservation,
    handleBattleRestart,
  } = useBattleHandlers({
    setScreen,
    setIsPauseOpen,
    setShowRetreatConfirm,
    resetBattle,
    setLastResolvedTurnId,
    onVictory,
    extractionRewards,
    battleStatus,
    enemyData,
  });

  // 전투 데이터 준비 체크
  const isDataReady = partyData && Array.isArray(partyData) && partyData.length > 0 && !!enemyData && partyState && partyState.length > 0;

  // 턴 관련 이펙트 훅
  useTurnEffects({
    turnQueue,
    activeTurn,
    battleStatus,
    isPauseOpen,
    isWaitingAnimation,
    partyState,
    hasLoggedTurnInit,
    lastAdvancedTurnId,
    battleStartTimeRef,
    lastResolvedTurnId,
    setBattleStatus,
    setIsWaitingAnimation,
    setLastResolvedTurnId,
    nextTurn,
    isDataReady,
  });

  // 액션 핸들러 훅
  const {
    handleNormalClick,
    handleSkillClick,
    handleUltimateClick,
  } = useBattleActionHandlers({
    activeTurn,
    activeCharacter,
    isWaitingAnimation,
    setIsWaitingAnimation,
    setPartyState,
    setTurnQueue,
    triggerSkillSelection,
  });

  // Phaser 래퍼 함수 훅
  const {
    handleAttackCompleteWrapper,
    handleEnemyAttackResultWrapper,
    resumeTurnWithAdvance,
  } = useBattleWrappers({
    activeTurn,
    battleStatus,
    lastAdvancedTurnId,
    onAttackComplete,
    onEnemyAttackResult,
    setLastResolvedTurnId,
    resumeTurn,
    nextTurn,
    handleAttackResult,
  });

  return {
    // 상태
    battleStatus,
    battleSession,
    isPauseOpen,
    showRetreatConfirm,
    showMissionComplete,
    turnQueue,
    partyState,
    activeTurn,
    activeCharacter,
    isWaitingAnimation,
    isDataReady,
    // 핸들러
    handlePauseOpen,
    handleResumeBattle,
    handleRetreatClick,
    handleRetreatCancel,
    handleRetreatConfirm,
    handleBackToObservation,
    handleBattleRestart,
    handleNormalClick,
    handleSkillClick,
    handleUltimateClick,
    handleAttackCompleteWrapper,
    handleEnemyAttackResultWrapper,
    resumeTurnWithAdvance,
  };
};
