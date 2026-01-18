import React from 'react';

const BUTTONS = [
  {
    key: 'attack',
    icon: '⚔️',
    label: '공격',
    cp: '+CP 50',
    extra: '',
    base: 'from-white/10 to-black/40',
    text: 'text-white',
    reflection: 'from-transparent to-white',
    glow: '',
    iconClass: 'text-2xl drop-shadow-glow',
    labelClass: 'font-bold text-white',
    cpClass: 'text-xs text-cyan-200/70',
  },
  {
    key: 'skill',
    icon: '💠',
    label: '스킬',
    cp: '+CP 80',
    extra: '',
    base: 'from-cyan-400/10 to-blue-900/30',
    text: 'text-cyan-200',
    reflection: 'from-transparent to-cyan-200',
    glow: 'shadow-[0_0_16px_2px_rgba(34,211,238,0.25)]',
    iconClass: 'text-2xl drop-shadow-glow text-cyan-300',
    labelClass: 'font-bold text-cyan-100',
    cpClass: 'text-xs text-cyan-300/70',
  },
  {
    key: 'ult',
    icon: '🌟',
    label: '필살기',
    cp: '',
    extra: '',
    base: 'from-yellow-200/10 to-yellow-900/30',
    text: 'text-yellow-100',
    reflection: 'from-transparent to-yellow-200',
    glow: 'shadow-[0_0_24px_4px_rgba(250,204,21,0.18)]',
    iconClass: 'text-3xl drop-shadow-glow text-yellow-400',
    labelClass: 'font-bold text-yellow-100',
    cpClass: '',
  },
];

const CommandPanel = ({ activeUnit, gameStatus, onCommand }) => {
  if (!activeUnit)
    return (
      <div className="flex items-center justify-center text-slate-400/70 text-base font-bold h-24">
        {gameStatus === 'running'
          ? '타임라인 연산 중...'
          : gameStatus === 'win'
          ? '승리!'
          : '패배...'}
      </div>
    );

  const isLocked = activeUnit.type !== 'ally';
  const ultLocked = isLocked || activeUnit.ep < 100;

  return (
    <div className="flex flex-row items-end justify-center gap-4 w-full">
      {/* Attack */}
      <button
        type="button"
        onClick={() => onCommand('attack')}
        disabled={isLocked}
        className={`
          group relative h-20 w-32 -skew-x-12 overflow-hidden rounded-lg border border-white/30
          bg-white/10 backdrop-blur-xl shadow-[0_4px_32px_0_rgba(255,255,255,0.10),0_1.5px_8px_0_rgba(0,0,0,0.18)]
          ring-1 ring-white/20
          transition-all duration-200 hover:border-white/60 hover:bg-white/20 hover:ring-white/40 active:scale-95
          ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-125'}
        `}
      >
        {/* 흐릿한 아이콘 배경 */}
        <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-20 blur-sm select-none pointer-events-none">⚔️</span>
        <div className="skew-x-12 flex flex-col items-center justify-center gap-1 relative z-10">
          <span className="font-bold text-white text-lg">공격</span>
          <span className="text-xs text-cyan-200/70">+CP 50</span>
        </div>
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      </button>
      {/* Skill */}
      <button
        type="button"
        onClick={() => onCommand('skill')}
        disabled={isLocked}
        className={`
          group relative h-20 w-32 -skew-x-12 overflow-hidden rounded-lg border border-cyan-300/40
          bg-cyan-200/10 backdrop-blur-xl shadow-[0_4px_32px_0_rgba(34,211,238,0.10),0_1.5px_8px_0_rgba(0,0,0,0.18)]
          ring-1 ring-cyan-200/20
          transition-all duration-200 hover:border-cyan-200/80 hover:bg-cyan-200/20 hover:ring-cyan-100/40 active:scale-95
          ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-125'}
        `}
      >
        {/* 흐릿한 아이콘 배경 */}
        <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-20 blur-sm select-none pointer-events-none">💠</span>
        <div className="skew-x-12 flex flex-col items-center justify-center gap-1 relative z-10">
          <span className="font-bold text-cyan-100 text-lg">스킬</span>
          <span className="text-xs text-cyan-300/70">+CP 80</span>
        </div>
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-cyan-200 opacity-20 group-hover:animate-shine" />
      </button>
      {/* Ultimate */}
      <button
        type="button"
        onClick={() => onCommand('ult')}
        disabled={ultLocked}
        className={`
          group relative h-24 w-36 -skew-x-12 overflow-hidden rounded-xl border border-yellow-200/40
          bg-yellow-100/10 backdrop-blur-xl shadow-[0_4px_32px_0_rgba(250,204,21,0.10),0_1.5px_8px_0_rgba(0,0,0,0.18)]
          ring-1 ring-yellow-100/20
          transition-all duration-200 hover:border-yellow-200/80 hover:bg-yellow-100/20 hover:ring-yellow-100/40 active:scale-95
          ${ultLocked ? 'opacity-40 cursor-not-allowed grayscale' : 'hover:brightness-125'}
        `}
      >
        {/* 흐릿한 아이콘 배경 */}
        <span className="absolute inset-0 flex items-center justify-center text-5xl opacity-20 blur-sm select-none pointer-events-none">🌟</span>
        {activeUnit.ep < 100 && (
          <div className="absolute inset-0 bg-black/70 z-10 flex items-center justify-center text-xs text-yellow-100 font-bold tracking-widest">
            LOCKED
          </div>
        )}
        <div className="skew-x-12 flex flex-col items-center justify-center gap-1 relative z-20">
          <span className="font-bold text-yellow-100 text-lg">필살기</span>
          <span className="text-xs text-yellow-200/80">{activeUnit.ep}/100 EP</span>
        </div>
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-yellow-200 opacity-20 group-hover:animate-shine" />
      </button>
    </div>
  );
};

export default CommandPanel;