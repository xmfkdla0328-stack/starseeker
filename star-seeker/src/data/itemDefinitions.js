import { Sparkles, Star, Flask, Flame, Droplet, Leaf, Sun, Moon } from 'lucide-react';
import { BREAKTHROUGH_ITEM_DATA } from './breakthroughItems';

/**
 * 아이템 타입 정의
 */
export const ITEM_TYPES = {
  CURRENCY: 'currency',      // 화폐형 아이템
  CONSUMABLE: 'consumable',  // 소비형 아이템
  MATERIAL: 'material',      // 재료 아이템
};

/**
 * 아이템 정의
 */
export const ITEM_DEFINITIONS = {
  // 화폐/재화
  stardust: {
    id: 'stardust',
    name: '별의 먼지',
    icon: Sparkles,
    description: '캐릭터의 스킬 레벨을 올리는 데 사용되는 신비로운 가루. 스킬 1레벨 상승 당 10개가 필요합니다.',
    type: ITEM_TYPES.MATERIAL,
    rarity: 'rare',
    color: 'text-yellow-300',
    bgGradient: 'from-yellow-500/20 to-amber-600/20',
    borderColor: 'border-yellow-400/30',
    usable: false,
  },
  gems: {
    id: 'gems',
    name: '별의 결정',
    icon: Star,
    description: '성운을 관측하기 위해 필요한 신비로운 결정. 가챠를 돌릴 때 사용됩니다. 1회 모집에 100개, 10회 모집에 1000개가 필요합니다.',
    type: ITEM_TYPES.CURRENCY,
    rarity: 'epic',
    color: 'text-blue-300',
    bgGradient: 'from-blue-500/20 to-indigo-600/20',
    borderColor: 'border-blue-400/30',
    usable: false,
  },
  
  // 소비 아이템
  boundary_potion: {
    id: 'boundary_potion',
    name: '경계의 물약',
    icon: Flask,
    description: '시간의 경계를 넘나드는 신비한 물약. 사용 시 즉시 레벨 50으로 상승합니다. (테스트용 아이템)',
    type: ITEM_TYPES.CONSUMABLE,
    rarity: 'legendary',
    color: 'text-purple-300',
    bgGradient: 'from-purple-500/20 to-pink-600/20',
    borderColor: 'border-purple-400/30',
    usable: true,
    effect: 'level_50',
  },
  
  // 별의 조각 (돌파 재료)
  star_fragment_fire: {
    id: 'star_fragment_fire',
    name: BREAKTHROUGH_ITEM_DATA.star_fragment_fire.name,
    icon: Flame,
    description: BREAKTHROUGH_ITEM_DATA.star_fragment_fire.description,
    type: ITEM_TYPES.MATERIAL,
    rarity: 'rare',
    color: 'text-red-400',
    bgGradient: 'from-red-500/20 to-orange-600/20',
    borderColor: 'border-red-400/30',
    usable: false,
  },
  star_fragment_water: {
    id: 'star_fragment_water',
    name: BREAKTHROUGH_ITEM_DATA.star_fragment_water.name,
    icon: Droplet,
    description: BREAKTHROUGH_ITEM_DATA.star_fragment_water.description,
    type: ITEM_TYPES.MATERIAL,
    rarity: 'rare',
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-600/20',
    borderColor: 'border-blue-400/30',
    usable: false,
  },
  star_fragment_earth: {
    id: 'star_fragment_earth',
    name: BREAKTHROUGH_ITEM_DATA.star_fragment_earth.name,
    icon: Leaf,
    description: BREAKTHROUGH_ITEM_DATA.star_fragment_earth.description,
    type: ITEM_TYPES.MATERIAL,
    rarity: 'rare',
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-green-600/20',
    borderColor: 'border-emerald-400/30',
    usable: false,
  },
  star_fragment_light: {
    id: 'star_fragment_light',
    name: BREAKTHROUGH_ITEM_DATA.star_fragment_light.name,
    icon: Sun,
    description: BREAKTHROUGH_ITEM_DATA.star_fragment_light.description,
    type: ITEM_TYPES.MATERIAL,
    rarity: 'rare',
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-amber-600/20',
    borderColor: 'border-yellow-400/30',
    usable: false,
  },
  star_fragment_dark: {
    id: 'star_fragment_dark',
    name: BREAKTHROUGH_ITEM_DATA.star_fragment_dark.name,
    icon: Moon,
    description: BREAKTHROUGH_ITEM_DATA.star_fragment_dark.description,
    type: ITEM_TYPES.MATERIAL,
    rarity: 'rare',
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-indigo-600/20',
    borderColor: 'border-purple-400/30',
    usable: false,
  },
};

/**
 * 아이템 사용 효과 처리
 * @param {string} itemId 아이템 ID
 * @param {Object} context 게임 컨텍스트 (setPlayerInfo, showToast 등)
 * @returns {boolean} 사용 성공 여부
 */
export const applyItemEffect = (itemId, context) => {
  const item = ITEM_DEFINITIONS[itemId];
  
  if (!item || !item.usable) {
    context.showToast?.('사용할 수 없는 아이템입니다.');
    return false;
  }
  
  switch (item.effect) {
    case 'level_50':
      // 레벨 50에 필요한 경험치 설정
      const LEVEL_50_EXP = 63700;
      context.setPlayerInfo?.(prev => ({
        ...prev,
        exp: LEVEL_50_EXP,
      }));
      context.showToast?.('경계의 물약을 사용했습니다! 레벨 50으로 상승!');
      return true;
      
    default:
      context.showToast?.('알 수 없는 아이템 효과입니다.');
      return false;
  }
};
