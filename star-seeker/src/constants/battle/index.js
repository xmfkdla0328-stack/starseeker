/**
 * 전투 시스템 관련 상수 - 메인 인덱스
 * 모든 전투 상수를 한곳에서 import/export
 */

// 전투 메커닉
export {
  SP_CONFIG,
  COOLDOWN_CONFIG,
  DAMAGE_CONFIG,
  GAUGE_CONFIG,
  GAUGE_VISUAL,
  DEFAULT_CHARACTER_STATS,
  PARTY_CONFIG,
  ENEMY_AI_CONFIG,
} from './mechanics';

// 타입 정의
export {
  BATTLE_RESULT,
  TURN_TYPE,
  BATTLE_TURNS,
  SKILL_TYPES,
  SKILL_TYPE,
} from './types';

// UI 텍스트
export {
  UI_TEXT,
  BATTLE_MESSAGES,
} from './ui';

// 속성/반응
export {
  REACTION_NAMES,
  ELEMENT_NAMES,
  ELEMENT_COLORS,
} from './elements';

// 타이밍
export {
  BATTLE_TIMING,
} from './timing';
