/**
 * 레벨 및 경험치 시스템
 * 플레이어와 캐릭터의 레벨 관련 데이터와 계산 함수
 */

/**
 * 캐릭터 레벨에 따른 스탯 계산
 * 기본 스탯에 일정 비율을 곱하여 반영
 * @param {number} baseAtk 기본 공격력
 * @param {number} baseHp 기본 체력
 * @param {number} level 캐릭터 레벨
 * @returns {Object} { hp, atk } 레벨에 따른 스탯
 */
export const calculateStatsByLevel = (baseAtk, baseHp, level) => {
  // 레벨당 2%씩 증가 (레벨 1 = 1.0배, 레벨 50 = 1.98배)
  const levelMultiplier = 1 + (level - 1) * 0.02;
  return {
    atk: Math.floor(baseAtk * levelMultiplier),
    hp: Math.floor(baseHp * levelMultiplier),
    def: Math.floor(30 * levelMultiplier), // 기본 방어력 (레벨에 따라 증가)
  };
};

/**
 * 캐릭터 객체에 레벨 스탯 적용
 * @param {Object} character 캐릭터 객체
 * @returns {Object} 레벨이 적용된 캐릭터 객체
 */
export const applyCharacterLevel = (character) => {
  const level = character.level || 1;
  const stats = calculateStatsByLevel(character.baseAtk, character.baseHp, level);
  return {
    ...character,
    currentAtk: stats.atk,
    currentHp: stats.hp,
    currentDef: stats.def,
  };
};

// 레벨별 필요 경험치 (누적)
export const LEVEL_EXP_TABLE = {
  1: 0,
  2: 100,
  3: 250,
  4: 450,
  5: 700,
  6: 1000,
  7: 1350,
  8: 1750,
  9: 2200,
  10: 2700,
  11: 3250,
  12: 3850,
  13: 4500,
  14: 5200,
  15: 5950,
  16: 6750,
  17: 7600,
  18: 8500,
  19: 9450,
  20: 10450,
  21: 11500,
  22: 12600,
  23: 13750,
  24: 14950,
  25: 16200,
  26: 17500,
  27: 18850,
  28: 20250,
  29: 21700,
  30: 23200,
  31: 24750,
  32: 26350,
  33: 28000,
  34: 29700,
  35: 31450,
  36: 33250,
  37: 35100,
  38: 37000,
  39: 38950,
  40: 40950,
  41: 43000,
  42: 45100,
  43: 47250,
  44: 49450,
  45: 51700,
  46: 54000,
  47: 56350,
  48: 58750,
  49: 61200,
  50: 63700,
};

/**
 * 현재 레벨과 경험치로부터 다음 레벨까지의 진행도 계산
 * @param {number} level 현재 레벨
 * @param {number} exp 현재 경험치
 * @returns {Object} { currentLevelExp, nextLevelExp, progress }
 */
export const getExpProgress = (level, exp) => {
  const currentLevelExp = LEVEL_EXP_TABLE[level] || 0;
  const nextLevel = Math.min(level + 1, 50);
  const nextLevelExp = LEVEL_EXP_TABLE[nextLevel] || LEVEL_EXP_TABLE[50];
  
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
  for (let i = 50; i >= 1; i--) {
    if (exp >= (LEVEL_EXP_TABLE[i] || 0)) {
      level = i;
      break;
    }
  }
  return { level, currentExp: exp };
};

/**
 * 캐릭터 스킬 레벨 업그레이드
 * '별의 먼지' 아이템 사용 시 호출될 함수
 * @param {Object} character 캐릭터 객체
 * @param {string} skillKey 스킬 키 ('normal', 'skill', 'ultimate', 'supportSkill', 'supportUlt')
 * @param {number} levels 올릴 레벨 수 (기본값 1)
 * @returns {Object} 업그레이드된 캐릭터 객체
 */
export const upgradeSkillLevel = (character, skillKey, levels = 1) => {
  const currentLevel = character.skillLevels?.[skillKey] || 1;
  const maxLevel = 10; // 스킬 최대 레벨 설정 가능
  const newLevel = Math.min(currentLevel + levels, maxLevel);

  return {
    ...character,
    skillLevels: {
      ...character.skillLevels,
      [skillKey]: newLevel,
    },
  };
};

/**
 * 스킬 업그레이드에 필요한 '별의 먼지' 계산
 * 레벨이 높을수록 더 많은 먼지가 필요함
 * @param {number} targetLevel 도달할 레벨
 * @returns {number} 필요한 별의 먼지 수
 */
export const getStardustCostForSkill = (targetLevel) => {
  // 레벨당 10씩 증가 (1→2: 10, 2→3: 20, ... 9→10: 90)
  return (targetLevel - 1) * 10;
};
