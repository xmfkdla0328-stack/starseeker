import { getElementalMultiplier } from './formulas';

// ★ 개별 아군 행동 처리 (1명만 행동)
export const executeAllyAction = (actor, allAllies, enemy) => {
  let currentEnemy = { ...enemy };
  let currentAllies = [...allAllies];
  let logs = [];
  let isVictory = false;

  // 1. 버프 지속시간 감소 (턴 시작 시)
  // (내 턴이 올 때만 내 버프가 줄어듬)
  const myIndex = currentAllies.findIndex(a => a.uid === actor.uid);
  if (myIndex === -1) return { newEnemy: currentEnemy, newAllies: currentAllies, logs, isVictory };

  let me = { ...currentAllies[myIndex] };
  
  // 버프 턴 차감 (현재 턴 시작했으므로)
  const activeBuffs = (me.buffs || [])
    .map(b => ({ ...b, duration: b.duration - 1 }))
    .filter(b => b.duration >= 0); // 0인 턴까지는 효과 적용 후 사라짐
  
  me.buffs = activeBuffs;
  currentAllies[myIndex] = me;

  // 2. 행동 로직 (전열/후열 구분)
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
    // 스킬 사용 확률 (속도 기반이라 턴이 자주 오므로 확률 조정)
    const rand = Math.random();
    let actionType = 'WAIT';
    if (rand < 0.15) actionType = 'ULT';
    else if (rand < 0.6) actionType = 'SKILL';

    if (actionType !== 'WAIT') {
        const skillName = actionType === 'ULT' ? me.skills.supportUlt : me.skills.supportSkill;
        let logMsg = `> [서포트] ${me.name}: ${skillName}! `;

        // [박주옥]
        if (me.name === '박주옥') {
            if (actionType === 'SKILL') {
                currentAllies = currentAllies.map(t => {
                    if (t.position === 'FRONT' && !t.isDead) {
                        return { ...t, buffs: [...t.buffs, { type: 'DEF_UP', val: 20, duration: 2 }] }; // 방어 버프
                    }
                    return t;
                });
                logMsg += "(전열 방어력 +20%)";
            } else {
                // 필살: 남겨진 자의 증명 (전열 조호 재행동)
                // 재행동 로직: AG를 1000이상으로 채워줌 (즉시 턴)
                const johoTargets = currentAllies.filter(t => t.position === 'FRONT' && !t.isDead && t.tags.includes('조호'));
                if (johoTargets.length > 0) {
                    const targetIdx = currentAllies.findIndex(t => t.uid === johoTargets[Math.floor(Math.random() * johoTargets.length)].uid);
                    if (targetIdx !== -1) {
                        // AG 게이지를 1000으로 만들어서 즉시 행동하게 함 (useBattleSystem에서 처리될 수 있도록 특수 버프 부여)
                        currentAllies[targetIdx] = { 
                            ...currentAllies[targetIdx], 
                            actionGauge: 1000, // 즉시 턴 획득
                            buffs: [...currentAllies[targetIdx].buffs, { type: 'INSTANT_TURN', duration: 1 }] 
                        };
                        logMsg += `→ [${currentAllies[targetIdx].name}] 행동 기회 추가!`;
                    }
                } else {
                    logMsg += "(대상 없음)";
                }
            }
        }
        // [루나, 아쿠아] (힐러)
        else if (me.name === '루나' || me.name === '아쿠아') {
            const healAmount = Math.floor(me.atk * (actionType === 'ULT' ? 2.5 : 1.2));
            let targetIdx = -1;
            let minHpPct = 101;
            currentAllies.forEach((t, i) => {
                if (!t.isDead) {
                    const pct = (t.hp / t.maxHp) * 100;
                    if (pct < minHpPct) { minHpPct = pct; targetIdx = i; }
                }
            });
            if (targetIdx !== -1) {
                const t = currentAllies[targetIdx];
                const newHp = Math.min(t.maxHp, t.hp + healAmount);
                currentAllies[targetIdx] = { ...t, hp: newHp };
                logMsg += `→ [${t.name}] HP ${healAmount} 회복`;
            }
        }
        // [그 외 버퍼]
        else {
            const val = actionType === 'ULT' ? 30 : 10;
            currentAllies = currentAllies.map(t => {
                if (t.position === 'FRONT' && !t.isDead) {
                    return { ...t, buffs: [...t.buffs, { type: 'ATK_UP', val: val, duration: 2 }] };
                }
                return t;
            });
            logMsg += `(전열 공격력 +${val}%)`;
        }
        logs.push(logMsg);
    }
  }

  if (currentEnemy.hp <= 0) {
    isVictory = true;
    logs.push(`> [${currentEnemy.name}] 처치! 승리!`);
  }

  return { newEnemy: currentEnemy, newAllies: currentAllies, logs, isVictory };
};


// ★ 개별 보스 행동 처리
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