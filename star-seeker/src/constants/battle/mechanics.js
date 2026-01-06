/**
 * 전투 메커닉 관련 설정값
 * SP, 쿨타임, 데미지, 게이지 등 전투 시스템의 핵심 수치
 */

// ===== SP (Skill Point) 시스템 =====
export const SP_CONFIG = {
  MAX_SP: 100,
  GAIN_PER_NORMAL_ATTACK: 20,
  GAIN_PER_SKILL: 10,
  GAIN_PER_ULTIMATE: 0,
  COST_ULTIMATE: 100,
};

// ===== 쿨타임 시스템 =====
export const COOLDOWN_CONFIG = {
  SKILL_DEFAULT_COOLDOWN: 3, // 스킬 기본 쿨타임
  COOLDOWN_REDUCTION_PER_TURN: 1, // 턴당 쿨타임 감소량
};

// ===== 데미지 계산 =====
export const DAMAGE_CONFIG = {
  BASE_DAMAGE_MULTIPLIER: 1.0,
  CRITICAL_MULTIPLIER: 1.5,
  CRITICAL_BASE_RATE: 0.1, // 10% 기본 크리티컬 확률
  SKILL_DAMAGE_MULTIPLIER: 1.5,
  ULTIMATE_DAMAGE_MULTIPLIER: 2.5,
};

// ===== 미션 게이지 =====
export const GAUGE_CONFIG = {
  MAX_GAUGE: 100,
  GAIN_PER_ATTACK: 5,
  GAIN_PER_REACTION: 15, // 속성 반응 발동 시 추가 게이지
  WIN_THRESHOLD: 100,
};

// ===== 전투 게이지 시각화 =====
export const GAUGE_VISUAL = {
  STAR_POSITIONS: [0, 20, 40, 60, 80, 100],
};

// ===== 초기 캐릭터 스탯 기본값 =====
export const DEFAULT_CHARACTER_STATS = {
  SP: 0,
  MAX_SP: 100,
  INITIAL_COOLDOWN: 0,
  BASE_SPEED: 100,
};

// ===== 파티 구성 =====
export const PARTY_CONFIG = {
  MAX_PARTY_SIZE: 4,
  MIN_PARTY_SIZE: 1,
};

// ===== 적 AI 설정 =====
export const ENEMY_AI_CONFIG = {
  BASE_ATTACK_POWER: 8,
  TARGET_PRIORITY: 'LOWEST_HP', // 'LOWEST_HP', 'RANDOM', 'HIGHEST_THREAT'
};
