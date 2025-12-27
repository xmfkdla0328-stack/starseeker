// src/utils/battleUtils.js

export const BOSS_DATA = {
  name: '화염룡',
  maxHp: 20000,
  atk: 400,
  element: 'FIRE',
  img: 'BOSS'
};

export const getElementalMultiplier = (atkElem, defElem) => {
  if (!atkElem || !defElem) return 1.0;
  if (
    (atkElem === 'WATER' && defElem === 'FIRE') ||
    (atkElem === 'FIRE' && defElem === 'EARTH') ||
    (atkElem === 'EARTH' && defElem === 'WATER') ||
    (atkElem === 'LIGHT' && defElem === 'DARK') ||
    (atkElem === 'DARK' && defElem === 'LIGHT')
  ) return 1.2;
  if (
    (atkElem === 'FIRE' && defElem === 'WATER') ||
    (atkElem === 'EARTH' && defElem === 'FIRE') ||
    (atkElem === 'WATER' && defElem === 'EARTH')
  ) return 0.8;
  return 1.0;
};

export const getSynergyBonus = (activeSynergies) => {
  let atkBonusPct = 0;
  let defBonusPct = 0; 
  let johoRevive = false;

  activeSynergies.forEach(syn => {
    if (syn.name === '조영') {
      if (syn.count >= 8) atkBonusPct += 50;
      else if (syn.count >= 6) atkBonusPct += 30;
      else if (syn.count >= 4) atkBonusPct += 20;
      else if (syn.count >= 2) atkBonusPct += 10;
    }
    if (syn.name === '신장의 의지') {
      if (syn.count >= 3) defBonusPct += 15;
      else if (syn.count >= 1) defBonusPct += 5;
    }
    if (syn.name === '조호' && syn.count >= 2) {
      johoRevive = true;
    }
  });
  return { atkBonusPct, defBonusPct, johoRevive };
};

export const calculateBackRowSupport = (backRowChars) => {
  if (!backRowChars || backRowChars.length === 0) return { atk: 0, hp: 0 };
  let totalBackAtk = 0;
  let totalBackHp = 0;
  backRowChars.forEach(char => {
    totalBackAtk += char.baseAtk;
    totalBackHp += char.baseHp;
  });
  const SUPPORT_RATIO = 0.2;
  return {
    addedAtk: Math.floor(totalBackAtk * SUPPORT_RATIO),
    addedHp: Math.floor(totalBackHp * SUPPORT_RATIO)
  };
};

export const handleAllyTurn = (allies, enemy) => {
  let currentEnemy = { ...enemy };
  let turnLogs = [];
  let isVictory = false;

  allies.forEach(ally => {
    if (ally.isDead) return;

    if (ally.position === 'FRONT') {
      const elemMod = getElementalMultiplier(ally.element, currentEnemy.element);
      const randMod = 0.9 + Math.random() * 0.2;
      const finalDmg = Math.floor(ally.atk * elemMod * randMod);

      currentEnemy.hp = Math.max(0, currentEnemy.hp - finalDmg);

      // 전열: 일반 스킬 이름 사용 (기본은 normal, 확률적으로 skill)
      const useSkill = Math.random() > 0.7 && ally.skills?.skill;
      const skillName = useSkill ? ally.skills.skill : (ally.skills?.normal || '공격');
      
      let logMsg = `[${ally.name}] ${skillName}! ${finalDmg}`;
      if (elemMod > 1.0) logMsg += " (효과적!)";
      turnLogs.push(logMsg);
    } 
    else if (ally.position === 'BACK') {
      // 후열: 서포트 스킬 사용
      // 데이터 개편으로 모든 후열/만능 캐릭터는 supportSkill을 가짐
      const skillName = ally.skills?.supportSkill || '응원';
      
      // 실제 효과 구현 전이므로 로그만 출력
      if (Math.random() > 0.6) {
          turnLogs.push(`> [서포트] ${ally.name}의 ${skillName}! (아군 지원)`);
      }
    }
  });

  if (currentEnemy.hp <= 0) {
    isVictory = true;
    turnLogs.push(`> [${currentEnemy.name}] 처치! 승리!`);
  }

  return { newEnemy: currentEnemy, logs: turnLogs, isVictory };
};

export const handleEnemyTurn = (allies, enemy, reviveCount) => {
  let currentAllies = [...allies];
  let turnLogs = [];
  let isDefeat = false;
  let newReviveCount = reviveCount;

  const livingFrontAllies = currentAllies
    .map((a, i) => ({ ...a, idx: i }))
    .filter(a => !a.isDead && a.position === 'FRONT');

  if (livingFrontAllies.length > 0) {
    const targetData = livingFrontAllies[Math.floor(Math.random() * livingFrontAllies.length)];
    const targetIdx = targetData.idx;
    const target = { ...currentAllies[targetIdx] };

    const elemMod = getElementalMultiplier(enemy.element, target.element);
    const defMod = 1 - (target.defPct || 0) / 100;
    const randMod = 0.9 + Math.random() * 0.2;
    const finalDmg = Math.floor(enemy.atk * elemMod * defMod * randMod);

    let newHp = target.hp - finalDmg;
    turnLogs.push(`[${enemy.name}] 공격! [${target.name}]에게 ${finalDmg}`);

    if (newHp <= 0) {
      const hasJohoTag = target.tags && target.tags.includes('조호');
      const canResurrect = hasJohoTag && newReviveCount > 0;

      if (canResurrect) {
        newReviveCount--;
        newHp = Math.floor(target.maxHp * 0.2);
        target.isDead = false; 
        turnLogs.push(`> 🌟 [시너지] '조호' 발동! [${target.name}] 부활! (HP: ${newHp})`);
        turnLogs.push(`> (남은 부활 횟수: ${newReviveCount})`);
      } else {
        newHp = 0;
        target.isDead = true; 
        turnLogs.push(`> [${target.name}] 쓰러짐...`);
      }
    }
    
    target.hp = newHp;
    currentAllies[targetIdx] = target;
  }

  const survivors = currentAllies.filter(a => !a.isDead && a.position === 'FRONT');
  if (survivors.length === 0) {
    isDefeat = true;
    turnLogs.push(`> 전열 붕괴! 패배했습니다...`);
  }

  return { newAllies: currentAllies, logs: turnLogs, newReviveCount, isDefeat };
};