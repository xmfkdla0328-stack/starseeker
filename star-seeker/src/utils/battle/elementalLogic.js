/**
 * 속성 반응 시스템 (Elemental Logic)
 * 
 * Physics Engine의 CheckReaction 함수를 래핑하여 게임 로직에 제공합니다.
 * React State나 Hooks와 독립적입니다.
 */

import { CheckReaction, isReactionTriggered, getPhenomenonDescription } from './physicsEngine';

/**
 * 두 속성의 반응을 확인합니다.
 * Physics Engine의 CheckReaction 함수를 호출합니다.
 * 
 * @param {string} attackerElement 공격자 속성
 * @param {string} targetElement 타겟 속성
 * @returns {string|null} 현상명 또는 null
 * @deprecated 이 함수 대신 직접 CheckReaction을 사용하세요.
 */
export const checkReaction = (attackerElement, targetElement) => {
  return CheckReaction(attackerElement, targetElement);
};

// Physics Engine의 모든 export를 재export
export {
  CheckReaction,
  Elements,
  Phenomena,
  isReactionTriggered,
  getPhenomenonDescription,
  getChaosAdvantageousPhenomena,
  getSilenceAdvantageousPhenomena,
  isChaosAdvantage,
  isSilenceAdvantage,
} from './physicsEngine';

