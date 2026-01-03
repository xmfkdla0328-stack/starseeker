import React from 'react';

const TurnOrderPanel = ({ turnQueue = [] }) => {
  if (!turnQueue.length) return null;

  return (
    <div 
      className="timeline-panel" 
      style={{ 
        position: 'absolute', 
        top: '90px', 
        right: '20px', 
        zIndex: 15,
        width: '80px',
        maxHeight: '350px',
        overflowY: 'auto',
        scrollbarWidth: 'none'
      }}
    >
      {turnQueue.map((turn, index) => {
        const isActive = index === 0;
        const isEnemy = turn.type === 'enemy';
        return (
          <div
            key={`turn-${index}-${turn.id || turn.name}`}
            className={`timeline-item ${isActive ? 'timeline-active' : ''} ${isEnemy ? 'timeline-enemy' : 'timeline-party'}`}
            style={{
              marginBottom: '8px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isActive ? 'scale(1.1)' : 'scale(0.85)',
              opacity: isActive ? 1 : 0.6
            }}
          >
            <div className="timeline-avatar">
              <div className="text-xs font-semibold text-center" style={{ color: isEnemy ? '#ff5f5f' : '#6bdcff' }}>
                {turn.name.substring(0, 2)}
              </div>
            </div>
            {isActive && (
              <div className="timeline-indicator">▶</div>
            )}
            <div className="text-[9px] text-center mt-1 text-slate-300/70">
              SPD {turn.speed}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TurnOrderPanel;
