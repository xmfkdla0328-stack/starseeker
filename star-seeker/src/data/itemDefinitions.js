import { Sparkles, Star, Flask } from 'lucide-react';
import { ITEM_TYPES } from './items/itemTypes';
import { createAllFragmentDefinitions } from './items/fragmentDefinitions';
export { applyItemEffect } from './items/itemEffects';

// 아이템 타입 re-export
export { ITEM_TYPES } from './items/itemTypes';

/**
 * 기본 아이템 정의
 */
const BASE_ITEMS = {
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
};

/**
 * 아이템 정의 (별의 조각 포함)
 */
export const ITEM_DEFINITIONS = {
  ...BASE_ITEMS,
  ...createAllFragmentDefinitions(),
};
