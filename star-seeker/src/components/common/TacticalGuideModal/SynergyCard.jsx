import React from 'react';

/**
 * 시너지 레시피 카드 컴포넌트
 */
export const SynergyCard = ({ recipe }) => {
  return (
    <div className="bg-gradient-to-r from-slate-800/40 to-transparent rounded-xl p-5 border border-slate-700/30 hover:border-cyan-500/40 transition-all">
      <div className="flex items-start gap-4">
        {/* 이모지 아이콘 */}
        <div className="text-4xl shrink-0">{recipe.emoji}</div>
        
        <div className="flex-1">
          {/* 조합식 */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`font-bold ${recipe.colors[0]}`}>{recipe.elements[0]}</span>
            <span className="text-slate-600">+</span>
            <span className={`font-bold ${recipe.colors[1]}`}>{recipe.elements[1]}</span>
            <span className="text-slate-600">=</span>
            <span className="font-bold text-cyan-300">{recipe.name}</span>
            <span className="text-xs text-slate-500 uppercase">({recipe.nameEn})</span>
          </div>
          
          {/* 효과 */}
          <div className="text-sm text-slate-300 mb-2">{recipe.effect}</div>
          
          {/* 용도 */}
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
            💡 {recipe.usage}
          </div>
        </div>
      </div>
    </div>
  );
};
