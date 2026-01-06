import React from 'react';

export const BackButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`fixed top-4 right-4 z-[100] flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 active:scale-95 ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : ''
      }`}
      title={disabled ? "캐릭터 선택 중에는 비활성화됨" : "닫기"}
      aria-label="Close"
    >
      X
    </button>
  );
};
