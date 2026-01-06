import React from 'react';
import { ArrowLeft } from 'lucide-react';

/**
 * 자원 추출 화면 헤더
 */
export const ExtractionHeader = ({ onBack }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center gap-4 border-b border-white/10 backdrop-blur-xl bg-slate-900/50">
      <button
        onClick={onBack}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="flex-1">
        <p className="text-xs text-cyan-300/70 font-mono tracking-[0.3em]">RESOURCE EXTRACTION</p>
        <h1 className="text-2xl font-bold text-white">자원 추출</h1>
      </div>
      <div className="text-right text-xs text-slate-400 font-mono">
        <div>MEM / STAR / STG</div>
        <div className="text-cyan-300">3 Sectors Online</div>
      </div>
    </header>
  );
};
