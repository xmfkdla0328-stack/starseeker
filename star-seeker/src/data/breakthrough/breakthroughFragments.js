/**
 * 돌파 아이템 (별의 조각) 정의
 */

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

/**
 * 캐릭터 속성에 따른 필요 아이템 ID 반환
 * @param {string} element 캐릭터 속성
 * @returns {string} 아이템 ID
 */
export const getRequiredFragmentId = (element) => {
  return BREAKTHROUGH_ITEMS[element];
};
