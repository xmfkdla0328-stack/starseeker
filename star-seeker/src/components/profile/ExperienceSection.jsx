import React from 'react';
import { TrendingUp } from 'lucide-react';
import { getExpProgress } from '../../data/playerStats';

export const ExperienceSection = ({ playerInfo }) => {
  const expData = getExpProgress(playerInfo.level, playerInfo.exp);
  
  return (
    <div className="bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl shadow-lg shadow-cyan-500/10 p-5 backdrop-blur-md transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-cyan-400" />
          <h3 className="text-sm font-bold text-cyan-100 uppercase tracking-widest">탐사 경험치</h3>
        </div>
        <p className="text-sm font-mono text-cyan-100 font-bold">
          {expData.progressExp} / {expData.requiredExp}
        </p>
      </div>
      
      <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 backdrop-blur-md">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 transition-all duration-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.7)]"
          style={{ width: `${expData.progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan"></div>
        </div>
      </div>
      <p className="text-xs text-slate-400 font-mono mt-2">
        Lv. {playerInfo.level + 1}까지 {Math.round(expData.progress)}%
      </p>
    </div>
  );
};
