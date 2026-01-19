import React from "react";
import PropTypes from "prop-types";
import { calculateFinalStats, calculateFinalCritStats } from '../../utils/StatCalculator';

const AllyStatusPanel = ({ unit, onClose }) => {
  if (!unit) return null;
  // 실시간 스탯 계산 (버프/패시브/장비 등 모두 반영)
  const finalStats = calculateFinalStats(unit);
  const critStats = calculateFinalCritStats(
    unit,
    unit.equipment || [],
    unit.passives || [],
    unit.buffs || []
  );
  return (
    <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-slate-900/95 border border-cyan-300 rounded-xl shadow-2xl p-6 min-w-[260px] max-w-[340px] text-cyan-100 font-sans select-none">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg drop-shadow">{unit.name}</span>
        <button onClick={onClose} className="text-cyan-200 hover:text-cyan-400 text-xl font-bold">×</button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>HP</div>
        <div className="font-mono">{unit.hp} / {finalStats.hp}</div>
        <div>공격력</div>
        <div className="font-mono">{finalStats.atk}</div>
        <div>방어력</div>
        <div className="font-mono">{finalStats.def}</div>
        <div>치명타 확률</div>
        <div className="font-mono">{critStats.critRate}%</div>
        <div>치명타 피해</div>
        <div className="font-mono">{critStats.critDamage}%</div>
        <div>효과 적중</div>
        <div className="font-mono">{unit.effectHitRate}%</div>
        <div>효과 저항</div>
        <div className="font-mono">{unit.effectResist}%</div>
      </div>
      {/* 버프/디버프/패시브 등 추가 정보 필요시 여기에 */}
    </div>
  );
};

AllyStatusPanel.propTypes = {
  unit: PropTypes.object,
  onClose: PropTypes.func,
};

export default AllyStatusPanel;
