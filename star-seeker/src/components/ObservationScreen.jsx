import React, { useState } from 'react';
import { ChevronLeft, Star, Zap, Skull } from 'lucide-react';

/**
 * 망원경 관측 화면 (개선된 UI)
 * 사용자가 망원경을 통해 각 관측 대상을 선택하는 인터랙티브 컨셉
 */
export const ObservationScreen = ({ setScreen }) => {
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [hoveredObservation, setHoveredObservation] = useState(null);
  const [rotating, setRotating] = useState(false);

  const observations = [
    {
      id: 'PLANET',
      name: '행성 관측',
      shortName: 'PLANET',
      description: '게임의 메인 스토리를 진행하는 컨텐츠입니다. 다양한 행성을 관측하며 이야기를 진행합니다.',
      icon: Star,
      color: 'from-blue-400 to-cyan-400',
      glowColor: 'from-blue-500/80 to-cyan-500/80',
      textColor: 'text-blue-300',
      darkColor: 'from-blue-900/80 to-cyan-900/80',
      position: 0,
      level: '초급~중급',
    },
    {
      id: 'RUIN',
      name: '성흔 관측',
      shortName: 'RUIN',
      description: '별의 조각과 별의 먼지를 획득할 수 있는 컨텐츠입니다. 캐릭터 강화에 필수적인 아이템들을 파밍합니다.',
      icon: Zap,
      color: 'from-yellow-400 to-amber-400',
      glowColor: 'from-yellow-500/80 to-amber-500/80',
      textColor: 'text-yellow-300',
      darkColor: 'from-yellow-900/80 to-amber-900/80',
      position: 120,
      level: '중급~상급',
    },
    {
      id: 'CALAMITY',
      name: '재앙 관측',
      shortName: 'CALAMITY',
      description: '높은 난이도의 컨텐츠로, 강력한 보상을 얻을 수 있습니다. 도전적인 전투를 원하는 플레이어를 위한 컨텐츠입니다.',
      icon: Skull,
      color: 'from-red-400 to-orange-400',
      glowColor: 'from-red-500/80 to-orange-500/80',
      textColor: 'text-red-300',
      darkColor: 'from-red-900/80 to-orange-900/80',
      position: 240,
      level: '상급~최상급',
    },
  ];

  const handleObservationSelect = (obs) => {
    setSelectedObservation(obs);
    setRotating(true);
    setTimeout(() => {
      setScreen('BATTLE');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900 p-4 md:p-8 flex flex-col overflow-hidden relative">
      {/* 별 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 0.5 + 'px',
              height: Math.random() * 3 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }
        `}</style>
      </div>

      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-6 md:mb-10 relative z-10">
        <button
          onClick={() => setScreen('HOME')}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-slate-100" />
        </button>
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
            우주 망원경
          </h1>
          <p className="text-sm md:text-base text-slate-300 mt-1">✨ 관측할 천체를 선택하세요</p>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 relative z-20">
        {/* 망원경 뷰포트 */}
        <div className="flex-1 flex items-center justify-center min-h-96">
          <div className="relative w-full max-w-lg aspect-square">
            {/* 망원경 외부 구조 */}
            <div className="absolute inset-0 rounded-full border-8 border-slate-600 shadow-2xl">
              {/* 외부 렌즈 광학 반사 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 via-transparent to-black/30"></div>

              {/* 망원경 포커싱 라인 */}
              <div className="absolute inset-0 rounded-full border-2 border-slate-500/40 animate-pulse"></div>

              {/* 외부 테두리 광채 */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* 중앙 뷰포트 배경 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900/60 via-slate-950/80 to-slate-950/95 backdrop-blur-md flex items-center justify-center overflow-hidden">
              {/* 내부 그리드 패턴 */}
              <div className="absolute inset-0 rounded-full opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* 동심원 */}
                  <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" className="text-slate-400" strokeWidth="1" strokeDasharray="4,4" />
                  <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" className="text-slate-400" strokeWidth="1" strokeDasharray="4,4" />
                  <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" className="text-slate-400" strokeWidth="2" />
                  {/* 십자선 */}
                  <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" className="text-slate-500" strokeWidth="1" opacity="0.5" />
                  <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" className="text-slate-500" strokeWidth="1" opacity="0.5" />
                  {/* 대각선 */}
                  <line x1="60" y1="60" x2="340" y2="340" stroke="currentColor" className="text-slate-500" strokeWidth="0.5" opacity="0.3" />
                  <line x1="340" y1="60" x2="60" y2="340" stroke="currentColor" className="text-slate-500" strokeWidth="0.5" opacity="0.3" />
                </svg>
              </div>

              {/* 중앙 포커스 포인트 */}
              <div className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>

              {/* 궤도 경로들 */}
              <div className="absolute inset-0 rounded-full">
                {observations.map((obs, idx) => {
                  const angle = (obs.position * Math.PI) / 180;
                  const radius = 90;
                  return (
                    <svg key={`orbit-${idx}`} className="absolute inset-0 w-full h-full">
                      <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="none"
                        stroke={obs.color.split(' ')[1]}
                        className={obs.color.split(' ')[0]}
                        strokeWidth="1"
                        opacity="0.3"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  );
                })}
              </div>
            </div>

            {/* 관측 대상들 (행성/별) - 훨씬 더 큼 */}
            {observations.map((obs) => {
              const angle = (obs.position * Math.PI) / 180;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isSelected = selectedObservation?.id === obs.id;
              const isHovered = hoveredObservation?.id === obs.id;

              return (
                <div
                  key={obs.id}
                  className={`absolute transition-all duration-500 ${
                    rotating && isSelected ? 'scale-200 opacity-0' : 'scale-100 opacity-100'
                  }`}
                  style={{
                    left: `calc(50% + ${x}px - 60px)`,
                    top: `calc(50% + ${y}px - 60px)`,
                  }}
                >
                  <button
                    onClick={() => handleObservationSelect(obs)}
                    onMouseEnter={() => setHoveredObservation(obs)}
                    onMouseLeave={() => setHoveredObservation(null)}
                    disabled={rotating}
                    className={`relative w-32 h-32 transition-all duration-300 disabled:cursor-not-allowed`}
                  >
                    {/* 외부 글로우 (선택/호버 시) */}
                    <div
                      className={`absolute -inset-8 rounded-full blur-2xl bg-gradient-to-r ${obs.glowColor} transition-all duration-300 ${
                        isHovered || isSelected ? 'opacity-100 scale-150' : 'opacity-0 scale-75'
                      }`}
                    ></div>

                    {/* 궤도 라인 (선택 시) */}
                    {(isSelected || isHovered) && (
                      <div className="absolute -inset-12 rounded-full border-2 border-dashed border-white/20 animate-spin" style={{ animationDuration: '10s' }}></div>
                    )}

                    {/* 행성/별 본체 */}
                    <div className="relative w-full h-full rounded-full overflow-hidden group">
                      {/* 기본 그라디언트 배경 */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${obs.color} ${isHovered ? 'brightness-125' : ''} transition-all duration-300`}></div>

                      {/* 입체 음영 효과 */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/60 rounded-full"></div>

                      {/* 표면 디테일 (행성의 질감) */}
                      <div className="absolute inset-0 opacity-40">
                        <div className="absolute w-full h-full bg-radial-gradient from-transparent via-transparent to-black/40 rounded-full"></div>
                      </div>

                      {/* 하이라이트 (빛 반사) */}
                      <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-white/40 rounded-full blur-lg"></div>

                      {/* 아이콘 */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <obs.icon className={`w-14 h-14 text-white drop-shadow-lg ${isHovered ? 'scale-125' : ''} transition-transform duration-300`} />
                      </div>

                      {/* 테두리 */}
                      <div className={`absolute inset-0 rounded-full border-3 ${isSelected ? 'border-white animate-pulse' : isHovered ? 'border-white/80' : 'border-white/40'} transition-all duration-300`}></div>
                    </div>
                  </button>

                  {/* 라벨 */}
                  <div className={`mt-4 text-center pointer-events-none transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
                    <p className={`text-sm md:text-base font-bold ${obs.textColor}`}>{obs.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{obs.level}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 오른쪽 정보 패널 */}
        <div className="flex-1 flex flex-col gap-4 items-center lg:items-start justify-center min-h-96 relative z-10">
          {/* 상세 정보 패널 */}
          <div className={`w-full max-w-md transition-all duration-500 ${selectedObservation ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-4'}`}>
            {selectedObservation ? (
              <div className="p-6 md:p-8 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedObservation.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <selectedObservation.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className={`text-2xl font-bold ${selectedObservation.textColor}`}>
                      {selectedObservation.name}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">난이도: {selectedObservation.level}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {selectedObservation.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400 animate-pulse">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedObservation.color}`}></div>
                  🔭 망원경 정조중... 진입 준비 중
                </div>
              </div>
            ) : (
              <div className="p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-center text-slate-300 text-sm md:text-base leading-relaxed">
                  <span className="block mb-2">🌌 망원경 대기 중</span>
                  망원경 뷰포트에서 천체를 선택하여 관측하세요.
                </p>
              </div>
            )}
          </div>

          {/* 기본 안내 */}
          {!selectedObservation && (
            <div className="w-full max-w-md p-4 md:p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-400/30 backdrop-blur-sm">
              <div className="text-xs md:text-sm text-slate-300 space-y-2">
                <p>💡 <span className="font-semibold">각 천체의 특징:</span></p>
                <div className="grid grid-cols-1 gap-2 text-slate-400 ml-2">
                  <p>⭐ <span className="text-blue-300">행성 관측</span> - 메인 스토리</p>
                  <p>⚡ <span className="text-yellow-300">성흔 관측</span> - 아이템 파밍</p>
                  <p>💀 <span className="text-red-300">재앙 관측</span> - 도전 컨텐츠</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 망원경 조절 UI */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-8 z-10 hidden lg:flex">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-500 flex items-center justify-center text-lg text-slate-300 hover:border-slate-400 cursor-pointer transition-all hover:scale-110">
          +
        </div>
        <div className="w-1 h-32 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full border border-slate-500"></div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-500 flex items-center justify-center text-lg text-slate-300 hover:border-slate-400 cursor-pointer transition-all hover:scale-110">
          −
        </div>
      </div>
    </div>
  );
};


