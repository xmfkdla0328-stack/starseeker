import React from 'react';
import { TrendingUp } from 'lucide-react';
import { getExpProgress } from '../../data/playerStats';

export const ExperienceSection = ({ playerInfo }) => {
  const expData = getExpProgress(playerInfo.level, playerInfo.exp);
  
  return (
    <div className="bg-gradient-to-br from-purple-500/8 to-violet-600/8 border border-purple-300/15 rounded-xl p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-purple-300" />
          <h3 className="text-sm font-bold text-purple-200 uppercase tracking-widest">Journey</h3>
        </div>
        <p className="text-sm font-mono text-purple-300">
          {expData.progressExp} / {expData.requiredExp}
        </p>
      </div>
      
      <div className="relative h-4 bg-black/20 rounded-full overflow-hidden border border-purple-300/15 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.5)]"
          style={{ width: `${expData.progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-scan"></div>
        </div>
      </div>
      <p className="text-xs text-purple-300/50 mt-2">
        {Math.round(expData.progress)}% to Level {playerInfo.level + 1}
      </p>
    </div>
  );
};
