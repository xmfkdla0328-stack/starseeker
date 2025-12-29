/**
 * 레벨 및 경험치 시스템
 * 플레이어와 캐릭터의 레벨/스탯 계산 함수
 */

import { LEVEL_EXP_TABLE } from './expTable';
import { BREAKTHROUGH_STAGES, getMaxLevelByBreakthrough } from './breakthroughItems';

/**
 * 캐릭터 레벨에 따른 스탯 계산
 * 기본 스탯에 일정 비율을 곱하여 반영
 * @param {number} baseAtk 기본 공격력
 * @param {number} baseHp 기본 체력
 * @param {number} level 캐릭터 레벨
 * @param {number} breakthrough 돌파 단계 (0~3)
 * @returns {Object} { hp, atk, def } 레벨에 따른 스탯
 */
export const calculateStatsByLevel = (baseAtk, baseHp, level, breakthrough = 0) => {
  // 레벨당 2%씩 증가 (레벨 1 = 1.0배, 레벨 60 = 2.18배)
  const levelMultiplier = 1 + (level - 1) * 0.02;
  
  // 돌파 보너스 계산
  let breakthroughBonus = { atk: 0, hp: 0, def: 0 };
  for (let stage = 1; stage <= breakthrough; stage++) {
    if (BREAKTHROUGH_STAGES[stage]) {
      breakthroughBonus.atk += BREAKTHROUGH_STAGES[stage].statBonus.atk;
      breakthroughBonus.hp += BREAKTHROUGH_STAGES[stage].statBonus.hp;
      breakthroughBonus.def += BREAKTHROUGH_STAGES[stage].statBonus.def;
    }
  }
  
  return {
    atk: Math.floor(baseAtk * levelMultiplier) + breakthroughBonus.atk,
    hp: Math.floor(baseHp * levelMultiplier) + breakthroughBonus.hp,
    def: Math.floor(30 * levelMultiplier) + breakthroughBonus.def, // 기본 방어력 (레벨에 따라 증가)
  };
};

/**
 * 캐릭터 객체에 레벨 스탯 적용
 * @param {Object} character 캐릭터 객체
 * @returns {Object} 레벨이 적용된 캐릭터 객체
 */
export const applyCharacterLevel = (character) => {
  const level = character.level || 1;
  const breakthrough = character.breakthrough || 0;
  const stats = calculateStatsByLevel(character.baseAtk, character.baseHp, level, breakthrough);
  return {
    ...character,
    currentAtk: stats.atk,
    currentHp: stats.hp,
    currentDef: stats.def,
  };
};

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

