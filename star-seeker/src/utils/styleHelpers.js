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

