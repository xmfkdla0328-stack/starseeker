import React, { useRef, useEffect } from 'react';

const BattleLog = ({ battleLog }) => {
    const logRef = useRef(null);
    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [battleLog]);
    return (
        <div ref={logRef} className="w-64 h-32 bg-black/80 rounded border border-slate-700 p-2 text-[11px] font-mono text-green-400 overflow-y-auto whitespace-pre-wrap shadow-xl opacity-90">
            <div className="text-xs text-cyan-300 font-bold mb-1">Battle Log</div>
            {battleLog.map((log, i) => <div key={i}>{log}</div>)}
        </div>
    );
};

export default BattleLog;
