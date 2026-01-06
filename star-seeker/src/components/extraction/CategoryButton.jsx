import React from 'react';
import { typeIcons } from './extractionUtils';

/**
 * 던전 카테고리 버튼 컴포넌트
 */
export const CategoryButton = ({ category, isActive, onClick }) => {
  const Icon = typeIcons[category.key];
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 backdrop-blur-sm ${
        isActive
          ? `border-cyan-400/50 bg-gradient-to-r ${category.accent}`
          : 'border-white/10 bg-white/5 hover:border-cyan-300/40'
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center border border-white/10">
        <Icon className="w-5 h-5 text-cyan-200" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold text-white">{category.title}</div>
        <div className="text-xs text-slate-300/80">{category.subtitle}</div>
      </div>
    </button>
  );
};
