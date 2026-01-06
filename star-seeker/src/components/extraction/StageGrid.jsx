import React from 'react';
import { StageCard } from './StageCard';

/**
 * 스테이지 목록 그리드
 */
export const StageGrid = ({ stages, selectedStage, onSelectStage }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {stages.map((stage) => (
        <StageCard
          key={stage.id}
          stage={stage}
          isSelected={selectedStage?.id === stage.id}
          onClick={() => onSelectStage(stage)}
        />
      ))}
    </div>
  );
};
