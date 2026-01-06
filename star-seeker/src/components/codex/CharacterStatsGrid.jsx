import React from 'react';
import { Sword, Shield, Wind } from 'lucide-react';
import { calculateStatsByLevel } from '../../data/playerStats';

export const CharacterStatsGrid = ({ charData }) => {
  const actualStats = calculateStatsByLevel(
    charData.baseAtk, 
    charData.baseHp, 
    charData.level || 1, 
    charData.breakthrough || 0,
    charData.baseDef || charData.currentDef || 30
  );

  // 공통 카드 스타일 (유리 질감)
  const cardStyle = "bg-slate-900/40 backdrop-blur-sm p-3 rounded-lg border border-white/10 flex flex-col gap-1 hover:border-cyan-400/30 transition-colors";
  const labelStyle = "text-xs text-cyan-200/60 flex items-center gap-1.5 font-mono";
  const valueStyle = "text-xl font-bold text-white tracking-wider";

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className={cardStyle}>
        <span className={labelStyle}>
          <Sword size={12} /> ATK
        </span>
        <span className={valueStyle}>{actualStats.atk}</span>
      </div>
      <div className={cardStyle}>
        <span className={labelStyle}>
          <Shield size={12} /> HP
        </span>
        <span className={valueStyle}>{actualStats.hp}</span>
      </div>
      <div className={cardStyle}>
        <span className={labelStyle}>
          <Shield size={12} /> DEF
        </span>
        <span className={valueStyle}>{actualStats.def}</span>
      </div>
      <div className={cardStyle}>
        <span className={labelStyle}>
          <Wind size={12} /> SPD
        </span>
        <span className={valueStyle}>{charData.baseSpd || '-'}</span>
      </div>
    </div>
  );
};
