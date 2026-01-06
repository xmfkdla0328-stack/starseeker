import React from 'react';

/**
 * 전술 가이드 모달의 탭 버튼 컴포넌트
 */
export const TabButton = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 px-6 font-bold text-sm uppercase tracking-wider transition-all ${
        isActive
          ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        <Icon size={16} />
        {label}
      </span>
    </button>
  );
};
