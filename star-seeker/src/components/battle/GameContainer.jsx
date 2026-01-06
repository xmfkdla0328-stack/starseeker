import React from 'react';
import PhaserGame from './PhaserGame';

/**
 * Phaser 게임 엔진 컨테이너
 */
export const GameContainer = ({ 
  partyState, 
  enemyData, 
  activeTurn, 
  isPauseOpen, 
  missionType, 
  battleSession,
  handleAttackCompleteWrapper,
  handleEnemyAttackResultWrapper,
  resumeTurnWithAdvance,
}) => {
  return (
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
  );
};
