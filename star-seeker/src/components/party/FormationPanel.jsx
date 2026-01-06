import React from 'react';
import { PartySlotGrid } from './PartySlotGrid';
import { MissionTypeSelector } from './MissionTypeSelector';

/**
 * 작전 배치 패널 (중앙)
 */
export const FormationPanel = ({ 
  members, 
  missionType, 
  onSlotClick, 
  onMissionTypeChange,
}) => {
  return (
    <div className="col-span-6 flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-cyan-100 uppercase tracking-widest mb-2">작전 배치</h2>
        <p className="text-sm text-slate-400">4명의 대원을 선택하여 배치하세요</p>
      </div>

      {/* 4개 슬롯 + 연결선 */}
      <PartySlotGrid members={members} onSlotClick={onSlotClick} />

      {/* 미션 타입 선택 */}
      <MissionTypeSelector 
        missionType={missionType} 
        onMissionTypeChange={onMissionTypeChange}
      />
    </div>
  );
};
