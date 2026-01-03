/**
 * 캐릭터 역할(role) 관련 유틸리티 함수
 */

/**
 * 역할을 한글 레이블로 변환
 * @param {string} role - 역할 ('INTERCEPTOR', 'EXECUTOR', 'STABILIZER', 'PATHFINDER')
 * @returns {string} 한글 레이블
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
 * 역할에 따른 색상 반환
 * @param {string} role - 역할
 * @returns {string} Tailwind 색상 클래스
 */
export const getRoleColor = (role) => {
  const colorMap = {
    INTERCEPTOR: 'text-emerald-300',
    EXECUTOR: 'text-red-300',
    STABILIZER: 'text-sky-300',
    PATHFINDER: 'text-amber-300',
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
    INTERCEPTOR: 'bg-emerald-600/15',
    EXECUTOR: 'bg-red-600/15',
    STABILIZER: 'bg-sky-600/15',
    PATHFINDER: 'bg-amber-500/15',
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
    INTERCEPTOR: 'border-emerald-400/40',
    EXECUTOR: 'border-red-400/40',
    STABILIZER: 'border-sky-400/40',
    PATHFINDER: 'border-amber-300/40',
  };
  return borderMap[role] || 'border-slate-500/50';
};
