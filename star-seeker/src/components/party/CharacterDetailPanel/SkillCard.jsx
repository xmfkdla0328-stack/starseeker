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
      </div>
      <div className="text-xs text-slate-400 mt-1">{skillDetail?.desc || '설명 없음'}</div>
    </div>
  );
};
