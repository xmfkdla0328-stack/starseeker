/**
 * 플레이어 스탯 및 진행도 관리
 * 레벨, 경험치, 업적 등의 데이터 구조 정의
 */

// 레벨별 필요 경험치 (누적)
export const LEVEL_EXP_TABLE = {
  1: 0,
  2: 100,
  3: 250,
  4: 450,
  5: 700,
  6: 1000,
  7: 1350,
  8: 1750,
  9: 2200,
  10: 2700,
  11: 3250,
  12: 3850,
  13: 4500,
  14: 5200,
  15: 5950,
  16: 6750,
  17: 7600,
  18: 8500,
  19: 9450,
  20: 10450,
  30: 20000,
  40: 32000,
  50: 46000,
};

// 기본 플레이어 정보
export const DEFAULT_PLAYER_INFO = {
  nickname: 'Observer', // 나중에 수정 가능
  level: 1,
  exp: 0,
  totalBattles: 0,
  totalWins: 0,
  joinDate: new Date().toISOString(),
  lastLoginDate: new Date().toISOString(),
  playtime: 0, // 분 단위
};

// 플레이어 통계
export const DEFAULT_PLAYER_STATS = {
  totalDamageDone: 0,
  totalDamageReceived: 0,
  highestDamage: 0,
  totalHealing: 0,
  totalCharacterObtained: 0,
  maxCharacterObtained: 0,
};

// 업적 정의
export const ACHIEVEMENTS = {
  // 전투 관련
  FIRST_WIN: {
    id: 'first_win',
    name: '첫 승리',
    desc: '전투에서 처음으로 승리한다',
    icon: '⚔️',
    reward: 50,
  },
  BATTLE_10: {
    id: 'battle_10',
    name: '전투 초보자',
    desc: '전투를 10회 치룬다',
    icon: '🎖️',
    reward: 100,
  },
  BATTLE_50: {
    id: 'battle_50',
    name: '전투 경험자',
    desc: '전투를 50회 치룬다',
    icon: '🎖️',
    reward: 200,
  },
  WIN_STREAK_3: {
    id: 'win_streak_3',
    name: '3연승',
    desc: '연속으로 3번 승리한다',
    icon: '🔥',
    reward: 150,
  },
  // 수집 관련
  COLLECT_5: {
    id: 'collect_5',
    name: '캐릭터 수집가',
    desc: '캐릭터를 5명 이상 보유한다',
    icon: '⭐',
    reward: 100,
  },
  COLLECT_ALL: {
    id: 'collect_all',
    name: '완전한 집단',
    desc: '모든 캐릭터를 보유한다',
    icon: '👑',
    reward: 500,
  },
  // 레벨 관련
  LEVEL_10: {
    id: 'level_10',
    name: '10레벨 달성',
    desc: '계정 레벨 10에 도달한다',
    icon: '📈',
    reward: 200,
  },
};

/**
 * 현재 레벨과 경험치로부터 다음 레벨까지의 진행도 계산
 * @param {number} level 현재 레벨
 * @param {number} exp 현재 경험치
 * @returns {Object} { currentLevelExp, nextLevelExp, progress }
 */
export const getExpProgress = (level, exp) => {
  const currentLevelExp = LEVEL_EXP_TABLE[level] || 0;
  const nextLevel = Math.min(level + 1, 50);
  const nextLevelExp = LEVEL_EXP_TABLE[nextLevel] || LEVEL_EXP_TABLE[50];
  
  const progressExp = exp - currentLevelExp;
  const requiredExp = nextLevelExp - currentLevelExp;
  const progress = Math.min((progressExp / requiredExp) * 100, 100);
  
  return {
    currentLevelExp,
    nextLevelExp,
    progressExp,
    requiredExp,
    progress,
  };
};

/**
 * 경험치로부터 레벨 계산
 * @param {number} exp 총 경험치
 * @returns {Object} { level, currentExp }
 */
export const getLevelFromExp = (exp) => {
  let level = 1;
  for (let i = 50; i >= 1; i--) {
    if (exp >= (LEVEL_EXP_TABLE[i] || 0)) {
      level = i;
      break;
    }
  }
  return { level, currentExp: exp };
};
