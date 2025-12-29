/**
 * 돌파 아이템 (별의 조각) 정의
 * 각 속성별로 별의 조각이 존재하며, 캐릭터 레벨 돌파 시 사용
 */

import { ELEMENTS } from '../constants/elements';

// 돌파 아이템 ID
export const BREAKTHROUGH_ITEMS = {
  FIRE: 'star_fragment_fire',
  WATER: 'star_fragment_water',
  EARTH: 'star_fragment_earth',
  LIGHT: 'star_fragment_light',
  DARK: 'star_fragment_dark',
};

// 아이템 상세 정보
export const BREAKTHROUGH_ITEM_DATA = {
  [BREAKTHROUGH_ITEMS.FIRE]: {
    id: BREAKTHROUGH_ITEMS.FIRE,
    name: '별의 조각 (불)',
    element: 'FIRE',
    description: '불 속성 캐릭터의 레벨 한계를 돌파하는데 필요한 신비한 결정',
    rarity: 'rare',
    icon: '🔥',
  },
  [BREAKTHROUGH_ITEMS.WATER]: {
    id: BREAKTHROUGH_ITEMS.WATER,
    name: '별의 조각 (물)',
    element: 'WATER',
    description: '물 속성 캐릭터의 레벨 한계를 돌파하는데 필요한 신비한 결정',
    rarity: 'rare',
    icon: '💧',
  },
  [BREAKTHROUGH_ITEMS.EARTH]: {
    id: BREAKTHROUGH_ITEMS.EARTH,
    name: '별의 조각 (대지)',
    element: 'EARTH',
    description: '대지 속성 캐릭터의 레벨 한계를 돌파하는데 필요한 신비한 결정',
    rarity: 'rare',
    icon: '🌿',
  },
  [BREAKTHROUGH_ITEMS.LIGHT]: {
    id: BREAKTHROUGH_ITEMS.LIGHT,
    name: '별의 조각 (빛)',
    element: 'LIGHT',
    description: '빛 속성 캐릭터의 레벨 한계를 돌파하는데 필요한 신비한 결정',
    rarity: 'rare',
    icon: '✨',
  },
  [BREAKTHROUGH_ITEMS.DARK]: {
    id: BREAKTHROUGH_ITEMS.DARK,
    name: '별의 조각 (어둠)',
    element: 'DARK',
    description: '어둠 속성 캐릭터의 레벨 한계를 돌파하는데 필요한 신비한 결정',
    rarity: 'rare',
    icon: '🌙',
  },
};

// 돌파 단계 정의
export const BREAKTHROUGH_STAGES = {
  1: { level: 20, requiredFragments: 3, statBonus: { atk: 5, hp: 50, def: 5 } },
  2: { level: 40, requiredFragments: 5, statBonus: { atk: 10, hp: 100, def: 10 } },
  3: { level: 50, requiredFragments: 8, statBonus: { atk: 15, hp: 150, def: 15 } },
};

/**
 * 캐릭터가 돌파가 필요한지 확인
 * @param {Object} character 캐릭터 객체
 * @returns {Object|null} 돌파 정보 또는 null
 */
export const checkBreakthroughRequired = (character) => {
  const currentBreakthrough = character.breakthrough || 0;
  const nextStage = currentBreakthrough + 1;
  
  if (!BREAKTHROUGH_STAGES[nextStage]) {
    return null; // 더 이상 돌파할 단계가 없음
  }
  
  const stage = BREAKTHROUGH_STAGES[nextStage];
  if (character.level >= stage.level) {
    return {
      stage: nextStage,
      requiredLevel: stage.level,
      requiredFragments: stage.requiredFragments,
      statBonus: stage.statBonus,
    };
  }
  
  return null;
};

/**
 * 캐릭터 속성에 따른 필요 아이템 ID 반환
 * @param {string} element 캐릭터 속성
 * @returns {string} 아이템 ID
 */
export const getRequiredFragmentId = (element) => {
  return BREAKTHROUGH_ITEMS[element];
};

/**
 * 돌파 실행
 * @param {Object} character 캐릭터 객체
 * @param {Object} items 아이템 인벤토리
 * @returns {Object} { success: boolean, message: string, updatedCharacter: Object|null, updatedItems: Object|null }
 */
export const performBreakthrough = (character, items) => {
  const breakthroughInfo = checkBreakthroughRequired(character);
  
  if (!breakthroughInfo) {
    return {
      success: false,
      message: '돌파할 수 없습니다. 레벨이 충분하지 않거나 이미 최대 돌파 단계입니다.',
      updatedCharacter: null,
      updatedItems: null,
    };
  }
  
  const fragmentId = getRequiredFragmentId(character.element);
  const currentFragments = items[fragmentId] || 0;
  
  if (currentFragments < breakthroughInfo.requiredFragments) {
    return {
      success: false,
      message: `${BREAKTHROUGH_ITEM_DATA[fragmentId].name}이(가) 부족합니다. (${currentFragments}/${breakthroughInfo.requiredFragments})`,
      updatedCharacter: null,
      updatedItems: null,
    };
  }
  
  // 돌파 수행
  const updatedCharacter = {
    ...character,
    breakthrough: breakthroughInfo.stage,
  };
  
  const updatedItems = {
    ...items,
    [fragmentId]: currentFragments - breakthroughInfo.requiredFragments,
  };
  
  return {
    success: true,
    message: `${character.name}의 레벨 한계를 돌파했습니다!`,
    updatedCharacter,
    updatedItems,
  };
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
 * 특정 돌파 단계의 다음 돌파에 필요한 레벨 계산
 * @param {number} breakthrough 현재 돌파 단계 (0, 1, 2, 3)
 * @returns {number} 다음 돌파 요구 레벨 (돌파 불가능하면 최대 레벨)
 */
export const getNextBreakthroughRequiredLevel = (breakthrough = 0) => {
  const nextStage = breakthrough + 1;
  if (!BREAKTHROUGH_STAGES[nextStage]) {
    return getMaxLevelByBreakthrough(breakthrough); // 다음 돌파가 없으면 현재 최대 레벨 반환
  }
  return BREAKTHROUGH_STAGES[nextStage].level;
};
