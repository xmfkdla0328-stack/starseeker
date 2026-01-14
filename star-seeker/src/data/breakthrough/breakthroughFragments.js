/**
 * 돌파 아이템 (별의 조각) 정의
 */

// 돌파 아이템 ID
export const BREAKTHROUGH_ITEMS = {
  ENTROPY: 'star_fragment_entropy',
  STASIS: 'star_fragment_stasis',
  GRAVITY: 'star_fragment_gravity',
  RESONANCE: 'star_fragment_resonance',
  PARADOX: 'star_fragment_paradox',
  AXIOM: 'star_fragment_axiom',
};

// 아이템 상세 정보
export const BREAKTHROUGH_ITEM_DATA = {
  [BREAKTHROUGH_ITEMS.ENTROPY]: {
    id: BREAKTHROUGH_ITEMS.ENTROPY,
    name: '별의 조각 (엔트로피)',
    element: 'ENTROPY',
    description: '엔트로피 속성 캐릭터의 한계를 열어 주는 붉은 파편',
    rarity: 'rare',
    icon: '🔥',
  },
  [BREAKTHROUGH_ITEMS.STASIS]: {
    id: BREAKTHROUGH_ITEMS.STASIS,
    name: '별의 조각 (정체)',
    element: 'STASIS',
    description: '시간을 멈춘 듯 푸른 빛을 내는 정적의 결정',
    rarity: 'rare',
    icon: '🧊',
  },
  [BREAKTHROUGH_ITEMS.GRAVITY]: {
    id: BREAKTHROUGH_ITEMS.GRAVITY,
    name: '별의 조각 (중력)',
    element: 'GRAVITY',
    description: '무거운 자장에 잠긴 보랏빛 중력 핵',
    rarity: 'rare',
    icon: '🪐',
  },
  [BREAKTHROUGH_ITEMS.RESONANCE]: {
    id: BREAKTHROUGH_ITEMS.RESONANCE,
    name: '별의 조각 (공명)',
    element: 'RESONANCE',
    description: '황금색 진동이 감도는 공명의 매개체',
    rarity: 'rare',
    icon: '🎶',
  },
  [BREAKTHROUGH_ITEMS.PARADOX]: {
    id: BREAKTHROUGH_ITEMS.PARADOX,
    name: '별의 조각 (역설)',
    element: 'PARADOX',
    description: '모순된 힘이 얽힌 검은 슬레이트 파편',
    rarity: 'rare',
    icon: '♾️',
  },
  [BREAKTHROUGH_ITEMS.AXIOM]: {
    id: BREAKTHROUGH_ITEMS.AXIOM,
    name: '별의 조각 (공리)',
    element: 'AXIOM',
    description: '질서와 균형을 상징하는 창백한 결정',
    rarity: 'rare',
    icon: '⚖️',
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
