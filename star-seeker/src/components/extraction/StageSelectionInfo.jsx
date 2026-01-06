import React from 'react';

/**
 * 선택된 스테이지 정보 및 시작 버튼
 */
export const StageSelectionInfo = ({ selectedStage, onStart, disabled }) => {
  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="space-y-1 text-sm text-slate-200">
        <div className="text-xs text-cyan-300/70 font-mono">선택된 스테이지</div>
        <div className="text-lg font-bold text-white">{selectedStage?.name || '스테이지를 선택하세요'}</div>
        {selectedStage && (
          <div className="text-xs text-slate-300">필요 레벨 {selectedStage.level} · 예상 적 전투력 {selectedStage.power}</div>
        )}
      </div>
      <button
        onClick={onStart}
        disabled={disabled}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold border border-cyan-300 shadow-lg hover:scale-[1.01] transition disabled:opacity-40"
      >
        추출 시작
      </button>
    </div>
  );
};
