import React from 'react';
import { X, Award, Sword, Users } from 'lucide-react';
import { getExpProgress } from '../data/playerStats';

export const ProfileModal = ({ playerInfo, playerStats, mainChar, inventory, unlockedAchievements, onClose }) => {
  const expData = getExpProgress(playerInfo.level, playerInfo.exp);
  const charCount = inventory.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* 모달 패널 */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-black/90 border border-cyan-500/30 rounded-lg shadow-[0_0_50px_rgba(34,211,238,0.3)] overflow-hidden z-10">
        
        {/* 모달 헤더 */}
        <div className="relative border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6">
          {/* 배경 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-blue-400/5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                <span className="text-lg font-bold text-cyan-300">{playerInfo.nickname[0]}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  {playerInfo.nickname}
                </h2>
                <p className="text-xs text-cyan-400/60 tracking-widest uppercase">Observer Profile</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-cyan-400/60 hover:text-cyan-300 transition-colors rounded-lg hover:bg-white/5"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* 모달 내용 */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 no-scrollbar">
          
          {/* 레벨 및 경험치 */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-1">Level</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
                  {playerInfo.level}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-1">Experience</p>
                <p className="text-lg font-mono text-purple-200">
                  {expData.progressExp} / {expData.requiredExp}
                </p>
              </div>
            </div>
            
            {/* 경험치 바 */}
            <div className="relative h-3 bg-black/40 rounded-full overflow-hidden border border-purple-500/20">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                style={{ width: `${expData.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-purple-400/60 mt-2 text-right">
              {Math.round(expData.progress)}% to next level
            </p>
          </div>

          {/* 기본 정보 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* 캐릭터 수 */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-cyan-400" />
                <p className="text-xs text-cyan-400/70 uppercase tracking-widest">Characters</p>
              </div>
              <p className="text-3xl font-bold text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                {charCount}
              </p>
              <p className="text-xs text-cyan-400/50 mt-1">
                / {charCount === 8 ? 'Complete' : '8 max'}
              </p>
            </div>

            {/* 전투 횟수 */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sword size={16} className="text-red-400" />
                <p className="text-xs text-red-400/70 uppercase tracking-widest">Battles</p>
              </div>
              <p className="text-3xl font-bold text-red-200 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]">
                {playerStats.totalBattles}
              </p>
              <p className="text-xs text-red-400/50 mt-1">
                {playerStats.totalBattles > 0 
                  ? `${Math.round((playerStats.totalWins / playerStats.totalBattles) * 100)}% win` 
                  : 'Not started'}
              </p>
            </div>

            {/* 업적 수 */}
            <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award size={16} className="text-amber-400" />
                <p className="text-xs text-amber-400/70 uppercase tracking-widest">Achievements</p>
              </div>
              <p className="text-3xl font-bold text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                {unlockedAchievements.length}
              </p>
              <p className="text-xs text-amber-400/50 mt-1">
                / 14 total
              </p>
            </div>
          </div>

          {/* 대표 캐릭터 */}
          {mainChar && (
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg p-4">
              <p className="text-xs text-emerald-400/70 uppercase tracking-widest mb-3">Main Character</p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-emerald-300">{mainChar.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-emerald-200 truncate">{mainChar.name}</h4>
                  <p className="text-sm text-emerald-400/60 mb-1">
                    {mainChar.rarity}⭐ • {mainChar.element}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-300">
                      Ult: {mainChar.ultLevel}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 계정 정보 */}
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Account Created</span>
              <span className="text-cyan-300/70 font-mono">
                {new Date(playerInfo.joinDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Last Login</span>
              <span className="text-cyan-300/70 font-mono">
                {new Date(playerInfo.lastLoginDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Play Time</span>
              <span className="text-cyan-300/70 font-mono">
                {playerInfo.playtime} min
              </span>
            </div>
          </div>
        </div>

        {/* 모달 하단 */}
        <div className="border-t border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
