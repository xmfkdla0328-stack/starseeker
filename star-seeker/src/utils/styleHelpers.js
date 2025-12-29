/**
 * UI 스타일 헬퍼 함수들
 * 중복되는 스타일 클래스 생성 로직을 한곳에서 관리
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
 * 캐릭터 역할 표시 텍스트 변환
 * @param {string} role 역할 ('FRONT', 'BACK', 'BOTH')
 * @returns {string} 표시할 텍스트
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
 * 요소별 스타일 클래스 반환 (ELEMENTS와 함께 사용)
 * @param {string} element 요소 이름 ('FIRE', 'WATER' 등)
 * @param {Object} elementsData ELEMENTS 객체
 * @returns {Object} 요소별 스타일 정보
 */
export const getElementStyle = (element, elementsData) => {
  return elementsData[element] || elementsData.LIGHT;
};

/**
 * 애니메이션 딜레이 스타일 반환
 * @param {number} index 인덱스
 * @param {number} delayPerItem 각 항목당 딜레이 (초)
 * @returns {Object} 스타일 객체
 */
export const getAnimationDelay = (index, delayPerItem = 0.2) => {
  return { animationDelay: `${index * delayPerItem}s` };
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

