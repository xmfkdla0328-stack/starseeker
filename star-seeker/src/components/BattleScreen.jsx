import React from 'react';
import { Flame, Sword, Shield, Skull } from 'lucide-react';
import { ELEMENTS } from '../constants';

export const BattleScreen = ({ battleSystem, activeSynergies }) => {
  const { enemy, allies, logs, battleState, turnCount } = battleSystem;

  if (!enemy || allies.length === 0) return <div className="text-center p-10 text-slate-400">전투 준비 중...</div>;

  return (
    <div className="h-full flex flex-col p-3 gap-3 relative animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
      
      {/* 1. 보스 영역 */}
      <div className="flex-[2] flex flex-col items-center justify-center gap-4 bg-red-950/40 backdrop-blur-md rounded-xl border border-red-500/20 p-4 shadow-inner shadow-red-900/20 relative overflow-hidden min-h-0">
         <div className="relative z-10 flex flex-col items-center gap-2">
             <div className="w-24 h-24 bg-red-900/30 rounded-full animate-pulse-slow border-4 border-red-500/50 flex flex-col items-center justify-center text-red-100 font-bold relative shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                <Flame size={32} className="text-red-500 mb-1 drop-shadow-md"/>
                <span className="text-sm">BOSS</span>
             </div>
             
             <div className="text-center">
                 <h4 className="font-bold text-red-400 text-lg drop-shadow-sm">{enemy.name}</h4>
                 <div className="w-48 h-3 bg-slate-900 rounded-full border border-white/10 mt-1 relative overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-500" 
                        style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
                    ></div>
                 </div>
                 <p className="text-xs text-red-300 mt-1 font-mono">{enemy.hp} / {enemy.maxHp}</p>
             </div>
         </div>

         {/* 승리/패배 메시지 */}
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

      {/* 2. 로그 영역 */}
      <div className="h-24 bg-slate-950/80 border border-white/10 rounded-lg p-3 text-[11px] overflow-y-auto font-mono text-slate-300 no-scrollbar shadow-inner shrink-0 flex flex-col-reverse">
         {logs.map((log, i) => (
             <p key={i} className={`mb-0.5 border-b border-white/5 pb-0.5 last:border-0 ${log.includes('처치') || log.includes('승리') || log.includes('부활') ? 'text-yellow-300 font-bold' : log.includes('전투 불능') || log.includes('패배') ? 'text-red-400 font-bold' : ''}`}>
                 {log}
             </p>
         ))}
      </div>

      {/* 3. 아군 영역 (수정됨: role이 아니라 position으로 필터링) */}
      <div className="flex-[3] bg-blue-950/40 backdrop-blur-md rounded-xl border border-blue-500/20 p-2 flex flex-col justify-end shadow-inner shadow-blue-900/20 relative overflow-hidden min-h-0">
         
         {/* 전열 (position === 'FRONT'인 캐릭터만 표시) */}
         <div className="flex justify-center gap-2 mb-4 relative z-10 h-1/2 items-end">
            {allies.filter(c => c.position === 'FRONT').map((char, i) => (
               <AllyCard key={`front-${i}`} char={char} />
            ))}
         </div>

         {/* 후열 (position === 'BACK'인 캐릭터만 표시) */}
         <div className="flex justify-center gap-2 relative z-10 h-1/2 items-start scale-90 opacity-90">
            {allies.filter(c => c.position === 'BACK').map((char, i) => (
               <AllyCard key={`back-${i}`} char={char} isBack={true} />
            ))}
         </div>
      </div>
    </div>
  );
};

const AllyCard = ({ char, isBack }) => {
    const hpPercent = (char.hp / char.maxHp) * 100;
    
    return (
        <div className={`relative w-14 md:w-16 transition-all duration-300 ${char.isDead ? 'opacity-50 grayscale scale-90' : 'hover:scale-105'}`}>
            <div className={`aspect-[3/4] rounded-lg border flex flex-col items-center justify-center backdrop-blur-sm relative overflow-hidden shadow-lg
                ${char.isDead ? 'border-slate-700 bg-slate-800' : `${ELEMENTS[char.element].border} ${ELEMENTS[char.element].bg}`}
            `}>
                {char.isDead ? <Skull size={20} className="text-slate-400"/> : (
                    isBack ? <Shield size={16} className={`${ELEMENTS[char.element].color} opacity-80`}/> : <Sword size={16} className={`${ELEMENTS[char.element].color} opacity-80`}/>
                )}
                <span className="text-[9px] font-bold text-white mt-1 truncate w-full text-center px-1 z-10 relative">{char.name}</span>
                {!char.isDead && <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/30`}></div>}
            </div>

            <div className="mt-1 w-full bg-slate-900 h-1.5 rounded-full border border-white/10 overflow-hidden relative">
                <div 
                    className={`h-full transition-all duration-300 ${hpPercent < 30 ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${hpPercent}%` }}
                ></div>
            </div>
        </div>
    );
};