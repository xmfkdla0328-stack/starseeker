/**
 * 애니메이션 관련 스타일 헬퍼 함수들
 */

/**
 * 애니메이션 딜레이 스타일 반환
 * @param {number} index 인덱스
 * @param {number} delayPerItem 각 항목당 딜레이 (초)
 * @returns {Object} 스타일 객체
 */
export const getAnimationDelay = (index, delayPerItem = 0.2) => {
  return { '--animation-delay': `${index * delayPerItem}s` };
};
