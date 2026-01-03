import { ELEMENTS } from '../constants/index';

/**
 * 요소에 해당하는 Tailwind 클래스 반환
 * @param {string} element - 요소 이름 (예: 'ENTROPY', 'STASIS')
 * @param {string} variant - 'color', 'bg', 'border', 'all' 중 하나
 * @returns {string} Tailwind 클래스 문자열
 */
export const getElementClasses = (element, variant = 'all') => {
  const el = ELEMENTS[element] || ELEMENTS.AXIOM;
  
  switch (variant) {
    case 'color':
      return el.color;
    case 'bg':
      return el.bg;
    case 'border':
      return el.border;
    case 'all':
      return `${el.color} ${el.bg} ${el.border}`;
    default:
      return '';
  }
};

/**
 * 요소 정보 객체 반환
 * @param {string} element - 요소 이름
 * @returns {Object} { name, color, bg, border }
 */
export const getElementInfo = (element) => {
  return ELEMENTS[element] || ELEMENTS.AXIOM;
};

/**
 * 요소 배경을 더 진하게 반환 (색상 표시용)
 * @param {string} element - 요소 이름
 * @returns {string} 진한 배경색 클래스
 */
export const getElementHighlight = (element) => {
  const el = ELEMENTS[element] || ELEMENTS.AXIOM;
  return el.bg.includes('/20') ? el.bg.replace('/20', '/80') : el.bg;
};
