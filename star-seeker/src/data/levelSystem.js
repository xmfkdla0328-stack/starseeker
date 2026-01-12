/**
 * 레벨 및 경험치 시스템
 * 플레이어와 캐릭터의 레벨/스탯 계산 함수
 */

import { LEVEL_EXP_TABLE } from './expTable';
// calculateStatsByLevel, applyCharacterLevel는 StatCalculator.js로 이동

// LEVEL_EXP_TABLE은 expTable.js에서 import하여 재사용

/**
 * 현재 레벨과 경험치로부터 다음 레벨까지의 진행도 계산
 * @param {number} level 현재 레벨
 * @param {number} exp 현재 경험치
 * @returns {Object} { currentLevelExp, nextLevelExp, progress }
 */
export const getExpProgress = (level, exp) => {
  const currentLevelExp = LEVEL_EXP_TABLE[level] || 0;
  const nextLevel = Math.min(level + 1, 60);
  const nextLevelExp = LEVEL_EXP_TABLE[nextLevel] || LEVEL_EXP_TABLE[60];
  
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
  for (let i = 60; i >= 1; i--) {
    if (exp >= (LEVEL_EXP_TABLE[i] || 0)) {
      level = i;
      break;
    }
  }
  return { level, currentExp: exp };
};

// LEVEL_EXP_TABLE을 re-export (호환성 유지)
export { LEVEL_EXP_TABLE } from './expTable';

