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
 */
export const CharacterSkillsList = ({ charData, getSkillInfo, ultLevel = 0 }) => {
  return (
    <div>
      <h3 className="text-yellow-100 font-bold mb-3 text-sm flex items-center gap-2">
        <Sparkles size={14} /> 보유 스킬
      </h3>
      <div className="space-y-4">
        {/* 전열 스킬 세트 */}
        {(charData.role === 'FRONT' || charData.role === 'BOTH') && (
          <div className="space-y-2">
            {charData.role === 'BOTH' && (
              <h4 className="text-xs text-red-300 font-bold border-l-2 border-red-500 pl-2 mb-1">전열 배치 시</h4>
            )}
            <SkillBlock
              type="일반"
              name={charData.skills.normal}
              desc={getSkillInfo('normal', '적 1체에게 공격력의 100% 피해').desc}
              cooldown={getSkillInfo('normal').cooldown}
              colorClass="bg-slate-500 text-slate-300 border-slate-500"
              accentClass="text-slate-200"
              level={charData.skillLevels?.normal || 1}
            />
            <SkillBlock
              type="스킬"
              name={charData.skills.skill}
              desc={getSkillInfo('skill', '쿨타임 3턴. 강력한 효과 발동').desc}
              cooldown={getSkillInfo('skill').cooldown}
              colorClass="bg-blue-500 text-blue-300 border-blue-500"
              accentClass="text-blue-200"
              level={charData.skillLevels?.skill || 1}
            />
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
            />
          </div>
        )}

        {/* 후열 스킬 세트 */}
        {(charData.role === 'BACK' || charData.role === 'BOTH') && (
          <div className="space-y-2">
            {charData.role === 'BOTH' && (
              <h4 className="text-xs text-blue-300 font-bold border-l-2 border-blue-500 pl-2 mb-1 mt-2">후열 배치 시</h4>
            )}
            <SkillBlock
              type="지원"
              name={charData.skills.supportSkill}
              desc={getSkillInfo('supportSkill', '아군에게 이로운 효과 부여').desc}
              cooldown={getSkillInfo('supportSkill').cooldown}
              colorClass="bg-emerald-500 text-emerald-300 border-emerald-500"
              accentClass="text-emerald-200"
              level={charData.skillLevels?.supportSkill || 1}
            />
            <SkillBlock
              type="필살"
              name={charData.skills.supportUlt}
              desc={getSkillInfo('supportUlt', 'SP 100 소모. 아군 전체 강력 지원').desc}
              descWithBonus={enhanceUltimateDesc(getSkillInfo('supportUlt', 'SP 100 소모. 아군 전체 강력 지원').desc, ultLevel)}
              cooldown={getSkillInfo('supportUlt').cooldown}
              colorClass="bg-purple-500 text-purple-300 border-purple-500"
              accentClass="text-purple-200"
              level={charData.skillLevels?.supportUlt || 1}
              isUltimate={true}
              ultLevel={ultLevel}
            />
          </div>
        )}
      </div>
    </div>
  );
};
