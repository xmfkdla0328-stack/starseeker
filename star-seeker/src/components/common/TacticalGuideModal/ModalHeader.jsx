import React from 'react';
import { BookOpen, X } from 'lucide-react';

/**
 * 전술 가이드 모달 헤더 컴포넌트
 */
export const ModalHeader = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-950/50 to-transparent">
      <div className="flex items-center gap-3">
        <BookOpen size={28} className="text-cyan-400" />
        <div>
          <h2 className="text-2xl font-bold text-cyan-100 tracking-wider">전술 데이터베이스</h2>
          <p className="text-xs text-slate-400 mt-1">TACTICAL DATABASE</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300"
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </div>
  );
};
