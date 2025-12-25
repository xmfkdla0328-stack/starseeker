import React from 'react';
import { Flame, Sword, Shield } from 'lucide-react';
import { ELEMENTS } from '../constants.js';

export const BattleScreen = ({ party, activeSynergies }) => (
  <div className="h-full flex flex-col p-3 gap-3 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
    
    <div className="flex-[2] flex items-center justify-center gap-6 bg-red-950/40 backdrop-blur-md rounded-xl border border-red-500/20 p-2 shadow-inner shadow-red-900/20 relative overflow-hidden min-h-0">
       <div className="w-20 h-20 bg-red-900/30 rounded-full animate-pulse-slow border-4 border-red-500/50 flex flex-col items-center justify-center text-red-100 font-bold relative z-10">
          <Flame size={24} className="text-red-500 mb-1"/>
          <span className="text-xs">BOSS</span>
       </div>
       <div className="text-slate-300 text-xs text-left bg-slate-900/50 p-2 rounded-lg border border-white/10 backdrop-blur-sm relative z-10">
          <h4 className="font-bold text-red-400 mb-1 flex items-center gap-1">화염룡</h4>
          <p><span className="text-red-400">불</span> / 약점: <span className="text-blue-400">물</span></p>
       </div>
    </div>

    <div className="h-20 bg-slate-950/60 border border-white/10 rounded-lg p-2 text-[10px] overflow-y-auto font-mono text-slate-300 no-scrollbar shadow-inner shrink-0">
       <p className="text-green-400 font-bold mb-1">{'>'} 전투 개시!</p>
       {activeSynergies.map((syn, i) => (
         <p key={i} className="text-yellow-300">{'>'} [시너지] {syn.name}: {syn.effect}</p>
       ))}
       <p className="opacity-70">{'>'} 서주목 스킬 사용.</p>
       <p className="opacity-70">{'>'} 공격력 상승.</p>
    </div>

    <div className="flex-[3] bg-blue-950/40 backdrop-blur-md rounded-xl border border-blue-500/20 p-2 flex flex-col justify-end shadow-inner shadow-blue-900/20 relative overflow-hidden min-h-0">
       <div className="flex justify-center gap-2 mb-2 relative z-10">
          {party.front.map((c, i) => (
            <div key={i} className={`w-12 h-16 rounded-lg border transition-all ${c ? `${ELEMENTS[c.element].border} ${ELEMENTS[c.element].bg}` : 'border-slate-700/50 bg-slate-900/30'} flex flex-col items-center justify-center backdrop-blur-sm`}>
               {c ? <Sword size={12} className="text-red-400 opacity-70"/> : null}
            </div>
          ))}
       </div>
       <div className="flex justify-center gap-2 scale-90 opacity-80 relative z-10">
          {party.back.map((c, i) => (
            <div key={i} className={`w-12 h-16 rounded-lg border transition-all ${c ? `${ELEMENTS[c.element].border} ${ELEMENTS[c.element].bg}` : 'border-slate-700/50 bg-slate-900/30'} flex flex-col items-center justify-center backdrop-blur-sm`}>
               {c ? <Shield size={12} className="text-blue-400 opacity-70"/> : null}
            </div>
          ))}
       </div>
    </div>
  </div>
);