import React from 'react';
import { Terminal } from 'lucide-react';

/**
 * 전투 진입 버튼 - 액세스 코드 입력 컨셉
 * @param {function} onClick - 클릭 핸들러
 */
export const MissionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-6 py-3 bg-black/60 border border-green-500/40 text-green-400 font-mono rounded overflow-hidden hover:border-green-400/80 hover:bg-black/80 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] backdrop-blur-sm"
    >
      {/* 터미널 스캔 라인 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan"></div>

      {/* 버튼 내용 */}
      <div className="relative flex items-center gap-3 text-sm">
        {/* 프롬프트 심볼 */}
        <Terminal size={16} className="text-green-500 flex-shrink-0" />
        
        {/* 코드 입력 디스플레이 */}
        <div className="flex items-center gap-2">
          <span className="text-green-500/60">&gt;</span>
          <span className="tracking-widest">ACCESS</span>
          <span className="text-green-300 font-bold tracking-[0.3em]">N03L</span>
          <span className="w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
        </div>
      </div>

      {/* 호버 시 글로우 효과 */}
      <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-all duration-300"></div>
      
      {/* 하단 라벨 */}
      <div className="absolute -bottom-5 left-0 right-0 text-center">
        <span className="text-[8px] text-green-500/40 font-mono tracking-wider">관측 개시</span>
      </div>
    </button>
  );
};
