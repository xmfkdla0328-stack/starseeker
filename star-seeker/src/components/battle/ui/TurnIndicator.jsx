/**
 * 현재 턴 정보 표시 컴포넌트
 * @module components/battle/ui/TurnIndicator
 */

import React from 'react';
import { UI_TEXT } from '../../../constants/battleConstants';

/**
 * 현재 턴 정보를 표시합니다
 * @param {object} props
 * @param {object} props.activeTurn - 현재 턴 정보
 * @returns {React.ReactElement|null}
 */
export const TurnIndicator = ({ activeTurn }) => {
  if (!activeTurn) return null;
  
  const isPlayerTurn = activeTurn.type === 'party';
  const borderColor = isPlayerTurn ? 'rgba(107,220,255,0.5)' : 'rgba(211,178,111,0.5)';
  const turnText = isPlayerTurn 
    ? UI_TEXT.TURN_INFO.PLAYER_TURN(activeTurn.name) 
    : UI_TEXT.TURN_INFO.ENEMY_TURN;
  
  return (
    <div 
      className="battle-turn-order-bar" 
      style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 15, 
        textAlign: 'left' 
      }}
    >
      <div 
        className="astro-panel px-4 py-2 rounded-xl text-xs tracking-[0.14em] glow-text font-semibold mb-2" 
        style={{ borderColor }}
      >
        {turnText}
      </div>
    </div>
  );
};

export default TurnIndicator;
