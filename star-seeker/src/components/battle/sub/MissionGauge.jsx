import React from 'react';

/**
 * 인과율 게이지 컴포넌트
 * [목표: 혼돈/침묵] 밑에 표시되는 미션 게이지
 */
const MissionGauge = ({ missionGauge = 0, style = {} }) => {
  const gaugePercent = Math.min(Math.max(missionGauge, 0), 100);
  
  return (
    <div 
      className="telescope-gauge"
      style={{
        position: 'absolute',
        top: '140px',
        left: '20px',
        width: '240px',
        maxWidth: '240px',
        background: 'rgba(10, 27, 46, 0.75)',
        border: '1px solid rgba(107, 220, 255, 0.25)',
        borderRadius: '0.75rem',
        padding: '0.5rem 0.75rem',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        zIndex: 15,
        ...style,
      }}
    >
      {/* 게이지 라벨 */}
      <div className="gauge-label" style={{
        fontSize: '10px',
        color: '#b6ffff',
        textAlign: 'center',
        marginBottom: '0.5rem',
        letterSpacing: '0.15em',
        textShadow: '0 0 8px rgba(107, 220, 255, 0.6)',
      }}>
        <span>인과율 게이지</span>
        <span className="badge" style={{
          display: 'inline-block',
          marginLeft: '0.5rem',
          padding: '2px 8px',
          background: 'rgba(107, 220, 255, 0.15)',
          border: '1px solid rgba(107, 220, 255, 0.4)',
          borderRadius: '9999px',
          fontSize: '9px',
          fontWeight: 'bold',
        }}>
          {gaugePercent}%
        </span>
      </div>

      {/* 게이지 트랙 */}
      <div className="gauge-track" style={{
        position: 'relative',
        width: '100%',
        height: '6px',
        background: 'rgba(10, 26, 34, 0.55)',
        border: '1px solid rgba(0, 255, 255, 0.8)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        {/* 게이지 진행도 */}
        <div 
          className="gauge-fill"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${gaugePercent}%`,
            background: 'linear-gradient(90deg, rgba(10, 159, 191, 1) 0%, rgba(182, 255, 255, 1) 100%)',
            borderRadius: '10px',
            transition: 'width 0.3s ease-out',
            boxShadow: '0 0 10px rgba(107, 220, 255, 0.5)',
          }}
        />
      </div>

      {/* 별 표시 (100% 달성 시) */}
      {gaugePercent >= 100 && (
        <div className="gauge-stars" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: '4px',
          pointerEvents: 'none',
        }}>
          {[...Array(3)].map((_, i) => (
            <span 
              key={i} 
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                background: 'rgba(182, 255, 255, 0.9)',
                boxShadow: '0 0 8px rgba(107, 220, 255, 0.8)',
                borderRadius: '50%',
                animation: 'pulse 1s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionGauge;
