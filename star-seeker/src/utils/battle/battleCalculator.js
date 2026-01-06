import { executeSkill } from './skillLogic';
import { executeEnemyTurn } from './enemyAI';

/**
 * 플레이어 공격 결과 계산
 * @param {Object} attacker - 공격자 데이터
 * @param {Object} enemyData - 현재 적 데이터
 * @param {string} skillType - normal | skill | ultimate
 * @param {string} missionType - 미션 유형
 * @returns {{ result: Object, updatedEnemy: Object }}
 */
export function calculatePlayerAttack(attacker, enemyData, skillType, missionType) {
  const result = executeSkill(attacker, enemyData, skillType, missionType);
  const damageValue = Number(result.damage || 0);

  const nextEnemy = {
    ...enemyData,
    hp: Math.max(0, (enemyData.hp ?? enemyData.maxHp ?? 100) - damageValue),
  };

  // 속성 부착/소모 처리 (반응 로직 유지)
  // 속성 부착력이 있는 경우에만 처리
  if (result.elementalPotency > 0) {
    if (result.reactionType && result.reactionType !== null && result.reactionType !== 'null') {
      // 반응 발생 시: 현재 부착된 속성 소비 (현상 일어남)
      nextEnemy.currentElement = null;
      console.log(`[속성 반응] ${result.reactionType} 현상 발생 → 적 속성 초기화`);
    } else if (targetElement === null || targetElement === undefined) {
      // 반응 미발생 + 적에게 부착된 속성이 없을 때만 새 속성 부여
      nextEnemy.currentElement = attacker.element;
      console.log(`[속성 부여] ${attacker.element} 속성을 적에게 부여`);
    }
    // else: 반응 미발생 + 적이 이미 다른 속성을 가진 상태 → 변화 없음
  }

  return { result, updatedEnemy: nextEnemy };
}

/**
 * 적 턴 자동 계산 결과
 * @param {Object} enemyData - 적 데이터
 * @param {Array} partyStatus - 아군 상태 배열
 * @returns {Object} executeEnemyTurn 결과
 */
export function calculateEnemyTurn(enemyData, partyStatus) {
  return executeEnemyTurn(enemyData, partyStatus);
}

/**
 * 상태 이상 적용 확률 계산 (기본 확률, 저항을 고려)
 * @param {number} baseChance - 기본 확률 (0~1)
 * @param {number} resistance - 저항 확률 (0~1)
 * @returns {number} 적용 확률 (0~1)
 */
export function computeStatusEffectChance(baseChance = 0, resistance = 0) {
  const clampedBase = Math.min(Math.max(baseChance, 0), 1);
  const clampedResist = Math.min(Math.max(resistance, 0), 1);
  const chance = clampedBase * (1 - clampedResist);
  return Math.min(Math.max(chance, 0), 1);
}

/**
 * 속성 반응 텍스트를 정규화
 * @param {string|null} reactionType
 * @returns {string|null}
 */
export function normalizeReaction(reactionType) {
  if (!reactionType || reactionType === 'null') return null;
  return reactionType;
}

/**
 * SP(Stellar Power) 에너지 획득량 계산
 * @param {string} action - 행동 타입: 'normal' | 'skill' | 'ultimate' | 'hit' | 'kill'
 * @param {Object} options - 추가 옵션
 * @returns {number} 획득 SP 량
 */
export function calculateEnergyGain(action, options = {}) {
  const baseGains = {
    normal: 20,    // 일반 공격
    skill: 30,     // 스킬 사용
    ultimate: 0,   // 필살기 사용 (SP 소모)
    hit: 10,       // 피격 당함
    kill: 50,      // 적 처치 보너스
  };

  const gain = baseGains[action] || 0;
  
  // 추가 보너스 (예: 크리티컬, 속성 반응 등)
  let bonus = 0;
  if (options.isCritical) {
    bonus += 5;
  }
  if (options.hasReaction) {
    bonus += 10;
  }

  return gain + bonus;
}

/**
 * 캐릭터의 SP 업데이트
 * @param {Object} character - 캐릭터 데이터
 * @param {number} gainAmount - 획득할 SP 량
 * @returns {Object} 업데이트된 캐릭터 데이터
 */
export function updateCharacterSP(character, gainAmount) {
  const currentSp = character.sp || 0;
  const maxSp = character.maxSp || 100;
  const newSp = Math.min(maxSp, Math.max(0, currentSp + gainAmount));

  return {
    ...character,
    sp: newSp,
  };
}

/**
 * 필살기 사용 가능 여부 확인
 * @param {Object} character - 캐릭터 데이터
 * @returns {boolean} 사용 가능 여부
 */
export function canUseUltimate(character) {
  const sp = character.sp || 0;
  const maxSp = character.maxSp || 100;
  return sp >= maxSp;
}
