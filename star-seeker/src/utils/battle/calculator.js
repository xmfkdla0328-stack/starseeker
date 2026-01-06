/**
 * 전투 계산 관련 순수 함수 모음
 * @module utils/battle/calculator
 */

import { SP_CONFIG, DAMAGE_CONFIG, GAUGE_CONFIG } from '../../constants/battleConstants';

/**
 * SP(Skill Point) 획득량을 계산합니다
 * @param {string} skillType - 스킬 타입 ('normal', 'skill', 'ultimate', 'hit')
 * @param {object} options - 추가 옵션
 * @param {boolean} options.isCritical - 크리티컬 여부
 * @param {boolean} options.hasReaction - 속성 반응 발동 여부
 * @returns {number} - SP 획득량
 */
export function calculateSPGain(skillType, options) {
  const { isCritical = false, hasReaction = false } = options || {};
  
  let spGain = 0;
  
  switch (skillType) {
    case 'normal':
      spGain = SP_CONFIG.GAIN_PER_NORMAL_ATTACK;
      break;
    case 'skill':
      spGain = SP_CONFIG.GAIN_PER_SKILL;
      break;
    case 'ultimate':
      spGain = SP_CONFIG.GAIN_PER_ULTIMATE;
      break;
    case 'hit':
      // 피격 시 SP 획득
      spGain = 10;
      break;
    default:
      spGain = 0;
  }
  
  // 크리티컬 보너스
  if (isCritical) {
    spGain += 5;
  }
  
  // 속성 반응 보너스
  if (hasReaction) {
    spGain += 10;
  }
  
  return spGain;
}

/**
 * SP를 갱신하여 최소/최대값 사이로 클램핑합니다
 * @param {number} currentSp - 현재 SP
 * @param {number} spChange - SP 변화량 (양수: 증가, 음수: 감소)
 * @param {number} maxSp - 최대 SP
 * @returns {number} - 갱신된 SP
 */
export function updateSP(currentSp, spChange, maxSp = SP_CONFIG.MAX_SP) {
  return Math.min(maxSp, Math.max(0, currentSp + spChange));
}

/**
 * 스킬 쿨타임을 감소시킵니다
 * @param {number} currentCooldown - 현재 쿨타임
 * @param {number} reduction - 감소량 (기본값: 1)
 * @returns {number} - 감소된 쿨타임 (최소 0)
 */
export function decreaseCooldown(currentCooldown, reduction = 1) {
  return Math.max(0, currentCooldown - reduction);
}

/**
 * 데미지를 계산합니다
 * @param {number} baseAttack - 기본 공격력
 * @param {string} skillType - 스킬 타입
 * @param {object} options - 추가 옵션
 * @param {boolean} options.isCritical - 크리티컬 여부
 * @returns {number} - 최종 데미지
 */
export function calculateDamage(baseAttack, skillType, options) {
  const { isCritical = false } = options || {};
  
  let multiplier = DAMAGE_CONFIG.BASE_DAMAGE_MULTIPLIER;
  
  switch (skillType) {
    case 'skill':
      multiplier = DAMAGE_CONFIG.SKILL_DAMAGE_MULTIPLIER;
      break;
    case 'ultimate':
      multiplier = DAMAGE_CONFIG.ULTIMATE_DAMAGE_MULTIPLIER;
      break;
    default:
      multiplier = DAMAGE_CONFIG.BASE_DAMAGE_MULTIPLIER;
  }
  
  let damage = baseAttack * multiplier;
  
  if (isCritical) {
    damage *= DAMAGE_CONFIG.CRITICAL_MULTIPLIER;
  }
  
  return Math.floor(damage);
}

/**
 * 미션 게이지 증가량을 계산합니다
 * @param {boolean} hasReaction - 속성 반응 발동 여부
 * @returns {number} - 게이지 증가량
 */
export function calculateGaugeGain(hasReaction = false) {
  let gain = GAUGE_CONFIG.GAIN_PER_ATTACK;
  
  if (hasReaction) {
    gain += GAUGE_CONFIG.GAIN_PER_REACTION;
  }
  
  return gain;
}

/**
 * 게이지를 갱신하여 최소/최대값 사이로 클램핑합니다
 * @param {number} currentGauge - 현재 게이지
 * @param {number} gaugeChange - 게이지 변화량
 * @returns {number} - 갱신된 게이지
 */
export function updateGauge(currentGauge, gaugeChange) {
  return Math.min(GAUGE_CONFIG.MAX_GAUGE, Math.max(0, currentGauge + gaugeChange));
}

/**
 * 크리티컬 발생 여부를 판정합니다
 * @param {number} criticalRate - 크리티컬 확률 (0~1)
 * @returns {boolean} - 크리티컬 발생 여부
 */
export function rollCritical(criticalRate = DAMAGE_CONFIG.CRITICAL_BASE_RATE) {
  return Math.random() < criticalRate;
}

/**
 * HP가 0 이하인지 확인합니다
 * @param {number} hp - HP
 * @returns {boolean} - 사망 여부
 */
export function isDead(hp) {
  return typeof hp === 'number' && hp <= 0;
}

/**
 * 캐릭터가 생존해 있는지 확인합니다
 * @param {object} character - 캐릭터 객체
 * @returns {boolean} - 생존 여부
 */
export function isAlive(character) {
  if (!character) return false;
  const hp = character.hp ?? character.data?.hp;
  return typeof hp === 'number' ? hp > 0 : true;
}
