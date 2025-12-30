import React from 'react';
import { X } from 'lucide-react';

export const BackButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`fixed top-4 right-4 z-[100] p-2.5 rounded-lg border text-cyan-200 transition-all duration-300 active:scale-95 ${
        disabled 
          ? 'bg-cyan-500/5 border-cyan-400/10 cursor-not-allowed opacity-50' 
          : 'bg-cyan-500/10 border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-400/50'
      }`}
      title={disabled ? "캐릭터 선택 중에는 비활성화됨" : "닫기"}
    >
      <X size={20} />
    </button>
  );
};
