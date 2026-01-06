import React from 'react';
import { Users, Sword, Award } from 'lucide-react';
import { StatCard } from './StatCard';

export const StatsGrid = ({ charCount, playerStats, unlockedAchievements }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard 
        icon={Users}
        label="수집 달성률"
        value={charCount}
        subtitle={charCount === 8 ? '◇ 완료' : `${8 - charCount}명 남음`}
        color="cyan"
      />

      <StatCard 
        icon={Sword}
        label="총 전투"
        value={playerStats.totalBattles}
        subtitle={playerStats.totalBattles > 0 
          ? `${Math.round((playerStats.totalWins / playerStats.totalBattles) * 100)}% 승률` 
          : '미시작'}
        color="red"
      />

      <StatCard 
        icon={Award}
        label="업적"
        value={unlockedAchievements.length}
        subtitle="/ 14개"
        color="amber"
      />
    </div>
  );
};
