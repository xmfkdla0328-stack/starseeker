import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useUI, useInventory, usePlayer } from '../context/useGameContext';
import { BackgroundStar } from './layout/BackgroundStar';
import { ProfileHeader } from './profile/ProfileHeader';
import { TitleSelector } from './profile/TitleSelector';
import { ExperienceSection } from './profile/ExperienceSection';
import { StatsGrid } from './profile/StatsGrid';
import { FeaturedAlly } from './profile/FeaturedAlly';
import { AccountInfo } from './profile/AccountInfo';

export const ProfileScreen = () => {
  const { setScreen } = useUI();
  const { inventory, mainChar } = useInventory();
  const { playerInfo, playerStats, unlockedAchievements, handleSelectTitle } = usePlayer();

  const charCount = inventory?.length ?? 0;

  return (
    <div className="relative w-full h-full overflow-hidden animate-fade-in">
      {/* 배경 별 레이어 */}
      <div className="absolute inset-0 pointer-events-none">
        <BackgroundStar size="small" color="white" position="top-10 left-20" animationDelay="0s" />
        <BackgroundStar size="small" color="cyan-100" position="top-24 right-16" animationDelay="0.8s" />
        <BackgroundStar size="medium" color="blue-200" position="bottom-24 left-1/4" animationDelay="1.2s" />
        <BackgroundStar size="large" color="cyan-200" position="bottom-32 right-1/3" animationDelay="2s" withShadow={true} />
        <BackgroundStar size="large" color="yellow-200" position="top-1/2 left-1/2" animationDelay="1.5s" withShadow={true} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-slate-900/30 to-black/60" />
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-gradient-radial from-cyan-500/12 via-blue-600/6 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[460px] h-[460px] bg-gradient-radial from-purple-600/12 via-indigo-700/8 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/4" />

      <div className="relative z-10 flex flex-col h-full">
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-end px-6 pt-6">
          <button
            onClick={() => setScreen('HOME')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300"
            aria-label="Close profile"
          >
            X
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            {/* 헤더 카드 */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-cyan-500/15 overflow-hidden">
              <ProfileHeader playerInfo={playerInfo} />
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <TitleSelector playerInfo={playerInfo} onSelectTitle={handleSelectTitle} />
                <ExperienceSection playerInfo={playerInfo} />
                <StatsGrid
                  charCount={charCount}
                  playerStats={playerStats}
                  unlockedAchievements={unlockedAchievements || []}
                />
              </div>
              <div className="space-y-4">
                {mainChar && <FeaturedAlly mainChar={mainChar} />}
                <AccountInfo playerInfo={playerInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
