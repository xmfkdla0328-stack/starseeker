import { getElementalMultiplier } from './formulas';
import { GAME_CONST } from '../../constants';

/**
 * 버프 지속시간 감소 및 만료된 버프 제거
 * @param {Array} buffs - 현재 버프 배열
 * @returns {Array} 업데이트된 버프 배열
 */
export const updateBuffDurations = (buffs = []) => {
  return buffs
    .map(b => ({ ...b, duration: b.duration - 1 }))
    .filter(b => b.duration >= 0);
};

/**
 * 특정 버프 타입의 총 값 계산
 * @param {Array} buffs - 버프 배열
 * @param {string} buffType - 버프 타입 (예: 'ATK_UP', 'DEF_UP')
 * @returns {number} 버프 값의 합
 */
export const getBuffValue = (buffs = [], buffType) => {
  return buffs.filter(b => b.type === buffType).reduce((acc, b) => acc + b.val, 0);
};
