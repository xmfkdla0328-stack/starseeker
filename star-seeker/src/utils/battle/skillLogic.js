/**
 * 전투 스킬 로직 함수들
 * Phase 3: 새로운 스킬 구조(normal/skill/ultimate) 지원
 */

import { checkReaction } from './elementalLogic';
import { calculateGaugeScore, MISSION_TYPES } from './gaugeLogic';
import { CHARACTER_SKILLS } from '../../data/characters/skillData';
import { ROLES } from '../../constants/gameConfig';

/**
 * 스킬 타입별 데미지 계수
 */
const SKILL_MULTIPLIERS = {
  normal: 1.0,    // 일반 공격: 100%
  skill: 1.5,     // 스킬: 150%
  ultimate: 2.5,  // 필살기: 250%
};

/**
 * 캐릭터의 스킬 실행
 * 
 * @param {Object} player - 플레이어 정보 (id, name, attack, element, critRate, baseAtk)
 * @param {Object} enemy - 적 정보 (hp, maxHp, attack, currentElement)
 * @param {string} skillType - 스킬 타입 ('normal', 'skill', 'ultimate')
 * @param {string} missionType - 미션 타입 ('CHAOS' or 'SILENCE')
 * @returns {Object} 스킬 결과
 */
export const executeSkill = (player, enemy, skillType = 'normal', missionType = MISSION_TYPES.CHAOS) => {
  // ========== Step 1: 스킬 데이터 가져오기 ==========
  const skillData = CHARACTER_SKILLS[player.id];
  const skillName = skillData?.skills?.[skillType] || '기본 공격';
  const skillInfo = skillData?.skillDetails?.[skillType] || {};
  const isBuff = skillInfo.isBuff === true;
  const damageFactor = skillInfo.damageFactor ?? null;

  // ========== Step 2: 데미지 계산 (버프 스킬이거나 데미지 계수가 0이면 데미지 없음) ==========
  let damage = 0;
  if (!isBuff && (damageFactor === null || damageFactor === undefined)) {
    // 기존 로직: damageFactor가 정의되지 않으면 SKILL_MULTIPLIERS 사용
    const skillMultiplier = SKILL_MULTIPLIERS[skillType] || 1.0;
    const baseAtk = player.baseAtk || player.attack || 10;
    const baseDamage = Math.floor(baseAtk * skillMultiplier);
    const isCritical = Math.random() < (player.critRate || 0.1);
    const critMultiplier = isCritical ? 1.5 : 1;
    damage = Math.floor(baseDamage * critMultiplier);
  } else if (!isBuff && damageFactor > 0) {
    // 새로운 로직: damageFactor가 명시되면 그것을 사용
    const baseAtk = player.baseAtk || player.attack || 10;
    const baseDamage = Math.floor(baseAtk * damageFactor);
    const isCritical = Math.random() < (player.critRate || 0.1);
    const critMultiplier = isCritical ? 1.5 : 1;
    damage = Math.floor(baseDamage * critMultiplier);
  }
  // else: isBuff === true 또는 damageFactor === 0 → damage = 0

  const isCritical = damage > 0 && Math.random() < (player.critRate || 0.1);

  // ========== Step 3: 속성 부착력 판단 (버프 스킬은 속성 부착 없음) ==========
  const defaultPotency = skillType === 'normal'
    ? (player.role === ROLES.PATHFINDER ? 1 : 0)
    : skillType === 'skill'
      ? 1
      : skillType === 'ultimate'
        ? 2
        : 0;
  const elementalPotency = isBuff ? 0 : (skillInfo.elementalPotency ?? defaultPotency);

  const attackerElement = player.element || 'AXIOM';
  const targetElement = enemy.currentElement ?? null;
  const reactionType = !isBuff && elementalPotency > 0 ? checkReaction(attackerElement, targetElement) : null;

  // ========== Step 4: 미션 게이지 점수 계산 (버프 스킬 및 속성 부착력이 없을 때는 0) ==========
  const gaugeAdded = !isBuff && elementalPotency > 0
    ? calculateGaugeScore(attackerElement, targetElement, missionType)
    : 0;

  console.log(
    `[스킬 실행] ${skillName} (${skillType})`,
    {
      attacker: player.name,
      skillType,
      isBuff,
      damageFactor,
      finalDamage: damage,
      isCritical,
      attackerElement,
      targetElement,
      reactionType,
      missionType,
      gaugeAdded,
    }
  );

  return {
    damage,
    isCritical,
    skillName,
    skillType,
    reactionType,
    gaugeAdded,
    elementalPotency,
  };
};

/**
 * 기본 공격 실행 (하위 호환성 유지)
 * @param {Object} player - 플레이어 정보
 * @param {Object} enemy - 적 정보
 * @returns {Object} 스킬 결과
 */
export const executeBasicAttack = (player, enemy, missionType = MISSION_TYPES.CHAOS) => {
  return executeSkill(player, enemy, 'normal', missionType);
};

/**
 * 전투 턴 실행
 * @param {Object} player - 플레이어 정보
 * @param {Object} enemy - 적 정보
 * @param {string} skillType - 스킬 타입 ('normal', 'skill', 'ultimate')
 * @returns {Object} 턴 결과
 */
export const executeBattleTurn = (player, enemy, skillType = 'normal', missionType = MISSION_TYPES.CHAOS) => {
  console.log(`[전투 턴] 스킬 타입: ${skillType}`);
  return executeSkill(player, enemy, skillType, missionType);
};
