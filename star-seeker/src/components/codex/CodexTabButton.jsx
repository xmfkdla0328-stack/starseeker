import React from 'react';

/**
 * 코덱스 화면 탭 버튼 컴포넌트
 */
export const CodexTabButton = ({ tabName, displayName, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
        isActive
          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
          : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
      }`}
    >
      {displayName}
    </button>
  );
};
