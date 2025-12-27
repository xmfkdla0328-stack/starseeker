import React from 'react';
import { Star, Telescope } from 'lucide-react';

export const StatusBar = ({ gems }) => (
  <header className="h-14 px-6 flex items-center justify-between border-b border-cyan-500/20 bg-black/30 backdrop-blur-md relative z-50 shrink-0 overflow-hidden">
    {/* 배경 효과 */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
    
    {/* 왼쪽: 로고 영역 */}
    <div className="flex items-center gap-3 relative z-10">
       {/* 망원경 아이콘 */}
       <div className="relative group">
         <div className="w-9 h-9 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)] relative overflow-hidden">
           <Telescope className="text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.6)]" size={18} />
           {/* 스캔 라인 */}
           <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-scan"></div>
         </div>
         {/* 펄스 효과 */}
         <div className="absolute inset-0 rounded-lg border border-cyan-400/20 animate-ping"></div>
       </div>
       
       {/* 타이틀 */}
       <div className="flex flex-col">
         <span className="font-serif font-bold text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-100 to-blue-200 tracking-wide drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
           Star Seeker
         </span>
         <div className="flex items-center gap-1 -mt-1">
           <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
           <span className="text-[8px] text-cyan-400/60 tracking-widest uppercase">Observatory System</span>
         </div>
       </div>
    </div>

    {/* 오른쪽: 자원 표시 */}
    <div className="flex items-center gap-4 relative z-10">
      {/* 별의 조각 카운터 */}
      <div className="relative group">
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 px-4 py-2 rounded border border-amber-400/30 shadow-inner backdrop-blur-sm">
          <Star size={16} className="text-amber-300 fill-amber-400/80 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)] animate-pulse-slow" />
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-amber-100 min-w-[60px] text-right tracking-wider drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]">
              {gems.toLocaleString()}
            </span>
            <span className="text-[8px] text-amber-400/60 tracking-wider">FRAGMENTS</span>
          </div>
        </div>
        {/* 호버 글로우 */}
        <div className="absolute inset-0 rounded border border-amber-400/0 group-hover:border-amber-400/40 transition-all duration-300 shadow-[0_0_0_rgba(251,191,36,0)] group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"></div>
      </div>
      
      {/* 우주 시간 표시기 (장식용) */}
      <div className="hidden md:flex items-center gap-1.5 text-cyan-400/40 text-[10px] font-mono">
        <div className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-pulse"></div>
        <span className="tracking-wider">SYNC</span>
      </div>
    </div>
    
    {/* 하단 스캔 라인 */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
  </header>
);