import React from 'react';
import { ChevronLeft } from 'lucide-react';

/**
 * 관측 화면 상단 헤더 컴포넌트
 * @param {Object} props
 * @param {Function} props.onBackClick - 뒤로가기 클릭 핸들러
 */
export const ObservationHeader = ({ onBackClick }) => {
  return (
    <div className="relative z-50 px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 border-b border-white/10 backdrop-blur-xl bg-slate-900/40">
      <button
        onClick={onBackClick}
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="text-lg md:text-2xl font-serif font-bold bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 text-transparent tracking-wider truncate">
          우주 망원경 제어실
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 tracking-widest font-mono">DEEP SPACE OBSERVATION SYSTEM</p>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-xs text-cyan-400/60 tracking-wider font-mono">STATUS</div>
        <div className="text-sm text-green-400 font-bold font-mono">● OPERATIONAL</div>
      </div>
    </div>
  );
};
