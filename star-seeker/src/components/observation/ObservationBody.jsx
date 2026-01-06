import React from 'react';

// 관측 버튼 내부 렌더링 컴포넌트
// type: 'planet' | 'saturn' | 'nebula'
export const ObservationBody = ({ obs, isHovered }) => {
  // 행성별 입체적인 radial gradient 생성
  const getPlanetGradient = (colorFrom, colorTo) => {
    // colorFrom, colorTo는 'from-blue-400 to-cyan-400' 같은 형식
    // 실제 색상 추출 (간단히 매핑)
    const colorMap = {
      'blue-400': '#60a5fa',
      'cyan-400': '#22d3ee',
      'yellow-400': '#facc15',
      'amber-400': '#fbbf24',
      'red-400': '#f87171',
      'orange-400': '#fb923c',
    };
    
    // 색상 추출
    const fromMatch = colorFrom?.match(/(blue|cyan|yellow|amber|red|orange)-(\d+)/);
    const toMatch = colorTo?.match(/(blue|cyan|yellow|amber|red|orange)-(\d+)/);
    
    const fromColor = fromMatch ? colorMap[`${fromMatch[1]}-${fromMatch[2]}`] : '#60a5fa';
    const toColor = toMatch ? colorMap[`${toMatch[1]}-${toMatch[2]}`] : '#22d3ee';
    
    return `radial-gradient(circle at 35% 35%, 
      rgba(255, 255, 255, 0.9) 0%, 
      ${fromColor} 15%, 
      ${toColor} 45%, 
      rgba(0, 0, 0, 0.8) 85%, 
      rgba(0, 0, 0, 0.95) 100%)`;
  };

  if (obs.type === 'planet') {
    const sphereGradient = getPlanetGradient(obs.color?.split(' ')[0]?.replace('from-', ''), obs.color?.split(' ')[1]?.replace('to-', ''));
    
    return (
      <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl planet-visual">
        {/* 입체적인 구체 배경 */}
        <div 
          className="absolute inset-0"
          style={{
            background: sphereGradient,
          }}
        ></div>
        {/* 추가 하이라이트 */}
        <div
          className="absolute top-2 left-3 w-10 h-10 rounded-full bg-white/40 blur-lg"
        ></div>
        {/* 외부 글로우 (뒤에서 빛나는 효과는 부모 컴포넌트에서 처리) */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
            <span className="text-blue-100 text-lg font-serif font-light tracking-wide drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">행성 관측</span>
          </div>
        )}
      </div>
    );
  }

  if (obs.type === 'saturn') {
    const sphereGradient = getPlanetGradient(obs.color?.split(' ')[0]?.replace('from-', ''), obs.color?.split(' ')[1]?.replace('to-', ''));
    
    return (
      <div className="relative w-32 h-32 planet-visual">
        {/* 행성 본체 */}
        <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
          {/* 입체적인 구체 배경 */}
          <div 
            className="absolute inset-0"
            style={{
              background: sphereGradient,
            }}
          ></div>
          {/* 추가 하이라이트 */}
          <div
            className="absolute top-2 left-3 w-10 h-10 rounded-full bg-white/40 blur-lg"
          ></div>
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
              <span className="text-yellow-100 text-lg font-serif font-light tracking-wide drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">자원 관측</span>
            </div>
          )}
        </div>
        {/* 토성 고리 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[35%] pointer-events-none"
          style={{
            transform: 'translate(-50%, -50%) perspective(100px) rotateX(75deg)',
            transformOrigin: 'center',
          }}
        >
          <div
            className="absolute inset-0 rounded-full border-4 opacity-60"
            style={{
              borderColor: 'rgba(251, 191, 36, 0.6)',
              boxShadow:
                'inset 0 0 20px rgba(251, 191, 36, 0.4), 0 0 15px rgba(251, 191, 36, 0.3)',
            }}
          ></div>
          <div
            className="absolute inset-1 rounded-full border-2 opacity-40"
            style={{ borderColor: 'rgba(245, 158, 11, 0.5)' }}
          ></div>
        </div>
      </div>
    );
  }

  // nebula: 이미지 기반 검은 손
  return (
    <div className="relative w-32 h-32 rounded-full overflow-hidden flex items-center justify-center planet-visual">
      <img
        src="/images/calamity-hand.png"
        alt="Calamity Hand"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      />
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
          <span className="text-red-200 text-lg font-serif font-light tracking-wide drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">재앙 관측</span>
        </div>
      )}
    </div>
  );
};
