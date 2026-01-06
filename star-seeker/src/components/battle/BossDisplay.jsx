import React from 'react';
import { Flame } from 'lucide-react';

export const BossDisplay = ({ enemy, battleState }) => {
  if (!enemy) {
    return (
      <div className="flex-[2] flex flex-col items-center justify-center gap-4 bg-red-950/40 backdrop-blur-md rounded-xl border border-red-500/20 p-4 shadow-inner shadow-red-900/20 relative overflow-hidden min-h-0">
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-24 h-24 bg-red-900/30 rounded-full animate-pulse-slow border-4 border-red-500/50 flex flex-col items-center justify-center text-red-100 font-bold relative shadow-[0_0_30px_rgba(239,68,68,0.4)]">
            <Flame size={32} className="text-red-500 mb-1 drop-shadow-md" />
            <span className="text-sm">BOSS</span>
          </div>
          <div className="text-center">
            <h4 className="font-bold text-red-400 text-lg drop-shadow-sm">-</h4>
            <div className="w-48 h-3 bg-slate-900 rounded-full border border-white/10 mt-1 relative overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
            <p className="text-xs text-red-300 mt-1 font-mono">0 / 0</p>
          </div>
        </div>
      </div>
    );
  }

  const hpPercent = enemy.maxHp ? (enemy.hp / enemy.maxHp) * 100 : 0;

  return (
    <div className="flex-[2] flex flex-col items-center justify-center gap-4 bg-red-950/40 backdrop-blur-md rounded-xl border border-red-500/20 p-4 shadow-inner shadow-red-900/20 relative overflow-hidden min-h-0">
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-24 h-24 bg-red-900/30 rounded-full animate-pulse-slow border-4 border-red-500/50 flex flex-col items-center justify-center text-red-100 font-bold relative shadow-[0_0_30px_rgba(239,68,68,0.4)]">
          <Flame size={32} className="text-red-500 mb-1 drop-shadow-md" />
          <span className="text-sm">BOSS</span>
        </div>
        <div className="text-center">
          <h4 className="font-bold text-red-400 text-lg drop-shadow-sm">{enemy.name}</h4>
          <div className="w-48 h-3 bg-slate-900 rounded-full border border-white/10 mt-1 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-500" 
              style={{ width: `${hpPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-red-300 mt-1 font-mono">{enemy.hp} / {enemy.maxHp}</p>
        </div>
      </div>

      {/* 승리/패배 오버레이 */}
      {battleState === 'VICTORY' && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <h2 className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] tracking-widest border-y-4 border-yellow-400 py-2">VICTORY</h2>
        </div>
      )}
      {battleState === 'DEFEAT' && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <h2 className="text-4xl font-black text-slate-500 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] tracking-widest">DEFEAT...</h2>
        </div>
      )}
    </div>
  );
};

export default BossDisplay;
