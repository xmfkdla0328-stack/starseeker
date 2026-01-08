import { executeEnemyTurn } from './enemyAI';

// 유닛의 거리를 초기값으로 리셋
export function resetUnitDistance(unit) {
  if (!unit || typeof unit !== 'object') return unit;
  return { ...unit, distance: 10000 };
}

// 타임라인 진행 로직 유틸
export const calculateNextState = (allUnits = []) => {
  const activeUnits = (allUnits || []).filter(u => !u.isDead);
  if (activeUnits.length === 0) return { nextActor: null, updatedUnits: allUnits };

  const times = activeUnits.map(u => ({
    uid: u.uid || u.id,
    time: (typeof u.spd === 'number' && u.spd > 0) ? ((typeof u.distance === 'number' ? u.distance : Infinity) / u.spd) : 999999,
  }));

  const minTime = Math.min(...times.map(t => t.time));

  const updatedUnits = (allUnits || []).map(u => {
    if (u.isDead) return u;
    const spd = typeof u.spd === 'number' ? u.spd : 0;
    const oldDist = typeof u.distance === 'number' ? u.distance : 0;
    const move = spd * minTime;
    let newDist = oldDist - move;
    if (newDist < 0) newDist = 0;
    return { ...u, distance: newDist };
  });

  const nextActor = updatedUnits.find(u => !u.isDead && (typeof u.distance === 'number' ? u.distance <= 0.1 : false)) || null;

  return { nextActor, updatedUnits, passedTime: minTime };
};

// === 단순한 행동 실행 유틸 (기본 구현) ===
export const executeAllyAction = (actor, allies, enemy) => {
  const atk = actor.atk || actor.attack || 10;
  const damage = Math.max(1, Math.floor(atk * (0.9 + Math.random() * 0.3)));
  const newEnemy = { ...enemy, hp: Math.max(0, (enemy.hp || enemy.maxHp || 0) - damage) };
  const logs = [`${actor.name}이(가) ${enemy.name}에게 ${damage} 피해를 입혔습니다.`];
  const isVictory = newEnemy.hp <= 0;
  return { newEnemy, newAllies: allies, logs, isVictory };
};

export const executeBossAction = (enemyUnit, alliesArray = [], reviveCount = 0) => {
  const aiResult = typeof executeEnemyTurn === 'function' ? executeEnemyTurn(enemyUnit, alliesArray) : null;
  const logs = [];
  const newAllies = alliesArray.map((a) => ({ ...a }));

  if (aiResult && Array.isArray(aiResult.damage)) {
    aiResult.damage.forEach(d => {
      const idx = d.index;
      const dmg = d.damage;
      if (typeof idx === 'number' && newAllies[idx]) {
        newAllies[idx].hp = Math.max(0, (newAllies[idx].hp || newAllies[idx].maxHp || 0) - dmg);
        if (newAllies[idx].hp <= 0) newAllies[idx].isDead = true;
        logs.push(`${enemyUnit.name}이(가) ${newAllies[idx].name}에게 ${dmg} 피해를 입혔습니다.`);
      }
    });
  } else if (!aiResult) {
    // fallback: 간단한 공격
    const idx = newAllies.findIndex(a => !a.isDead);
    if (idx !== -1) {
      const dmg = enemyUnit.atk || 10;
      newAllies[idx].hp = Math.max(0, (newAllies[idx].hp || newAllies[idx].maxHp || 0) - dmg);
      if (newAllies[idx].hp <= 0) newAllies[idx].isDead = true;
      logs.push(`${enemyUnit.name}이(가) ${newAllies[idx].name}에게 ${dmg} 피해를 입혔습니다.`);
    }
  }

  const isDefeat = newAllies.every(a => a.isDead || (a.hp || 0) <= 0);
  return { newAllies, logs, isDefeat };
};
