import React from 'react';

export const BattleLog = ({ logs }) => {
  return (
    <div className="bg-slate-950/85 border border-white/10 rounded-2xl p-3 text-[11px] overflow-y-auto font-mono text-slate-200 no-scrollbar shadow-lg shrink-0 flex flex-col gap-3 min-h-[200px]">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-400">
        <span>Combat Feed</span>
        <span className="h-px flex-1 mx-3 bg-gradient-to-r from-slate-700 to-transparent" aria-hidden />
        <span className="text-emerald-300 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden />Live</span>
      </div>
      <div className="flex flex-col-reverse gap-1">
        {logs.map((log, i) => (
          <p
            key={i}
            className={`rounded-md px-2 py-1 bg-white/5 border border-white/5 shadow-sm leading-snug ${
              log.includes('처치') || log.includes('승리') || log.includes('부활')
                ? 'text-yellow-200 border-yellow-500/30 bg-yellow-500/10'
                : log.includes('전투 불능') || log.includes('패배')
                ? 'text-red-200 border-red-500/30 bg-red-500/10'
                : 'text-slate-200'
            }`}
          >
            {log}
          </p>
        ))}
      </div>
    </div>
  );
};