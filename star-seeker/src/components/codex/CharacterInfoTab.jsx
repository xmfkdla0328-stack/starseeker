import React from 'react';
import { CharacterStatsGrid } from './CharacterStatsGrid';
import { BreakthroughDisplay } from './BreakthroughDisplay';
import { CharacterSkillsList } from './CharacterSkillsList';

/**
 * 캐릭터 전투 정보 탭 컴포넌트
 * 스탯 및 스킬 정보 표시
 */
export const CharacterInfoTab = ({ charData, getSkillInfo }) => {
  return (
    <div className="space-y-6 relative z-10 animate-fade-in">
      {/* 스탯 그리드 */}
      <CharacterStatsGrid charData={charData} />

      {/* 돌파 정보 */}
      <BreakthroughDisplay ultLevel={charData.ultLevel} />

      {/* 스킬 목록 */}
      <CharacterSkillsList charData={charData} getSkillInfo={getSkillInfo} />
    </div>
  );
};
