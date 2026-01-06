import React from 'react';
import { CHARACTER_SKILLS } from '../../data/characters/skillData';
import { calculateStatsByLevel } from '../../data/levelSystem';
import { EmptyCharacterPanel } from './CharacterDetailPanel/EmptyCharacterPanel';
import { CharacterHeader } from './CharacterDetailPanel/CharacterHeader';
import { CharacterStats } from './CharacterDetailPanel/CharacterStats';
import { CharacterSkills } from './CharacterDetailPanel/CharacterSkills';
import { CharacterTags } from './CharacterDetailPanel/CharacterTags';

/**
 * 캐릭터 상세 정보 패널 (우측)
 */
export const CharacterDetailPanel = ({ selectedCharacter }) => {
  if (!selectedCharacter) {
    return <EmptyCharacterPanel />;
  }

  // 레벨에 따른 실제 스탯 계산
  const actualStats = calculateStatsByLevel(
    selectedCharacter.baseAtk || 0,
    selectedCharacter.baseHp || 0,
    selectedCharacter.level || 1,
    selectedCharacter.breakthrough || 0,
    selectedCharacter.baseDef || selectedCharacter.currentDef || 30
  );

  // 캐릭터 스킬 정보 가져오기
  const skillData = CHARACTER_SKILLS[selectedCharacter.id];
  const skillDetails = skillData?.skillDetails || {};
  const skillNames = skillData?.skills || {};

  return (
    <div className="col-span-3 flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl border border-cyan-500/20 overflow-hidden">
      <div className="px-4 py-3 bg-cyan-950/30 border-b border-cyan-500/30">
        <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">상세 정보</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0 flex flex-col">
          {/* 캐릭터 헤더 */}
          <CharacterHeader selectedCharacter={selectedCharacter} />

          {/* 스탯 그리드 */}
          <CharacterStats
            actualStats={actualStats}
            selectedCharacter={selectedCharacter}
          />

          {/* 스킬 정보 */}
          <CharacterSkills
            skillData={skillData}
            skillNames={skillNames}
            skillDetails={skillDetails}
            selectedCharacter={selectedCharacter}
          />

          {/* 태그 */}
          <CharacterTags tags={selectedCharacter.tags} />
        </div>
      </div>
    </div>
  );
};
