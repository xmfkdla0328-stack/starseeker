import React from 'react';
import { X } from 'lucide-react';

export const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-[100] p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 active:scale-95"
      title="닫기"
    >
      <X size={20} />
    </button>
  );
};
