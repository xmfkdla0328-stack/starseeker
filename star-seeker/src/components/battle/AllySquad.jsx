import BuffIcon from './BuffIcon';

const AllySquad = ({ units, activeUnitId, onUnitClick, interventionMode }) => {
    return (
        <div className="absolute top-4 left-4 w-72 flex flex-col gap-3 z-40 select-none">
            {units.filter(u => u.type === 'ally').map(u => {
                const isActive = activeUnitId === u.id;
                return (
                    <div
                        key={u.id}
                        className={[
                            'group relative w-full overflow-hidden rounded-r-lg border-l-8',
                            isActive ? 'border-yellow-400 bg-slate-800/80 shadow-[0_0_16px_2px_rgba(255,230,102,0.25)]' : 'border-cyan-400 bg-slate-900/60',
                            'backdrop-blur-md p-3 flex items-center gap-3 transition-all hover:translate-x-2',
                            u.hp <= 0 ? 'opacity-50 grayscale' : '',
                            interventionMode ? 'cursor-pointer' : 'cursor-default',
                        ].join(' ')}
                        onClick={() => onUnitClick(u)}
                        style={{ minHeight: 44, paddingTop: 6, paddingBottom: 6 }}
                    >
                        {/* Icon */}
                        <div className="text-2xl mr-1 flex-shrink-0">
                            {u.icon}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-start">
                            <div className="flex justify-between text-xs text-cyan-100 leading-tight" style={{marginBottom: 2}}>
                                <span className="font-bold font-sans tracking-wide drop-shadow">{u.name}</span>
                                <span className="font-mono opacity-80">{u.hp}/{u.maxHp}</span>
                            </div>
                            {/* HP Bar (빨간색) */}
                            <div className="w-full h-1.5 bg-slate-800/60 rounded mt-0.5 overflow-hidden shadow-inner">
                                <div
                                    className="h-full rounded bg-gradient-to-r from-red-500 via-red-400 to-yellow-200 shadow-[0_0_8px_2px_rgba(239,68,68,0.25)] transition-all"
                                    style={{ width: `${(u.hp / u.maxHp) * 100}%` }}
                                />
                            </div>
                            {/* EP Bar (파란색) */}
                            <div className="w-full h-1 bg-blue-900/40 rounded mt-0.5 overflow-hidden">
                                <div
                                    className="h-full rounded bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-100 shadow-[0_0_6px_1px_rgba(59,130,246,0.25)] transition-all"
                                    style={{ width: `${(u.ep / u.maxEp) * 100}%` }}
                                />
                            </div>
                            {/* 버프 아이콘 영역 (공격력 증가 버프만) */}
                            <div className="flex gap-0.5 mt-0.5 items-center min-h-4">
                                {u.buffs?.filter(buff => buff.type === 'ATK_UP').map((buff, idx) => (
                                    <BuffIcon key={idx} />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default AllySquad;
