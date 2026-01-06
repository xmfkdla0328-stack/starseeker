import React from 'react';
import { Shield } from 'lucide-react';
import { rewardLabel, getRecommendedPower } from './extractionUtils';

/**
 * 스테이지 카드 컴포넌트
 */
export const StageCard = ({ stage, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-sm ${
        isSelected
          ? 'border-cyan-400/60 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 shadow-[0_0_20px_rgba(34,211,238,0.25)]'
          : 'border-white/10 bg-white/5 hover:border-cyan-300/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-cyan-200/70 font-mono tracking-widest">STAGE</div>
          <div className="text-lg font-bold text-white">{stage.name}</div>
        </div>
        <div className="flex flex-col items-end text-xs text-slate-300">
          <span>요구 레벨 {stage.level}</span>
          <span className="text-cyan-200 font-semibold">전투력 {stage.power}</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-300 flex items-center gap-2">
        <Shield className="w-4 h-4 text-cyan-300" />
        <span>추천 파티 전투력 {getRecommendedPower(stage.power)}+</span>
      </div>

      <div className="mt-4 text-xs text-slate-400 uppercase tracking-wide">보상</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {stage.rewards.map((r) => (
          <span key={r.id} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white">
            {rewardLabel[r.id] || r.id} +{r.count}
          </span>
        ))}
      </div>

      {isSelected && (
        <div className="absolute inset-0 border border-cyan-400/50 rounded-2xl pointer-events-none" />
      )}
    </button>
  );
};
