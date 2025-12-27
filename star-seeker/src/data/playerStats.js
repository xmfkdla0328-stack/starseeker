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

// 경험치 테이블 re-export (직접 접근용)
export { LEVEL_EXP_TABLE as EXP_TABLE } from './expTable';

// 스킬 업그레이드 시스템 re-export
export {
  upgradeSkillLevel,
  getStardustCostForSkill,
} from './skillUpgrade';

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

