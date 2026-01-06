import React from 'react';
import { CategoryButton } from './CategoryButton';

/**
 * 던전 카테고리 목록 사이드바
 */
export const CategorySidebar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <aside className="w-[280px] border-r border-white/10 bg-slate-900/40 backdrop-blur-md p-4 space-y-3">
      {categories.map((cat) => (
        <CategoryButton
          key={cat.key}
          category={cat}
          isActive={activeCategory === cat.key}
          onClick={() => onCategoryChange(cat.key)}
        />
      ))}
    </aside>
  );
};
