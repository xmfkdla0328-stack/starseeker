import React, { useEffect, useState } from 'react';
import { X, Star, Sparkles } from 'lucide-react';
import { ELEMENTS } from '../constants';

export const GachaResultModal = ({ results, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showAnimation) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
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
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900/80 via-indigo-950/70 to-black/80 border border-cyan-400/20 rounded-2xl shadow-[0_0_60px_rgba(34,211,238,0.3)] overflow-hidden">
        
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
        <div className="relative p-8 z-5">
          <div className="space-y-6">
            {results.map((char, idx) => (
              <div
                key={idx}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {/* 캐릭터 카드 */}
                <div className={`p-4 rounded-xl border backdrop-blur-sm transition-all ${
                  char.rarity >= 5
                    ? 'bg-gradient-to-br from-yellow-500/15 to-amber-600/15 border-yellow-400/30 shadow-[0_0_20px_rgba(250,204,21,0.2)]'
                    : char.rarity === 4
                    ? 'bg-gradient-to-br from-purple-500/15 to-pink-600/15 border-purple-400/30'
                    : 'bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border-cyan-400/30'
                }`}>
                  <div className="flex items-center gap-4">
                    {/* 아바타 */}
                    <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-xl ${
                      char.rarity >= 5
                        ? 'border-yellow-400/50 bg-yellow-500/20 text-yellow-300'
                        : char.rarity === 4
                        ? 'border-purple-400/50 bg-purple-500/20 text-purple-300'
                        : 'border-cyan-400/50 bg-cyan-500/20 text-cyan-300'
                    }`}>
                      {char.name[0]}
                    </div>

                    {/* 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-serif font-bold text-white truncate">
                          {char.name}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${
                          char.rarity >= 5
                            ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/30'
                            : char.rarity === 4
                            ? 'bg-purple-500/30 text-purple-200 border border-purple-400/30'
                            : 'bg-blue-500/30 text-blue-200 border border-blue-400/30'
                        }`}>
                          ★{char.rarity}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className={`px-2 py-0.5 rounded border ${ELEMENTS[char.element].border} ${ELEMENTS[char.element].color} bg-black/30`}>
                          {ELEMENTS[char.element].name}
                        </span>
                        <span>{char.role === 'FRONT' ? '전열' : char.role === 'BACK' ? '후열' : '만능'}</span>
                      </div>

                      <p className="text-xs text-slate-400 italic mt-2 line-clamp-2">
                        "{char.desc}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
