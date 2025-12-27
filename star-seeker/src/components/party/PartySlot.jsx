import React from 'react';
import { Sparkles } from 'lucide-react';
import { ELEMENTS } from '../../constants'; // 경로 주의 (../../)

export const PartySlot = ({ char, line, idx, removeChar, setSelectedSlot, highlightedSynergy }) => {
  // 하이라이트 관련 상태 계산
  const isSynergyActive = highlightedSynergy !== null;
  const isMatch = char && isSynergyActive && char.tags.includes(highlightedSynergy);
  const isDimmed = isSynergyActive && !isMatch; // 시너지 보는 중인데 해당 안되면 흐리게

  return (
    <div onClick={() => char ? removeChar(line, idx) : setSelectedSlot({line, index: idx})}
      className={`aspect-[3/4] rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden group w-full
        ${char ? `border-cyan-400/40 bg-slate-900/60 backdrop-blur-sm` : 'border-dashed border-slate-700/50 hover:bg-white/5 hover:border-slate-500/50'}
        ${isMatch ? 'ring-2 ring-yellow-400 scale-105 z-10 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : ''}
        ${isDimmed ? 'opacity-20 grayscale scale-95' : ''}
      `}>
      {char ? (
        <>
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent"></div>
          <div className="text-xs text-cyan-200 font-bold z-10 flex flex-col items-center text-center leading-tight">
              {char.name}
              <span className="text-[9px] text-slate-400 font-normal opacity-70 mt-0.5 scale-90">{char.role === 'BOTH' ? '만능' : (char.role==='FRONT'?'전열':'후열')}</span>
          </div>
          {/* 태그 표시 */}
          <div className="flex gap-0.5 mt-1 absolute bottom-2 items-center">
             {isMatch ? (
               <span className="text-[8px] bg-yellow-500 text-black px-1 rounded-sm font-bold flex items-center gap-0.5 animate-bounce-slight">
                 <Sparkles size={8}/> {highlightedSynergy}
               </span>
             ) : (
               char.tags.map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-slate-500"></div>)
             )}
          </div>
        </>
      ) : (
        <span className={`text-slate-600 text-lg ${isDimmed ? 'opacity-10' : 'opacity-50'}`}>+</span>
      )}
    </div>
  );
};