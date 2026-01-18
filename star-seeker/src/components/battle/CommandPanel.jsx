import React from 'react';

const CommandPanel = ({ activeUnit, gameStatus, onCommand }) => {
    return (
        <div className="flex flex-col gap-2 min-h-[140px] max-h-[220px] flex-shrink-0" style={{flexBasis: 220}}>
            <div className="flex-1">
                {activeUnit ? (
                    <div className="bg-slate-800 rounded-lg p-2 border border-blue-500/50 flex flex-col justify-center gap-2 h-full animate-in fade-in min-h-[120px] max-h-[200px]">
                        <div className="text-center text-blue-300 font-bold mb-1 text-xs md:text-sm">COMMAND: {activeUnit.name}</div>
                        <div className="grid grid-cols-3 gap-1 h-full min-h-[60px]">
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
export default CommandPanel;
