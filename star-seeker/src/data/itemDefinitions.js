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
    star_fragment_entropy: {
      id: 'star_fragment_entropy',
      name: '별의 파편 (엔트로피)',
      icon: Zap,
      description: '엔트로피 속성 캐릭터의 스킬 레벨업에 사용되는 붉은 파편.',
      type: ITEM_TYPES.MATERIAL,
      rarity: 'rare',
      color: 'text-red-300',
      bgGradient: 'from-red-600/20 to-orange-500/15',
      borderColor: 'border-red-400/30',
      usable: false,
    },
    star_fragment_stasis: {
      id: 'star_fragment_stasis',
      name: '별의 파편 (정체)',
      icon: Zap,
      description: '정체 속성 캐릭터의 스킬 레벨업에 사용되는 푸른 파편.',
      type: ITEM_TYPES.MATERIAL,
      rarity: 'rare',
      color: 'text-sky-300',
      bgGradient: 'from-sky-600/20 to-blue-500/15',
      borderColor: 'border-sky-400/30',
      usable: false,
    },
    star_fragment_gravity: {
      id: 'star_fragment_gravity',
      name: '별의 파편 (중력)',
      icon: Zap,
      description: '중력 속성 캐릭터의 스킬 레벨업에 사용되는 보랏빛 파편.',
      type: ITEM_TYPES.MATERIAL,
      rarity: 'rare',
      color: 'text-purple-300',
      bgGradient: 'from-purple-700/20 to-indigo-600/15',
      borderColor: 'border-purple-400/30',
      usable: false,
    },
    star_fragment_resonance: {
      id: 'star_fragment_resonance',
      name: '별의 파편 (공명)',
      icon: Zap,
      description: '공명 속성 캐릭터의 스킬 레벨업에 사용되는 황금 파편.',
      type: ITEM_TYPES.MATERIAL,
      rarity: 'rare',
      color: 'text-amber-300',
      bgGradient: 'from-amber-500/20 to-yellow-400/15',
      borderColor: 'border-amber-300/30',
      usable: false,
    },
    star_fragment_paradox: {
      id: 'star_fragment_paradox',
      name: '별의 파편 (역설)',
      icon: Zap,
      description: '역설 속성 캐릭터의 스킬 레벨업에 사용되는 검은 파편.',
      type: ITEM_TYPES.MATERIAL,
      rarity: 'rare',
      color: 'text-slate-200',
      bgGradient: 'from-slate-800/30 to-slate-900/20',
      borderColor: 'border-slate-400/40',
      usable: false,
    },
    star_fragment_axiom: {
      id: 'star_fragment_axiom',
      name: '별의 파편 (공리)',
      icon: Zap,
      description: '공리 속성 캐릭터의 스킬 레벨업에 사용되는 창백한 파편.',
      type: ITEM_TYPES.MATERIAL,
      rarity: 'rare',
      color: 'text-slate-100',
      bgGradient: 'from-slate-200/15 to-slate-50/10',
      borderColor: 'border-slate-200/40',
      usable: false,
    },
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
