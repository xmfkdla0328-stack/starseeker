/**
 * 별의 조각 아이템 정의 헬퍼
 */

import { Flame, PauseCircle, Weight, Waves, Infinity, Sparkles } from 'lucide-react';
import { BREAKTHROUGH_ITEM_DATA, BREAKTHROUGH_ITEMS } from '../breakthrough/index';
import { ITEM_TYPES } from './itemTypes';

// 속성별 아이콘 매핑
const ELEMENT_ICONS = {
  ENTROPY: Flame,
  STASIS: PauseCircle,
  GRAVITY: Weight,
  RESONANCE: Waves,
  PARADOX: Infinity,
  AXIOM: Sparkles,
};

// 속성별 색상 매핑
const ELEMENT_COLORS = {
  ENTROPY: {
    color: 'text-red-300',
    bgGradient: 'from-red-600/20 to-orange-500/15',
    borderColor: 'border-red-400/30',
  },
  STASIS: {
    color: 'text-sky-300',
    bgGradient: 'from-sky-600/20 to-blue-500/15',
    borderColor: 'border-sky-400/30',
  },
  GRAVITY: {
    color: 'text-purple-300',
    bgGradient: 'from-purple-700/20 to-indigo-600/15',
    borderColor: 'border-purple-400/30',
  },
  RESONANCE: {
    color: 'text-amber-300',
    bgGradient: 'from-amber-500/20 to-yellow-400/15',
    borderColor: 'border-amber-300/30',
  },
  PARADOX: {
    color: 'text-slate-200',
    bgGradient: 'from-slate-800/30 to-slate-900/20',
    borderColor: 'border-slate-400/40',
  },
  AXIOM: {
    color: 'text-slate-100',
    bgGradient: 'from-slate-200/15 to-slate-50/10',
    borderColor: 'border-slate-200/40',
  },
};

/**
 * 별의 조각 아이템 정의 생성
 * @param {string} element 속성 ('ENTROPY', 'STASIS', 'GRAVITY', 'RESONANCE', 'PARADOX', 'AXIOM')
 * @returns {Object} 아이템 정의
 */
export const createFragmentDefinition = (element) => {
  const itemId = BREAKTHROUGH_ITEMS[element];
  const itemData = BREAKTHROUGH_ITEM_DATA[itemId];
  const colors = ELEMENT_COLORS[element];
  
  return {
    id: itemId,
    name: itemData.name,
    icon: ELEMENT_ICONS[element],
    description: itemData.description,
    type: ITEM_TYPES.MATERIAL,
    rarity: 'rare',
    ...colors,
    usable: false,
  };
};

/**
 * 모든 별의 조각 아이템 정의 생성
 * @returns {Object} 별의 조각 아이템 정의 객체
 */
export const createAllFragmentDefinitions = () => {
  const fragments = {};
  ['ENTROPY', 'STASIS', 'GRAVITY', 'RESONANCE', 'PARADOX', 'AXIOM'].forEach(element => {
    const itemId = BREAKTHROUGH_ITEMS[element];
    fragments[itemId] = createFragmentDefinition(element);
  });
  return fragments;
};
