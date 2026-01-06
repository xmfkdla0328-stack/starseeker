import React from 'react';
import { Sparkles } from 'lucide-react';
import { SkillBlock } from './SkillBlock';

/**
 * 필살기 설명에서 위력을 계산하는 함수
 * 기본 위력과 한계 돌파 보너스를 구분하여 표시
 * @param {string} desc 원본 설명
 * @param {number} ultLevel 한계 돌파 레벨
 * @returns {string} 한계 돌파 보너스가 포함된 설명
 */
const enhanceUltimateDesc = (desc, ultLevel) => {
  if (!ultLevel || ultLevel === 0) return desc;
  
  // 한계 돌파 레벨별 보너스: 1: 20%, 2: 30%, 3: 40%, 4: 50%, 5: 70%
  const bonusLevels = [20, 30, 40, 50, 70];
  const breakthroughBonus = bonusLevels[ultLevel - 1] || 0;
  
  // "220%"와 같은 패턴을 찾아서 "(+20%)"를 추가
  return desc.replace(/(\d+)%(?![\w%])/g, (match, num) => {
    const baseNum = parseInt(num);
    const enhancedNum = baseNum + breakthroughBonus;
    return `${enhancedNum}%(+${breakthroughBonus}%)`;
  });
};

/**
 * 캐릭터 스킬 목록 컴포넌트
 * 모든 캐릭터는 다음 스킬 구성을 가집니다:
 * - 일반 공격 (normal)
 * - 스킬 (skill)
 * - 필살기 (ultimate)
 * - 패시브 스킬 2개 (passive1, passive2)
 */
export const CharacterSkillsList = ({ charData, getSkillInfo, ultLevel = 0 }) => {
  // skillDetails 가져오기
  const skillDetails = charData.skillDetails || {};
  
  return (
    <div>
      <h3 className="text-cyan-200 font-bold mb-3 text-sm flex items-center gap-2 drop-shadow-md">
        <Sparkles size={14} className="text-cyan-400" /> 보유 스킬
      </h3>
      <div className="space-y-4">
        {/* 액티브 스킬 */}
        <div className="space-y-2">
          {charData.skills?.normal && (
            <SkillBlock
              type="일반"
              name={charData.skills.normal}
              desc={getSkillInfo('normal', '적 1체에게 공격력의 100% 피해').desc}
              cooldown={getSkillInfo('normal').cooldown}
              colorClass="bg-slate-500 text-slate-300 border-slate-500"
              accentClass="text-slate-200"
              level={charData.skillLevels?.normal || 1}
              isAttributeAttack={skillDetails.normal?.isAttributeAttack || false}
              element={charData.element}
            />
          )}
          {charData.skills?.skill && (
            <SkillBlock
              type="스킬"
              name={charData.skills.skill}
              desc={getSkillInfo('skill', '쿨타임 3턴. 강력한 효과 발동').desc}
              cooldown={getSkillInfo('skill').cooldown}
              colorClass="bg-blue-500 text-blue-300 border-blue-500"
              accentClass="text-blue-200"
              level={charData.skillLevels?.skill || 1}
              isAttributeAttack={skillDetails.skill?.isAttributeAttack || false}
              element={charData.element}
            />
          )}
          {charData.skills?.ultimate && (
            <SkillBlock
              type="필살"
              name={charData.skills.ultimate}
              desc={getSkillInfo('ultimate', 'SP 100 소모. 전황을 뒤집는 일격').desc}
              descWithBonus={enhanceUltimateDesc(getSkillInfo('ultimate', 'SP 100 소모. 전황을 뒤집는 일격').desc, ultLevel)}
              cooldown={getSkillInfo('ultimate').cooldown}
              colorClass="bg-red-500 text-red-300 border-red-500"
              accentClass="text-red-200"
              level={charData.skillLevels?.ultimate || 1}
              isUltimate={true}
              ultLevel={ultLevel}
              isAttributeAttack={skillDetails.ultimate?.isAttributeAttack || false}
              element={charData.element}
            />
          )}
        </div>

        {/* 패시브 스킬 */}
        {(charData.skills?.passive1 || charData.skills?.passive2) && (
          <div className="space-y-2">
            <h4 className="text-xs text-purple-200 font-bold border-l-2 border-purple-500 pl-2 mb-1">패시브 스킬</h4>
            {charData.skills?.passive1 && (
              <SkillBlock
                type="패시브"
                name={charData.skills.passive1}
                desc={getSkillInfo('passive1', '상시 효과 발동').desc}
                cooldown={0}
                colorClass="bg-purple-500 text-purple-300 border-purple-500"
                accentClass="text-purple-200"
                level={1}
              />
            )}
            {charData.skills?.passive2 && (
              <SkillBlock
                type="패시브"
                name={charData.skills.passive2}
                desc={getSkillInfo('passive2', '상시 효과 발동').desc}
                cooldown={0}
                colorClass="bg-indigo-500 text-indigo-300 border-indigo-500"
                accentClass="text-indigo-200"
                level={1}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
