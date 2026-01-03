/**
 * 캐릭터 관련 스타일 헬퍼 함수들
 */

/**
 * 캐릭터 역할 표시 텍스트 변환
 * @param {string} role 역할 ('INTERCEPTOR', 'EXECUTOR', 'STABILIZER', 'PATHFINDER')
 * @returns {string} 표시할 텍스트
 */
export const getRoleLabel = (role) => {
  const roleMap = {
    INTERCEPTOR: '인터셉터',
    EXECUTOR: '엑시큐터',
    STABILIZER: '스테빌라이저',
    PATHFINDER: '패스파인더',
  };
  return roleMap[role] || role;
};

/**
 * 요소별 스타일 클래스 반환 (ELEMENTS와 함께 사용)
 * @param {string} element 요소 이름 ('ENTROPY', 'STASIS' 등)
 * @param {Object} elementsData ELEMENTS 객체
 * @returns {Object} 요소별 스타일 정보
 */
export const getElementStyle = (element, elementsData) => {
  return elementsData[element] || elementsData.AXIOM;
};

/**
 * 속도에 따른 색상 클래스 반환
 * @param {number} speed 속도 값
 * @returns {string} 색상 클래스
 */
export const getSpeedColorClass = (speed) => {
  if (speed >= 130) return 'text-green-400';
  if (speed >= 110) return 'text-blue-400';
  if (speed >= 90) return 'text-yellow-400';
  return 'text-slate-400';
};
