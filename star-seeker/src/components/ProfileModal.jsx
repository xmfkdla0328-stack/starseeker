import React, { useState } from 'react';
import { X, Award, Sword, Users, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { getExpProgress, TITLES } from '../data/playerStats';

export const ProfileModal = ({ playerInfo, playerStats, mainChar, inventory, unlockedAchievements, onClose, onSelectTitle }) => {
  const expData = getExpProgress(playerInfo.level, playerInfo.exp);
  const charCount = inventory.length;
  const [showTitleSelector, setShowTitleSelector] = useState(false);
  
  const selectedTitleData = TITLES[playerInfo.selectedTitle?.toUpperCase().replace(/([A-Z])/g, '_$1').substring(1) || 'OPEN_BETA_PIONEER'];
  const displayName = selectedTitleData 
    ? `${selectedTitleData.name} ${playerInfo.nickname}` 
    : playerInfo.nickname;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* 배경 오버레이 - 우주 효과 */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-slate-950/80 to-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        {/* 별 배경 효과 */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"></div>
          <div className="absolute top-40 right-40 w-0.5 h-0.5 bg-blue-200 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-purple-200 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* 모달 패널 */}
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/95 via-indigo-950/80 to-black/95 border border-cyan-500/25 rounded-xl shadow-[0_0_60px_rgba(34,211,238,0.2)] overflow-hidden z-10">
        
        {/* 성운 배경 효과 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-blue-600/5 to-transparent rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-purple-600/10 via-indigo-700/5 to-transparent rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
        
        {/* 모달 헤더 */}
        <div className="relative border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-blue-500/10 p-6 backdrop-blur-sm">
          {/* 헤더 라인 장식 */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
          
          <div className="relative flex items-center justify-between z-10">
            {/* 왼쪽: 프로필 정보 */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* 프로필 아바타 */}
              <div className="w-16 h-16 rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center relative overflow-hidden flex-shrink-0 group">
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping opacity-75"></div>
                <span className="text-2xl font-bold text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] relative z-10">
                  {playerInfo.nickname[0]}
                </span>
              </div>
              
              {/* 프로필 텍스트 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {selectedTitleData && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-500/30 text-amber-300 font-bold tracking-widest flex-shrink-0">
                      {selectedTitleData.rarity.toUpperCase()}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] truncate">
                  {displayName}
                </h2>
                <p className="text-xs text-cyan-400/70 tracking-widest uppercase mt-1">LV {playerInfo.level} • {playerInfo.totalBattles} Battles</p>
              </div>
            </div>
            
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="p-2 text-cyan-400/60 hover:text-cyan-300 hover:bg-white/5 transition-all rounded-lg relative group flex-shrink-0"
            >
              <X size={24} />
              <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]"></div>
            </button>
          </div>
        </div>

        {/* 모달 내용 */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 no-scrollbar relative z-5">
          
          {/* 타이틀 선택 섹션 */}
          <div className="bg-gradient-to-br from-amber-500/15 to-yellow-600/15 border border-amber-500/25 rounded-lg p-5 backdrop-blur-sm">
            <button
              onClick={() => setShowTitleSelector(!showTitleSelector)}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-2">
                <Star size={18} className="text-amber-400" />
                <h3 className="text-sm font-bold text-amber-200 uppercase tracking-widest">Title Collection</h3>
              </div>
              <ChevronRight size={18} className={`text-amber-400 transition-transform duration-300 ${showTitleSelector ? 'rotate-90' : ''}`} />
            </button>
            
            {showTitleSelector && (
              <div className="mt-4 space-y-2">
                {Object.entries(TITLES).map(([key, title]) => {
                  const isUnlocked = playerInfo.unlockedTitles?.includes(title.id) ?? false;
                  const isSelected = playerInfo.selectedTitle === title.id;
                  
                  return (
                    <button
                      key={title.id}
                      onClick={() => {
                        if (isUnlocked && onSelectTitle) {
                          onSelectTitle(title.id);
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`w-full p-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                        isUnlocked
                          ? isSelected
                            ? 'bg-amber-500/30 border border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                            : 'bg-amber-500/15 border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/25'
                          : 'bg-slate-800/30 border border-slate-700/30 opacity-50'
                      }`}
                    >
                      <div className="text-left">
                        <p className="text-sm font-bold text-amber-200">{title.name}</p>
                        <p className="text-xs text-amber-400/60 mt-0.5">{title.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          title.rarity === 'legendary'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : title.rarity === 'epic'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {title.rarity.toUpperCase()}
                        </span>
                        {isSelected && <span className="text-amber-300 text-lg">✓</span>}
                        {!isUnlocked && <span className="text-slate-500 text-lg">🔒</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* 경험치 섹션 */}
          <div className="bg-gradient-to-br from-purple-500/15 to-indigo-600/15 border border-purple-500/25 rounded-lg p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-purple-400" />
                <h3 className="text-sm font-bold text-purple-200 uppercase tracking-widest">Experience</h3>
              </div>
              <p className="text-sm font-mono text-purple-300">
                {expData.progressExp} / {expData.requiredExp}
              </p>
            </div>
            
            {/* 경험치 바 */}
            <div className="relative h-4 bg-black/30 rounded-full overflow-hidden border border-purple-500/20">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 transition-all duration-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                style={{ width: `${expData.progress}%` }}
              >
                {/* 움직이는 광선 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan"></div>
              </div>
            </div>
            <p className="text-xs text-purple-400/60 mt-2">
              {Math.round(expData.progress)}% to Level {playerInfo.level + 1}
            </p>
          </div>

          {/* 통계 카드 그리드 */}
          <div className="grid grid-cols-3 gap-3">
            {/* 캐릭터 */}
            <div className="bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border border-cyan-500/25 rounded-lg p-4 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 group cursor-default">
              <div className="flex items-center justify-center mb-2">
                <Users size={20} className="text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              </div>
              <p className="text-xs text-cyan-400/70 uppercase tracking-widest text-center">Characters</p>
              <p className="text-2xl font-bold text-cyan-200 text-center drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] mt-1">
                {charCount}
              </p>
              <p className="text-[10px] text-cyan-400/50 text-center mt-1">
                {charCount === 8 ? '✓ Complete' : `${8 - charCount} left`}
              </p>
            </div>

            {/* 전투 */}
            <div className="bg-gradient-to-br from-red-500/15 to-orange-600/15 border border-red-500/25 rounded-lg p-4 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 group cursor-default">
              <div className="flex items-center justify-center mb-2">
                <Sword size={20} className="text-red-400 group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
              </div>
              <p className="text-xs text-red-400/70 uppercase tracking-widest text-center">Battles</p>
              <p className="text-2xl font-bold text-red-200 text-center drop-shadow-[0_0_8px_rgba(248,113,113,0.3)] mt-1">
                {playerStats.totalBattles}
              </p>
              <p className="text-[10px] text-red-400/50 text-center mt-1">
                {playerStats.totalBattles > 0 
                  ? `${Math.round((playerStats.totalWins / playerStats.totalBattles) * 100)}% win` 
                  : 'Not started'}
              </p>
            </div>

            {/* 업적 */}
            <div className="bg-gradient-to-br from-amber-500/15 to-yellow-600/15 border border-amber-500/25 rounded-lg p-4 backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300 group cursor-default">
              <div className="flex items-center justify-center mb-2">
                <Award size={20} className="text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              </div>
              <p className="text-xs text-amber-400/70 uppercase tracking-widest text-center">Achievements</p>
              <p className="text-2xl font-bold text-amber-200 text-center drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] mt-1">
                {unlockedAchievements.length}
              </p>
              <p className="text-[10px] text-amber-400/50 text-center mt-1">
                / 14 total
              </p>
            </div>
          </div>

          {/* 대표 캐릭터 */}
          {mainChar && (
            <div className="bg-gradient-to-br from-emerald-500/15 to-green-600/15 border border-emerald-500/25 rounded-lg p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star size={18} className="text-emerald-400" />
                <h3 className="text-sm font-bold text-emerald-200 uppercase tracking-widest">Main Character</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0 relative">
                  <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-pulse"></div>
                  <span className="text-xl font-bold text-emerald-300 relative z-10">{mainChar.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-emerald-200 truncate drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]">
                    {mainChar.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-emerald-400/70 flex-wrap">
                    <span>★{mainChar.rarity}</span>
                    <span>•</span>
                    <span>{mainChar.element}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-emerald-400/60 uppercase">Ultimate</span>
                      <span className="text-[10px] font-bold text-emerald-300">{mainChar.ultLevel}/5</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden border border-emerald-500/20">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                        style={{ width: `${(mainChar.ultLevel / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 계정 정보 */}
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 space-y-2.5 text-sm backdrop-blur-sm">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs uppercase tracking-widest">Account Created</span>
              <span className="text-cyan-300/70 font-mono text-xs">
                {new Date(playerInfo.joinDate).toLocaleDateString()}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent"></div>
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs uppercase tracking-widest">Last Login</span>
              <span className="text-cyan-300/70 font-mono text-xs">
                {new Date(playerInfo.lastLoginDate).toLocaleDateString()}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent"></div>
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs uppercase tracking-widest">Play Time</span>
              <span className="text-cyan-300/70 font-mono text-xs">
                {playerInfo.playtime} min
              </span>
            </div>
          </div>
        </div>

        {/* 모달 하단 */}
        <div className="border-t border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-blue-500/10 p-4 flex justify-end backdrop-blur-sm">
          {/* 하단 라인 장식 */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 text-cyan-300 rounded-lg hover:border-cyan-400/70 hover:bg-cyan-500/30 transition-all duration-300 font-bold text-sm uppercase tracking-widest relative group"
          >
            <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>
            <span className="relative">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
