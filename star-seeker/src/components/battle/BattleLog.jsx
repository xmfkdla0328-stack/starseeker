import React from 'react';

export const BattleLog = ({ logs = [] }) => {
  return (
    <div className="h-24 bg-slate-950/80 border border-white/10 rounded-lg p-3 text-[11px] overflow-y-auto font-mono text-slate-300 no-scrollbar shadow-inner shrink-0 flex flex-col-reverse">
      {logs && logs.length > 0 ? (
        logs.map((log, i) => (
          <p 
            key={i} 
            className={`mb-0.5 border-b border-white/5 pb-0.5 last:border-0 ${
              log.includes('처치') || log.includes('승리') || log.includes('부활') 
                ? 'text-yellow-300 font-bold' 
                : log.includes('전투 불능') || log.includes('패배') 
                ? 'text-red-400 font-bold' 
                : ''
            }`}
          >
            {log}
          </p>
        ))
      ) : (
        <p className="text-slate-400/50">전투 로그</p>
      )}
    </div>
  );
};

export default BattleLog;
