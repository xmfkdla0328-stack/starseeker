import React from 'react';
import { Flame, Zap } from 'lucide-react';

export const BossDisplay = ({ enemy, battleState, className = '' }) => {
    const hpPercent = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));
    const danger = hpPercent < 35;

    return (
        <div
            className={`flex h-full items-center justify-center relative overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/25 via-transparent to-cyan-900/20 animate-pan-slow pointer-events-none" aria-hidden />
            <div className="absolute inset-0 battle-grid animate-grid-pan opacity-35 pointer-events-none" aria-hidden />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25),transparent_45%),radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" aria-hidden />

            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className={`w-40 h-40 rounded-full border-4 flex items-center justify-center text-red-100 font-bold shadow-[0_0_45px_rgba(248,113,113,0.45)] ${
                    danger ? 'border-orange-400 bg-red-900/60 animate-pulse' : 'border-red-500/60 bg-red-900/40'
                }`}>
                    <Flame size={40} className="text-red-300 drop-shadow-md" />
                </div>

                <div className="w-72 max-w-full bg-black/60 rounded-2xl border border-white/10 p-3 shadow-lg backdrop-blur">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="font-black text-xl text-red-100 tracking-wide drop-shadow-sm">{enemy.name}</h4>
                        <span className={`text-[11px] px-2 py-1 rounded-full border ${
                            danger ? 'bg-orange-500/20 border-orange-400/50 text-orange-100' : 'bg-emerald-500/15 border-emerald-400/40 text-emerald-100'
                        }`}>
                            {danger ? 'Enraged' : 'Stable'}
                        </span>
                    </div>
                    <div className="h-3 w-full bg-slate-900/80 rounded-full border border-white/10 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 transition-all duration-500"
                            style={{ width: `${hpPercent}%` }}
                        />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-red-200/90 font-mono mt-1">
                        <span>{enemy.hp.toLocaleString()} / {enemy.maxHp.toLocaleString()}</span>
                        <span className="flex items-center gap-1 text-amber-200">
                            <Zap size={12} /> Threat Level
                        </span>
                    </div>
                </div>
            </div>

            {battleState === 'VICTORY' && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
                    <h2 className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] tracking-widest border-y-4 border-yellow-400 py-2 px-6">
                        VICTORY
                    </h2>
                </div>
            )}
            {battleState === 'DEFEAT' && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
                    <h2 className="text-4xl font-black text-slate-400 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] tracking-widest px-6">
                        DEFEAT...
                    </h2>
                </div>
            )}
        </div>
    );
};