
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
                        style={{ minHeight: 54 }}
                    >
                        {/* Icon */}
                        <div className="text-2xl mr-1 flex-shrink-0">
                            {u.icon}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between text-xs text-cyan-100">
                                <span className="font-bold font-sans tracking-wide drop-shadow">{u.name}</span>
                                <span className="font-mono opacity-80">{u.hp}/{u.maxHp}</span>
                            </div>
                            {/* HP Bar */}
                            <div className="w-full h-2 bg-slate-800/60 rounded mt-2 overflow-hidden shadow-inner">
                                <div
                                    className="h-full rounded bg-gradient-to-r from-cyan-300 via-cyan-400 to-yellow-200 shadow-[0_0_8px_2px_rgba(34,211,238,0.35)] transition-all"
                                    style={{ width: `${(u.hp / u.maxHp) * 100}%` }}
                                />
                            </div>
                            {/* EP Bar */}
                            <div className="w-full h-1 bg-fuchsia-900/40 rounded mt-1 overflow-hidden">
                                <div
                                    className="h-full rounded bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-cyan-100 shadow-[0_0_6px_1px_rgba(232,40,251,0.25)] transition-all"
                                    style={{ width: `${(u.ep / u.maxEp) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default AllySquad;
