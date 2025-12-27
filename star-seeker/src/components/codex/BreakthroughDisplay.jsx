import React from 'react';
import { Star } from 'lucide-react';

/**
 * 필살기 돌파 레벨 표시 컴포넌트
 */
export const BreakthroughDisplay = ({ ultLevel = 0 }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-bold text-purple-300">필살기 돌파</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`transition-all ${
                i < (ultLevel || 0)
                  ? 'fill-purple-400 text-purple-400'
                  : 'text-slate-600'
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-bold text-purple-200">
            {ultLevel || 0} / 5
          </span>
        </div>
      </div>
    </div>
  );
};
