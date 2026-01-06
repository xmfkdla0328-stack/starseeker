import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';

/**
 * 파티 화면 하단 액션 바
 */
export const PartyActionBar = ({ isPartyFull, onProceed }) => {
  const emptySlots = 4 - (isPartyFull ? 4 : 0);
  
  return (
    <div className="p-4 bg-slate-950/80 backdrop-blur-sm border-t border-cyan-500/30">
      <button
        onClick={onProceed}
        disabled={!isPartyFull}
        className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
          isPartyFull
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-[1.02] border-2 border-cyan-400 animate-pulse'
            : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border-2 border-slate-700'
        }`}
      >
        <Zap size={24} className={isPartyFull ? 'text-yellow-300' : 'text-slate-600'} />
        {isPartyFull ? '관측 개시' : `${emptySlots}명 더 선택`}
        {isPartyFull && <ChevronRight size={24} />}
      </button>
    </div>
  );
};
