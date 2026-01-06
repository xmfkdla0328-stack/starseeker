import React from 'react';
import PropTypes from 'prop-types';
import { Terminal } from 'lucide-react';

/**
 * 전투 진입 버튼 - 액세스 코드 입력 컨셉
 */
export const MissionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-8 py-3 bg-slate-900/80 text-cyan-100 font-mono font-bold tracking-[0.18em] rounded-xl border border-cyan-500/40 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-[0_0_22px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-lg"
    >
      {/* 터미널 스캔 라인 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-scan"></div>

      {/* 버튼 내용 - 기본 상태 (호버/클릭 전) */}
      <div className="relative flex items-center gap-3 text-sm group-hover:opacity-0 group-active:opacity-0 transition-opacity duration-300">
        {/* 프롬프트 심볼 */}
        <Terminal size={16} className="text-cyan-400 flex-shrink-0" />
        
        {/* 코드 입력 디스플레이 */}
        <div className="flex items-center gap-2">
          <span className="text-cyan-400/70">&gt;</span>
          <span className="tracking-widest text-cyan-300">ACCESS</span>
          <span className="text-cyan-200 font-bold tracking-[0.3em]">N03L</span>
          <span className="w-2 h-4 bg-cyan-400 animate-pulse ml-1"></span>
        </div>
      </div>

      {/* 버튼 내용 - 호버/터치/클릭 시 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 text-sm">
          <Terminal size={16} className="text-cyan-400 flex-shrink-0" />
          <span className="text-cyan-400/70">&gt;</span>
          <span className="tracking-wider text-cyan-200 font-bold">관측 개시</span>
          <span className="w-2 h-4 bg-cyan-400 animate-pulse ml-1"></span>
        </div>
      </div>

      {/* 호버 시 글로우 효과 */}
      <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-all duration-300 pointer-events-none"></div>
    </button>
  );
};

MissionButton.propTypes = {
  onClick: PropTypes.func,
};
