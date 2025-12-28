import { GAME_CONST } from '../../constants/index';
import { applySupportEffect } from './skillLogic';
import { updateBuffDurations, getBuffValue } from './buffLogic';
import { executeAllyAttack, executeAllySupport } from './allyLogic';
import { calculateBossDamage, handleCharacterDeath } from './bossLogic';

// 아군 행동 처리
export const executeAllyAction = (actor, allAllies, enemy) => {
  let currentEnemy = { ...enemy };
  let currentAllies = [...allAllies];
  let logs = [];
  let isVictory = false;

  // 1. 버프 지속시간 감소
  const myIndex = currentAllies.findIndex(a => a.uid === actor.uid);
  if (myIndex === -1) return { newEnemy: currentEnemy, newAllies: currentAllies, logs, isVictory };

  let me = { ...currentAllies[myIndex] };
  me.buffs = updateBuffDurations(me.buffs);
  currentAllies[myIndex] = me;

  // 2. 행동 로직 (위치에 따라 구분)
  if (me.position === 'FRONT') {
    // 전열: 공격
    const result = executeAllyAttack(me, currentEnemy, me.buffs);
    currentEnemy = result.newEnemy;
    logs.push(...result.logs);
  } else {
    // 후열: 서포트
    const result = executeAllySupport(me, currentAllies, applySupportEffect);
    currentAllies = result.newAllies;
    logs.push(...result.logs);
  }

  // 3. 승리 조건 체크
  if (currentEnemy.hp <= 0) {
    isVictory = true;
    logs.push(`> [${currentEnemy.name}] 처치! 승리!`);
  }

  return { newEnemy: currentEnemy, newAllies: currentAllies, logs, isVictory };
};


// 보스 행동 처리
export const executeBossAction = (boss, allAllies, reviveCount) => {
  let currentAllies = [...allAllies];
  let logs = [];
  let isDefeat = false;
  let newReviveCount = reviveCount;

  // 생존한 전열 캐릭터 찾기
  const livingFrontAllies = currentAllies
    .map((a, i) => ({ ...a, idx: i }))
    .filter(a => !a.isDead && a.position === 'FRONT');

  if (livingFrontAllies.length > 0) {
    // 랜덤 대상 선택
    const targetData = livingFrontAllies[Math.floor(Math.random() * livingFrontAllies.length)];
    const targetIdx = targetData.idx;
    const target = { ...currentAllies[targetIdx] };

    // 데미지 계산
    const dmgResult = calculateBossDamage(boss, target, target.buffs);
    logs.push(dmgResult.logMsg);

    let newHp = target.hp - dmgResult.finalDmg;

    // 사망 처리
    if (newHp <= 0) {
      const deathResult = handleCharacterDeath(target, newReviveCount);
      newHp = deathResult.newHp;
      target.isDead = deathResult.isDead;
      newReviveCount = deathResult.newReviveCount;
      logs.push(...deathResult.logs);
    }

    target.hp = newHp;
    currentAllies[targetIdx] = target;
  }

  // 패배 조건 체크
  const survivors = currentAllies.filter(a => !a.isDead && a.position === 'FRONT');
  if (survivors.length === 0) {
    isDefeat = true;
    logs.push(`> 전열 붕괴! 패배했습니다...`);
  }

  return { newAllies: currentAllies, logs, newReviveCount, isDefeat };
};