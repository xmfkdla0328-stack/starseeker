import React from 'react';
import { CharacterStatsGrid } from './CharacterStatsGrid';
import { BreakthroughDisplay } from './BreakthroughDisplay';
import { LevelCapDisplay } from './LevelCapDisplay';
import { CharacterSkillsList } from './CharacterSkillsList';

/**
 * 캐릭터 전투 정보 탭 컴포넌트
 * 스탯 및 스킬 정보 표시
 */
export const CharacterInfoTab = ({ charData, getSkillInfo, items, onBreakthrough }) => {
  return (
    <div className="space-y-6 relative z-10 animate-fade-in">
      {/* 스탯 그리드 */}
      <CharacterStatsGrid charData={charData} />

      {/* 레벨 캡 및 돌파 정보 */}
      <LevelCapDisplay charData={charData} items={items} onBreakthrough={onBreakthrough} />

      {/* 돌파 정보 (필살기) */}
      <BreakthroughDisplay ultLevel={charData.ultLevel} />

      {/* 스킬 목록 */}
      <CharacterSkillsList charData={charData} getSkillInfo={getSkillInfo} ultLevel={charData.ultLevel || 0} />
    </div>
  );
};
