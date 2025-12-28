import React from 'react';
import { Skull, Shield, Sword } from 'lucide-react';
import { ELEMENTS } from '../../constants/index';

export const AllyCard = ({ char, isBack }) => {
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