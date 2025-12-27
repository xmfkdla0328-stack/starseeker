import React from 'react';
import { Play, Pause, Sword } from 'lucide-react';

export const BattleControls = ({ isAuto, setIsAuto, battleState, processTurn }) => {
  return (
    <div className="absolute bottom-3 right-3 z-30 flex items-center gap-3">
       {/* 자동/수동 토글 */}
       <button 
          onClick={() => setIsAuto(!isAuto)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all text-xs font-bold
            ${isAuto 
              ? 'bg-yellow-500 text-black border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]' 
              : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'}
          `}
       >
          {isAuto ? <Pause size={12} fill="currentColor"/> : <Play size={12} fill="currentColor"/>}
          {isAuto ? 'AUTO ON' : 'MANUAL'}
       </button>

       {/* 수동 공격 버튼 */}
       {!isAuto && battleState === 'FIGHTING' && (
         <button 
           onClick={() => processTurn(true)} // ★ true(isManualStep) 전달!
           className="w-12 h-12 rounded-full bg-red-600 border-2 border-red-400 flex items-center justify-center text-white shadow-lg active:scale-95 hover:bg-red-500 hover:scale-105 transition-all animate-pulse-slow"
           title="턴 진행"
         >
           <Sword size={20} fill="currentColor"/>
         </button>
       )}
    </div>
  );
};