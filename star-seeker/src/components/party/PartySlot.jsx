import React from 'react';
import { Sparkles } from 'lucide-react';
import { ElementIcon } from '../common/ElementIcon';

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

          {/* 속성 아이콘 배지 */}
          <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 p-1 sm:p-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm shadow-sm">
            <ElementIcon element={char.element} size={10} className="sm:w-[12px] sm:h-[12px] md:w-[14px] md:h-[14px]" />
          </div>

          <div className="text-[10px] sm:text-xs md:text-xs lg:text-xs text-cyan-200 font-bold z-10 flex flex-col items-center text-center leading-tight">
              {char.name}
              <span className="text-[7px] sm:text-[8px] md:text-[9px] text-slate-400 font-normal opacity-70 mt-0.5">{char.role === 'BOTH' ? '만능' : (char.role==='FRONT'?'전열':'후열')}</span>
          </div>
          {/* 태그 표시 */}
          <div className="flex gap-0.5 mt-0.5 sm:mt-1 absolute bottom-1 sm:bottom-2 items-center">
             {isMatch ? (
               <span className="text-[7px] sm:text-[8px] bg-yellow-500 text-black px-0.5 sm:px-1 rounded-sm font-bold flex items-center gap-0.5 animate-bounce-slight">
                 <Sparkles size={7} className="sm:w-[8px] sm:h-[8px]" /> {highlightedSynergy}
               </span>
             ) : (
               char.tags.map((_, i) => <div key={i} className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-slate-500"></div>)
             )}
          </div>
        </>
      ) : (
        <span className={`text-lg sm:text-xl md:text-2xl ${isDimmed ? 'opacity-10' : 'opacity-50'}`}>+</span>
      )}
    </div>
  );
};