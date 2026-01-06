import React, { useState } from 'react';
import { ProfileHeader } from './profile/ProfileHeader';
import { TitleSelector } from './profile/TitleSelector';
import { ExperienceSection } from './profile/ExperienceSection';
import { StatsGrid } from './profile/StatsGrid';
import { FeaturedAlly } from './profile/FeaturedAlly';
import { AccountInfo } from './profile/AccountInfo';

export const ProfileModal = ({ playerInfo, playerStats, mainChar, inventory, unlockedAchievements, onClose, onSelectTitle }) => {
  const [showTitleSelector, setShowTitleSelector] = useState(false);
  const charCount = inventory.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-[85vh] bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* 1. Header with Correct Font */}
        <div className="flex-none px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-wider font-['Orbitron']">
            관측자 프로필
          </h2>
        </div>

        {/* 2. Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <ProfileHeader playerInfo={playerInfo} onClose={onClose} />

          <TitleSelector 
            playerInfo={playerInfo}
            showTitleSelector={showTitleSelector}
            setShowTitleSelector={setShowTitleSelector}
            onSelectTitle={onSelectTitle}
          />

          <ExperienceSection playerInfo={playerInfo} />

          <StatsGrid 
            charCount={charCount}
            playerStats={playerStats}
            unlockedAchievements={unlockedAchievements || []}
          />

          {mainChar && <FeaturedAlly mainChar={mainChar} />}

          <AccountInfo playerInfo={playerInfo} />
        </div>

        {/* 3. Close Button (Placed LAST to ensure it's on top) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] p-2 bg-slate-800/80 hover:bg-red-500/80 text-cyan-300 hover:text-white rounded-full border border-white/20 transition-all duration-300 shadow-lg"
          aria-label="Close Profile"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  );
};
