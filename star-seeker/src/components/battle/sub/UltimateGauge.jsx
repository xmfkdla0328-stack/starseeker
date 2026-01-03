import React, { useEffect, useRef } from 'react';
import './UltimateGauge.css';

/**
 * 필살기 에너지 게이지 컴포넌트
 * @param {Object} props
 * @param {number} props.sp - 현재 SP
 * @param {number} props.maxSp - 최대 SP (기본 100)
 * @param {boolean} props.isReady - 필살기 사용 가능 여부
 */
const UltimateGauge = ({ sp = 0, maxSp = 100, isReady = false }) => {
  const gaugeRef = useRef(null);
  const particleContainerRef = useRef(null);
  const percentage = Math.min(100, Math.max(0, (sp / maxSp) * 100));

  // 100% 달성 시 파티클 생성
  useEffect(() => {
    if (!isReady || !particleContainerRef.current) return;

    const container = particleContainerRef.current;
    const particleCount = 20;

    // 기존 파티클 제거
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // 새 파티클 생성
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'ultimate-particle';
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 60 + Math.random() * 20;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.setProperty('--tx', `${x}px`);
      particle.style.setProperty('--ty', `${y}px`);
      particle.style.animationDelay = `${i * 0.05}s`;
      
      container.appendChild(particle);
    }

    // 정리
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [isReady]);

  return (
    <div className="ultimate-gauge-container">
      {/* 원형 프로그레스 링 */}
      <svg className="ultimate-gauge-ring" viewBox="0 0 120 120">
        {/* 배경 링 */}
        <circle
          className="gauge-bg"
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="rgba(100, 100, 255, 0.15)"
          strokeWidth="4"
        />
        
        {/* 진행 링 */}
        <circle
          ref={gaugeRef}
          className={`gauge-progress ${isReady ? 'gauge-ready' : ''}`}
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 54}`}
          strokeDashoffset={`${2 * Math.PI * 54 * (1 - percentage / 100)}`}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            transition: 'stroke-dashoffset 0.5s ease-out',
          }}
        />
        
        {/* 그라데이션 정의 */}
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>

      {/* 중앙 아이콘 및 텍스트 */}
      <div className={`gauge-center ${isReady ? 'gauge-center-ready' : ''}`}>
        <div className="gauge-icon">💥</div>
        {isReady && (
          <div className="gauge-ready-text">READY</div>
        )}
        <div className="gauge-percent">{Math.floor(percentage)}%</div>
      </div>

      {/* 파티클 컨테이너 */}
      <div ref={particleContainerRef} className="particle-container" />
      
      {/* 은하수 배경 (차오르는 효과) */}
      <div 
        className="galaxy-fill"
        style={{
          clipPath: `inset(${100 - percentage}% 0 0 0)`,
        }}
      />
    </div>
  );
};

export default UltimateGauge;
