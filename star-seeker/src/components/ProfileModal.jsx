import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ProfileHeader } from './profile/ProfileHeader';
import { TitleSelector } from './profile/TitleSelector';
import { ExperienceSection } from './profile/ExperienceSection';
import { StatsGrid } from './profile/StatsGrid';
import { FeaturedAlly } from './profile/FeaturedAlly';
import { AccountInfo } from './profile/AccountInfo';
import { ModalBackground } from './layout/ModalBackground';

export const ProfileModal = ({ playerInfo, playerStats, mainChar, inventory, unlockedAchievements, onClose, onSelectTitle }) => {
  const [showTitleSelector, setShowTitleSelector] = useState(false);
  const charCount = inventory.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <ModalBackground onClick={onClose} />

      {/* 모달 패널 */}
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/50 via-indigo-950/60 to-black/70 border border-cyan-400/15 rounded-2xl shadow-[0_0_80px_rgba(34,211,238,0.15)] overflow-hidden z-10 backdrop-blur-xl">
        
        {/* 별 입자 효과 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[60, 40, 32, 20, 20].map((top, idx) => (
            <div
              key={idx}
              className={`absolute w-${idx === 0 ? 1 : 0.5} h-${idx === 0 ? 1 : 0.5} bg-${['cyan-300', 'blue-200', 'purple-300', 'cyan-200', 'blue-300'][idx]} rounded-full animate-twinkle opacity-${[60, 40, 50, 30, 40][idx]}`}
              style={{
                left: ['left-12', 'right-16', 'left-1/4', 'right-1/3', 'right-20'][idx],
                top: [`${top}px`, '20px', 'bottom-32', 'top-1/3', 'bottom-20'][idx],
                animationDelay: [0, '1.5s', '3s', '2s', '4s'][idx]
              }}
            />
          ))}
        </div>
        
        {/* 우주 성운 배경 효과 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-cyan-500/8 via-blue-600/3 to-transparent rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-purple-600/8 via-indigo-700/3 to-transparent rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-violet-600/5 via-transparent to-transparent rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none"></div>
        
        {/* 모달 헤더 */}
        <ProfileHeader playerInfo={playerInfo} onClose={onClose} />

        {/* 모달 내용 */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 no-scrollbar relative z-5">
          
          {/* 타이틀 선택 */}
          <TitleSelector 
            playerInfo={playerInfo}
            showTitleSelector={showTitleSelector}
            setShowTitleSelector={setShowTitleSelector}
            onSelectTitle={onSelectTitle}
          />
          
          {/* 경험치 섹션 */}
          <ExperienceSection playerInfo={playerInfo} />

          {/* 통계 카드 그리드 */}
          <StatsGrid 
            charCount={charCount}
            playerStats={playerStats}
            unlockedAchievementsCount={unlockedAchievements.length}
          />

          {/* 대표 캐릭터 */}
          {mainChar && <FeaturedAlly mainChar={mainChar} />}

          {/* 계정 정보 */}
          <AccountInfo playerInfo={playerInfo} />
        </div>

        {/* 모달 하단 */}
        <div className="border-t border-cyan-300/10 bg-gradient-to-r from-cyan-500/3 via-indigo-500/2 to-blue-500/3 p-4 flex justify-end backdrop-blur-md">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-300/20 text-cyan-300 rounded-lg hover:border-cyan-300/50 hover:bg-cyan-500/20 transition-all duration-300 font-bold text-sm uppercase tracking-widest relative group backdrop-blur-sm"
          >
            <div className="absolute inset-0 rounded-lg border border-cyan-300/0 group-hover:border-cyan-300/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"></div>
            <span className="relative">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
