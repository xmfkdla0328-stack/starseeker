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
      className="group relative px-6 py-3 bg-white/10 border border-cyan-400/30 text-cyan-300 font-mono rounded overflow-hidden hover:border-cyan-400/60 hover:bg-white/15 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-md"
    >
      {/* 터미널 스캔 라인 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-scan"></div>

      {/* 버튼 내용 */}
      <div className="relative flex items-center gap-3 text-sm">
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

      {/* 호버 시 글로우 효과 */}
      <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-all duration-300"></div>
      
      {/* 하단 라벨 */}
      <div className="absolute -bottom-5 left-0 right-0 text-center">
        <span className="text-[8px] text-cyan-400/50 font-mono tracking-wider">관측 개시</span>
      </div>
    </button>
  );
};

MissionButton.propTypes = {
  onClick: PropTypes.func,
};
