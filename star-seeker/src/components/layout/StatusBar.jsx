import React from 'react';
import { Star } from 'lucide-react';

export const StatusBar = ({ gems }) => (
  <header className="h-14 px-6 flex items-center justify-between border-b border-white/10 bg-slate-950/50 backdrop-blur-md relative z-50 shrink-0">
    <div className="flex items-center gap-2">
       <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-3 border border-white/20">
         <Star className="text-white fill-white" size={16} />
       </div>
       <span className="font-serif font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
         Star Seeker
       </span>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-yellow-500/30 shadow-inner">
        <Star size={14} className="text-yellow-400 fill-yellow-400 animate-pulse-slow" />
        <span className="text-sm font-bold text-yellow-100 min-w-[60px] text-right">{gems.toLocaleString()}</span>
      </div>
    </div>
  </header>
);