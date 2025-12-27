import React from 'react';
import { Sword } from 'lucide-react';

/**
 * 전투 진입 버튼
 * @param {function} onClick - 클릭 핸들러
 */
export const MissionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-red-950/40 to-orange-950/40 border border-red-400/40 text-red-100 font-bold tracking-widest uppercase rounded overflow-hidden hover:border-red-300 transition-all shadow-[0_0_25px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] backdrop-blur-sm"
    >
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
      <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>

      {/* 버튼 내용 */}
      <div className="relative flex items-center gap-2 md:gap-3 text-base md:text-lg">
        <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span>
        <span className="text-sm md:text-base drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]">
          Mission Start
        </span>
        <Sword
          size={18}
          className="text-red-300 group-hover:rotate-45 transition-transform duration-300 md:w-5 md:h-5 drop-shadow-[0_0_6px_rgba(248,113,113,0.6)]"
        />
      </div>

      {/* 코너 장식 */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-400/60"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-400/60"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-400/30"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-400/30"></div>

      {/* 스캔 라인 */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-400/40 to-transparent animate-scan"></div>
    </button>
  );
};
