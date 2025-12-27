export const buildAllUnits = (allies, enemy) => {
  const list = allies.map((a, i) => ({ ...a, type: 'ALLY', index: i }));
  list.push({ ...enemy, type: 'BOSS' });
  return list;
};

export const getReadyUnits = (allies, enemy, BATTLE_CONST) => {
  return buildAllUnits(allies, enemy).filter(
    (u) => !u.isDead && u.actionGauge >= BATTLE_CONST.MAX_ACTION_GAUGE
  );
};

export const calculateGaugeJump = (allies, enemy, BATTLE_CONST) => {
  const allUnits = buildAllUnits(allies, enemy);
  let minTicksNeeded = Infinity;

  allUnits.forEach((u) => {
    if (u.isDead) return;
    const tickAmount = u.spd * BATTLE_CONST.AG_TICK_RATE;
    const remaining = BATTLE_CONST.MAX_ACTION_GAUGE - u.actionGauge;
    const ticks = Math.max(0, Math.ceil(remaining / tickAmount));
    if (ticks < minTicksNeeded) minTicksNeeded = ticks;
  });

  if (minTicksNeeded === Infinity || minTicksNeeded <= 0) {
    return { allies, enemy };
  }

  const updatedAllies = allies.map((a) => {
    if (a.isDead) return a;
    return {
      ...a,
      actionGauge: a.actionGauge + a.spd * BATTLE_CONST.AG_TICK_RATE * minTicksNeeded,
    };
  });

  const updatedEnemy = enemy.isDead
    ? enemy
    : {
        ...enemy,
        actionGauge: enemy.actionGauge + enemy.spd * BATTLE_CONST.AG_TICK_RATE * minTicksNeeded,
      };

  return { allies: updatedAllies, enemy: updatedEnemy };
};

export const updateActionGauges = (allies, enemy, BATTLE_CONST) => {
  const updatedAllies = allies.map((a) => {
    if (a.isDead) return a;
    return {
      ...a,
      actionGauge: a.actionGauge + a.spd * BATTLE_CONST.AG_TICK_RATE,
    };
  });

  const updatedEnemy = enemy.isDead
    ? enemy
    : {
        ...enemy,
        actionGauge: enemy.actionGauge + enemy.spd * BATTLE_CONST.AG_TICK_RATE,
      };

  return { allies: updatedAllies, enemy: updatedEnemy };
};
