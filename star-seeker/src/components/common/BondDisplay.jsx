import React from 'react';
import { Heart } from 'lucide-react';
import { BOND_LEVELS } from '../../data/characters';

/**
 * 캐릭터 인연도 표시 컴포넌트
 * @param {number} bondLevel - 현재 인연도 (0-5)
 * @param {boolean} detailed - 상세 정보 표시 여부
 */
export const BondDisplay = ({ bondLevel = 0, detailed = false }) => {
  const level = Math.min(5, Math.max(0, Math.floor(bondLevel)));
  const progress = (bondLevel % 1) * 100; // 소수점 부분을 진행도로 표현
  const levelInfo = BOND_LEVELS[level];

  return (
    <div className="flex flex-col gap-2">
      {/* 하트 표시 */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Heart
            key={i}
            size={16}
            className={`transition-all ${
              i < level ? 'fill-red-400 text-red-400' : 'text-slate-600'
            }`}
          />
        ))}
      </div>

      {/* 진행도 바 */}
      {level < 5 && (
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-400 to-pink-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* 상세 정보 */}
      {detailed && levelInfo && (
        <div className="text-xs text-slate-300 space-y-1">
          <p className="font-bold text-red-400">Lv. {level}: {levelInfo.name}</p>
          <p className="text-slate-400">"{levelInfo.story}"</p>
        </div>
      )}
    </div>
  );
};
