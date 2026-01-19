import React from "react";
import PropTypes from "prop-types";
import { calculateFinalStats, calculateFinalCritStats, calculateFinalEpRecharge } from '../../utils/StatCalculator';
import BuffIcon from './BuffIcon';
import CritBuffIcon from './CritBuffIcon';
import EpRechargeBuffIcon from './EpRechargeBuffIcon';

const BUFF_DESCRIPTIONS = {
  ATK_UP: {
    icon: <BuffIcon />,
    label: '공격력 증가',
    getDesc: (buff) => `공격력 +${buff.value}%`,
  },
  CRIT_RATE_UP: {
    icon: <CritBuffIcon />,
    label: '치명타 확률 증가',
    getDesc: (buff) => `치명타 확률 +${buff.value}%`,
  },
  EP_RECHARGE_UP: {
    icon: <EpRechargeBuffIcon />,
    label: 'EP 충전 효율 증가',
    getDesc: (buff) => `EP 충전 효율 +${buff.value}%`,
  },
};

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
  const epRecharge = calculateFinalEpRecharge(
    unit,
    unit.equipment || [],
    unit.passives || [],
    unit.buffs || []
  );
  // 적용 중인 버프/패시브/스킬 효과 목록
  const activeBuffs = [
    ...(unit.buffs || []).map(buff => ({
      type: buff.type,
      value: buff.value,
      // source: buff.source, // source 제거
    })),
    ...(unit.passives || []).map(passive => {
      if (passive.critRate) return { type: 'CRIT_RATE_UP', value: passive.critRate };
      if (passive.epRecharge) return { type: 'EP_RECHARGE_UP', value: passive.epRecharge };
      return null;
    }).filter(Boolean),
  ];

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
        <div>EP 충전 효율</div>
        <div className="font-mono">{epRecharge}%</div>
      </div>
      {/* 버프/디버프/패시브 등 추가 정보 */}
      {activeBuffs.length > 0 && (
        <div className="mt-4">
          <div className="text-xs text-cyan-200/80 font-bold mb-1">적용 중인 효과</div>
          <ul className="space-y-1">
            {activeBuffs.map((buff, idx) => {
              const desc = BUFF_DESCRIPTIONS[buff.type];
              return (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  {desc?.icon}
                  <span>{desc ? desc.getDesc(buff) : `${buff.type} +${buff.value}%`}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

AllyStatusPanel.propTypes = {
  unit: PropTypes.object,
  onClose: PropTypes.func,
};

export default AllyStatusPanel;
