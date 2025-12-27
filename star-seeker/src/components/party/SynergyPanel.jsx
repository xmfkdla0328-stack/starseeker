import React from 'react';
import { Compass, Sparkles, Tag } from 'lucide-react';

export const SynergyPanel = ({ activeSynergies, highlightedSynergy, toggleSynergyHighlight }) => {
  return (
    <div className="w-56 bg-slate-950/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl overflow-y-auto no-scrollbar h-full shadow-xl flex flex-col shrink-0">
      <h2 className="text-yellow-100 font-bold mb-3 flex items-center gap-2 text-sm border-b border-white/10 pb-2 shrink-0">
          <Compass size={16} className="text-yellow-400"/> 활성 시너지
      </h2>
      <div className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
        {activeSynergies.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs italic text-center">태그를 조합하여<br/>효과를 발동시키세요.</div>
        ) : activeSynergies.map((syn, idx) => (
          <div 
            key={idx} 
            onClick={() => toggleSynergyHighlight(syn.name)}
            className={`p-2 rounded-lg border relative overflow-hidden cursor-pointer transition-all duration-200
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
    </div>
  );
};