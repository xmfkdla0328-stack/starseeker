import React from 'react';
import { Magnet, Hand, ArrowLeftRight, Circle } from 'lucide-react';
const InterventionPanel = ({ cp, maxCp, mode, onSelectMode, onUseBlackhole }) => {
    return (
        <div className="w-64 bg-slate-900 border-l border-slate-700 pl-4 flex flex-col gap-2">
            <div className="flex justify-between items-center text-cyan-400 font-bold mb-1">
                <span>INTERVENTION</span><span className="text-xs font-mono">{cp}/{maxCp} CP</span>
            </div>
            <div className="flex gap-1 mb-2">
                {[0,1,2,3].map(i => (
                    <div key={i} className={`h-2 flex-1 rounded-sm transition-colors ${cp >= (i+1)*250 ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-gray-800'}`}></div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
                <button onClick={() => onSelectMode('pull')} className={`rounded border p-2 flex flex-col items-center justify-center gap-1 ${mode === 'pull' ? 'bg-cyan-900 border-cyan-400 text-cyan-100' : 'bg-slate-800 text-slate-400'}`}>
                    <Magnet size={20} /><span className="text-xs font-bold">중력 가속</span><span className="text-[10px] opacity-70">250 CP</span>
                </button>
                <button onClick={() => onSelectMode('push')} className={`rounded border p-2 flex flex-col items-center justify-center gap-1 ${mode === 'push' ? 'bg-orange-900 border-orange-400 text-orange-100' : 'bg-slate-800 text-slate-400'}`}>
                    <Hand size={20} /><span className="text-xs font-bold">궤도 이탈</span><span className="text-[10px] opacity-70">250 CP</span>
                </button>
                <button onClick={() => onSelectMode('swap')} className={`rounded border p-2 flex flex-col items-center justify-center gap-1 ${mode === 'swap' ? 'bg-purple-900 border-purple-400 text-purple-100' : 'bg-slate-800 text-slate-400'}`}>
                    <ArrowLeftRight size={20} /><span className="text-xs font-bold">인과 교차</span><span className="text-[10px] opacity-70">500 CP</span>
                </button>
                <button onClick={onUseBlackhole} className="rounded border border-slate-600 bg-slate-950 p-2 flex flex-col items-center justify-center gap-1 hover:bg-black group">
                    <Circle size={20} className="group-hover:text-red-500" /><span className="text-xs font-bold group-hover:text-red-400">블랙홀</span><span className="text-[10px] text-slate-500">1000 CP</span>
                </button>
            </div>
            <div className="text-[10px] text-slate-500 text-center mt-2">* 스킬 선택 후 타겟 클릭</div>
        </div>
    );
};
export default InterventionPanel;
