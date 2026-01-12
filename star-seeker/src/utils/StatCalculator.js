// StatCalculator.js
// 레벨, 돌파 등 영구적 요소를 반영한 최종 스탯 계산기
import { BREAKTHROUGH_STAGES } from '../data/breakthrough/breakthroughStages';

/**
 * @param {object} character - 캐릭터 객체 (baseAtk, baseHp, baseDef, level, breakthrough 등)
 * @returns {object} { atk, hp, def }
 */
export function calculateFinalStats(character) {
  const baseAtk = character.baseAtk || 100;
  const baseHp = character.baseHp || 1000;
  const baseDef = character.baseDef || 30;
  const level = character.level || 1;
  const breakthrough = character.breakthrough || 0;

  // 레벨 보정
  const levelMultiplier = 1 + (level - 1) * 0.02;

  // 돌파 보너스 합산
  let breakthroughBonus = { atk: 0, hp: 0, def: 0 };
  for (let stage = 1; stage <= breakthrough; stage++) {
    if (BREAKTHROUGH_STAGES[stage]) {
      breakthroughBonus.atk += BREAKTHROUGH_STAGES[stage].statBonus.atk;
      breakthroughBonus.hp += BREAKTHROUGH_STAGES[stage].statBonus.hp;
      breakthroughBonus.def += BREAKTHROUGH_STAGES[stage].statBonus.def;
    }
  }

  return {
    atk: Math.floor(baseAtk * levelMultiplier) + breakthroughBonus.atk,
    hp: Math.floor(baseHp * levelMultiplier) + breakthroughBonus.hp,
    def: Math.floor(baseDef * levelMultiplier) + breakthroughBonus.def,
  };
}
