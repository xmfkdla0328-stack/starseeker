import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * 전투 진입 버튼
 * @param {function} onClick - 클릭 핸들러
 */
export const MissionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-8 py-3.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 text-cyan-100 font-semibold rounded-lg overflow-hidden hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 backdrop-blur-md"
    >
      {/* 버튼 내용 */}
      <div className="relative flex items-center gap-2 text-base">
        <span className="tracking-wide">
          관측 개시
        </span>
        <ChevronRight
          size={18}
          className="text-cyan-400 group-hover:translate-x-1 transition-transform duration-300"
        />
      </div>

      {/* 호버 시 빛나는 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/10 transition-all duration-500"></div>
    </button>
  );
};
