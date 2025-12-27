/**
 * 캐릭터 역할(role) 관련 유틸리티 함수
 */

/**
 * 역할을 한글 레이블로 변환
 * @param {string} role - 역할 ('FRONT', 'BACK', 'BOTH')
 * @returns {string} 한글 레이블
 */
export const getRoleLabel = (role) => {
  const roleMap = {
    FRONT: '전열',
    BACK: '후열',
    BOTH: '만능',
  };
  return roleMap[role] || role;
};

/**
 * 역할에 따른 색상 반환
 * @param {string} role - 역할
 * @returns {string} Tailwind 색상 클래스
 */
export const getRoleColor = (role) => {
  const colorMap = {
    FRONT: 'text-red-300',
    BACK: 'text-blue-300',
    BOTH: 'text-purple-300',
  };
  return colorMap[role] || 'text-slate-300';
};

/**
 * 역할에 따른 배경색 반환
 * @param {string} role - 역할
 * @returns {string} Tailwind 배경색 클래스
 */
export const getRoleBg = (role) => {
  const bgMap = {
    FRONT: 'bg-red-500/20',
    BACK: 'bg-blue-500/20',
    BOTH: 'bg-purple-500/20',
  };
  return bgMap[role] || 'bg-slate-500/20';
};

/**
 * 역할에 따른 테두리색 반환
 * @param {string} role - 역할
 * @returns {string} Tailwind 테두리 클래스
 */
export const getRoleBorder = (role) => {
  const borderMap = {
    FRONT: 'border-red-500/50',
    BACK: 'border-blue-500/50',
    BOTH: 'border-purple-500/50',
  };
  return borderMap[role] || 'border-slate-500/50';
};
