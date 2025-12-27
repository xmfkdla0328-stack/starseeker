/**
 * 플레이어 스탯 및 진행도 관리
 * 레벨, 경험치, 업적 등의 데이터 구조 정의
 */

/**
 * 캐릭터 레벨에 따른 스탯 계산
 * 기본 스탯에 일정 비율을 곱하여 반영
 * @param {number} baseAtk 기본 공격력
 * @param {number} baseHp 기본 체력
 * @param {number} level 캐릭터 레벨
 * @returns {Object} { hp, atk } 레벨에 따른 스탯
 */
export const calculateStatsByLevel = (baseAtk, baseHp, level) => {
  // 레벨당 2%씩 증가 (레벨 1 = 1.0배, 레벨 50 = 1.98배)
  const levelMultiplier = 1 + (level - 1) * 0.02;
  return {
    atk: Math.floor(baseAtk * levelMultiplier),
    hp: Math.floor(baseHp * levelMultiplier),
    def: Math.floor(30 * levelMultiplier), // 기본 방어력 (레벨에 따라 증가)
  };
};

/**
 * 캐릭터 객체에 레벨 스탯 적용
 * @param {Object} character 캐릭터 객체
 * @returns {Object} 레벨이 적용된 캐릭터 객체
 */
export const applyCharacterLevel = (character) => {
  const level = character.level || 1;
  const stats = calculateStatsByLevel(character.baseAtk, character.baseHp, level);
  return {
    ...character,
    currentAtk: stats.atk,
    currentHp: stats.hp,
    currentDef: stats.def,
  };
};

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

// 타이틀 정의
export const TITLES = {
  OPEN_BETA_PIONEER: {
    id: 'open_beta_pioneer',
    name: '별의 생성을 함께한',
    rarity: 'legendary',
    description: '처음부터 반딧불이와 함께한 여행자',
    unlocked: true, // 시작 시 자동 해금
  },
  WITNESS_OF_ABANDONED: {
    id: 'witness_abandoned',
    name: '남겨진 자의 증명을 목격한',
    rarity: 'epic',
    description: '12레벨 달성 시 해금',
    unlockCondition: { type: 'level', value: 12 },
  },
  BATTLE_VETERAN: {
    id: 'battle_veteran',
    name: '백전노장의',
    rarity: 'epic',
    description: '50회 전투 완료 시 해금',
    unlockCondition: { type: 'battles', value: 50 },
  },
  COSMIC_COLLECTOR: {
    id: 'cosmic_collector',
    name: '우주의 수집가인',
    rarity: 'rare',
    description: '모든 캐릭터 수집 시 해금',
    unlockCondition: { type: 'allCharacters' },
  },
  ACHIEVEMENT_HUNTER: {
    id: 'achievement_hunter',
    name: '업적 수렵꾼의',
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
  selectedTitle: 'open_beta_pioneer', // 기본 타이틀
  unlockedTitles: ['open_beta_pioneer'], // 시작 시 첫 번째 타이틀만 해금
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

/**
 * 캐릭터 스킬 레벨 업그레이드
 * '별의 먼지' 아이템 사용 시 호출될 함수
 * @param {Object} character 캐릭터 객체
 * @param {string} skillKey 스킬 키 ('normal', 'skill', 'ultimate', 'supportSkill', 'supportUlt')
 * @param {number} levels 올릴 레벨 수 (기본값 1)
 * @returns {Object} 업그레이드된 캐릭터 객체
 */
export const upgradeSkillLevel = (character, skillKey, levels = 1) => {
  const currentLevel = character.skillLevels?.[skillKey] || 1;
  const maxLevel = 10; // 스킬 최대 레벨 설정 가능
  const newLevel = Math.min(currentLevel + levels, maxLevel);

  return {
    ...character,
    skillLevels: {
      ...character.skillLevels,
      [skillKey]: newLevel,
    },
  };
};

/**
 * 스킬 업그레이드에 필요한 '별의 먼지' 계산
 * 레벨이 높을수록 더 많은 먼지가 필요함
 * @param {number} targetLevel 도달할 레벨
 * @returns {number} 필요한 별의 먼지 수
 */
export const getStardustCostForSkill = (targetLevel) => {
  // 레벨당 10씩 증가 (1→2: 10, 2→3: 20, ... 9→10: 90)
  return (targetLevel - 1) * 10;
};
