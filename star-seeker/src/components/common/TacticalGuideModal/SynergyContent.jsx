import React from 'react';

/**
 * 시너지 탭 콘텐츠 컴포넌트
 */
export const SynergyContent = ({ recipes, SynergyCard }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400 mb-6 pb-4 border-b border-slate-700/50">
        두 가지 속성을 조합하여 강력한 인과 연산을 발동시킬 수 있습니다. 적에게 먼저 속성을 부여한 뒤, 다른 속성으로 공격하면 반응이 일어납니다.
      </p>
      {recipes.map((recipe, idx) => (
        <SynergyCard key={idx} recipe={recipe} />
      ))}
    </div>
  );
};
