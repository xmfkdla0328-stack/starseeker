/**
 * 전투 시스템 관련 상수 정의
 * 게임 전투의 핵심 수치와 설정값들을 중앙 관리
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

// ===== 속성 반응 타입 한글 이름 매핑 =====
export const REACTION_NAMES = {
  FUSION: '융합',
  THERMAL_SHOCK: '열충격',
  PLASMA: '플라즈마',
  ABSOLUTE_ZERO: '절대영도',
  OVERLOAD: '과부하',
  BLACK_HOLE: '블랙홀',
  PARADOX_TRIGGER: '패러독스 트리거 ⚡',
  AXIOM_TRIGGER: '공리 트리거 ✨',
};

// ===== 스킬 타입 정의 =====
export const SKILL_TYPES = {
  NORMAL: 'normal',
  SKILL: 'skill',
  ULTIMATE: 'ultimate',
};

// ===== 전투 턴 상태 =====
export const BATTLE_TURNS = {
  PLAYER: 'PLAYER',
  ENEMY: 'ENEMY',
  ENDED: 'ENDED',
};

// ===== UI 텍스트 상수 =====
export const UI_TEXT = {
  PAUSE: {
    TITLE: '작전 일시정지',
    SUBTITLE: '필요한 선택지를 고르세요.',
    CHIP: 'LIVE OPS',
    RESUME: '계속하기',
    RETREAT: '작전 중단',
    SETTINGS: '환경 설정 (준비 중)',
  },
  RETREAT_CONFIRM: {
    TITLE: '작전을 이탈할까요?',
    SUBTITLE: '"정말 전투를 중단하시겠습니까?"',
    CONTINUE: '계속 전투',
    CONFIRM: '작전 중단',
  },
  RESULT: {
    VICTORY_TITLE: 'MISSION SUCCESS',
    VICTORY_MESSAGE: '전투에서 승리했습니다.',
    DEFEAT_TITLE: 'MISSION FAILED',
    DEFEAT_MESSAGE: '아군이 전멸했습니다.',
    BACK: '돌아가기',
    RESTART: '재시작',
  },
  TURN_INFO: {
    PLAYER_TURN: (name) => `${name}의 턴`,
    ENEMY_TURN: '적의 턴',
    ENEMY_ATTACKING: '적이 행동 중입니다...',
    WAITING: (name) => name ? `${name}의 차례입니다` : '턴을 대기 중입니다',
  },
};

// ===== 초기 캐릭터 스탯 기본값 =====
export const DEFAULT_CHARACTER_STATS = {
  SP: 0,
  MAX_SP: 100,
  INITIAL_COOLDOWN: 0,
  BASE_SPEED: 100,
};

// ===== 전투 타이밍 상수 (ms) =====
export const BATTLE_TIMING = {
  ENEMY_TURN_DELAY: 400,
  COOLDOWN_READY_FLASH_DURATION: 400,
};

// ===== 전투 게이지 시각화 상수 =====
export const GAUGE_VISUAL = {
  STAR_POSITIONS: [0, 20, 40, 60, 80, 100],
};

// ===== 스킬 타입 =====
export const SKILL_TYPE = {
  NORMAL: 'normal',
  SKILL: 'skill',
  ULTIMATE: 'ultimate',
};

// ===== 속성 이름 매핑 (한글) =====
export const ELEMENT_NAMES = {
  ENTROPY: '엔트로피',
  STASIS: '정체',
  GRAVITY: '중력',
  RESONANCE: '공명',
  AXIOM: '공리',
  VOID: '공허',
  PARADOX: '패러독스',
};

// ===== 속성 색상 매핑 =====
export const ELEMENT_COLORS = {
  ENTROPY: '#ff4444',
  STASIS: '#4444ff',
  GRAVITY: '#8844ff',
  RESONANCE: '#44ff44',
  AXIOM: '#ffff44',
  VOID: '#444444',
  PARADOX: '#cccccc',
};

// ===== 전투 텍스트 메시지 =====
export const BATTLE_MESSAGES = {
  VICTORY: '전투에서 승리했습니다.',
  DEFEAT: '아군이 전멸했습니다.',
  ENEMY_TURN: '적이 행동 중입니다...',
  WAITING_TURN: '턴을 대기 중입니다',
  MISSION_SUCCESS: 'MISSION SUCCESS',
  MISSION_FAILED: 'MISSION FAILED',
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
