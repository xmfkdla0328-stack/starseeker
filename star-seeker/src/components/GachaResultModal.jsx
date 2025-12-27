import React, { useEffect, useState } from 'react';
import { X, Star, Sparkles } from 'lucide-react';
import { GachaCharacterCard } from './gacha/GachaCharacterCard';

export const GachaResultModal = ({ results, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showAnimation) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        {/* 스킵 버튼 */}
        <button
          onClick={() => setShowAnimation(false)}
          className="absolute top-4 right-4 px-3 py-1.5 rounded-lg border border-cyan-400/40 text-cyan-300 bg-white/5 hover:bg-white/10 hover:border-cyan-400/60 transition-all text-xs font-bold tracking-widest"
        >
          스킵
        </button>
        {/* 가챠 애니메이션 */}
        <div className="flex flex-col items-center justify-center gap-8">
          {/* 회전하는 빛 */}
          <div className="relative w-40 h-40">
            {/* 외부 원 */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-400 animate-spin"></div>
            {/* 중간 원 */}
            <div className="absolute inset-4 rounded-full border-2 border-transparent border-b-yellow-300 border-l-blue-400 animate-spin" style={{ animationDirection: 'reverse' }}></div>
            {/* 내부 원 */}
            <div className="absolute inset-8 rounded-full border-2 border-transparent border-t-purple-300 border-r-cyan-300 animate-spin"></div>

            {/* 중앙 별 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Star className="w-12 h-12 text-yellow-300 animate-pulse fill-yellow-300" />
                <div className="absolute inset-0 animate-ping">
                  <Star className="w-12 h-12 text-yellow-200 fill-yellow-200 opacity-75" />
                </div>
              </div>
            </div>
          </div>

          {/* 애니메이션 텍스트 */}
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-cyan-200 animate-pulse">
              별을 찾고 있습니다...
            </p>
            <p className="text-sm text-cyan-300/60 mt-2">무언가 나타날 예감이...</p>
          </div>

          {/* 입자 효과 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-float opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 결과 창
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-slate-900/80 via-indigo-950/70 to-black/80 border border-cyan-400/20 rounded-2xl shadow-[0_0_60px_rgba(34,211,238,0.3)] overflow-hidden flex flex-col">
        
        {/* 성운 배경 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-cyan-500/15 via-blue-600/8 to-transparent rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-purple-600/15 via-indigo-700/8 to-transparent rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none"></div>

        {/* 헤더 */}
        <div className="relative border-b border-cyan-400/15 bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-blue-500/10 p-6 backdrop-blur-md z-10">
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
        <div className="relative border-t border-cyan-400/15 bg-gradient-to-r from-cyan-500/5 via-indigo-500/3 to-blue-500/5 p-4 flex justify-center z-10 backdrop-blur-md">
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
