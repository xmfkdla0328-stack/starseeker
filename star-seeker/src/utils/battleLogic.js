/**
 * 전투 로직 유틸리티 함수들
 * React/Phaser 의존성 없이 순수 계산만 수행
 */

import { SP_CONFIG, COOLDOWN_CONFIG, DAMAGE_CONFIG, GAUGE_CONFIG } from '../constants/battleConstants';

// ===== SP (스킬 포인트) 계산 =====

/**
 * 스킬 사용에 따른 SP 획득량 계산
 * @param {string} skillType - 'normal', 'skill', 'ultimate'
 * @returns {number} 획득할 SP량
 */
export const calculateSpGain = (skillType) => {
  switch (skillType) {
    case 'normal':
      return SP_CONFIG.GAIN_PER_NORMAL_ATTACK;
    case 'skill':
      return SP_CONFIG.GAIN_PER_SKILL;
    case 'ultimate':
      return SP_CONFIG.GAIN_PER_ULTIMATE;
    default:
      return 0;
  }
};

/**
 * 캐릭터의 SP를 업데이트하고 최대값 제한 적용
 * @param {number} currentSp - 현재 SP
 * @param {number} gain - 증가량
 * @param {number} maxSp - 최대 SP (기본값 100)
 * @returns {number} 업데이트된 SP
 */
export const updateCharacterSp = (currentSp, gain, maxSp = SP_CONFIG.MAX_SP) => {
  return Math.min(currentSp + gain, maxSp);
};

/**
 * 필살기 사용 가능 여부 확인
 * @param {number} currentSp - 현재 SP
 * @param {number} cost - 필살기 비용 (기본값 100)
 * @returns {boolean}
 */
export const canUseUltimate = (currentSp, cost = SP_CONFIG.COST_ULTIMATE) => {
  return currentSp >= cost;
};

// ===== 쿨타임 시스템 =====

/**
 * 턴 시작 시 쿨타임 감소
 * @param {number} currentCooldown - 현재 쿨타임
 * @param {number} reduction - 감소량 (기본값 1)
 * @returns {number} 감소된 쿨타임 (최소 0)
 */
export const reduceCooldown = (currentCooldown, reduction = COOLDOWN_CONFIG.COOLDOWN_REDUCTION_PER_TURN) => {
  return Math.max(0, currentCooldown - reduction);
};

/**
 * 스킬 사용 가능 여부 확인
 * @param {number} currentCooldown - 현재 쿨타임
 * @returns {boolean}
 */
export const canUseSkill = (currentCooldown) => {
  return currentCooldown === 0;
};

/**
 * 스킬 사용 후 쿨타임 초기화
 * @param {number} maxCooldown - 스킬의 최대 쿨타임
 * @returns {number}
 */
export const resetCooldown = (maxCooldown) => {
  return maxCooldown;
};

// ===== 데미지 계산 =====

/**
 * 기본 데미지 계산
 * @param {number} baseAtk - 기본 공격력
 * @param {string} skillType - 'normal', 'skill', 'ultimate'
 * @param {boolean} isCritical - 크리티컬 여부
 * @returns {number}
 */
export const calculateBaseDamage = (baseAtk, skillType, isCritical = false) => {
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
  
  let damage = Math.floor(baseAtk * multiplier);
  
  if (isCritical) {
    damage = Math.floor(damage * DAMAGE_CONFIG.CRITICAL_MULTIPLIER);
  }
  
  return damage;
};

/**
 * 크리티컬 발생 여부 계산
 * @param {number} critRate - 크리티컬 확률 (0.0 ~ 1.0)
 * @returns {boolean}
 */
export const rollCritical = (critRate = DAMAGE_CONFIG.CRITICAL_BASE_RATE) => {
  return Math.random() < critRate;
};

// ===== 미션 게이지 계산 =====

/**
 * 공격 행동으로 인한 게이지 증가량 계산
 * @param {boolean} hasReaction - 속성 반응 발생 여부
 * @returns {number}
 */
export const calculateGaugeGain = (hasReaction = false) => {
  let gain = GAUGE_CONFIG.GAIN_PER_ATTACK;
  
  if (hasReaction) {
    gain += GAUGE_CONFIG.GAIN_PER_REACTION;
  }
  
  return gain;
};

/**
 * 게이지 업데이트 (최대값 제한)
 * @param {number} currentGauge - 현재 게이지
 * @param {number} gain - 증가량
 * @param {number} maxGauge - 최대 게이지 (기본값 100)
 * @returns {number}
 */
export const updateGauge = (currentGauge, gain, maxGauge = GAUGE_CONFIG.MAX_GAUGE) => {
  return Math.min(currentGauge + gain, maxGauge);
};

/**
 * 승리 조건 확인 (게이지 기준)
 * @param {number} currentGauge - 현재 게이지
 * @param {number} threshold - 승리 기준치 (기본값 100)
 * @returns {boolean}
 */
export const isGaugeVictory = (currentGauge, threshold = GAUGE_CONFIG.WIN_THRESHOLD) => {
  return currentGauge >= threshold;
};

// ===== 턴 순서 계산 =====

/**
 * 속도 기반 턴 순서 생성
 * @param {Array} party - 파티 배열 (각 멤버는 speed 속성 포함)
 * @param {Object} enemy - 적 객체 (speed 속성 포함)
 * @returns {Array} 정렬된 턴 순서 배열
 */
export const generateTurnQueue = (party, enemy) => {
  const participants = [];

  // 파티 멤버 추가
  party.forEach((char, index) => {
    if (char && char.hp > 0) {
      participants.push({
        type: 'party',
        data: char,
        index,
        speed: Number(char.baseSpd || char.speed || 100),
        name: char.name || `Ally-${index + 1}`,
        id: char.id || `party-${index}`,
      });
    }
  });

  // 적 추가
  if (enemy && enemy.hp > 0) {
    participants.push({
      type: 'enemy',
      data: enemy,
      speed: Number(enemy.speed || enemy.baseSpd || 100),
      name: enemy.name || 'Enemy',
      id: enemy.id || 'enemy',
    });
  }

  // 속도 내림차순 정렬 (속도가 같으면 아군 우선)
  participants.sort((a, b) => {
    if (b.speed !== a.speed) return b.speed - a.speed;
    if (a.type === 'party' && b.type === 'enemy') return -1;
    if (a.type === 'enemy' && b.type === 'party') return 1;
    return 0;
  });

  return participants;
};

/**
 * 다음 턴 가져오기
 * @param {Array} turnQueue - 현재 턴 큐
 * @returns {Object|null} 다음 턴 객체 또는 null
 */
export const getNextTurn = (turnQueue) => {
  return turnQueue && turnQueue.length > 0 ? turnQueue[0] : null;
};

/**
 * 턴 완료 후 큐에서 제거하고 뒤로 보내기
 * @param {Array} turnQueue - 현재 턴 큐
 * @returns {Array} 업데이트된 턴 큐
 */
export const advanceTurn = (turnQueue) => {
  if (!turnQueue || turnQueue.length === 0) return [];
  
  const [current, ...rest] = turnQueue;
  return [...rest, current];
};

// ===== HP 관리 =====

/**
 * HP 업데이트 (최소 0, 최대 maxHp 제한)
 * @param {number} currentHp - 현재 HP
 * @param {number} change - 변화량 (양수: 회복, 음수: 피해)
 * @param {number} maxHp - 최대 HP
 * @returns {number}
 */
export const updateHp = (currentHp, change, maxHp) => {
  const newHp = currentHp + change;
  return Math.max(0, Math.min(newHp, maxHp));
};

/**
 * 생존 여부 확인
 * @param {number} currentHp - 현재 HP
 * @returns {boolean}
 */
export const isAlive = (currentHp) => {
  return currentHp > 0;
};

/**
 * 파티 전체 생존 확인
 * @param {Array} party - 파티 배열
 * @returns {boolean}
 */
export const isPartyAlive = (party) => {
  return party.some(char => char && isAlive(char.hp));
};

/**
 * 생존 캐릭터 수 계산
 * @param {Array} party - 파티 배열
 * @returns {number}
 */
export const countAliveParty = (party) => {
  return party.filter(char => char && isAlive(char.hp)).length;
};
