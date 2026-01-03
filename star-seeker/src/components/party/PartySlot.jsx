import React from 'react';
import { ElementIcon } from '../common/ElementIcon';
import { getRoleLabel, getRoleColor } from '../../utils/roleHelpers';

export const PartySlot = ({ char, line, idx, removeChar, setSelectedSlot }) => {
  return (
    <div onClick={() => char ? removeChar(line, idx) : setSelectedSlot({line, index: idx})}
      className={`aspect-[3/4] rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden group w-full
        ${char ? `border-cyan-400/40 bg-slate-900/60 backdrop-blur-sm` : 'border-dashed border-slate-700/50 hover:bg-white/5 hover:border-slate-500/50'}
        max-h-[100px] sm:max-h-[120px]
      `}>
      {char ? (
        <>
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent"></div>

          {/* 속성 아이콘 배지 */}
          <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 p-1 sm:p-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm shadow-sm">
            <ElementIcon element={char.element} size={10} />
          </div>

          <div className="text-[10px] sm:text-xs md:text-xs lg:text-xs text-cyan-200 font-bold z-10 flex flex-col items-center text-center leading-tight">
              {char.name}
              <span className={`text-[7px] sm:text-[8px] md:text-[9px] font-normal opacity-80 mt-0.5 ${getRoleColor(char.role)}`}>
                {getRoleLabel(char.role)}
              </span>
          </div>
        </>
      ) : (
        <span className="text-lg sm:text-xl md:text-2xl opacity-50">+</span>
      )}
    </div>
  );
};