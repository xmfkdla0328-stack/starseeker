/**
 * 플레이어 칭호 시스템
 * 다양한 칭호와 획득 조건 정의
 */

// 플레이어 칭호 목록
export const TITLES = {
  OPEN_BETA_PIONEER: {
    id: 'open_beta_pioneer',
    name: '개척자',
    rarity: 'rare',
    description: '게임을 처음 시작하면 자동으로 해금',
    unlockCondition: { type: 'default' },
  },
  STAR_SEEKER: {
    id: 'star_seeker',
    name: '별을 찾는 자',
    rarity: 'epic',
    description: '가챠를 10회 진행 시 해금',
    unlockCondition: { type: 'gacha', value: 10 },
  },
  ACHIEVEMENT_HUNTER: {
    id: 'achievement_hunter',
    name: '업적 사냥꾼',
    rarity: 'rare',
    description: '10개 업적 달성 시 해금',
    unlockCondition: { type: 'achievements', value: 10 },
  },
  LEGENDARY_WARRIOR: {
    id: 'legendary_warrior',
    name: '전설의 전사',
    rarity: 'legendary',
    description: '30레벨 달성 시 해금',
    unlockCondition: { type: 'level', value: 30 },
  },
};

/**
 * 타이틀 ID로부터 타이틀 데이터 조회
 * @param {string} titleId 타이틀 ID (예: 'open_beta_pioneer')
 * @returns {Object|null} 타이틀 객체 또는 null
 */
export const getTitleById = (titleId) => {
  if (!titleId) return null;
  for (const key in TITLES) {
    if (TITLES[key].id === titleId) {
      return TITLES[key];
    }
  }
  return null;
};

/**
 * 레어도별 스타일 클래스 반환
 * @param {string} rarity 레어도 ('legendary', 'epic', 'rare')
 * @returns {Object} { bg, text, border } 클래스 문자열
 */
export const getRarityStyles = (rarity) => {
  const styles = {
    legendary: {
      bg: 'bg-red-500/20',
      text: 'text-red-300',
      border: 'border-red-500/30',
    },
    epic: {
      bg: 'bg-purple-500/20',
      text: 'text-purple-300',
      border: 'border-purple-500/30',
    },
    rare: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-300',
      border: 'border-blue-500/30',
    },
  };
  return styles[rarity] || styles.rare;
};
