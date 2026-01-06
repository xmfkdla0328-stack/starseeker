import React from 'react';
import { useBattleScreenState } from './battle/useBattleScreenState';
import { GameContainer } from './battle/GameContainer';
import { BattleHUD } from './battle/BattleHUD';
import { BattleUILayer } from './battle/BattleUILayer';

export const BattleScreen = ({ 
  partyData, 
  enemyData, 
  missionType,
  handleAttackResult,
  extractionRewards,
  onVictory,
}) => {
  // 모든 상태 및 핸들러 초기화
  const {
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
  } = useBattleScreenState(
    partyData,
    enemyData,
    missionType,
    handleAttackResult,
    extractionRewards,
    onVictory
  );

  // Early return: 데이터 로딩 중
  if (!isDataReady) {
    return (
      <div className="flex items-center justify-center w-full h-full text-slate-200 bg-slate-950/70">
        데이터 로딩 중...
      </div>
    );
  }

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
      {/* Phaser 게임 엔진 */}
      <GameContainer
        partyState={partyState}
        enemyData={enemyData}
        activeTurn={activeTurn}
        isPauseOpen={isPauseOpen}
        missionType={missionType}
        battleSession={battleSession}
        handleAttackCompleteWrapper={handleAttackCompleteWrapper}
        handleEnemyAttackResultWrapper={handleEnemyAttackResultWrapper}
        resumeTurnWithAdvance={resumeTurnWithAdvance}
      />

      {/* 전투 HUD */}
      <BattleHUD
        turnQueue={turnQueue}
        activeTurn={activeTurn}
        battleStatus={battleStatus}
        enemyData={enemyData}
        missionType={missionType}
        onPauseClick={handlePauseOpen}
      />

      {/* 전투 UI 레이어 (모달, 메뉴, 컨트롤) */}
      <BattleUILayer
        battleStatus={battleStatus}
        activeTurn={activeTurn}
        activeCharacter={activeCharacter}
        isPauseOpen={isPauseOpen}
        showRetreatConfirm={showRetreatConfirm}
        showMissionComplete={showMissionComplete}
        isWaitingAnimation={isWaitingAnimation}
        onNormalClick={handleNormalClick}
        onSkillClick={handleSkillClick}
        onUltimateClick={handleUltimateClick}
        onPauseOpen={handlePauseOpen}
        onResumeBattle={handleResumeBattle}
        onRetreatClick={handleRetreatClick}
        onRetreatCancel={handleRetreatCancel}
        onRetreatConfirm={handleRetreatConfirm}
        onBattleResultBack={handleBackToObservation}
        onBattleResultRestart={handleBattleRestart}
      />
    </div>
  );
};
