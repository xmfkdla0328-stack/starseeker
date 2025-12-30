import React from 'react';
import { Telescope } from 'lucide-react';

/**
 * 전투 진입 버튼
 * @param {function} onClick - 클릭 핸들러
 */
export const MissionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-cyan-950/40 border-2 border-cyan-400/40 text-cyan-100 font-bold tracking-[0.3em] uppercase rounded-lg overflow-hidden hover:border-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] backdrop-blur-sm"
    >
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
      <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>

      {/* 스캔 라인 효과 */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan"></div>

      {/* 버튼 내용 */}
      <div className="relative flex items-center gap-3 md:gap-4 text-base md:text-lg">
        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
        <span className="text-sm md:text-base drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
          관측 개시
        </span>
        <Telescope
          size={20}
          className="text-cyan-300 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 md:w-6 md:h-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        />
      </div>

      {/* 코너 장식 */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400/40"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-400/40"></div>

      {/* 글로우 오버레이 */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-cyan-400/0 via-transparent to-cyan-400/0 group-hover:from-cyan-400/10 group-hover:to-cyan-400/10 transition-all duration-300"></div>
    </button>
  );
};
