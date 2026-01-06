import React from 'react';

/**
 * 미션 완료 시각 효과 컴포넌트
 * @param {Object} props
 * @param {boolean} props.show - 표시 여부
 */
const MissionCompleteEffect = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none animate-fade-in">
      {/* 어두운 배경 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-pulse" />
      
      {/* 중앙 텍스트 */}
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-7xl font-black italic bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.9)] animate-bounce-in tracking-wider font-serif">
          CAUSAL REVERSAL
        </h1>
        <p className="text-2xl text-cyan-200 tracking-[0.3em] font-mono drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] animate-fade-in">
          인과 역전
        </p>
        
        {/* 파티클 효과 */}
        <div className="absolute -inset-32 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-particle-burst"
              style={{
                left: '50%',
                top: '50%',
                animation: `particle-burst 1.5s ease-out ${i * 0.1}s forwards`,
                transform: `rotate(${i * 30}deg) translateY(-80px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionCompleteEffect;
