import React from 'react';
import { Play, Pause, Sword } from 'lucide-react';

export const BattleControls = ({ isAuto, setIsAuto, battleState, processTurn, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button 
        onClick={() => setIsAuto(!isAuto)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all text-xs font-bold shadow-md
          ${isAuto 
            ? 'bg-yellow-400 text-slate-950 border-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.45)] hover:shadow-[0_0_22px_rgba(234,179,8,0.6)]' 
            : 'bg-slate-800/80 text-slate-200 border-slate-600 hover:bg-slate-700/80'}
        `}
      >
        {isAuto ? <Pause size={12} fill="currentColor"/> : <Play size={12} fill="currentColor"/>}
        {isAuto ? 'AUTO ON' : 'MANUAL'}
      </button>

      {!isAuto && battleState === 'FIGHTING' && (
        <button 
          onClick={() => processTurn(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 border-2 border-red-300 flex items-center justify-center text-white shadow-lg active:scale-95 hover:from-red-400 hover:to-orange-400 hover:shadow-[0_0_18px_rgba(248,113,113,0.55)] transition-all animate-pulse-slow"
          title="턴 진행"
        >
          <Sword size={20} fill="currentColor"/>
        </button>
      )}
    </div>
  );
};