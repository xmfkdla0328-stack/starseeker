/**
 * 스킬 효과 타입 정의 및 실행 엔진
 * 캐릭터 데이터에서 정의된 효과를 실행하는 범용 시스템
 */

import { EFFECT_TYPES } from './effectTypes';
import { applyFrontAtkBuff, applyFrontDefBuff } from './effects/buffEffects';
import { healLowestHpAlly } from './effects/healEffects';
import { grantTurnToTaggedAlly } from './effects/supportEffects';

/**
 * 스킬 효과 타입 정의
 * 
 * BUFF_FRONT_ATK: 전열에게 공격력 버프
 * BUFF_FRONT_DEF: 전열에게 방어력 버프
 * HEAL_LOWEST: 체력이 가장 낮은 아군 힐
 * GRANT_TURN: 특정 태그를 가진 전열에게 즉시 턴 부여
 */
export { EFFECT_TYPES } from './effectTypes';

/**
 * 스킬 효과 실행 함수들
 */
const effectExecutors = {
  [EFFECT_TYPES.BUFF_FRONT_ATK]: applyFrontAtkBuff,
  [EFFECT_TYPES.BUFF_FRONT_DEF]: applyFrontDefBuff,
  [EFFECT_TYPES.HEAL_LOWEST]: healLowestHpAlly,
  [EFFECT_TYPES.GRANT_TURN]: grantTurnToTaggedAlly,
};

/**
 * 스킬 효과 실행 메인 함수
 * @param {Object} actor 행동하는 캐릭터
 * @param {Object} effect 효과 정의 객체 { type, params }
 * @param {Array} allies 현재 아군 배열
 * @returns {Object} { newAllies, logMsg }
 */
export const executeSkillEffect = (actor, effect, allies) => {
  const executor = effectExecutors[effect.type];
  
  if (!executor) {
    console.warn(`Unknown effect type: ${effect.type}`);
    return { newAllies: allies, logMsg: '(효과 없음)' };
  }
  
  return executor(actor, effect.params || {}, allies);
};
