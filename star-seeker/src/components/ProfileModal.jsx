import React, { useState, useMemo } from 'react';
import { X, Award, Sword, Users, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { getExpProgress, TITLES, getTitleById, getRarityStyles } from '../data/playerStats';

export const ProfileModal = ({ playerInfo, playerStats, mainChar, inventory, unlockedAchievements, onClose, onSelectTitle }) => {
  const expData = getExpProgress(playerInfo.level, playerInfo.exp);
  const charCount = inventory.length;
  const [showTitleSelector, setShowTitleSelector] = useState(false);
  
  // 선택된 타이틀 데이터 (메모이제이션)
  const selectedTitleData = useMemo(() => getTitleById(playerInfo.selectedTitle), [playerInfo.selectedTitle]);
  
  // 표시할 이름 (메모이제이션)
  const displayName = useMemo(() =>
    selectedTitleData 
      ? `${selectedTitleData.name} ${playerInfo.nickname}` 
      : playerInfo.nickname,
    [selectedTitleData, playerInfo.nickname]
  );

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
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/50 via-indigo-950/60 to-black/70 border border-cyan-400/15 rounded-2xl shadow-[0_0_80px_rgba(34,211,238,0.15)] overflow-hidden z-10 backdrop-blur-xl">
        
        {/* 별 입자 효과 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* 떠다니는 별들 */}
          <div className="absolute top-8 left-12 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle opacity-60"></div>
          <div className="absolute top-20 right-16 w-0.5 h-0.5 bg-blue-200 rounded-full animate-twinkle opacity-40" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-purple-300 rounded-full animate-twinkle opacity-50" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-twinkle opacity-30" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-blue-300 rounded-full animate-twinkle opacity-40" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* 우주 성운 배경 효과 - 더 부드러움 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-cyan-500/8 via-blue-600/3 to-transparent rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-purple-600/8 via-indigo-700/3 to-transparent rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-violet-600/5 via-transparent to-transparent rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none"></div>
        
        {/* 모달 헤더 */}
        <div className="relative border-b border-cyan-400/10 bg-gradient-to-r from-cyan-500/5 via-indigo-500/3 to-blue-500/5 p-6 backdrop-blur-md">
          {/* 헤더 라인 장식 */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"></div>
          
          <div className="relative flex items-center justify-between z-10">
            {/* 왼쪽: 프로필 정보 */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* 프로필 아바타 */}
              <div className="w-16 h-16 rounded-full border-2 border-cyan-300/40 bg-gradient-to-br from-cyan-500/25 to-blue-600/25 flex items-center justify-center relative overflow-hidden flex-shrink-0 group backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full border border-cyan-300/10 animate-pulse opacity-50"></div>
                <span className="text-2xl font-serif font-bold text-cyan-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] relative z-10">
                  {playerInfo.nickname[0]}
                </span>
              </div>
              
              {/* 프로필 텍스트 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {selectedTitleData && (
                    (() => {
                      const rarityStyles = getRarityStyles(selectedTitleData.rarity);
                      return (
                        <span className={`text-xs px-2.5 py-0.5 rounded-full ${rarityStyles.bg} border ${rarityStyles.border} ${rarityStyles.text} font-bold tracking-widest flex-shrink-0 backdrop-blur-sm`}>
                          ✦ {selectedTitleData.rarity.toUpperCase()}
                        </span>
                      );
                    })()
                  )}
                </div>
                <p className="text-xs text-cyan-300/70 font-serif font-semibold tracking-wider uppercase mb-1">
                  {selectedTitleData?.name}
                </p>
                <p className="text-2xl font-serif font-bold text-cyan-100 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] leading-tight">{playerInfo.nickname}</p>
                <p className="text-xs text-cyan-300/60 tracking-wider uppercase mt-2">LV {playerInfo.level} ✧ {playerInfo.totalBattles} Encounters</p>
              </div>
            </div>
            
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="p-2 text-cyan-300/50 hover:text-cyan-200 hover:bg-white/5 transition-all rounded-lg relative group flex-shrink-0"
            >
              <X size={24} />
              <div className="absolute inset-0 rounded-lg border border-cyan-300/0 group-hover:border-cyan-300/20 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.15)]"></div>
            </button>
          </div>
        </div>

        {/* 모달 내용 */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 no-scrollbar relative z-5">
          
          {/* 타이틀 선택 섹션 */}
          <div className="bg-gradient-to-br from-cyan-500/8 to-blue-600/8 border border-cyan-300/15 rounded-xl p-5 backdrop-blur-md hover:border-cyan-300/25 transition-all duration-300">
            <button
              onClick={() => setShowTitleSelector(!showTitleSelector)}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-2">
                <Star size={18} className="text-cyan-300" />
                <h3 className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Starlit Titles</h3>
              </div>
              <ChevronRight size={18} className={`text-cyan-300 transition-transform duration-300 ${showTitleSelector ? 'rotate-90' : ''}`} />
            </button>
            
            {showTitleSelector && (
              <div className="mt-4 space-y-2">
                {Object.entries(TITLES).map(([key, title]) => {
                  const isUnlocked = playerInfo.unlockedTitles?.includes(title.id) ?? false;
                  const isSelected = playerInfo.selectedTitle === title.id;
                  const rarityStyles = getRarityStyles(title.rarity);
                  
                  return (
                    <button
                      key={title.id}
                      onClick={() => {
                        if (isUnlocked && onSelectTitle) {
                          onSelectTitle(title.id);
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`w-full p-3 rounded-lg transition-all duration-300 flex items-center justify-between backdrop-blur-sm ${
                        isUnlocked
                          ? isSelected
                            ? `${rarityStyles.bg} border ${rarityStyles.border} shadow-[0_0_15px_rgba(34,211,238,0.2)]`
                            : `bg-cyan-500/8 border border-cyan-300/15 hover:border-cyan-300/30 hover:bg-cyan-500/15`
                          : 'bg-slate-700/20 border border-slate-600/20 opacity-40'
                      }`}
                    >
                      <div className="text-left">
                        <p className="text-sm font-bold text-cyan-100">{title.name}</p>
                        <p className="text-xs text-cyan-300/50 mt-0.5">{title.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${rarityStyles.bg} ${rarityStyles.text} border ${rarityStyles.border} backdrop-blur-sm`}>
                          {title.rarity.toUpperCase()}
                        </span>
                        {isSelected && <span className="text-cyan-300 text-lg">✦</span>}
                        {!isUnlocked && <span className="text-slate-500 text-lg">◇</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* 경험치 섹션 */}
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
            
            {/* 경험치 바 */}
            <div className="relative h-4 bg-black/20 rounded-full overflow-hidden border border-purple-300/15 backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                style={{ width: `${expData.progress}%` }}
              >
                {/* 움직이는 광선 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-scan"></div>
              </div>
            </div>
            <p className="text-xs text-purple-300/50 mt-2">
              {Math.round(expData.progress)}% to Level {playerInfo.level + 1}
            </p>
          </div>

          {/* 통계 카드 그리드 */}
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

          {/* 대표 캐릭터 */}
          {mainChar && (
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-300/15 rounded-xl p-5 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <Star size={18} className="text-emerald-300" />
                <h3 className="text-sm font-bold text-emerald-200 uppercase tracking-widest">Featured Ally</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-300/40 bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0 relative backdrop-blur-sm">
                  <div className="absolute inset-0 rounded-full border border-emerald-300/10 animate-pulse opacity-50"></div>
                  <span className="text-xl font-serif font-bold text-emerald-100 relative z-10">{mainChar.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-serif font-bold text-emerald-100 truncate drop-shadow-[0_0_6px_rgba(52,211,153,0.2)]">
                    {mainChar.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-emerald-300/60 flex-wrap">
                    <span>★{mainChar.rarity}</span>
                    <span>•</span>
                    <span>{mainChar.element}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-emerald-300/50 uppercase">Ultimate</span>
                      <span className="text-[10px] font-bold text-emerald-100">{mainChar.ultLevel}/5</span>
                    </div>
                    <div className="h-2 bg-black/20 rounded-full overflow-hidden border border-emerald-300/15 backdrop-blur-sm">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                        style={{ width: `${(mainChar.ultLevel / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 계정 정보 */}
          <div className="bg-gradient-to-br from-slate-700/20 to-slate-800/20 border border-slate-500/15 rounded-xl p-4 space-y-2.5 text-sm backdrop-blur-md">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-xs uppercase tracking-widest">Journey Started</span>
              <span className="text-cyan-300/60 font-mono text-xs">
                {new Date(playerInfo.joinDate).toLocaleDateString()}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-xs uppercase tracking-widest">Last Seen</span>
              <span className="text-cyan-300/60 font-mono text-xs">
                {new Date(playerInfo.lastLoginDate).toLocaleDateString()}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-xs uppercase tracking-widest">Hours Traveled</span>
              <span className="text-cyan-300/60 font-mono text-xs">
                {Math.floor(playerInfo.playtime / 60)}h {playerInfo.playtime % 60}m
              </span>
            </div>
          </div>
        </div>

        {/* 모달 하단 */}
        <div className="border-t border-cyan-300/10 bg-gradient-to-r from-cyan-500/3 via-indigo-500/2 to-blue-500/3 p-4 flex justify-end backdrop-blur-md">
          {/* 하단 라인 장식 */}
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
