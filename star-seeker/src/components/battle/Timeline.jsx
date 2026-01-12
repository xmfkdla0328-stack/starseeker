import React from 'react';
import { BATTLE_CONSTANTS } from '../../constants/battleConfig';

const Timeline = ({ units, activeUnitId, onUnitClick, interventionMode }) => {
    const getPos = (dist) => (dist / BATTLE_CONSTANTS.MAX_DISTANCE) * 100;
    return (
        <div className="h-40 bg-slate-950 relative flex items-center border-y border-cyan-900/30 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-slate-950"></div>
            <div className="absolute top-2 left-2 text-xs text-cyan-500 font-mono z-10">TIMELINE: CONSTELLATION PATH</div>
            <div className="absolute left-16 right-16 top-1/2 h-0.5 bg-slate-700"></div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300 font-bold text-xs z-10 text-center"><span className="text-2xl">⚡</span><br/>ACTION</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs z-10 text-center"><span className="text-2xl">🌌</span><br/>WAIT</div>
            <div className="absolute left-16 right-16 top-1/2 h-0 w-full">
                {units.filter(u => u.hp > 0).map(u => (
                    <div
                        key={u.id}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex flex-col items-center z-20
                            ${interventionMode ? 'cursor-pointer hover:scale-110' : ''}
                            ${activeUnitId === u.id ? 'scale-125 z-30 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''}
                        `}
                        style={{ left: `${getPos(u.distance)}%` }}
                        onClick={() => onUnitClick(u)}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 shadow-lg ${u.type === 'ally' ? 'border-cyan-400 shadow-cyan-900/50' : 'border-red-500 shadow-red-900/50'} ${u.color}`}>
                            {u.icon}
                        </div>
                        <span className="text-[10px] mt-1 text-slate-400 font-mono bg-black/50 px-1 rounded">{Math.floor(u.distance)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Timeline;
