
import React from 'react';

// 별(Star) SVG 아이콘 컴포넌트
const StarIcon = ({ className }) => (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} width={22} height={22}>
        <path d="M10 2.5l2.39 5.13 5.61.49c.44.04.62.6.28.89l-4.3 3.7 1.36 5.47c.11.44-.36.8-.76.57L10 15.3l-4.58 3.45c-.4.23-.87-.13-.76-.57l1.36-5.47-4.3-3.7a.5.5 0 01.28-.89l5.61-.49L10 2.5z" />
    </svg>
);
import { BATTLE_CONSTANTS } from '../../constants/battleConfig';

const TICK_COUNT = 24;

const Timeline = ({ units, activeUnitId, onUnitClick, interventionMode }) => {
    const getPos = (dist) => (dist / BATTLE_CONSTANTS.MAX_DISTANCE) * 100;

    // 눈금 배열 생성
    const ticks = Array.from({ length: TICK_COUNT + 1 }, (_, i) => i);

    return (
        <div className="h-28 relative flex items-center border-y border-cyan-500/20 overflow-visible select-none">
            {/* 투명+글로우 배경 */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full bg-cyan-400/10 blur-2xl" />
            </div>

            {/* 상단 라벨 */}
            <div className="absolute top-2 left-6 text-xs text-cyan-300 font-mono tracking-widest z-10 drop-shadow">TIMELINE: CELESTIAL TRAJECTORY</div>

            {/* 트랙 라인 + 눈금 */}
            <div className="absolute left-20 right-20 top-1/2 -translate-y-1/2 h-0.5">
                {/* 그라데이션 라인 */}
                <div className="absolute inset-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-400/50 to-cyan-500/0 blur-[1.5px]" />
                {/* 눈금 (ruler ticks) */}
                {ticks.map(i => (
                    <div
                        key={i}
                        className="absolute top-0 left-0 w-0.5 h-3 bg-cyan-300/30 rounded"
                        style={{
                            left: `calc(${(i / TICK_COUNT) * 100}% - 1px)`,
                            height: i % 4 === 0 ? '18px' : '12px',
                            background: i % 4 === 0 ? 'rgba(34,211,238,0.7)' : 'rgba(34,211,238,0.3)',
                            top: i % 4 === 0 ? '-8px' : '-5px',
                        }}
                    />
                ))}
            </div>

            {/* 시작 마커: Event Horizon */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                <div className="w-7 h-7 rounded-full bg-cyan-300/80 shadow-[0_0_32px_8px_#22d3ee99] animate-pulse relative">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-200/60 animate-ping" />
                </div>
                <span className="text-[10px] text-cyan-200 mt-1 font-mono tracking-widest">ACTION</span>
            </div>

            {/* 끝 마커: Deep Space */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-700 via-slate-900 to-black opacity-60 shadow-[0_0_32px_8px_#0e172a99]" />
                <span className="text-[10px] text-slate-400 mt-1 font-mono tracking-widest">WAIT</span>
            </div>

            {/* 유닛 노드(스타) */}
            <div className="absolute left-20 right-20 top-1/2 h-0 w-full z-30">
                {units.filter(u => u.hp > 0).map(u => {
                    const isActive = activeUnitId === u.id;
                    return (
                        <div
                            key={u.id}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-500 z-30 ${interventionMode ? 'cursor-pointer hover:scale-110' : ''}`}
                            style={{ left: `${getPos(u.distance)}%` }}
                            onClick={() => onUnitClick(u)}
                        >
                            <div className="relative">
                                {isActive && (
                                    <div className="absolute -inset-2 rounded-full border-2 border-dashed border-cyan-300 animate-spin-slow opacity-80 pointer-events-none" style={{animationDuration:'2.5s'}} />
                                )}
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 shadow-[0_0_20px_#22d3ee] bg-slate-900/80
                                        ${u.type === 'ally' ? 'border-cyan-400' : 'border-red-400'}
                                        ${isActive ? 'scale-125 ring-2 ring-cyan-200/80' : ''}
                                    `}
                                >
                                    {u.type === 'ally' ? (
                                      <StarIcon className="text-cyan-200 drop-shadow-[0_0_6px_#22d3ee]" />
                                    ) : (
                                      u.icon
                                    )}
                                </div>
                            </div>
                                                        {/* 캐릭터 이름 */}
                                                        <span
                                                            className={`text-xs font-bold mt-1 mb-0.5 px-2 rounded select-none whitespace-nowrap
                                                                ${u.type === 'ally' ? 'text-cyan-100 bg-cyan-900/60' : 'text-red-200 bg-red-900/40'}
                                                            `}
                                                            style={{
                                                                textShadow: u.type === 'ally'
                                                                    ? '0 0 6px #22d3ee99, 0 1px 2px #000'
                                                                    : '0 0 6px #f87171aa, 0 1px 2px #000'
                                                            }}
                                                        >
                                                            {u.name}
                                                        </span>
                                                        <span className="text-[10px] mt-0.5 text-cyan-200/80 font-mono bg-black/40 px-1 rounded shadow-sm">{Math.floor(u.distance)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Timeline;
