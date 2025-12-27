import { BATTLE_CONST } from '../constants';

/**
 * 서포트 효과 관련 함수들
 */

/**
 * 특정 태그를 가진 전열에게 즉시 턴 부여
 */
export const grantTurnToTaggedAlly = (actor, params, allies) => {
  const targetTag = params.targetTag;
  const newAllies = [...allies];

  if (!targetTag) {
    return { newAllies: allies, logMsg: '(대상 조건 없음)' };
  }

  // 대상 찾기
  const candidates = newAllies.filter(
    t => t.position === 'FRONT' && !t.isDead && t.tags && t.tags.includes(targetTag)
  );

  if (candidates.length > 0) {
    // 랜덤 선택
    const target = candidates[Math.floor(Math.random() * candidates.length)];
    const targetIdx = newAllies.findIndex(t => t.uid === target.uid);

    if (targetIdx !== -1) {
      newAllies[targetIdx] = {
        ...newAllies[targetIdx],
        actionGauge: BATTLE_CONST.MAX_ACTION_GAUGE,
        buffs: [...(newAllies[targetIdx].buffs || []), { type: 'INSTANT_TURN', duration: 1 }]
      };

      return {
        newAllies,
        logMsg: `→ [${newAllies[targetIdx].name}] 행동 기회 추가!`
      };
    }
  }

  return {
    newAllies: allies,
    logMsg: '(대상 없음)'
  };
};
