/**
 * 속성 시너지 판정 로직
 * @module utils/battle/synergy
 */

// tacticsData에서 시너지 찾기 함수 임포트
// 실제 구현은 tacticsData.js의 getSynergy 사용

/**
 * 두 속성의 시너지 효과를 계산합니다
 * @param {string} element1 - 첫 번째 속성
 * @param {string} element2 - 두 번째 속성
 * @returns {object|null} - 시너지 정보 또는 null
 */
export function calculateSynergy(element1, element2) {
  if (!element1 || !element2) return null;
  
  // TODO: tacticsData의 실제 함수 이름 확인 후 연결
  // return getSynergyRecipe(element1, element2);
  return null;
}

/**
 * 속성 반응이 발동되었는지 확인합니다
 * @param {string} reactionType - 반응 타입
 * @returns {boolean} - 반응 발동 여부
 */
export function hasReaction(reactionType) {
  return reactionType && reactionType !== 'null' && reactionType !== 'NONE';
}

/**
 * 연속 속성 공격 판정 (콤보 시스템)
 * @param {Array<string>} recentElements - 최근 사용된 속성 배열
 * @param {number} comboThreshold - 콤보 판정 임계값
 * @returns {boolean} - 콤보 발동 여부
 */
export function checkCombo(recentElements, comboThreshold = 3) {
  if (!Array.isArray(recentElements) || recentElements.length < comboThreshold) {
    return false;
  }
  
  // 최근 N개의 속성이 모두 동일한지 확인
  const lastElements = recentElements.slice(-comboThreshold);
  const firstElement = lastElements[0];
  
  return lastElements.every(el => el === firstElement);
}

/**
 * 속성 반응 체인 계산 (연쇄 반응)
 * @param {Array<string>} reactionHistory - 반응 히스토리 배열
 * @returns {number} - 체인 배율 (1.0 ~ 2.0)
 */
export function calculateReactionChain(reactionHistory) {
  if (!Array.isArray(reactionHistory) || reactionHistory.length === 0) {
    return 1.0;
  }
  
  const chainLength = reactionHistory.length;
  const chainBonus = Math.min(chainLength * 0.2, 1.0); // 최대 100% 보너스
  
  return 1.0 + chainBonus;
}

/**
 * 속성 상성 판정 (유리/불리)
 * @param {string} attackerElement - 공격자 속성
 * @param {string} defenderElement - 방어자 속성
 * @returns {number} - 상성 배율 (0.5 ~ 1.5)
 */
export function getElementAdvantage(attackerElement, defenderElement) {
  // 기본 상성 테이블 (간단한 예시)
  const advantageTable = {
    FIRE: { weak: 'ENTROPY', strong: 'ICE' },
    ICE: { weak: 'FIRE', strong: 'TIME' },
    LIGHT: { weak: 'VOID', strong: 'FIRE' },
    VOID: { weak: 'LIGHT', strong: 'ICE' },
    ENTROPY: { weak: 'TIME', strong: 'LIGHT' },
    TIME: { weak: 'LIGHT', strong: 'ENTROPY' },
  };
  
  const matchup = advantageTable[attackerElement];
  if (!matchup) return 1.0;
  
  if (defenderElement === matchup.strong) {
    return 1.5; // 유리
  }
  if (defenderElement === matchup.weak) {
    return 0.5; // 불리
  }
  
  return 1.0; // 중립
}
