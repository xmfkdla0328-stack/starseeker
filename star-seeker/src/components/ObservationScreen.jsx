import React, { useState } from 'react';
import { ChevronLeft, Star, Zap, Skull } from 'lucide-react';

/**
 * 망원경 관측 화면 (서정적 UI)
 * 어두운 우주 공간에서 망원경으로 관측하는 컨셉
 * 망원경 내부에서만 선명하게 보이는 비네팅 효과
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
      posX: -64,  // 30도 회전 후 좌표
      posY: -129,
      level: '초급~중급',
      type: 'planet',
      size: 'large',  // 행성 관측은 더 크게
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
      posX: 144,  // 30도 회전 후 좌표
      posY: -9,
      level: '중급~상급',
      type: 'saturn',  // 토성 스타일
      size: 'normal',
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
      posX: -60,  // 30도 회전 후 좌표
      posY: 104,
      level: '상급~최상급',
      type: 'nebula',  // 성운 스타일
      size: 'edge',  // 테두리에 위치
      edgePosition: 'bottom',  // 하단 테두리
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
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* 암흑 우주 배경 - 거의 검은색 */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-950/50 via-black to-black"></div>

      {/* 희미한 별 배경 (망원경 밖의 어두운 우주) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.3 + 'px',
              height: Math.random() * 2 + 0.3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.3 + 0.1,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
            }}
          />
        ))}
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.05; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.2); }
          }
          @keyframes telescopeBreath {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.02); opacity: 0.6; }
          }
          @keyframes tendrilPulse {
            0%, 100% { opacity: 0.3; transform: translateY(-50%) scale(1); }
            50% { opacity: 0.7; transform: translateY(-55%) scale(1.1); }
          }
        `}</style>
      </div>

      {/* 망원경 비네팅 효과 - 가장자리가 점점 어두워짐 */}
      <div 
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, transparent 28%, rgba(0,0,0,0.3) 42%, rgba(0,0,0,0.7) 57%, rgba(0,0,0,0.95) 72%, black 87%)',
        }}
      />

      {/* 망원경 렌즈 테두리 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <div 
          className="relative w-[100vh] h-[100vh] max-w-[100vw] max-h-[100vw]"
          style={{
            background: 'radial-gradient(circle, transparent 48%, rgba(30,41,59,0.8) 50%, rgba(15,23,42,0.95) 52%, transparent 54%)',
          }}
        >
          {/* 망원경 금속 테두리 효과 */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle, transparent 48%, rgba(71,85,105,0.5) 49%, rgba(51,65,85,0.8) 50%, rgba(30,41,59,0.9) 51%, transparent 53%)',
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
          }}></div>
          
          {/* 망원경 렌즈 반사광 */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 20%)',
          }}></div>
        </div>
      </div>

      {/* 헤더 (망원경 밖의 어두운 영역) */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-4 z-50 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setScreen('HOME')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10"
        >
          <ChevronLeft className="w-5 h-5 text-slate-300" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-400">
            우주 망원경
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">관측 대기 중...</p>
        </div>
      </div>

      {/* 망원경 뷰포트 중앙 컨텐츠 */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        {/* 망원경 뷰포트 - 중앙 원형 영역 */}
        <div className="relative w-[80vh] h-[80vh] max-w-[80vw] max-h-[80vw]">
          {/* 망원경 내부 - 우주 공간 (선명하게 보이는 영역) */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* 깊은 우주 배경 그라디언트 */}
            <div className="absolute inset-0 bg-gradient-radial from-indigo-950/80 via-slate-950 to-black"></div>

            {/* 망원경 안의 선명한 별들 */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => {
                const size = Math.random() * 3 + 1;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                return (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: size + 'px',
                      height: size + 'px',
                      left: left + '%',
                      top: top + '%',
                      opacity: Math.random() * 0.8 + 0.2,
                      animation: `twinkle ${Math.random() * 4 + 2}s infinite ease-in-out`,
                      animationDelay: `${Math.random() * 2}s`,
                      boxShadow: `0 0 ${size * 2}px rgba(255,255,255,${Math.random() * 0.5 + 0.3})`,
                    }}
                  />
                );
              })}
            </div>

            {/* 망원경 포커스 그리드 (희미하게) */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" strokeDasharray="8,8" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" strokeDasharray="8,8" />
                <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1" />
                <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" className="text-cyan-500" strokeWidth="0.5" opacity="0.3" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" className="text-cyan-500" strokeWidth="0.5" opacity="0.3" />
              </svg>
            </div>

            {/* 중앙 조준점 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full border border-cyan-400/40"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/80"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-cyan-400/60"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-cyan-400/60"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-3 bg-cyan-400/60"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-3 bg-cyan-400/60"></div>
              </div>
            </div>

            {/* 관측 대상들 (행성/별) */}
            {observations.map((obs) => {
              const isSelected = selectedObservation?.id === obs.id;
              const isHovered = hoveredObservation?.id === obs.id;
              
              // 크기 설정
              let buttonSize, offset, posX, posY;
              
              if (obs.size === 'edge') {
                // 테두리에 위치하는 경우 - 더 크게
                buttonSize = 'w-48 h-48';
                offset = 96;
                // 망원경 하단 테두리 위치 (반지름 약 40vh ≈ 280-300px)
                posX = 0;
                posY = 260;  // 테두리 근처
              } else if (obs.size === 'large') {
                buttonSize = 'w-40 h-40';
                offset = 80;
                posX = obs.posX;
                posY = obs.posY;
              } else {
                buttonSize = 'w-32 h-32';
                offset = 64;
                posX = obs.posX;
                posY = obs.posY;
              }

              return (
                <div
                  key={obs.id}
                  className={`absolute transition-all duration-700 ${
                    rotating && isSelected ? 'scale-[3] opacity-0' : 'scale-100 opacity-100'
                  }`}
                  style={{
                    left: `calc(50% + ${posX}px - ${offset}px)`,
                    top: `calc(50% + ${posY}px - ${offset}px)`,
                  }}
                >
                  <button
                    onClick={() => handleObservationSelect(obs)}
                    onMouseEnter={() => setHoveredObservation(obs)}
                    onMouseLeave={() => setHoveredObservation(null)}
                    disabled={rotating}
                    className={`relative ${buttonSize} transition-all duration-500 disabled:cursor-not-allowed outline-none border-none ${
                      isHovered ? 'scale-125' : 'scale-100'
                    }`}
                  >
                    {/* 외부 글로우 효과 (edge 타입 제외) */}
                    {obs.size !== 'edge' && (
                      <div
                        className={`absolute -inset-8 rounded-full blur-3xl bg-gradient-to-r ${obs.glowColor} transition-all duration-500 ${
                          isHovered || isSelected ? 'opacity-80 scale-150' : 'opacity-0 scale-75'
                        }`}
                      ></div>
                    )}

                    {/* 호버/선택 시 궤도 링 (edge 타입 제외) */}
                    {(isHovered || isSelected) && obs.size !== 'edge' && (
                      <div 
                        className="absolute -inset-6 rounded-full border border-dashed opacity-40 animate-spin" 
                        style={{ 
                          borderColor: obs.color.split(' ')[1].replace('to-', ''),
                          animationDuration: '20s',
                        }}
                      ></div>
                    )}

                    {/* 행성/별 본체 */}
                    <div className="relative w-full h-full">
                      {obs.type === 'planet' ? (
                        // 일반 행성
                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                          <div className={`absolute inset-0 bg-gradient-to-br ${obs.color}`}></div>
                          <div 
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 30%, rgba(0,0,0,0.4) 80%)',
                            }}
                          ></div>
                          <div className="absolute top-2 left-3 w-10 h-10 rounded-full bg-white/50 blur-md"></div>
                          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                            isHovered ? 'scale-110' : ''
                          }`}>
                            <obs.icon className="w-12 h-12 text-white drop-shadow-2xl" strokeWidth={2.5} />
                          </div>
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${obs.glowColor} opacity-20 blur-sm`}></div>
                        </div>
                      ) : obs.type === 'saturn' ? (
                        // 토성 스타일 (고리가 있는 행성)
                        <div className="relative w-full h-full">
                          {/* 행성 본체 */}
                          <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
                            <div className={`absolute inset-0 bg-gradient-to-br ${obs.color}`}></div>
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 30%, rgba(0,0,0,0.4) 80%)',
                              }}
                            ></div>
                            <div className="absolute top-2 left-3 w-10 h-10 rounded-full bg-white/50 blur-md"></div>
                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                              isHovered ? 'scale-110' : ''
                            }`}>
                              <obs.icon className="w-12 h-12 text-white drop-shadow-2xl" strokeWidth={2.5} />
                            </div>
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${obs.glowColor} opacity-20 blur-sm`}></div>
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
                                boxShadow: 'inset 0 0 20px rgba(251, 191, 36, 0.4), 0 0 15px rgba(251, 191, 36, 0.3)',
                              }}
                            ></div>
                            <div 
                              className="absolute inset-1 rounded-full border-2 opacity-40"
                              style={{
                                borderColor: 'rgba(245, 158, 11, 0.5)',
                              }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        // 성운/가스층 스타일 - 테두리에서 침범
                        <div className="relative w-full h-full">
                          {/* 침범하는 가스 촉수들 */}
                          {[...Array(12)].map((_, i) => {
                            const angle = (i * 30) - 165;  // -165도부터 165도까지 (하단 반원)
                            const distance = 80 + Math.random() * 40;
                            return (
                              <div
                                key={`tendril-${i}`}
                                className="absolute top-0 left-1/2 -translate-x-1/2 opacity-60"
                                style={{
                                  width: '4px',
                                  height: `${distance}px`,
                                  background: `linear-gradient(to bottom, 
                                    transparent 0%, 
                                    rgba(239, 68, 68, ${0.3 + Math.random() * 0.3}) 50%, 
                                    rgba(185, 28, 28, ${0.5 + Math.random() * 0.3}) 100%)`,
                                  transform: `rotate(${angle}deg) translateY(-50%)`,
                                  transformOrigin: 'top center',
                                  filter: 'blur(2px)',
                                  animation: `tendrilPulse ${3 + Math.random() * 2}s infinite ease-in-out`,
                                  animationDelay: `${Math.random() * 2}s`,
                                }}
                              />
                            );
                          })}

                          {/* 검은 기운 레이어 1 - 강함 */}
                          <div 
                            className="absolute inset-0 rounded-full animate-pulse"
                            style={{
                              background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.2) 25%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.2) 75%, transparent 100%)',
                              filter: 'blur(10px)',
                              animationDuration: '4s',
                            }}
                          ></div>
                          
                          {/* 검은 기운 레이어 2 - 중간 */}
                          <div 
                            className="absolute inset-0 rounded-full animate-pulse"
                            style={{
                              background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.15) 35%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.1) 80%, transparent 100%)',
                              filter: 'blur(14px)',
                              animationDuration: '5s',
                              animationDelay: '0.5s',
                            }}
                          ></div>
                          
                          {/* 검은 기운 레이어 3 - 약함 */}
                          <div 
                            className="absolute inset-0 rounded-full animate-pulse"
                            style={{
                              background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.2) 65%, transparent 85%)',
                              filter: 'blur(18px)',
                              animationDuration: '6s',
                              animationDelay: '1s',
                            }}
                          ></div>

                          {/* 별의 먼지 파티클들 (많이) */}
                          <div className="absolute inset-0">
                            {[...Array(20)].map((_, i) => {
                              const angle = Math.random() * 180 - 90;  // -90도 ~ 90도
                              const distance = 30 + Math.random() * 60;
                              const size = Math.random() * 2 + 0.5;
                              return (
                                <div
                                  key={i}
                                  className="absolute rounded-full bg-white"
                                  style={{
                                    width: size + 'px',
                                    height: size + 'px',
                                    left: '50%',
                                    top: '20%',
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px)`,
                                    opacity: Math.random() * 0.6 + 0.3,
                                    animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    boxShadow: `0 0 ${size * 3}px rgba(248, 113, 113, 0.8)`,
                                  }}
                                />
                              );
                            })}
                          </div>
                          
                          {/* 중앙 밝은 코어 */}
                          <div 
                            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
                            style={{
                              background: 'radial-gradient(circle, rgba(254, 226, 226, 0.95) 0%, rgba(252, 165, 165, 0.8) 30%, rgba(239, 68, 68, 0.5) 60%, transparent 100%)',
                              boxShadow: '0 0 30px rgba(239, 68, 68, 0.9), 0 0 60px rgba(220, 38, 38, 0.6)',
                              filter: 'blur(1px)',
                            }}
                          ></div>
                          
                          {/* 아이콘 */}
                          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                            isHovered ? 'scale-110' : ''
                          }`} style={{ marginTop: '-20%' }}>
                            <obs.icon className="w-16 h-16 text-white drop-shadow-2xl" strokeWidth={2.5} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 펄스 효과 (호버 시) */}
                    {isHovered && (
                      <div 
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${obs.color} opacity-30 animate-ping`}
                      ></div>
                    )}
                  </button>

                  {/* 라벨 */}
                  <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                    isHovered ? 'scale-110 opacity-100' : 'opacity-70'
                  }`}>
                    <p className={`text-sm font-bold ${obs.textColor} drop-shadow-lg`}>
                      {obs.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 망원경 렌즈 내부 테두리 빛 반사 */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08) 0%, transparent 30%)',
            }}
          ></div>
        </div>
      </div>

      {/* 하단 정보 패널 (망원경 밖의 어두운 영역) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
        {selectedObservation ? (
          <div 
            className="p-4 rounded-xl backdrop-blur-md border transition-all duration-500 transform"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              borderColor: 'rgba(71, 85, 105, 0.4)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedObservation.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                <selectedObservation.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${selectedObservation.textColor}`}>
                  {selectedObservation.name}
                </h3>
                <p className="text-xs text-slate-400">난이도: {selectedObservation.level}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              {selectedObservation.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${selectedObservation.color} animate-pulse`}></div>
              관측 데이터 수집 중...
            </div>
          </div>
        ) : (
          <div 
            className="p-4 rounded-xl backdrop-blur-md border text-center"
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              borderColor: 'rgba(71, 85, 105, 0.3)',
            }}
          >
            <p className="text-sm text-slate-400">
              🔭 망원경을 통해 관측할 천체를 선택하세요
            </p>
          </div>
        )}
      </div>

      {/* 망원경 조절 UI (좌하단) */}
      <div className="absolute bottom-8 left-8 z-50 hidden md:flex flex-col gap-3 opacity-40 hover:opacity-80 transition-opacity duration-300">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-slate-400 cursor-pointer transition-all hover:text-slate-200 hover:scale-110"
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(71, 85, 105, 0.4)',
          }}
        >
          +
        </div>
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-slate-400 cursor-pointer transition-all hover:text-slate-200 hover:scale-110"
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(71, 85, 105, 0.4)',
          }}
        >
          −
        </div>
      </div>

      {/* 망원경 정보 (우하단) */}
      <div className="absolute bottom-8 right-8 z-50 hidden md:block opacity-40 hover:opacity-80 transition-opacity duration-300">
        <div 
          className="px-4 py-2 rounded-lg text-xs text-slate-400"
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(71, 85, 105, 0.4)',
          }}
        >
          <p>배율: x250</p>
          <p className="mt-1">초점: AUTO</p>
        </div>
      </div>
    </div>
  );
};


