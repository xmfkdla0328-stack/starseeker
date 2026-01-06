import React from 'react';

/**
 * 인과율 게이지 컴포넌트
 * @param {Object} props
 * @param {number} props.gaugePercent - 게이지 퍼센트 (0-100)
 * @param {number} props.missionGauge - 미션 게이지 값
 */
const CausalityGauge = ({ gaugePercent, missionGauge }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '145px',
        left: '20px',
        zIndex: 15,
        width: '240px',
      }}
    >
      {/* 네온 박스 컨테이너 */}
      <div
        style={{
          position: 'relative',
          width: '240px',
          height: '40px',
          backgroundColor: 'rgba(10, 16, 32, 0.8)',
          border: '2px solid rgba(68, 102, 170, 0.8)',
          borderRadius: '8px',
          overflow: 'hidden',
          backdropFilter: 'blur(4px)',
          boxShadow:
            '0 0 12px rgba(68, 102, 170, 0.4), inset 0 0 12px rgba(68, 102, 170, 0.2)',
        }}
      >
        {/* 게이지 바 (왼쪽에서 차오름) */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            height: '100%',
            width: `${gaugePercent}%`,
            background:
              'linear-gradient(90deg, rgba(0, 255, 255, 0.3) 0%, rgba(0, 255, 255, 0.5) 100%)',
            transition: 'width 0.3s ease-out',
          }}
        />

        {/* 게이지 하이라이트 (위쪽 테두리 빛남) */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            height: '100%',
            width: `${gaugePercent}%`,
            borderTop: '2px solid rgba(0, 255, 255, 0.8)',
            boxShadow: '0 0 8px rgba(0, 255, 255, 0.6)',
            transition: 'width 0.3s ease-out',
            pointerEvents: 'none',
          }}
        />

        {/* 텍스트 (중앙 정렬) */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff',
            textShadow:
              '0 0 8px rgba(0, 255, 255, 0.8), 0 0 4px rgba(255, 255, 255, 0.6)',
            letterSpacing: '1px',
            pointerEvents: 'none',
          }}
        >
          인과율 {missionGauge}%
        </div>
      </div>
    </div>
  );
};

export default CausalityGauge;
