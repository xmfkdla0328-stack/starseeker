import React from 'react';
import { StarField } from './StarField';
import { ObservationBody } from './ObservationBody';

/**
 * 관측 화면 중앙 뷰포트 (망원경 렌즈)
 * @param {Object} props
 * @param {Object} props.selectedStage - 선택된 스테이지
 * @param {boolean} props.isTransitioning - 전환 애니메이션 상태
 */
export const ObservationViewport = ({ selectedStage, isTransitioning }) => {
  return (
    <div className="flex-1 flex items-center justify-center relative">
      {/* 중앙 원형 렌즈 */}
      <div 
        className={`relative transition-all duration-700 ease-out ${
          isTransitioning ? 'scale-110 rotate-12 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
        style={{
          width: 'min(60vw, 60vh)',
          height: 'min(60vw, 60vh)',
        }}
      >
        {/* 외부 링 프레임 */}
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20" />
        <div className="absolute -inset-2 rounded-full border border-cyan-400/20" />
        
        {/* 렌즈 내부 */}
        <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-radial from-indigo-950/80 via-slate-950 to-black shadow-inner">
          {/* 배경 별 */}
          <StarField count={80} variant="inside" />
          
          {/* 포커스 그리드 */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" strokeDasharray="8,8" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" strokeDasharray="8,8" />
              <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1" />
              <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" className="text-cyan-500" strokeWidth="0.5" opacity="0.3" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" className="text-cyan-500" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>

          {/* 중앙 조준점 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border border-cyan-400/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/80" />
            </div>
          </div>

          {/* 선택된 스테이지 비주얼 */}
          {selectedStage && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className={`transition-all duration-500 ${
                isTransitioning ? 'scale-50 opacity-0 rotate-180' : 'scale-100 opacity-100 rotate-0'
              }`}>
                {/* 외부 글로우 */}
                <div className={`absolute -inset-16 rounded-full blur-3xl bg-gradient-to-r ${selectedStage.glowColor} opacity-60`} />
                
                {/* 행성/별 본체 */}
                <div className="relative">
                  <ObservationBody obs={selectedStage} isHovered={false} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 렌즈 반사광 효과 */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* 스캔 라인 효과 */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan" />
      </div>
    </div>
  );
};
