import React from 'react';
import { User, Scroll, Lock } from 'lucide-react';

/**
 * 캐릭터 프로필 및 스토리 탭 컴포넌트
 * 기본 정보 및 인연 스토리 표시
 */
export const CharacterProfileTab = ({ charData }) => {
  return (
    <div className="space-y-6 relative z-10 animate-fade-in">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          <User size={14} /> 기본 프로필
        </h3>
        <div className="grid grid-cols-2 gap-y-2 text-xs">
          <div className="flex">
            <span className="w-16 text-slate-500">나이</span> <span className="text-slate-300">{charData.profile?.age || '불명'}</span>
          </div>
          <div className="flex">
            <span className="w-16 text-slate-500">신장</span> <span className="text-slate-300">{charData.profile?.height || '불명'}</span>
          </div>
          <div className="flex">
            <span className="w-16 text-slate-500">좋아함</span> <span className="text-slate-300">{charData.profile?.like || '-'}</span>
          </div>
          <div className="flex">
            <span className="w-16 text-slate-500">싫어함</span> <span className="text-slate-300">{charData.profile?.hate || '-'}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          <Scroll size={14} /> 인연 스토리
        </h3>
        <div className="space-y-2">
          {charData.stories?.map((story, idx) => {
            const isUnlocked = (charData.bond || 0) >= story.unlockBond;
            return (
              <div
                key={idx}
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  isUnlocked
                    ? 'bg-slate-800/50 border-white/10 cursor-pointer hover:bg-slate-700/50'
                    : 'bg-slate-950/50 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`text-sm font-bold ${isUnlocked ? 'text-slate-200' : 'text-slate-500'}`}>
                    {story.title}
                  </span>
                  <span className="text-[10px] text-slate-500">인연 레벨 {story.unlockBond} 달성 시 해금</span>
                </div>
                {!isUnlocked && <Lock size={14} className="text-slate-600" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
