import { getElementalMultiplier } from './formulas';
import { BATTLE_CONST } from './constants';
import { applySupportEffect } from './skillLogic'; // ★ 신규 모듈 import

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
  
  const activeBuffs = (me.buffs || [])
    .map(b => ({ ...b, duration: b.duration - 1 }))
    .filter(b => b.duration >= 0);
  
  me.buffs = activeBuffs;
  currentAllies[myIndex] = me;

  // 2. 행동 로직
  if (me.position === 'FRONT') {
    // --- [전열: 공격] ---
    const atkBuff = activeBuffs.filter(b => b.type === 'ATK_UP').reduce((acc, b) => acc + b.val, 0);
    const finalAtk = Math.floor(me.atk * (1 + atkBuff / 100));
    
    const elemMod = getElementalMultiplier(me.element, currentEnemy.element);
    const randMod = 0.9 + Math.random() * 0.2;
    const finalDmg = Math.floor(finalAtk * elemMod * randMod);

    currentEnemy.hp = Math.max(0, currentEnemy.hp - finalDmg);

    const useSkill = Math.random() > 0.7 && me.skills?.skill;
    const skillName = useSkill ? me.skills.skill : (me.skills?.normal || '공격');
    
    let logMsg = `[${me.name}] ${skillName}! ${finalDmg}`;
    if (atkBuff > 0) logMsg += ` (↑${atkBuff}%)`;
    if (elemMod > 1.0) logMsg += " (효과적!)";
    logs.push(logMsg);

  } else {
    // --- [후열: 서포트] ---
    const rand = Math.random();
    let actionType = 'WAIT';
    if (rand < 0.15) actionType = 'ULT';
    else if (rand < 0.6) actionType = 'SKILL';

    if (actionType !== 'WAIT') {
        const skillName = actionType === 'ULT' ? me.skills.supportUlt : me.skills.supportSkill;
        
        // ★ 핵심: 스킬 로직 분리 (skillLogic.js 위임)
        const effectResult = applySupportEffect(me, actionType, currentAllies);
        
        // 결과 반영
        currentAllies = effectResult.newAllies;
        logs.push(`> [서포트] ${me.name}: ${skillName}! ${effectResult.logMsg}`);
    }
  }

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

  const livingFrontAllies = currentAllies
    .map((a, i) => ({ ...a, idx: i }))
    .filter(a => !a.isDead && a.position === 'FRONT');

  if (livingFrontAllies.length > 0) {
    const targetData = livingFrontAllies[Math.floor(Math.random() * livingFrontAllies.length)];
    const targetIdx = targetData.idx;
    const target = { ...currentAllies[targetIdx] };

    // 방어력 계산
    const defBuff = (target.buffs || []).filter(b => b.type === 'DEF_UP').reduce((acc, b) => acc + b.val, 0);
    const totalDefPct = (target.defPct || 0) + defBuff;
    const defMod = Math.max(0.1, 1 - totalDefPct / 100);

    const elemMod = getElementalMultiplier(boss.element, target.element);
    const randMod = 0.9 + Math.random() * 0.2;
    const finalDmg = Math.floor(boss.atk * elemMod * defMod * randMod);

    let newHp = target.hp - finalDmg;
    
    let logMsg = `[${boss.name}] 공격! [${target.name}]에게 ${finalDmg}`;
    if (defBuff > 0) logMsg += ` (방어 +${defBuff}%)`;
    logs.push(logMsg);

    if (newHp <= 0) {
      // 조호 부활 체크 (상수 사용 X - 시너지는 다른 로직이므로 유지, 혹은 상수로 뺄 수도 있음)
      const hasJohoTag = target.tags && target.tags.includes('조호');
      const canResurrect = hasJohoTag && newReviveCount > 0;

      if (canResurrect) {
        newReviveCount--;
        newHp = Math.floor(target.maxHp * 0.2);
        target.isDead = false; 
        logs.push(`> 🌟 [시너지] '조호' 발동! [${target.name}] 부활! (HP: ${newHp})`);
        logs.push(`> (남은 부활 횟수: ${newReviveCount})`);
      } else {
        newHp = 0;
        target.isDead = true; 
        logs.push(`> [${target.name}] 쓰러짐...`);
      }
    }
    
    target.hp = newHp;
    currentAllies[targetIdx] = target;
  }

  const survivors = currentAllies.filter(a => !a.isDead && a.position === 'FRONT');
  if (survivors.length === 0) {
    isDefeat = true;
    logs.push(`> 전열 붕괴! 패배했습니다...`);
  }

  return { newAllies: currentAllies, logs, newReviveCount, isDefeat };
};