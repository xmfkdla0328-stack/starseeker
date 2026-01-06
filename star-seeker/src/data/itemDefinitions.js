import { Sparkles, Star, Beaker, Brain, Coins, Sparkle, Zap } from 'lucide-react';
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
  exp_chip: {
    id: 'exp_chip',
    name: '기억 추출물',
    icon: Brain,
    description: '응축된 기억 파편. 사용 시 경험치를 획득합니다.',
    type: ITEM_TYPES.CONSUMABLE,
    rarity: 'rare',
    color: 'text-cyan-200',
    bgGradient: 'from-cyan-500/20 to-emerald-500/20',
    borderColor: 'border-cyan-400/30',
    usable: false,
  },
  
  star_fragment: {
    id: 'star_fragment',
    name: '별의 파편',
    icon: Zap,
    description: '별의 에너지가 응축된 파편. 캐릭터의 스킬 레벨을 올리는 데 필요합니다.',
    type: ITEM_TYPES.MATERIAL,
    rarity: 'rare',
    color: 'text-purple-300',
    bgGradient: 'from-purple-500/20 to-indigo-500/20',
    borderColor: 'border-purple-400/30',
    usable: false,
  },
  
  gold: {
    id: 'gold',
    name: '성석',
    icon: Coins,
    description: '통화로 사용되는 신비한 금색 돌. 게임의 모든 상점에서 사용됩니다.',
    type: ITEM_TYPES.CURRENCY,
    rarity: 'common',
    color: 'text-amber-300',
    bgGradient: 'from-amber-500/20 to-yellow-500/15',
    borderColor: 'border-amber-400/30',
    usable: false,
  },
};

/**
 * 아이템 정의 (별의 조각 포함)
 */
export const ITEM_DEFINITIONS = {
  ...BASE_ITEMS,
  ...createAllFragmentDefinitions(),
};
