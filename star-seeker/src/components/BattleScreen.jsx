import React from 'react';
import PhaserGame from './battle/PhaserGame';
import { BattleResult } from '../utils/battle/battleUtils';
import { REACTION_NAMES } from '../constants/battleConstants';

// Context
import { useUI } from '../context/useGameContext';

// UI 컴포넌트
import TurnOrderPanel from './battle/sub/TurnOrderPanel';
import ControlDeck from './battle/sub/ControlDeck';
import MissionBanner from './battle/sub/MissionBanner';
import EnemyStatusBar from './battle/sub/EnemyStatusBar';
import TurnIndicator from './battle/ui/TurnIndicator';
import PauseButton from './battle/ui/PauseButton';
import PauseMenu from './battle/ui/PauseMenu';
import BattleResultModal from './battle/ui/BattleResultModal';
import MissionCompleteEffect from './battle/ui/MissionCompleteEffect';
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
 *  missionType?: any,
 *  handleAttackResult?: Function,
 *  extractionRewards?: Array,
 *  onVictory?: Function,
 * }} props
 */
export const BattleScreen = ({ 
  partyData, 
  enemyData, 
  missionType,
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

  // Early return: 데이터 로딩 중
  if (!isDataReady) {
    return (
      <div className="flex items-center justify-center w-full h-full text-slate-200 bg-slate-950/70">
        데이터 로딩 중...
      </div>
    );
  }

  const gaugePercent = battleStatus.missionGauge;
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
      {/* Phaser 게임 컨테이너 */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <PhaserGame
          partyData={partyState}
          enemyData={enemyData}
          battleTurn={activeTurn?.type === 'enemy' ? 'ENEMY' : 'PLAYER'}
          activeTurn={activeTurn}
          isPaused={isPauseOpen}
          missionType={missionType}
          handleAttackResult={handleAttackCompleteWrapper}
          handleEnemyAttackResult={handleEnemyAttackResultWrapper}
            resumeTurn={resumeTurnWithAdvance}
          key={`battle-${battleSession}`}
        />
      </div>

      {/* 턴 순서 패널 */}
      {showHud && turnQueue.length > 0 && (
        <TurnOrderPanel turnQueue={turnQueue} />
      )}

      {/* 현재 턴 표시 */}
      {showHud && <TurnIndicator activeTurn={activeTurn} />}

      {/* 적 상태 바 */}
      {showHud && (
        <EnemyStatusBar 
          enemyHp={battleStatus.enemyHp} 
          enemyMaxHp={enemyData.maxHp || 100} 
        />
      )}

      {/* 미션 배너 */}
      {showHud && (
        <MissionBanner 
          missionType={missionType} 
          style={{ top: '100px', left: '20px', transform: 'translateY(0)', zIndex: 15 }} 
        />
      )}

      {/* 인과율 게이지 */}
      {showHud && (
        <CausalityGauge 
          gaugePercent={gaugePercent}
          missionGauge={battleStatus.missionGauge}
        />
      )}

      {/* 일시정지 버튼 */}
      {showHud && <PauseButton onClick={handlePauseOpen} />}

      {/* 컨트롤 덱 */}
      {showHud && (
        <ControlDeck
          gaugePercent={gaugePercent}
          missionGauge={battleStatus.missionGauge}
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

      {/* 미션 완료 시각 효과 */}
      <MissionCompleteEffect show={showMissionComplete} />
    </div>
  );
};
