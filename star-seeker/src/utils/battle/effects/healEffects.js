import { BATTLE_CONST } from '../constants';
import { applyUltLevelBonus } from '../skillLogic';

/**
 * 힐 효과 관련 함수들
 */

/**
 * 체력 비율이 가장 낮은 아군 힐
 */
export const healLowestHpAlly = (actor, params, allies) => {
  const ratio = params.ratio || BATTLE_CONST.HEAL_NORMAL_RATIO;
  let healAmount = Math.floor(actor.atk * ratio);
  
  // 돌파 보너스 적용 (ultLevel 당 +10%)
  healAmount = applyUltLevelBonus(healAmount, actor.ultLevel || 0);

  // 체력 비율 가장 낮은 아군 찾기
  let targetIdx = -1;
  let minHpPct = 101;
  allies.forEach((t, i) => {
    if (!t.isDead) {
      const pct = (t.hp / t.maxHp) * 100;
      if (pct < minHpPct) {
        minHpPct = pct;
        targetIdx = i;
      }
    }
  });

  if (targetIdx !== -1) {
    const newAllies = [...allies];
    const target = newAllies[targetIdx];
    const newHp = Math.min(target.maxHp, target.hp + healAmount);
    newAllies[targetIdx] = { ...target, hp: newHp };

    return {
      newAllies,
      logMsg: `→ [${target.name}] HP ${healAmount} 회복`
    };
  }

  return {
    newAllies: allies,
    logMsg: '(대상 없음)'
  };
};
