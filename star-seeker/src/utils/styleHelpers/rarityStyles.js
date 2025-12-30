/**
 * 레어도 관련 스타일 헬퍼 함수들
 */

/**
 * 레어도별 스타일 클래스 반환
 * @param {number} rarity 레어도 (3, 4, 5)
 * @returns {Object} { bg, text, border } 클래스 문자열
 */
export const getRarityClasses = (rarity) => {
  if (rarity >= 5) {
    return {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-200',
      border: 'border-yellow-400/30',
      cardBg: 'bg-gradient-to-br from-yellow-500/15 to-amber-600/15',
      cardBorder: 'border-yellow-400/30',
      cardGlow: 'shadow-[0_0_20px_rgba(250,204,21,0.2)]',
      avatar: {
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-400/50',
        text: 'text-yellow-300',
      },
      badge: {
        bg: 'bg-yellow-500/30',
        border: 'border-yellow-400/30',
        text: 'text-yellow-200',
      },
      shadow: 'shadow-[0_0_20px_rgba(250,204,21,0.2)]',
    };
  } else if (rarity === 4) {
    return {
      bg: 'bg-purple-500/20',
      text: 'text-purple-200',
      border: 'border-purple-400/30',
      cardBg: 'bg-gradient-to-br from-purple-500/15 to-pink-600/15',
      cardBorder: 'border-purple-400/30',
      cardGlow: '',
      avatar: {
        bg: 'bg-purple-500/20',
        border: 'border-purple-400/50',
        text: 'text-purple-300',
      },
      badge: {
        bg: 'bg-purple-500/30',
        border: 'border-purple-400/30',
        text: 'text-purple-200',
      },
      shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    };
  } else {
    return {
      bg: 'bg-cyan-500/20',
      text: 'text-cyan-200',
      border: 'border-cyan-400/30',
      cardBg: 'bg-gradient-to-br from-cyan-500/15 to-blue-600/15',
      cardBorder: 'border-cyan-400/30',
      cardGlow: '',
      avatar: {
        bg: 'bg-cyan-500/20',
        border: 'border-cyan-400/50',
        text: 'text-cyan-300',
      },
      badge: {
        bg: 'bg-blue-500/30',
        border: 'border-blue-400/30',
        text: 'text-blue-200',
      },
      shadow: 'shadow-[0_0_15px_rgba(34,211,238,0.2)]',
    };
  }
};

/**
 * 아이템 레어도에 따른 스타일 반환
 * @param {string} rarity 레어도 ('common', 'rare', 'epic', 'legendary')
 * @returns {Object} 스타일 클래스
 */
export const getItemRarityClasses = (rarity) => {
  const rarityMap = {
    common: {
      bg: 'bg-slate-500/20',
      border: 'border-slate-400/30',
      text: 'text-slate-300',
      glow: '',
    },
    rare: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-400/30',
      text: 'text-blue-300',
      glow: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]',
    },
    epic: {
      bg: 'bg-purple-500/20',
      border: 'border-purple-400/30',
      text: 'text-purple-300',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    },
    legendary: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-400/30',
      text: 'text-yellow-300',
      glow: 'shadow-[0_0_20px_rgba(250,204,21,0.4)]',
    },
  };
  return rarityMap[rarity] || rarityMap.common;
};
