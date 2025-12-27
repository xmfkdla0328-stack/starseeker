import { getElementalMultiplier } from './formulas';
import { GAME_CONST } from '../../constants';

/**
 * 전열 캐릭터의 공격 처리
 * @param {Object} actor - 행동하는 캐릭터
 * @param {Object} enemy - 대상 적
 * @param {Array} activeBuffs - 현재 적용된 버프
 * @returns {Object} { newEnemy, logs }
 */
export const executeAllyAttack = (actor, enemy, activeBuffs = []) => {
  let logs = [];
  let newEnemy = { ...enemy };

  // 공격력 버프 계산
  const atkBuff = activeBuffs.filter(b => b.type === 'ATK_UP').reduce((acc, b) => acc + b.val, 0);
  const finalAtk = Math.floor(actor.atk * (1 + atkBuff / 100));

  // 속성 상성 및 랜덤 데미지 계산
  const elemMod = getElementalMultiplier(actor.element, newEnemy.element);
  const randMod = GAME_CONST.DAMAGE_RANDOM_MIN + Math.random() * (GAME_CONST.DAMAGE_RANDOM_MAX - GAME_CONST.DAMAGE_RANDOM_MIN);
  const finalDmg = Math.floor(finalAtk * elemMod * randMod);

  // 적 체력 감소
  newEnemy.hp = Math.max(0, newEnemy.hp - finalDmg);

  // 로그 생성
  const useSkill = Math.random() > GAME_CONST.SKILL_USE_CHANCE && actor.skills?.skill;
  const skillName = useSkill ? actor.skills.skill : (actor.skills?.normal || '공격');

  let logMsg = `[${actor.name}] ${skillName}! ${finalDmg}`;
  if (atkBuff > 0) logMsg += ` (↑${atkBuff}%)`;
  if (elemMod > 1.0) logMsg += ' (효과적!)';
  logs.push(logMsg);

  return { newEnemy, logs };
};

/**
 * 후열 캐릭터의 서포트 처리
 * @param {Object} actor - 행동하는 캐릭터
 * @param {Array} allAllies - 모든 아군
 * @param {Function} applySupportEffect - 서포트 스킬 적용 함수
 * @returns {Object} { newAllies, logs }
 */
export const executeAllySupport = (actor, allAllies, applySupportEffect) => {
  let logs = [];
  let newAllies = [...allAllies];

  // 행동 타입 결정
  const rand = Math.random();
  let actionType = 'WAIT';
  if (rand < GAME_CONST.SUPPORT_ULT_CHANCE) actionType = 'ULT';
  else if (rand < GAME_CONST.SUPPORT_SKILL_CHANCE) actionType = 'SKILL';

  // 스킬 발동
  if (actionType !== 'WAIT') {
    const skillName = actionType === 'ULT' ? actor.skills.supportUlt : actor.skills.supportSkill;

    // ★ 핵심: 스킬 로직 분리 (skillLogic.js 위임)
    const effectResult = applySupportEffect(actor, actionType, newAllies);

    // 결과 반영
    newAllies = effectResult.newAllies;
    logs.push(`> [서포트] ${actor.name}: ${skillName}! ${effectResult.logMsg}`);
  }

  return { newAllies, logs };
};
