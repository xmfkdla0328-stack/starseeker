import React, { useRef, useEffect } from 'react';
const ControlPanel = ({ activeUnit, gameStatus, battleLog, onCommand }) => {
    const logRef = useRef(null);
    useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [battleLog]);
    return (
        <div className="flex-1 flex flex-col gap-2">
            <div ref={logRef} className="h-24 bg-black/80 rounded border border-slate-700 p-2 text-xs font-mono text-green-400 overflow-y-auto whitespace-pre-wrap">
                {battleLog.map((log, i) => <div key={i}>{log}</div>)}
            </div>
            <div className="flex-1">
                {activeUnit ? (
                    <div className="flex-1 bg-slate-800 rounded-lg p-2 border border-blue-500/50 flex flex-col justify-center gap-2 h-full animate-in fade-in">
                        <div className="text-center text-blue-300 font-bold mb-1">COMMAND: {activeUnit.name}</div>
                        <div className="grid grid-cols-3 gap-2 h-full">
                            <button
                                onClick={() => onCommand('attack')}
                                disabled={activeUnit.type !== 'ally'}
                                className={`bg-slate-700 border border-slate-600 rounded flex flex-col items-center justify-center p-2 group ${activeUnit.type !== 'ally' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'}`}
                            >
                                <span className="text-2xl mb-1">⚔️</span><span className="text-xs">공격</span><span className="text-[10px] text-slate-400">+CP 50</span>
                            </button>
                            <button
                                onClick={() => onCommand('skill')}
                                disabled={activeUnit.type !== 'ally'}
                                className={`bg-slate-700 border border-slate-600 rounded flex flex-col items-center justify-center p-2 group ${activeUnit.type !== 'ally' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'}`}
                            >
                                <span className="text-2xl mb-1">💠</span><span className="text-xs">스킬</span><span className="text-[10px] text-slate-400">+CP 80</span>
                            </button>
                            <button
                                onClick={() => onCommand('ult')}
                                disabled={activeUnit.type !== 'ally'}
                                className={`bg-slate-700 border border-slate-600 rounded flex flex-col items-center justify-center p-2 group relative overflow-hidden ${activeUnit.type !== 'ally' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'}`}
                            >
                                {activeUnit.ep < 100 && <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center text-xs text-gray-400">EP 부족</div>}
                                <span className="text-2xl mb-1 text-yellow-400">🌟</span><span className="text-xs text-yellow-100">필살기</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="h-full bg-slate-800/30 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-sm">
                        {gameStatus === 'running' ? '타임라인 연산 중...' : (gameStatus === 'win' ? '승리!' : '패배...')}
                    </div>
                )}
            </div>
        </div>
    );
};
export default ControlPanel;
