/**
 * 전투 관련 스타일 헬퍼 함수들
 */

/**
 * HP 비율에 따른 색상 클래스 반환
 * @param {number} hpRatio HP 비율 (0~1)
 * @returns {string} 색상 클래스
 */
export const getHpColorClass = (hpRatio) => {
  if (hpRatio > 0.6) return 'bg-green-500';
  if (hpRatio > 0.3) return 'bg-yellow-500';
  return 'bg-red-500';
};

/**
 * 버프/디버프 타입에 따른 색상 반환
 * @param {string} type 버프 타입
 * @returns {string} 색상 클래스
 */
export const getBuffColorClass = (type) => {
  if (type.includes('ATK')) return 'text-red-400';
  if (type.includes('DEF')) return 'text-blue-400';
  if (type.includes('HEAL')) return 'text-green-400';
  if (type.includes('SHIELD')) return 'text-cyan-400';
  return 'text-slate-400';
};
