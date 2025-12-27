import { getElementalMultiplier } from './formulas';

// 아군 턴 로직
export const handleAllyTurn = (allies, enemy) => {
  let currentEnemy = { ...enemy };
  let turnLogs = [];
  let isVictory = false;

  allies.forEach(ally => {
    if (ally.isDead) return;

    if (ally.position === 'FRONT') {
      // 전열: 공격
      const elemMod = getElementalMultiplier(ally.element, currentEnemy.element);
      const randMod = 0.9 + Math.random() * 0.2;
      const finalDmg = Math.floor(ally.atk * elemMod * randMod);

      currentEnemy.hp = Math.max(0, currentEnemy.hp - finalDmg);

      // 스킬 사용 여부 결정 (나중에 정교화 예정)
      const useSkill = Math.random() > 0.7 && ally.skills?.skill;
      const skillName = useSkill ? ally.skills.skill : (ally.skills?.normal || '공격');
      
      let logMsg = `[${ally.name}] ${skillName}! ${finalDmg}`;
      if (elemMod > 1.0) logMsg += " (효과적!)";
      turnLogs.push(logMsg);
    } 
    else if (ally.position === 'BACK') {
      // 후열: 서포트 (추후 구현)
      const skillName = ally.skills?.supportSkill || '응원';
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

// 적군 턴 로직
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