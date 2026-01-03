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
  const skillMultiplier = SKILL_MULTIPLIERS[skillType] || 1.0;

  // ========== Step 2: 데미지 계산 ==========
  const baseAtk = player.baseAtk || player.attack || 10;
  const baseDamage = Math.floor(baseAtk * skillMultiplier);
  const isCritical = Math.random() < (player.critRate || 0.1);
  const critMultiplier = isCritical ? 1.5 : 1;
  const damage = Math.floor(baseDamage * critMultiplier);

  // ========== Step 3: 속성 부착력 판단 ==========
  const skillInfo = skillData?.skillDetails?.[skillType] || {};
  const defaultPotency = skillType === 'normal'
    ? (player.role === ROLES.PATHFINDER ? 1 : 0)
    : skillType === 'skill'
      ? 1
      : skillType === 'ultimate'
        ? 2
        : 0;
  const elementalPotency = skillInfo.elementalPotency ?? defaultPotency;

  const attackerElement = player.element || 'AXIOM';
  // 현재 부착된 속성이 없으면 null로 처리하여 반응이 발생하지 않도록 함
  const targetElement = enemy.currentElement ?? null;
  const reactionType = elementalPotency > 0 ? checkReaction(attackerElement, targetElement) : null;

  // ========== Step 4: 미션 게이지 점수 계산 (속성 부착력이 있을 때만) ==========
  const gaugeAdded = elementalPotency > 0
    ? calculateGaugeScore(attackerElement, targetElement, missionType)
    : 0;

  console.log(
    `[스킬 실행] ${skillName} (${skillType})`,
    {
      attacker: player.name,
      skillType,
      skillMultiplier,
      baseDamage,
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
