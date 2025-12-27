import React from 'react';
import { Users, Sword, Award } from 'lucide-react';

export const StatsGrid = ({ charCount, playerStats, unlockedAchievements }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* 캐릭터 */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-300/15 rounded-xl p-4 backdrop-blur-md hover:border-cyan-300/25 hover:bg-cyan-500/15 transition-all duration-300 group cursor-default">
        <div className="flex items-center justify-center mb-2">
          <Users size={20} className="text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
        </div>
        <p className="text-xs text-cyan-300/60 uppercase tracking-widest text-center">Characters</p>
        <p className="text-2xl font-bold text-cyan-100 text-center drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] mt-1">
          {charCount}
        </p>
        <p className="text-[10px] text-cyan-300/40 text-center mt-1">
          {charCount === 8 ? '◇ Complete' : `${8 - charCount} left`}
        </p>
      </div>

      {/* 전투 */}
      <div className="bg-gradient-to-br from-red-500/10 to-orange-600/10 border border-red-300/15 rounded-xl p-4 backdrop-blur-md hover:border-red-300/25 hover:bg-red-500/15 transition-all duration-300 group cursor-default">
        <div className="flex items-center justify-center mb-2">
          <Sword size={20} className="text-red-300 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        </div>
        <p className="text-xs text-red-300/60 uppercase tracking-widest text-center">Battles</p>
        <p className="text-2xl font-bold text-red-100 text-center drop-shadow-[0_0_8px_rgba(239,68,68,0.3)] mt-1">
          {playerStats.totalBattles}
        </p>
        <p className="text-[10px] text-red-300/40 text-center mt-1">
          {playerStats.totalBattles > 0 
            ? `${Math.round((playerStats.totalWins / playerStats.totalBattles) * 100)}% win` 
            : 'Not started'}
        </p>
      </div>

      {/* 업적 */}
      <div className="bg-gradient-to-br from-amber-500/10 to-yellow-600/10 border border-amber-300/15 rounded-xl p-4 backdrop-blur-md hover:border-amber-300/25 hover:bg-amber-500/15 transition-all duration-300 group cursor-default">
        <div className="flex items-center justify-center mb-2">
          <Award size={20} className="text-amber-300 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        </div>
        <p className="text-xs text-amber-300/60 uppercase tracking-widest text-center">Achievements</p>
        <p className="text-2xl font-bold text-amber-100 text-center drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] mt-1">
          {unlockedAchievements.length}
        </p>
        <p className="text-[10px] text-amber-300/40 text-center mt-1">
          / 14 total
        </p>
      </div>
    </div>
  );
};
