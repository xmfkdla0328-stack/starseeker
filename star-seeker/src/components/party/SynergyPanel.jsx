import React from 'react';
import { Compass, Sparkles, Tag, Wand2, Sword } from 'lucide-react';

export const SynergyPanel = ({ activeSynergies, highlightedSynergy, toggleSynergyHighlight, handleAutoParty, onStartBattle }) => {
  return (
    <div className="w-full md:w-56 md:min-w-56 bg-slate-950/60 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-xl overflow-hidden min-h-0 shadow-xl flex flex-col shrink-0">
      
      {/* 헤더 */}
      <h2 className="text-yellow-100 font-bold mb-2 flex items-center justify-between text-xs md:text-sm border-b border-white/10 pb-1.5 shrink-0">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-yellow-400"/> 활성 시너지
          </div>
      </h2>

      {/* 시너지 목록 - 스크롤 적용 */}
      <div className="flex-1 min-h-0 mb-2 overflow-hidden flex flex-col">
        <div className="space-y-1 md:space-y-1.5 overflow-y-auto no-scrollbar flex-1">
          {activeSynergies.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs italic text-center">태그를 조합하여<br/>효과를 발동시키세요.</div>
          ) : activeSynergies.map((syn, idx) => (
            <div 
              key={idx} 
              onClick={() => toggleSynergyHighlight(syn.name)}
              className={`p-1 md:p-1.5 rounded-lg border relative overflow-hidden cursor-pointer transition-all duration-200
                ${highlightedSynergy === syn.name 
                  ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)] scale-105' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}
              `}
            >
              <div className="flex justify-between items-center mb-0.5">
                <span className={`font-bold text-[10px] flex items-center gap-1 ${highlightedSynergy === syn.name ? 'text-yellow-400' : 'text-yellow-200'}`}>
                  <Sparkles size={10} className={highlightedSynergy === syn.name ? 'animate-spin' : ''}/> 
                  {syn.name} 
                  <span className="text-slate-400 text-[9px] font-normal">({syn.count})</span>
                </span>
              </div>
              <p className="text-slate-300 text-[9px] pl-2 border-l-2 border-yellow-500/30">{syn.effect}</p>
              
              {highlightedSynergy !== syn.name && (
                <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Tag size={12} className="text-slate-500"/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 그룹 */}
      <div className="flex flex-col gap-2 shrink-0">
        {/* ★ 자동 편성 버튼 */}
        <button 
          onClick={handleAutoParty}
          className="w-full py-2.5 bg-gradient-to-r from-yellow-600/30 to-amber-600/30 hover:from-yellow-600/50 hover:to-amber-600/50 active:scale-95 text-yellow-200 text-xs md:text-sm font-bold rounded-lg border border-yellow-400/40 hover:border-yellow-400/60 transition-all flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(250,204,21,0.15)] hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] backdrop-blur-sm"
        >
          <Wand2 size={16} className="text-yellow-300" /> 자동 파티 편성
        </button>

        {/* ★ 전투 개시 버튼 */}
        <button 
          onClick={onStartBattle}
          className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-600/40 to-blue-600/40 hover:from-cyan-600/60 hover:to-blue-600/60 active:scale-95 text-cyan-100 text-sm md:text-base font-bold rounded-lg transition-all flex items-center justify-center gap-2 border border-cyan-400/50 hover:border-cyan-400/80 shadow-[0_4px_16px_rgba(34,211,238,0.3)] hover:shadow-[0_6px_20px_rgba(34,211,238,0.5)] uppercase tracking-wider group backdrop-blur-sm"
        >
          <Sword size={18} className="group-hover:rotate-45 transition-transform" />
          <span className="relative z-10">관측 개시</span>
        </button>
      </div>

    </div>
  );
};