import React from 'react';
import { SkillCard } from './SkillCard';

/**
 * 스킬 정보 섹션
 */
export const CharacterSkills = ({ skillData, skillNames, skillDetails, selectedCharacter }) => {
  return (
    <div className="space-y-2 p-4 pt-0">
      <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Skills</h4>
      <div className="space-y-2">
        {skillData ? (
          <>
            {/* 일반 공격 */}
            {skillNames.normal && (
              <SkillCard
                skillName={skillNames.normal}
                skillDetail={skillDetails.normal}
                skillType="normal"
                selectedCharacter={selectedCharacter}
              />
            )}
            {/* 스킬 */}
            {skillNames.skill && (
              <SkillCard
                skillName={skillNames.skill}
                skillDetail={skillDetails.skill}
                skillType="skill"
                selectedCharacter={selectedCharacter}
              />
            )}
            {/* 필살기 */}
            {skillNames.ultimate && (
              <SkillCard
                skillName={skillNames.ultimate}
                skillDetail={skillDetails.ultimate}
                skillType="ultimate"
                selectedCharacter={selectedCharacter}
              />
            )}
          </>
        ) : (
          <div className="text-xs text-slate-500 italic">No skill data available</div>
        )}
      </div>
    </div>
  );
};
