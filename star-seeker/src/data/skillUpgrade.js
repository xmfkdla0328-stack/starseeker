/**
 * 스킬 업그레이드 시스템
 * 캐릭터 스킬 레벨 관리 및 비용 계산
 */

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
