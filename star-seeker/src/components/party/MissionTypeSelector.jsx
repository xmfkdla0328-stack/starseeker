import React from 'react';
import { MISSION_TYPES } from '../../utils/battle/gaugeLogic';

/**
 * 미션 타입 선택 컴포넌트
 */
export const MissionTypeSelector = ({ missionType, onMissionTypeChange }) => {
  const missionOptions = [
    { type: MISSION_TYPES.CHAOS, label: '혼돈 (CHAOS)' },
    { type: MISSION_TYPES.SILENCE, label: '침묵 (SILENCE)' },
  ];

  return (
    <div className="flex items-center gap-4 flex-nowrap">
      <span className="text-sm text-slate-400 font-semibold whitespace-nowrap flex-shrink-0">인과 연산:</span>
      <div className="flex gap-2">
        {missionOptions.map(({ type, label }) => {
          const isActive = missionType === type;
          return (
            <button
              key={type}
              onClick={() => onMissionTypeChange(type)}
              className={`px-6 py-2 rounded-lg font-bold text-sm border-2 transition-all ${
                isActive
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100 shadow-lg shadow-cyan-500/30'
                  : 'border-slate-600 bg-slate-800/40 text-slate-300 hover:border-cyan-400/60'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
