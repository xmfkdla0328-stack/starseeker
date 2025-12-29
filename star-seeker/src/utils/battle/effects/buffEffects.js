import { BATTLE_CONST } from '../constants';
import { applyUltLevelBonus } from '../skillLogic';

/**
 * 버프 효과 관련 함수들
 */

/**
 * 전열 공격력 버프 효과
 */
export const applyFrontAtkBuff = (actor, params, allies) => {
  let value = params.value || BATTLE_CONST.ATK_BUFF_NORMAL;
  
  // 돌파 보너스 적용 (버프 값 증가 - ultLevel 당 +10%)
  value = applyUltLevelBonus(value, actor.ultLevel || 0);
  
  const duration = params.duration || BATTLE_CONST.DEFAULT_BUFF_DURATION;

  const newAllies = allies.map(t => {
    if (t.position === 'FRONT' && !t.isDead) {
      return { ...t, buffs: [...(t.buffs || []), { type: 'ATK_UP', val: value, duration }] };
    }
    return t;
  });

  return {
    newAllies,
    logMsg: `(전열 공격력 +${value}%)`
  };
};

/**
 * 전열 방어력 버프 효과
 */
export const applyFrontDefBuff = (actor, params, allies) => {
  let value = params.value || BATTLE_CONST.DEF_BUFF_VAL;
  
  // 돌파 보너스 적용 (버프 값 증가 - ultLevel 당 +10%)
  value = applyUltLevelBonus(value, actor.ultLevel || 0);
  
  const duration = params.duration || BATTLE_CONST.DEFAULT_BUFF_DURATION;

  const newAllies = allies.map(t => {
    if (t.position === 'FRONT' && !t.isDead) {
      return { ...t, buffs: [...(t.buffs || []), { type: 'DEF_UP', val: value, duration }] };
    }
    return t;
  });

  return {
    newAllies,
    logMsg: `(전열 방어력 +${value}%)`
  };
};
