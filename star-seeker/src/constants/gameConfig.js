/**
 * 게임 플레이 설정 상수
 * 가챠, 전투, 확률 등 게임 밸런스 관련 수치
 */

export const GAME_CONST = {
  // 가챠 관련
  GACHA_COST_PER_PULL: 100,          // 1회 가챠 비용
  GACHA_PAYBACK_AMOUNT: 20,          // 만렙 중복 시 페이백
  MAX_ULTIMATE_LEVEL: 5,             // 필살기 최대 레벨
  
  // 전투 확률 관련
  SKILL_USE_CHANCE: 0.7,             // 전열 스킬 사용 확률 (0.7 = 30% 스킬)
  SUPPORT_ULT_CHANCE: 0.15,          // 후열 필살기 사용 확률
  SUPPORT_SKILL_CHANCE: 0.6,         // 후열 스킬 사용 확률 (0.6 = 45% 스킬, 40% 대기)
  
  // 데미지 및 랜덤 관련
  DAMAGE_RANDOM_MIN: 0.9,            // 데미지 랜덤 최소 배율
  DAMAGE_RANDOM_MAX: 1.1,            // 데미지 랜덤 최대 배율 (0.9 ~ 1.1)
  
  // 부활 관련
  JOHO_REVIVE_HP_RATIO: 0.2,         // 조호 시너지 부활 시 체력 비율
  
  // 방어 관련
  MIN_DEFENSE_MULTIPLIER: 0.1,       // 최소 방어 계수 (최대 90% 감소)
};

// 도리천 직군(Role) 상수
export const ROLES = {
  INTERCEPTOR: 'INTERCEPTOR',   // 전방 방어
  EXECUTOR: 'EXECUTOR',         // 화력 투사
  STABILIZER: 'STABILIZER',     // 상태 안정화
  PATHFINDER: 'PATHFINDER',     // 변수 창출
  KEEPER: 'KEEPER',             // 방어/보급
  SUSTAINER: 'SUSTAINER',       // 회복/지속
};
