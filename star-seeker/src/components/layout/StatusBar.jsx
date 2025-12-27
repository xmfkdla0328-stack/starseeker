import React, { useState } from 'react';
import { Star, Telescope, User } from 'lucide-react';

export const StatusBar = ({ gems, playerInfo, onProfileClick }) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <header className="h-14 px-4 md:px-6 flex items-center justify-between border-b border-cyan-500/20 bg-black/30 backdrop-blur-md relative z-50 shrink-0 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
      
      {/* 왼쪽: 프로필 버튼 (모바일 게임 표준) */}
      <div className="flex items-center gap-2 relative z-10 flex-shrink-0">
        {/* 프로필 클릭 버튼 */}
        <button
          onClick={onProfileClick}
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
          className="relative group px-3 py-2 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 flex items-center gap-2 rounded-lg"
        >
          {/* 배경 애니메이션 */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          
          {/* 프로필 아이콘 */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center relative z-10">
            <User size={14} className="text-white" />
          </div>
          
          {/* 닉네임 */}
          <span className="text-xs font-bold text-cyan-200 hidden sm:inline relative z-10 max-w-[80px] truncate">
            {playerInfo.nickname}
          </span>
          
          {/* 레벨 배지 */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-[10px] font-bold relative z-10">
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Lv.{playerInfo.level}</span>
          </div>
          
          {/* 호버 글로우 */}
          <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"></div>
          
          {/* 툴팁 */}
          {showHint && (
            <div className="absolute bottom-full mb-2 left-0 px-2 py-1 bg-slate-900 border border-cyan-500/30 rounded text-xs text-cyan-300 whitespace-nowrap pointer-events-none">
              Profile
            </div>
          )}
        </button>
      </div>

      {/* 가운데: 타이틀 영역 */}
      <div className="flex items-center gap-2 relative z-10 flex-1 justify-center">
         {/* 망원경 아이콘 */}
         <div className="relative group hidden sm:block">
           <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)] relative overflow-hidden">
             <Telescope className="text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.6)]" size={16} />
             {/* 스캔 라인 */}
             <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-scan"></div>
           </div>
           {/* 펄스 효과 */}
           <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
         </div>
         
         {/* 타이틀 */}
         <div className="flex flex-col text-center">
           <span className="font-serif font-bold text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-100 to-blue-200 tracking-wide drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
             Star Seeker
           </span>
           <div className="flex items-center justify-center gap-1 -mt-1">
             <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse"></div>
             <span className="text-[7px] text-cyan-400/60 tracking-widest uppercase">Observatory</span>
           </div>
         </div>
      </div>

      {/* 오른쪽: 자원 표시 */}
      <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
        {/* 별의 조각 카운터 */}
        <div className="relative group">
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 px-3 py-1.5 rounded border border-amber-400/30 shadow-inner backdrop-blur-sm">
            <Star size={14} className="text-amber-300 fill-amber-400/80 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)] animate-pulse-slow flex-shrink-0" />
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold text-amber-100 min-w-[50px] text-right tracking-wider drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]">
                {gems.toLocaleString()}
              </span>
              <span className="text-[7px] text-amber-400/60 tracking-widest leading-none">FRAG</span>
            </div>
          </div>
          {/* 호버 글로우 */}
          <div className="absolute inset-0 rounded border border-amber-400/0 group-hover:border-amber-400/40 transition-all duration-300 shadow-[0_0_0_rgba(251,191,36,0)] group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"></div>
        </div>
      </div>
      
      {/* 하단 스캔 라인 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
    </header>
  );
};
