import React from 'react';
import DebuffIcon from './DebuffIcon';
const EnemyZone = ({ units, activeUnitId, onUnitClick, interventionMode }) => {
    return (
        <div className="flex-1 bg-slate-900 border-b border-slate-700 p-4 relative flex justify-center items-center gap-8">
            <div className="absolute top-2 left-2 text-xs text-slate-500 font-mono">ENEMY ZONE</div>
            {units.filter(u => u.type === 'enemy' && u.hp > 0).map(u => (
                <div 
                    key={u.id} 
                    className={`relative flex flex-col items-center p-2 rounded-lg transition-all 
                        ${activeUnitId === u.id ? 'scale-110 ring-2 ring-red-500' : ''}
                        ${interventionMode ? 'cursor-pointer hover:ring-2 hover:ring-yellow-400' : ''}`}
                    onClick={() => onUnitClick(u)}
                >
                    <div className="text-2xl mb-1 animate-pulse">{u.icon}</div>
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${(u.hp / u.maxHp) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold mt-1 text-red-200">{u.name}</span>
                    {/* 디버프 아이콘 영역 (방어력 감소 등) */}
                    <div className="flex gap-1 mt-1 items-center min-h-4">
                        {u.buffs?.filter(buff => buff.type === 'DEF_DOWN').map((buff, idx) => (
                            <DebuffIcon key={idx} />
                        ))}
                    </div>
                    <div className="absolute -top-4 bg-slate-800 px-2 rounded border border-red-900 text-xs">⚔️ 공격 예정</div>
                </div>
            ))}
        </div>
    );
};
export default EnemyZone;
