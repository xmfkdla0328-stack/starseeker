import React, { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { GachaCharacterCard } from './gacha/GachaCharacterCard';
import { GachaAnimation } from './gacha/GachaAnimation';

export const GachaResultModal = ({ results, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showAnimation) {
    return <GachaAnimation onSkip={() => setShowAnimation(false)} />;
  }

  // 결과 창
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900/80 via-indigo-950/70 to-black/80 border border-cyan-400/20 rounded-2xl shadow-[0_0_60px_rgba(34,211,238,0.3)] overflow-hidden flex flex-col">
        
        {/* 성운 배경 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-cyan-500/15 via-blue-600/8 to-transparent rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-purple-600/15 via-indigo-700/8 to-transparent rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none"></div>

        {/* 헤더 */}
        <div className="relative border-b border-cyan-400/15 bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-blue-500/10 p-3 backdrop-blur-md z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
              <h2 className="text-lg font-bold text-cyan-200">별의 운명</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-cyan-400/60 hover:text-cyan-300 hover:bg-white/5 transition-all rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 결과 */}
        <div className="relative p-6 z-5 flex-1 overflow-y-auto">
          <div className={`gap-4 ${
            results.length === 1
              ? 'flex justify-center'
              : 'grid grid-cols-5'
          }`}>
            {results.map((char, idx) => (
              <GachaCharacterCard 
                key={idx} 
                char={char} 
                idx={idx} 
                isSingle={results.length === 1}
              />
            ))}
          </div>

          {/* 결과 요약 */}
          <div className="mt-6 pt-6 border-t border-cyan-400/15">
            <p className="text-sm text-center text-cyan-300">
              총 <span className="font-bold">{results.length}</span>명의 별을 만났습니다
            </p>
          </div>
        </div>

        {/* 확인 버튼 */}
        <div className="relative border-t border-cyan-400/15 bg-gradient-to-r from-cyan-500/5 via-indigo-500/3 to-blue-500/5 p-3 flex justify-center z-10 backdrop-blur-md">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 text-cyan-300 rounded-lg hover:border-cyan-400/60 hover:bg-cyan-500/30 transition-all duration-300 font-bold text-sm uppercase tracking-widest"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
