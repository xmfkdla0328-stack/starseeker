/**
 * 돌파 단계 정의
 */

// 돌파 단계별 정보
export const BREAKTHROUGH_STAGES = {
  1: { level: 20, requiredFragments: 3, statBonus: { atk: 5, hp: 50, def: 5 } },
  2: { level: 40, requiredFragments: 5, statBonus: { atk: 10, hp: 100, def: 10 } },
  3: { level: 50, requiredFragments: 8, statBonus: { atk: 15, hp: 150, def: 15 } },
};

/**
 * 돌파에 따른 최대 레벨 계산
 * @param {number} breakthrough 돌파 단계 (0, 1, 2, 3)
 * @returns {number} 최대 레벨
 */
export const getMaxLevelByBreakthrough = (breakthrough = 0) => {
  switch (breakthrough) {
    case 0: return 20;
    case 1: return 40;
    case 2: return 50;
    case 3: return 60;
    default: return 20;
  }
};

/**
 * 현재 돌파 단계에서 다음 돌파 요구 레벨 계산
 * @param {number} currentBreakthrough 현재 돌파 단계
 * @returns {number} 다음 돌파 요구 레벨
 */
export const getNextBreakthroughRequiredLevel = (currentBreakthrough) => {
  switch (currentBreakthrough) {
    case 0: return 20;
    case 1: return 40;
    case 2: return 50;
    case 3: return 60;
    default: return 60;
  }
};
