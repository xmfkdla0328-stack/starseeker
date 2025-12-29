import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ObservationBody } from './observation/ObservationBody';
import { StarField } from './observation/StarField';
import './observation/ObservationScreen.css';
import { observations as observationDefs } from '../data/observations';
import { resolveObservationLayout, LENS_CONFIG, OBS_ANIM } from '../utils/screenConfig';

/**
 * 망원경 관측 화면 (서정적 UI)
 * 어두운 우주 공간에서 망원경으로 관측하는 컨셉
 * 망원경 내부에서만 선명하게 보이는 비네팅 효과
 */
export const ObservationScreen = ({ setScreen }) => {
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [hoveredObservation, setHoveredObservation] = useState(null);
  const [rotating, setRotating] = useState(false);
  const observations = observationDefs;

  const handleObservationSelect = (obs) => {
    if (selectedObservation?.id === obs.id) {
      // 같은 버튼 재클릭 시 회전 시작
      setRotating(true);
      setTimeout(() => {
        setScreen('BATTLE');
      }, 1200);
    } else {
      // 다른 버튼 클릭 시 선택만 변경
      setSelectedObservation(obs);
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* 암흑 우주 배경 - 거의 검은색 */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-950/50 via-black to-black"></div>

      {/* 희미한 별 배경 (망원경 밖의 어두운 우주) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <StarField count={100} variant="outside" />
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
          className={`relative w-[${LENS_CONFIG.rimVH}vh] h-[${LENS_CONFIG.rimVH}vh] max-w-[100vw] max-h-[100vw]`}
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
        <div className={`relative w-[${LENS_CONFIG.viewportVH}vh] h-[${LENS_CONFIG.viewportVH}vh] max-w-[80vw] max-h-[80vw]`}>
          {/* 망원경 내부 - 우주 공간 (선명하게 보이는 영역) */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* 깊은 우주 배경 그라디언트 */}
            <div className="absolute inset-0 bg-gradient-radial from-indigo-950/80 via-slate-950 to-black"></div>

            {/* 망원경 안의 선명한 별들 */}
            <StarField count={50} variant="inside" />

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
              const { buttonSize, offset, posX, posY } = resolveObservationLayout(obs);

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
                    aria-label={obs.name}
                    aria-disabled={rotating}
                    onClick={() => handleObservationSelect(obs)}
                    onMouseEnter={() => !rotating && setHoveredObservation(obs)}
                    onMouseLeave={() => setHoveredObservation(null)}
                    disabled={rotating}
                    className={`relative ${buttonSize} transition-all duration-500 disabled:cursor-not-allowed outline-none border-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                      isHovered ? `scale-[${OBS_ANIM.hoverScale}]` : 'scale-100'
                    }`}
                  >
                    {/* 외부 글로우 효과 (edge 타입 제외) */}
                    {obs.size !== 'edge' && (
                      <div
                        className={`absolute -inset-8 rounded-full blur-3xl bg-gradient-to-r ${obs.glowColor} transition-all duration-500 ${
                          isHovered || isSelected ? `opacity-${(OBS_ANIM.glowOpacity * 100).toFixed(0)} scale-${(OBS_ANIM.glowScale * 100).toFixed(0)}` : 'opacity-0 scale-75'
                        }`}
                      ></div>
                    )}

                    {/* 호버 시 궤도 링 (edge 타입 제외) */}
                    {isHovered && obs.size !== 'edge' && (
                      <div 
                        className="absolute -inset-6 rounded-full border border-dashed opacity-40 animate-spin" 
                        style={{ 
                          borderColor: obs.color.split(' ')[1].replace('to-', ''),
                          animationDuration: `${OBS_ANIM.orbitSpinSec}s`,
                        }}
                      ></div>
                    )}

                    {/* 행성/별 본체 렌더링 */}
                    <ObservationBody obs={obs} isHovered={isHovered} />

                    {/* 펄스 효과 (호버 시) */}
                    {isHovered && (
                      <div 
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${obs.color} opacity-30`}
                        style={{
                          animation: `ping ${OBS_ANIM.pingDurationSec}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                        }}
                      ></div>
                    )}
                  </button>
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

      {/* 우측 정보 패널 (망원경 밖의 어두운 영역) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-full max-w-sm px-4 z-50">
        {selectedObservation ? (
          <div 
            className="p-4 rounded-xl backdrop-blur-md border transition-all duration-500 transform"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              borderColor: 'rgba(71, 85, 105, 0.4)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedObservation.color} shadow-lg flex-shrink-0`}></div>
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
              🔭 관측할 천체를 선택하세요
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


