import React from 'react';
const AllyStatusPanel = ({ units, activeUnitId, onUnitClick, interventionMode }) => {
    return (
        <div className="w-1/3 bg-slate-800/50 rounded-lg p-3 border border-slate-700 flex flex-col gap-2">
            <div className="text-xs text-slate-400 mb-1">ALLY SQUAD</div>
            {units.filter(u => u.type === 'ally').map(u => (
                <div 
                    key={u.id} 
                    className={`flex items-center gap-2 p-2 rounded bg-slate-800 border ${u.hp <= 0 ? 'opacity-50' : 'border-slate-600'} 
                    ${interventionMode ? 'cursor-pointer hover:bg-slate-700' : ''}
                    ${activeUnitId === u.id ? 'border-yellow-400 bg-slate-700' : ''}`}
                    onClick={() => onUnitClick(u)}
                >
                    <div className="text-lg">{u.icon}</div>
                    <div className="flex-1">
                        <div className="flex justify-between text-xs text-slate-300">
                            <span>{u.name}</span>
                            <span>{u.hp}/{u.maxHp}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-700 mt-1 rounded-full"><div className="h-full bg-green-500" style={{width: `${(u.hp/u.maxHp)*100}%`}}></div></div>
                        <div className="w-full h-1 bg-slate-700 mt-0.5 rounded-full"><div className="h-full bg-yellow-500" style={{width: `${(u.ep/u.maxEp)*100}%`}}></div></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default AllyStatusPanel;
