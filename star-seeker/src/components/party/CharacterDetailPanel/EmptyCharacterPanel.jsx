import React from 'react';
import { Lock } from 'lucide-react';

/**
 * 캐릭터가 선택되지 않았을 때 표시하는 빈 상태 컴포넌트
 */
export const EmptyCharacterPanel = () => {
  return (
    <div className="col-span-3 flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl border border-cyan-500/20 overflow-hidden">
      <div className="px-4 py-3 bg-cyan-950/30 border-b border-cyan-500/30">
        <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">상세 정보</h2>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center h-full text-center text-slate-500">
        <Lock size={48} className="opacity-30 mb-4" />
        <p className="text-sm">명단에서 캐릭터를 선택하여 상세 정보를 확인하세요</p>
      </div>
    </div>
  );
};
