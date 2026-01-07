import React from 'react';
import { BattleResult } from '../utils/battle/battleUtils';
import { REACTION_NAMES } from '../constants/battleConstants';

// Context
import { useUI } from '../context/useGameContext';

// UI 컴포넌트
import ControlDeck from './battle/sub/ControlDeck';
import EnemyStatusBar from './battle/sub/EnemyStatusBar';
import PauseButton from './battle/ui/PauseButton';
import PauseMenu from './battle/ui/PauseMenu';
import BattleResultModal from './battle/ui/BattleResultModal';
import CausalityGauge from './battle/ui/CausalityGauge';

// 커스텀 훅
import { useTurnSystem } from '../hooks/useTurnSystem';
import { useBattleAction } from '../hooks/useBattleAction';
import { useBattleState } from '../hooks/useBattleState';
import { useBattleHandlers } from '../hooks/useBattleHandlers';
import { useBattleEffects } from '../hooks/useBattleEffects';
import { useTurnEffects } from '../hooks/useTurnEffects';
import { useBattleActionHandlers } from '../hooks/useBattleActionHandlers';
import { useBattleWrappers } from '../hooks/useBattleWrappers';

/**
 * 속성 반응 타입을 한글 이름으로 변환
 */
const getReactionName = (reactionType) => {
  return REACTION_NAMES[reactionType] || reactionType;
};

/**
 * BattleScreen 컴포넌트
 * Phaser 게임 엔진 기반의 전투 화면을 표시합니다.
 * 미션 게이지, 속성 반응 결과 등을 UI로 표시합니다.
 * @param {{
 *  partyData: any[],
 *  enemyData: object,
 *
 *  handleAttackResult?: Function,
 *  extractionRewards?: Array,
 *  onVictory?: Function,
 * }} props
 */
export const BattleScreen = ({ 
  partyData, 
  enemyData, 
  // missionType,
  handleAttackResult,
  extractionRewards,
  onVictory,
}) => {
  // Context에서 setScreen 가져오기
  const { setScreen } = useUI();

  // 전투 상태 훅
  const {
    battleStatus,
    battleSession,
    isPauseOpen,
    showRetreatConfirm,
    missionCompleteShown,
    setBattleStatus,
    setIsPauseOpen,
    setShowRetreatConfirm,
    resetBattle,
  } = useBattleState(partyData, enemyData);


  // 턴 시스템 훅
  const {
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
    // setTurnQueue,
    partyDataLength: partyData?.length || 0,
    enemyMaxHp: enemyData?.maxHp || 100,
  });

  // 전투 효과 훅 (BGM, 효과음 등)
  useBattleEffects({
    battleStatus,
    missionCompleteShown,
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
    battleStatus,
    isPauseOpen,
    isWaitingAnimation,
    partyState,
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
    activeCharacter,
    isWaitingAnimation,
    setIsWaitingAnimation,
    setPartyState,
    triggerSkillSelection,
  });

  // Phaser 래퍼 함수 훅
  const {
    handleAttackCompleteWrapper,
    handleEnemyAttackResultWrapper,
    resumeTurnWithAdvance,
  } = useBattleWrappers({
    battleStatus,
    onAttackComplete,
    onEnemyAttackResult,
    setLastResolvedTurnId,
    resumeTurn,
    nextTurn,
    handleAttackResult,
  });

  // Early return: 데이터 로딩 중
  if (!isDataReady) {
    return (
      <div className="flex items-center justify-center w-full h-full text-slate-200 bg-slate-950/70">
        데이터 로딩 중...
      </div>
    );
  }

  const showHud = battleStatus.result === BattleResult.NONE;

  return (
    <div 
      className="animate-fade-in overflow-hidden" 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative',
        background: 'radial-gradient(circle at 50% 20%, rgba(107,220,255,0.08), transparent 45%), radial-gradient(circle at 80% 70%, rgba(211,178,111,0.12), transparent 50%)'
      }}
    >
      {/* 적 상태 바 */}
      {showHud && (
        <EnemyStatusBar 
          enemyHp={battleStatus.enemyHp} 
          enemyMaxHp={enemyData.maxHp || 100} 
        />
      )}

      {/* ...인과율 게이지 UI 삭제... */}

      {/* 일시정지 버튼 */}
      {showHud && <PauseButton onClick={handlePauseOpen} />}

      {/* 컨트롤 덱 */}
      {showHud && (
        <ControlDeck
          lastReaction={battleStatus.lastReaction ? getReactionName(battleStatus.lastReaction) : null}
          activeTurn={activeTurn}
          activeCharacter={activeCharacter}
          onNormal={handleNormalClick}
          onSkill={handleSkillClick}
          onUltimate={handleUltimateClick}
          isLocked={isWaitingAnimation || battleStatus.result !== BattleResult.NONE}
        />
      )}

      {/* 일시정지 메뉴 */}
      <PauseMenu
        isOpen={isPauseOpen}
        showRetreatConfirm={showRetreatConfirm}
        onResume={handleResumeBattle}
        onRetreatPrompt={handleRetreatClick}
        onRetreatCancel={handleRetreatCancel}
        onRetreatConfirm={handleRetreatConfirm}
      />

      {/* 전투 결과 모달 */}
      <BattleResultModal
        result={battleStatus.result}
        onBack={handleBackToObservation}
        onRestart={handleBattleRestart}
      />
    </div>
  );
};
