/**
 * 미션 게이지 계산 로직
 * 
 * 도리천 전투 시스템에서 "미션 게이지"는 플레이어가 특정 재앙 관측(Mission)을 얼마나
 * 잘 극복하는지를 나타내는 지표입니다. 속성 반응과 미션 타입을 기반으로 점수를 계산합니다.
 */

import { checkReaction } from './elementalLogic';
import { CHAOS_PHENOMENA, SILENCE_PHENOMENA, SPECIAL_REACTIONS } from '../../constants/reactions';

export const MISSION_TYPES = {
  CHAOS: 'CHAOS',
  SILENCE: 'SILENCE',
};

// ============ 헬퍼 함수들 ============

/**
 * 현상이 미션 타입과 일치하는지 확인
 * @private
 */
const isReactionMatchesMission = (reaction, missionType) => {
  if (missionType === MISSION_TYPES.CHAOS) {
    return CHAOS_PHENOMENA.includes(reaction);
  }
  return SILENCE_PHENOMENA.includes(reaction);
};

/**
 * 공격자 속성이 미션 키 속성과 일치하는지 확인
 * @private
 */
const isElementMatchesMission = (attackerElement, missionType) => {
  if (missionType === MISSION_TYPES.CHAOS) {
    return attackerElement === 'ENTROPY';
  }
  return attackerElement === 'STASIS' || attackerElement === 'GRAVITY';
};

/**
 * 미션 게이지 점수 계산
 * 
 * 알고리즘:
 * 1. 속성 반응 확인 (checkReaction)
 * 2. 특수 속성 처리 (PARADOX +100, AXIOM +30)
 * 3. 콤보 성공 검증 (현상이 미션과 일치하면 +50, 불일치하면 +20)
 * 4. 단일 속성 검증 (공격자 속성이 미션 키 속성과 일치하면 +15)
 * 
 * @param {string} attackerElement 공격자 속성
 * @param {string} targetElement 타겟 속성(현재 미션 부착 속성)
 * @param {string} missionType 미션 타입 ('CHAOS' or 'SILENCE')
 * @returns {number} 획득 점수 (0~100)\n */
export const calculateGaugeScore = (attackerElement, targetElement, missionType) => {
  // Step 1: 속성 반응 확인
  const reaction = checkReaction(attackerElement, targetElement);

  // Step 2: 특수 속성 처리 (우선순위 높음)
  if (reaction === SPECIAL_REACTIONS.PARADOX_TRIGGER) return 100; // 패러독스: 치트
  if (reaction === SPECIAL_REACTIONS.AXIOM_TRIGGER) return 30;   // 공리: 균형

  // Step 3: 콤보 성공 검증
  if (reaction !== null) {
    // 현상이 발생했고 미션과 일치 → 50점 (Best)
    // 현상이 발생했으나 미션과 불일치 → 20점 (Bad)
    return isReactionMatchesMission(reaction, missionType) ? 50 : 20;
  }

  // Step 4: 단일 속성 검증
  // 현상은 없지만 공격자 속성이 미션 키 속성과 일치 → 15점 (Good)
  return isElementMatchesMission(attackerElement, missionType) ? 15 : 0;
};
