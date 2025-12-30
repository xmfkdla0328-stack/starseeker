import React from 'react';
import { Compass, Sparkles, Tag, Wand2, Sword } from 'lucide-react';

export const SynergyPanel = ({ activeSynergies, highlightedSynergy, toggleSynergyHighlight, handleAutoParty, onStartBattle }) => {
  return (
    <div className="w-full md:w-56 md:min-w-56 bg-slate-950/60 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-xl overflow-hidden min-h-0 shadow-xl flex flex-col shrink-0">
      
      {/* 헤더 */}
      <h2 className="text-yellow-100 font-bold mb-2 md:mb-3 flex items-center justify-between text-xs md:text-sm border-b border-white/10 pb-1.5 md:pb-2 shrink-0">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-yellow-400"/> 활성 시너지
          </div>
      </h2>

      {/* 시너지 목록 (flex-1로 남은 공간 차지) */}
      <div className="space-y-1.5 md:space-y-2 flex-1 overflow-y-auto no-scrollbar mb-2 md:mb-3">
        {activeSynergies.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs italic text-center">태그를 조합하여<br/>효과를 발동시키세요.</div>
        ) : activeSynergies.map((syn, idx) => (
          <div 
            key={idx} 
            onClick={() => toggleSynergyHighlight(syn.name)}
            className={`p-1.5 md:p-2 rounded-lg border relative overflow-hidden cursor-pointer transition-all duration-200
              ${highlightedSynergy === syn.name 
                ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)] scale-105' 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}
            `}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`font-bold text-xs flex items-center gap-1 ${highlightedSynergy === syn.name ? 'text-yellow-400' : 'text-yellow-200'}`}>
                <Sparkles size={10} className={highlightedSynergy === syn.name ? 'animate-spin' : ''}/> 
                {syn.name} 
                <span className="text-slate-400 text-[10px] font-normal">({syn.count})</span>
              </span>
            </div>
            <p className="text-slate-300 text-[10px] pl-2 border-l-2 border-yellow-500/30">{syn.effect}</p>
            
            {highlightedSynergy !== syn.name && (
              <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tag size={12} className="text-slate-500"/>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 버튼 그룹 */}
      <div className="flex flex-col md:flex-row xl:flex-col gap-1.5 md:gap-2 shrink-0">
        {/* ★ 자동 편성 버튼 (전투 버튼 위로 이동) */}
        <button 
          onClick={handleAutoParty}
          className="flex-1 md:flex-none py-1.5 md:py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 text-[10px] font-bold rounded border border-slate-600 transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Wand2 size={12} className="text-indigo-400" /> 자동 파티 편성
        </button>

        {/* ★ 전투 개시 버튼 */}
        <button 
          onClick={onStartBattle}
          className="flex-1 md:flex-none py-2 md:py-3 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 active:scale-95 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 border border-red-400 shadow-[0_4px_12px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_16px_rgba(220,38,38,0.5)] uppercase tracking-wider group"
        >
          <span className="relative z-10 flex items-center gap-2">
              전투 개시 <Sword size={14} className="group-hover:rotate-45 transition-transform"/>
          </span>
        </button>
      </div>

    </div>
  );
};