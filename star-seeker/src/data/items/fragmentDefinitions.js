/**
 * 별의 조각 아이템 정의 헬퍼
 */

import { Flame, Droplet, Leaf, Sun, Moon } from 'lucide-react';
import { BREAKTHROUGH_ITEM_DATA, BREAKTHROUGH_ITEMS } from '../breakthrough/index';
import { ITEM_TYPES } from './itemTypes';

// 속성별 아이콘 매핑
const ELEMENT_ICONS = {
  FIRE: Flame,
  WATER: Droplet,
  EARTH: Leaf,
  LIGHT: Sun,
  DARK: Moon,
};

// 속성별 색상 매핑
const ELEMENT_COLORS = {
  FIRE: {
    color: 'text-red-400',
    bgGradient: 'from-red-500/20 to-orange-600/20',
    borderColor: 'border-red-400/30',
  },
  WATER: {
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-600/20',
    borderColor: 'border-blue-400/30',
  },
  EARTH: {
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-green-600/20',
    borderColor: 'border-emerald-400/30',
  },
  LIGHT: {
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-amber-600/20',
    borderColor: 'border-yellow-400/30',
  },
  DARK: {
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-indigo-600/20',
    borderColor: 'border-purple-400/30',
  },
};

/**
 * 별의 조각 아이템 정의 생성
 * @param {string} element 속성 ('FIRE', 'WATER', 'EARTH', 'LIGHT', 'DARK')
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
  ['FIRE', 'WATER', 'EARTH', 'LIGHT', 'DARK'].forEach(element => {
    const itemId = BREAKTHROUGH_ITEMS[element];
    fragments[itemId] = createFragmentDefinition(element);
  });
  return fragments;
};
