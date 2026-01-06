import React from 'react';
import { Users } from 'lucide-react';
import { BackButton } from '../common/BackButton';

/**
 * 파티 화면 헤더
 */
export const PartyHeader = ({ onBack }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-cyan-500/30 bg-slate-950/80 backdrop-blur-sm">
      <BackButton onClick={onBack} />
      <h1 className="text-2xl font-bold text-cyan-100 tracking-wider uppercase flex items-center gap-2">
        <Users size={24} className="text-cyan-400" />
        동행 편성
      </h1>
      <div className="w-20"></div> {/* Spacer for layout balance */}
    </div>
  );
};
