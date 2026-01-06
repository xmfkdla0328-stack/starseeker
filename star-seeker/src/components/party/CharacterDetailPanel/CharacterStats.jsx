import React from 'react';

/**
 * 캐릭터 통계 표시 섹션
 */
export const CharacterStats = ({ actualStats, selectedCharacter }) => {
  return (
    <div className="space-y-3 p-4">
      <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Statistics</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
          <div className="text-xs text-slate-400">HP</div>
          <div className="text-lg font-bold text-cyan-100">{actualStats.hp || '-'}</div>
        </div>
        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
          <div className="text-xs text-slate-400">ATK</div>
          <div className="text-lg font-bold text-cyan-100">{actualStats.atk || '-'}</div>
        </div>
        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
          <div className="text-xs text-slate-400">DEF</div>
          <div className="text-lg font-bold text-cyan-100">{actualStats.def || '-'}</div>
        </div>
        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
          <div className="text-xs text-slate-400">SPD</div>
          <div className="text-lg font-bold text-cyan-100">{selectedCharacter.baseSpd || '-'}</div>
        </div>
      </div>
      <div className="text-xs text-slate-500 italic mt-2">
        Lv.{selectedCharacter.level || 1} | Breakthrough {selectedCharacter.breakthrough || 0}
      </div>
    </div>
  );
};
