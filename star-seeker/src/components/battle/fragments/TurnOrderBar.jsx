import React from 'react';

/**
 * 턴 순서 표시 바 컴포넌트
 * 좌측 상단에 표시되는 현재 턴 정보
 */
export const TurnOrderBar = ({ activeTurn }) => {
  if (!activeTurn) return null;

  const isPartyTurn = activeTurn.type === 'party';
  const borderColor = isPartyTurn ? 'rgba(107,220,255,0.5)' : 'rgba(211,178,111,0.5)';
  const turnText = isPartyTurn ? `${activeTurn.name}의 턴` : '적의 턴';

  return (
    <div 
      className="astro-panel px-4 py-2 rounded-xl text-xs tracking-[0.14em] glow-text font-semibold" 
      style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 15,
        borderColor 
      }}
    >
      {turnText}
    </div>
  );
};
