/**
 * 속성 반응 시스템
 * 
 * 도리천 전투에서 두 속성이 만났을 때 발생하는 현상(Phenomenon)을 판정합니다.
 * 각 현상은 독특한 효과와 미션 극복 효율을 가지고 있습니다.
 */

import { REACTION_TABLE, SPECIAL_REACTIONS } from '../../constants/reactions';

/**
 * 두 속성의 반응을 확인하고 현상을 반환합니다.
 * 
 * 규칙 우선순위:
 * 1. 같은 속성 → 반응 없음 (null)
 * 2. PARADOX 포함 → PARADOX_TRIGGER (모든 규칙 초월)
 * 3. AXIOM 포함 → AXIOM_TRIGGER (질서 유지)
 * 4. 표준 반응 테이블 조회 (순서 무관)
 * 
 * @param {string} attackerElement 공격자 속성
 * @param {string} targetElement 타겟 속성
 * @returns {string|null} 현상명 또는 null
 */
export const checkReaction = (attackerElement, targetElement) => {
  // 타겟에 부착된 속성이 없으면 반응 없음
  if (!attackerElement || !targetElement) return null;

  // Rule 1: 같은 속성이면 반응 없음
  if (attackerElement === targetElement) {
    return null;
  }

  // Rule 2: PARADOX가 포함되면 모든 규칙을 무시
  if (attackerElement === 'PARADOX' || targetElement === 'PARADOX') {
    return SPECIAL_REACTIONS.PARADOX_TRIGGER;
  }

  // Rule 3: AXIOM이 포함되면 모든 반응을 중화
  if (attackerElement === 'AXIOM' || targetElement === 'AXIOM') {
    return SPECIAL_REACTIONS.AXIOM_TRIGGER;
  }

  // Rule 4: 표준 반응 테이블에서 조합 검색 (순서 무관)
  const key = `${attackerElement},${targetElement}`;
  return REACTION_TABLE[key] || null;
};
