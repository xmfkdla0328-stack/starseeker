import React from 'react';
import { Skull, Shield, Sword, Activity, MousePointer2 } from 'lucide-react';
import { ELEMENTS } from '../../constants/index';

export const AllyCard = ({ char, isBack, onSelect, selected }) => {
    const hpPercent = Math.max(0, Math.min(100, (char.hp / char.maxHp) * 100));
    const gauge = char.actionGauge ?? 0;
    const maxGauge = char.maxActionGauge ?? 1000;
    const gaugePercent = Math.max(0, Math.min(100, (gauge / maxGauge) * 100));
    const element = ELEMENTS[char.element] || ELEMENTS.LIGHT;

    return (
        <div
            onClick={() => onSelect?.(char.uid)}
            className={`relative w-16 md:w-20 transition-all duration-300 ${
                char.isDead ? 'opacity-50 grayscale scale-90' : 'hover:scale-105'
            } ${onSelect ? 'cursor-pointer' : ''}`}
        >
            <div
                className={`aspect-[3/4] rounded-xl border flex flex-col items-center justify-between backdrop-blur-sm relative overflow-hidden shadow-lg p-2
                    ${char.isDead ? 'border-slate-700 bg-slate-900/60' : `${element.border} ${element.bg}`}
                    ${selected ? 'ring-2 ring-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.35)]' : ''}
                `}
            >
                <div className="flex items-center justify-between w-full text-[9px] text-slate-200">
                    <span className="px-1 py-0.5 rounded-full bg-white/10 border border-white/10 font-semibold tracking-tight">
                        {isBack ? 'BACK' : 'FRONT'}
                    </span>
                    {!char.isDead && (
                        <span className={`text-[9px] font-bold ${element.color}`}>{element.name}</span>
                    )}
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-1">
                    {char.isDead ? (
                        <Skull size={20} className="text-slate-400" />
                    ) : isBack ? (
                        <Shield size={18} className={`${element.color} opacity-80`} />
                    ) : (
                        <Sword size={18} className={`${element.color} opacity-80`} />
                    )}
                    <span className="text-[10px] font-extrabold text-white truncate w-full text-center px-1 z-10 relative drop-shadow-sm">
                        {char.name}
                    </span>
                </div>

                {!char.isDead && <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" aria-hidden />}

                {selected && (
                    <div className="absolute -top-2 -right-2 bg-cyan-500 text-slate-950 rounded-full p-1 shadow-lg flex items-center justify-center">
                        <MousePointer2 size={12} />
                    </div>
                )}

                <div className="w-full space-y-1">
                    <div className="w-full bg-slate-900/70 h-1.5 rounded-full border border-white/10 overflow-hidden relative">
                        <div
                            className={`h-full transition-all duration-300 ${hpPercent < 30 ? 'bg-red-500' : 'bg-emerald-400'}`}
                            style={{ width: `${hpPercent}%` }}
                        />
                        <span className="absolute inset-0 text-[8px] flex items-center justify-center text-white/70 tracking-tight">
                            {Math.round(hpPercent)}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-900/60 h-1.5 rounded-full border border-indigo-400/20 overflow-hidden relative">
                        <div
                            className="h-full transition-all duration-300 bg-gradient-to-r from-indigo-400 to-cyan-300"
                            style={{ width: `${gaugePercent}%` }}
                        />
                        <span className="absolute inset-0 text-[8px] flex items-center justify-center text-white/60 tracking-tight">
                            <Activity size={10} className="mr-0.5" />
                            {Math.round(gaugePercent)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};