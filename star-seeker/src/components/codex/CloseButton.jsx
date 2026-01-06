import React from 'react';

/**
 * 코덱스 화면 닫기 버튼
 */
export const CloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-8 right-8 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 z-50"
      aria-label="닫기"
    >
      X
    </button>
  );
};
