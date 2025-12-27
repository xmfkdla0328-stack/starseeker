import React from 'react';
import { Users, Sword, Award } from 'lucide-react';
import { StatCard } from './StatCard';

export const StatsGrid = ({ charCount, playerStats, unlockedAchievements }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard 
        icon={Users}
        label="Characters"
        value={charCount}
        subtitle={charCount === 8 ? '◇ Complete' : `${8 - charCount} left`}
        color="cyan"
      />

      <StatCard 
        icon={Sword}
        label="Battles"
        value={playerStats.totalBattles}
        subtitle={playerStats.totalBattles > 0 
          ? `${Math.round((playerStats.totalWins / playerStats.totalBattles) * 100)}% win` 
          : 'Not started'}
        color="red"
      />

      <StatCard 
        icon={Award}
        label="Achievements"
        value={unlockedAchievements.length}
        subtitle="/ 14 total"
        color="amber"
      />
    </div>
  );
};
