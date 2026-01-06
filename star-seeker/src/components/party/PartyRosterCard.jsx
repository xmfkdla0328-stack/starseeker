import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ElementIcon } from '../common/ElementIcon';
import { getRoleLabel, getRoleColor } from '../../utils/roleHelpers';
import { ELEMENTS } from '../../constants/index';

/**
 * 파티 대기 명단 캐릭터 카드
 */
export const PartyRosterCard = ({ char, isDeployed, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative p-3 rounded-lg border transition-all cursor-pointer ${
        isDeployed
          ? 'bg-slate-800/40 border-slate-700/50 opacity-60'
          : isSelected
            ? 'bg-cyan-900/30 border-cyan-400/60 shadow-lg shadow-cyan-500/20'
            : 'bg-slate-900/60 border-slate-700/40 hover:border-cyan-400/40 hover:bg-slate-800/60'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${ELEMENTS[char.element].bg} border ${ELEMENTS[char.element].border} flex items-center justify-center shrink-0`}>
          <ElementIcon element={char.element} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-slate-100 truncate">{char.name}</div>
          <div className={`text-xs font-semibold ${getRoleColor(char.role)}`}>
            {getRoleLabel(char.role)}
          </div>
        </div>
      </div>
      {isDeployed && (
        <div className="absolute top-2 right-2 bg-cyan-500/20 border border-cyan-400/40 rounded-full px-2 py-0.5 flex items-center gap-1">
          <CheckCircle size={12} className="text-cyan-400" />
          <span className="text-[10px] font-bold text-cyan-300 uppercase">배치됨</span>
        </div>
      )}
    </div>
  );
};
