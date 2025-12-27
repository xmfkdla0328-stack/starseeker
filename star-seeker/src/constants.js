// src/constants.js
// 게임 시스템 전반에 사용되는 상수(속성, 시너지 등)를 정의합니다.

export const ELEMENTS = {
  FIRE: { name: '불', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' },
  WATER: { name: '물', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/50' },
  EARTH: { name: '대지', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' },
  LIGHT: { name: '빛', color: 'text-yellow-300', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' },
  DARK: { name: '어둠', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/50' },
};

export const SYNERGIES = {
  '조영': {
    name: '조영',
    desc: '그림자를 비추는 빛',
    levels: [
      { count: 2, effect: '공격력 +10%' },
      { count: 4, effect: '공격력 +20%' },
      { count: 6, effect: '공격력 +30%' },
      { count: 8, effect: '공격력 +50%' },
    ]
  },
  '조호': {
    name: '조호',
    desc: '수호하는 호랑이',
    levels: [
      { count: 2, effect: '전열 "조호" 캐릭터 사망 시 1회 20% 체력 부활' },
    ]
  },
  '신장의 의지': {
    name: '신장의 의지',
    desc: '신성한 장군의 기백',
    levels: [
      { count: 1, effect: '아군 전체 방어력 +5%' },
      { count: 3, effect: '아군 전체 방어력 +15%' },
    ]
  },
  '별의 여행자': {
    name: '별의 여행자',
    desc: '우주를 여행하는 자들',
    levels: [
      { count: 2, effect: '탐험 속도 +20%' },
    ]
  }
};

// 게임 플레이 상수
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