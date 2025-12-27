/**
 * 카드 및 컨테이너 스타일 헬퍼
 */

/**
 * 섹션 배경색 조합 반환
 * @param {string} theme - 테마 이름 ('cyan', 'slate', 'emerald', 'purple', 'red', 'blue')
 * @returns {string} 그라데이션과 테두리 클래스 조합
 */
export const getSectionStyles = (theme = 'slate') => {
  const themeStyles = {
    cyan: {
      gradient: 'from-cyan-500/10 to-blue-600/10',
      border: 'border-cyan-300/15',
      hover: 'hover:border-cyan-300/25 hover:bg-cyan-500/15',
    },
    slate: {
      gradient: 'from-slate-700/20 to-slate-800/20',
      border: 'border-slate-500/15',
      hover: 'hover:border-slate-500/25 hover:bg-slate-500/10',
    },
    emerald: {
      gradient: 'from-emerald-500/10 to-green-600/10',
      border: 'border-emerald-300/15',
      hover: 'hover:border-emerald-300/25 hover:bg-emerald-500/15',
    },
    purple: {
      gradient: 'from-purple-500/8 to-violet-600/8',
      border: 'border-purple-300/15',
      hover: 'hover:border-purple-300/25 hover:bg-purple-500/10',
    },
    red: {
      gradient: 'from-red-500/10 to-rose-600/10',
      border: 'border-red-300/15',
      hover: 'hover:border-red-300/25 hover:bg-red-500/15',
    },
    blue: {
      gradient: 'from-blue-500/10 to-indigo-600/10',
      border: 'border-blue-300/15',
      hover: 'hover:border-blue-300/25 hover:bg-blue-500/15',
    },
  };

  return themeStyles[theme] || themeStyles.slate;
};

/**
 * 카드 배경 클래스 생성
 * @param {string} theme - 테마 이름
 * @param {boolean} interactive - 호버 효과 포함 여부
 * @returns {string} 카드 배경 클래스 문자열
 */
export const getCardClasses = (theme = 'slate', interactive = false) => {
  const styles = getSectionStyles(theme);
  const baseClasses = `bg-gradient-to-br ${styles.gradient} border ${styles.border} rounded-xl p-4 backdrop-blur-md`;
  
  if (interactive) {
    return `${baseClasses} transition-all duration-300 ${styles.hover}`;
  }
  return baseClasses;
};

/**
 * 헤더 스타일 조합
 * @param {string} theme - 테마 이름
 * @returns {string} 헤더 클래스 문자열
 */
export const getHeaderClasses = (theme = 'cyan') => {
  const colorMap = {
    cyan: 'text-cyan-100',
    slate: 'text-slate-100',
    emerald: 'text-emerald-100',
    purple: 'text-purple-100',
    red: 'text-red-100',
    blue: 'text-blue-100',
  };
  return colorMap[theme] || colorMap.cyan;
};
