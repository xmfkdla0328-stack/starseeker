import { getElementalMultiplier } from './formulas';
import { GAME_CONST } from '../../constants';

/**
 * 보스의 공격 데미지 계산
 * @param {Object} boss - 보스 객체
 * @param {Object} target - 공격 대상
 * @param {Array} activeBuffs - 적용된 버프 배열
 * @returns {Object} { finalDmg, logMsg }
 */
export const calculateBossDamage = (boss, target, activeBuffs = []) => {
  // 방어력 계산
  const defBuff = activeBuffs.filter(b => b.type === 'DEF_UP').reduce((acc, b) => acc + b.val, 0);
  const totalDefPct = (target.defPct || 0) + defBuff;
  const defMod = Math.max(GAME_CONST.MIN_DEFENSE_MULTIPLIER, 1 - totalDefPct / 100);

  // 속성 상성 및 랜덤 데미지 계산
  const elemMod = getElementalMultiplier(boss.element, target.element);
  const randMod = GAME_CONST.DAMAGE_RANDOM_MIN + Math.random() * (GAME_CONST.DAMAGE_RANDOM_MAX - GAME_CONST.DAMAGE_RANDOM_MIN);
  const finalDmg = Math.floor(boss.atk * elemMod * defMod * randMod);

  // 로그 생성
  let logMsg = `[${boss.name}] 공격! [${target.name}]에게 ${finalDmg}`;
  if (defBuff > 0) logMsg += ` (방어 +${defBuff}%)`;

  return { finalDmg, logMsg };
};

/**
 * 캐릭터 부활 처리 (조호 시너지)
 * @param {Object} target - 대상 캐릭터
 * @param {number} reviveCount - 남은 부활 횟수
 * @returns {Object} { newHp, isDead, newReviveCount, logMsg }
 */
export const handleCharacterDeath = (target, reviveCount) => {
  const logs = [];
  let newHp = 0;
  let isDead = true;
  let newReviveCount = reviveCount;

  // 조호 부활 체크
  const hasJohoTag = target.tags && target.tags.includes('조호');
  const canResurrect = hasJohoTag && newReviveCount > 0;

  if (canResurrect) {
    newReviveCount--;
    newHp = Math.floor(target.maxHp * GAME_CONST.JOHO_REVIVE_HP_RATIO);
    isDead = false;
    logs.push(`> 🌟 [시너지] '조호' 발동! [${target.name}] 부활! (HP: ${newHp})`);
    logs.push(`> (남은 부활 횟수: ${newReviveCount})`);
  } else {
    logs.push(`> [${target.name}] 쓰러짐...`);
  }

  return { newHp, isDead, newReviveCount, logs };
};
