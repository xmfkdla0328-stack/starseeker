import React from 'react';
import { Shield, Sword } from 'lucide-react';
import { PartySlot } from './PartySlot';

/**
 * 파티 편성 영역 컴포넌트
 * 전열/후열 슬롯을 표시하고 캐릭터를 배치할 수 있는 UI
 */
export const PartyFormation = ({ party, setSelectedSlot, removeChar, highlightedSynergy }) => {
  const PartyLine = ({ title, icon: Icon, line, slots, borderColor, bgColor, shadowColor }) => (
    <div className={`flex-1 bg-slate-900/40 backdrop-blur-md p-2 md:p-3 rounded-xl border ${borderColor} flex flex-col ${shadowColor} min-h-0 justify-center`}>
      <h3 className={`text-[9px] md:text-[10px] mb-1.5 md:mb-2 uppercase tracking-wider flex items-center gap-1.5 font-bold shrink-0 justify-center ${bgColor}`}>
        <Icon size={12} /> {title}
      </h3>
      <div className="w-full max-w-md mx-auto">
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {slots.map((char, idx) => (
            <PartySlot 
              key={`${line}-${idx}`}
              char={char}
              line={line}
              idx={idx}
              removeChar={removeChar}
              setSelectedSlot={setSelectedSlot}
              highlightedSynergy={highlightedSynergy}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-3 min-h-0">
      {/* 전열 영역 */}
      <PartyLine
        title="전열 (Attack)"
        icon={Sword}
        line="front"
        slots={party.front}
        borderColor="border-red-900/30"
        bgColor="text-red-300/80"
        shadowColor="shadow-inner shadow-red-900/10"
      />

      {/* 후열 영역 */}
      <PartyLine
        title="후열 (Support)"
        icon={Shield}
        line="back"
        slots={party.back}
        borderColor="border-blue-900/30"
        bgColor="text-blue-300/80"
        shadowColor="shadow-inner shadow-blue-900/10"
      />
    </div>
  );
};
