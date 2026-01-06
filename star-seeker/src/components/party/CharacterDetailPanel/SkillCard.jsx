import React from 'react';
import { ElementIcon } from '../../common/ElementIcon';
import { ELEMENTS } from '../../../constants/index';

/**
 * 단일 스킬 카드 컴포넌트
 */
export const SkillCard = ({ skillName, skillDetail, skillType, selectedCharacter }) => {
  const skillTypeConfig = {
    normal: {
      bgGradient: 'from-slate-700/20 to-transparent',
      borderColor: 'border-slate-600/20',
      textColor: 'text-slate-200',
    },
    skill: {
      bgGradient: 'from-blue-900/20 to-transparent',
      borderColor: 'border-blue-500/20',
      textColor: 'text-blue-200',
    },
    ultimate: {
      bgGradient: 'from-cyan-900/20 to-transparent',
      borderColor: 'border-cyan-500/20',
      textColor: 'text-cyan-200',
    },
  };

  const config = skillTypeConfig[skillType] || skillTypeConfig.normal;

  return (
    <div className={`bg-gradient-to-r ${config.bgGradient} rounded-lg p-3 border ${config.borderColor}`}>
      <div className={`text-sm font-bold ${config.textColor} flex items-center gap-2`}>
        {skillName}
        {skillDetail?.isAttributeAttack && selectedCharacter.element && (
          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border" style={{
            backgroundColor: ELEMENTS[selectedCharacter.element]?.bg?.replace('bg-', '').replace('/', 'rgba(') || 'rgba(251, 191, 36, 0.15)',
            borderColor: ELEMENTS[selectedCharacter.element]?.border?.replace('border-', '').replace('/', 'rgba(') || 'rgba(251, 191, 36, 0.4)',
          }}>
            <ElementIcon element={selectedCharacter.element} size={12} />
            <span className={ELEMENTS[selectedCharacter.element]?.color || 'text-amber-300'}>속성</span>
          </span>
        )}
      </div>
      <div className="text-xs text-slate-400 mt-1">{skillDetail?.desc || '설명 없음'}</div>
    </div>
  );
};
