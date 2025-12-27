import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * 게임 타이틀 헤더
 */
export const GameTitle = () => {
  return (
    <div className="w-full text-center z-20 pointer-events-none shrink-0 relative">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] relative">
        Star Seeker
        {/* 별 장식 */}
        <Sparkles className="inline-block ml-2 text-cyan-300 w-6 h-6 md:w-8 md:h-8 animate-pulse-slow" />
      </h1>
      <div className="flex items-center justify-center gap-2 mt-1 md:mt-2">
        <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        <p className="text-cyan-400/70 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase opacity-80">
          Beyond the Horizon
        </p>
        <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      </div>
      {/* 스캔 라인 효과 */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-scan"></div>
    </div>
  );
};
