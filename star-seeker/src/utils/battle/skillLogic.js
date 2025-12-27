import { BATTLE_CONST } from './constants';
import { executeSkillEffect } from './skillEffects';

/**
 * 후열 서포트 스킬 효과 적용 함수 (리팩토링 버전)
 * 캐릭터 데이터에 정의된 효과를 실행하는 범용 엔진
 * @param {Object} actor 행동하는 캐릭터
 * @param {string} skillType 'SKILL' | 'ULT'
 * @param {Array} currentAllies 현재 아군 상태 배열
 * @returns {Object} { newAllies, logMsg }
 */
export const applySupportEffect = (actor, skillType, currentAllies) => {
  // 캐릭터에 정의된 효과 가져오기
  const effectKey = skillType === 'ULT' ? 'ultimate' : 'skill';
  const effect = actor.supportEffects?.[effectKey];
  
  // 효과가 정의되지 않은 경우 기본 공격력 버프 적용 (하위 호환성)
  if (!effect) {
    const val = skillType === 'ULT' ? BATTLE_CONST.ATK_BUFF_ULT : BATTLE_CONST.ATK_BUFF_NORMAL;
    const newAllies = currentAllies.map(t => {
      if (t.position === 'FRONT' && !t.isDead) {
        return { ...t, buffs: [...t.buffs, { type: 'ATK_UP', val: val, duration: BATTLE_CONST.DEFAULT_BUFF_DURATION }] };
      }
      return t;
    });
    return {
      newAllies,
      logMsg: `(전열 공격력 +${val}%)`
    };
  }
  
  // 데이터 기반 효과 실행
  return executeSkillEffect(actor, effect, currentAllies);
};