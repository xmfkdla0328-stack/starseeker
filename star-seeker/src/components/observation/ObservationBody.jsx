import React from 'react';

// 관측 버튼 내부 렌더링 컴포넌트
// type: 'planet' | 'saturn' | 'nebula'
export const ObservationBody = ({ obs, isHovered }) => {
  if (obs.type === 'planet') {
    return (
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${obs.color}`}></div>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 30%, rgba(0,0,0,0.4) 80%)',
          }}
        ></div>
        <div className="absolute top-2 left-3 w-10 h-10 rounded-full bg-white/50 blur-md"></div>
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${obs.glowColor} opacity-20 blur-sm`}></div>
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
            <span className="text-blue-100 text-lg font-serif font-light tracking-wide drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">행성 관측</span>
          </div>
        )}
      </div>
    );
  }

  if (obs.type === 'saturn') {
    return (
      <div className="relative w-full h-full">
        {/* 행성 본체 */}
        <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${obs.color}`}></div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 30%, rgba(0,0,0,0.4) 80%)',
            }}
          ></div>
          <div className="absolute top-2 left-3 w-10 h-10 rounded-full bg-white/50 blur-md"></div>
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${obs.glowColor} opacity-20 blur-sm`}></div>
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
              <span className="text-yellow-100 text-lg font-serif font-light tracking-wide drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">성흔 관측</span>
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
    <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
      {/* 은은한 회색 글로우 배경 */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(148,163,184,0.4) 0%, rgba(148,163,184,0.2) 40%, transparent 70%)',
        }}
      ></div>
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
