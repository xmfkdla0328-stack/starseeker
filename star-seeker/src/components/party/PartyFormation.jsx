import React from 'react';
import { Users } from 'lucide-react';
import { PartySlot } from './PartySlot';

/**
 * 파티 편성 영역 컴포넌트
 * 통합 4인 파티 슬롯을 표시하고 캐릭터를 배치할 수 있는 UI
 */
export const PartyFormation = ({ party, setSelectedSlot, removeChar }) => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* 파티 편성 컨테이너 */}
      <div className="bg-slate-900/40 backdrop-blur-md p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-lg sm:rounded-lg md:rounded-xl border border-white/10 flex flex-col min-h-0 shadow-inner shadow-slate-900/20">
        
        {/* 파티 멤버 섹션 */}
        <div>
          <h3 className="text-[8px] xs:text-[8.5px] sm:text-[9px] md:text-[9.5px] lg:text-[10px] mb-1 sm:mb-1.5 md:mb-1.5 lg:mb-2 uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 font-bold text-cyan-300/80">
            <Users size={10} className="sm:w-[12px] sm:h-[12px]" /> 파티 편성 (최대 4명)
          </h3>
          <div className="grid grid-cols-4 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
            {party.members.map((char, idx) => (
              <PartySlot 
                key={`member-${idx}`}
                char={char}
                line="members"
                idx={idx}
                removeChar={removeChar}
                setSelectedSlot={setSelectedSlot}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
