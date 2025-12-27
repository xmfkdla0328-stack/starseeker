import React from 'react';
import { Sword, Shield, Wind } from 'lucide-react';
import { calculateStatsByLevel } from '../../data/playerStats';

/**
 * 캐릭터 스탯 그리드 컴포넌트
 */
export const CharacterStatsGrid = ({ charData }) => {
  const actualStats = calculateStatsByLevel(charData.baseAtk, charData.baseHp, charData.level || 1);

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
        <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
          <Sword size={12} /> 공격력
        </span>
        <span className="text-xl font-bold text-slate-200">{actualStats.atk}</span>
      </div>
      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
        <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
          <Shield size={12} /> 체력
        </span>
        <span className="text-xl font-bold text-slate-200">{actualStats.hp}</span>
      </div>
      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
        <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
          <Shield size={12} /> 방어력
        </span>
        <span className="text-xl font-bold text-slate-200">{charData.baseDef || '-'}</span>
      </div>
      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
        <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
          <Wind size={12} /> 속도
        </span>
        <span className="text-xl font-bold text-slate-200">{charData.baseSpd || '-'}</span>
      </div>
    </div>
  );
};
