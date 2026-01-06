import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * 게임 타이틀 헤더
 */
export const GameTitle = () => {
  return (
    <div className="w-full text-center md:text-left z-20 pointer-events-none shrink-0 relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-200 drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] relative">
        Star Seeker
        {/* 별 장식 */}
        <Sparkles className="inline-block ml-2 text-cyan-300 w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 animate-pulse-slow" />
      </h1>
      <div className="flex items-center justify-center md:justify-start gap-2 mt-1 md:mt-2">
        <div className="w-6 sm:w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        <p className="text-cyan-400/70 text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] uppercase opacity-80">
          Beyond the Horizon
        </p>
        <div className="w-6 sm:w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      </div>
      {/* 스캔 라인 효과 */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-scan"></div>
    </div>
  );
};
