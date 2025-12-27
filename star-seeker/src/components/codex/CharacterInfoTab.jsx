import React from 'react';
import { Sword, Shield, Wind, Sparkles } from 'lucide-react';
import { SkillBlock } from './SkillBlock';
import { calculateStatsByLevel } from '../../data/playerStats';

/**
 * 캐릭터 전투 정보 탭 컴포넌트
 * 스탯 및 스킬 정보 표시
 */
export const CharacterInfoTab = ({ charData, getSkillInfo }) => {
  
  return (
    <div className="space-y-6 relative z-10 animate-fade-in">
      {/* 스탯 (레벨에 따른 실제 스탯 표시) */}
      {(() => {
        const actualStats = calculateStatsByLevel(charData.baseAtk, charData.baseHp, charData.level || 1);
        return (
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Sword size={12} /> 공격력
              </span>
              <span className="text-xl font-bold text-slate-200">{actualStats.atk}</span>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Shield size={12} /> 체력
              </span>
              <span className="text-xl font-bold text-slate-200">{actualStats.hp}</span>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Shield size={12} /> 방어력
              </span>
              <span className="text-xl font-bold text-slate-200">{charData.baseDef || '-'}</span>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Wind size={12} /> 속도
              </span>
              <span className="text-xl font-bold text-slate-200">{charData.baseSpd || '-'}</span>
            </div>
          </div>
        );
      })()}

      {/* 스킬 목록 */}
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
                cooldown={getSkillInfo('ultimate').cooldown}
                colorClass="bg-red-500 text-red-300 border-red-500"
                accentClass="text-red-200"
                level={charData.skillLevels?.ultimate || 1}
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
                cooldown={getSkillInfo('supportUlt').cooldown}
                colorClass="bg-purple-500 text-purple-300 border-purple-500"
                accentClass="text-purple-200"
                level={charData.skillLevels?.supportUlt || 1}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
