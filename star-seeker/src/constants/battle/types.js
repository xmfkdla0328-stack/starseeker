/**
 * 전투 타입 및 상태 정의
 */

// ===== 전투 결과 타입 =====
export const BATTLE_RESULT = {
  NONE: 'NONE',
  VICTORY: 'VICTORY',
  DEFEAT: 'DEFEAT',
};

// ===== 턴 타입 =====
export const TURN_TYPE = {
  PARTY: 'party',
  ENEMY: 'enemy',
};

// ===== 전투 턴 상태 =====
export const BATTLE_TURNS = {
  PLAYER: 'PLAYER',
  ENEMY: 'ENEMY',
  ENDED: 'ENDED',
};

// ===== 스킬 타입 정의 =====
export const SKILL_TYPES = {
  NORMAL: 'normal',
  SKILL: 'skill',
  ULTIMATE: 'ultimate',
};

// 호환성을 위한 별칭
export const SKILL_TYPE = SKILL_TYPES;
