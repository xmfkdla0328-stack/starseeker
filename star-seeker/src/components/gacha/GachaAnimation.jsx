import React from 'react';
import { Star } from 'lucide-react';

/**
 * 가챠 애니메이션 컴포넌트
 * @param {Function} onSkip - 스킵 버튼 클릭 핸들러
 */
export const GachaAnimation = ({ onSkip }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      {/* 스킵 버튼 */}
      <button
        onClick={onSkip}
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
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
