/**
 * 플레이어 스탯 및 진행도 관리
 * 분할된 모듈들을 re-export하는 중앙 파일
 */

// 레벨 시스템 re-export
export {
  calculateStatsByLevel,
  applyCharacterLevel,
  LEVEL_EXP_TABLE,
  getExpProgress,
  getLevelFromExp,
} from './levelSystem';

// 칭호 시스템 re-export
export {
  TITLES,
  getTitleById,
  getRarityStyles,
} from './titles';

// 업적 시스템 re-export
export {
  ACHIEVEMENTS,
} from './achievements';

// 기본 플레이어 정보 (이 파일에만 존재)
export const DEFAULT_PLAYER_INFO = {
  nickname: 'Observer',
  level: 1,
  exp: 0,
  totalBattles: 0,
  totalWins: 0,
  joinDate: new Date().toISOString(),
  lastLoginDate: new Date().toISOString(),
  playtime: 0,
  selectedTitle: 'open_beta_pioneer',
  unlockedTitles: ['open_beta_pioneer'],
};

// 플레이어 통계 (이 파일에만 존재)
export const DEFAULT_PLAYER_STATS = {
  totalDamageDone: 0,
  totalDamageReceived: 0,
  highestDamage: 0,
  totalHealing: 0,
  totalCharacterObtained: 0,
  maxCharacterObtained: 0,
};

// 스킬 업그레이드 유틸리티
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
  const maxLevel = 10;
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
  return (targetLevel - 1) * 10;
};
