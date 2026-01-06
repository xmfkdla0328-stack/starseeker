import React from 'react';

const TurnOrderPanel = ({ turnQueue = [] }) => {
  // 테스트용: turnQueue가 비어있으면 더미 데이터 표시
  const displayQueue = turnQueue.length > 0 ? turnQueue : [
    { id: 'char1', name: '서주목', type: 'party', speed: 126 },
    { id: 'char2', name: '슬라', type: 'party', speed: 122 },
    { id: 'char3', name: '막주', type: 'party', speed: 116 },
    { id: 'char4', name: '칼슴', type: 'party', speed: 110 },
    { id: 'enemy', name: '보스', type: 'enemy', speed: 100 },
  ];

  return (
    <div 
      className="timeline-panel battle-turn-order-panel" 
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
      {displayQueue.map((turn, index) => {
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
