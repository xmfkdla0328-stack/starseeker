import { getReadyUnits, calculateGaugeJump, updateActionGauges } from '../../battle/gaugeLogic';
import { BATTLE_CONST } from '../../battle/constants';

describe('gaugeLogic', () => {
  const makeAlly = (overrides = {}) => ({
    isDead: false,
    spd: 100,
    actionGauge: 0,
    ...overrides,
  });
  const makeEnemy = (overrides = {}) => ({
    isDead: false,
    spd: 80,
    actionGauge: 0,
    ...overrides,
  });

  test('getReadyUnits filters by MAX_ACTION_GAUGE', () => {
    const allies = [makeAlly({ actionGauge: BATTLE_CONST.MAX_ACTION_GAUGE }), makeAlly({ actionGauge: 200 })];
    const enemy = makeEnemy({ actionGauge: 500 });
    const ready = getReadyUnits(allies, enemy, BATTLE_CONST);
    expect(ready.length).toBe(1);
    expect(ready[0].type).toBe('ALLY');
  });

  test('calculateGaugeJump advances gauges to nearest ready', () => {
    const allies = [makeAlly({ spd: 100, actionGauge: 100 }), makeAlly({ spd: 50, actionGauge: 200 })];
    const enemy = makeEnemy({ spd: 80, actionGauge: 300 });
    const { allies: updatedAllies, enemy: updatedEnemy } = calculateGaugeJump(allies, enemy, BATTLE_CONST);
    // Someone should become ready or closer; verify increase happened
    expect(updatedAllies[0].actionGauge).toBeGreaterThan(allies[0].actionGauge);
    expect(updatedAllies[1].actionGauge).toBeGreaterThan(allies[1].actionGauge);
    expect(updatedEnemy.actionGauge).toBeGreaterThan(enemy.actionGauge);
  });

  test('updateActionGauges increases by one tick', () => {
    const allies = [makeAlly({ actionGauge: 100 })];
    const enemy = makeEnemy({ actionGauge: 50 });
    const { allies: updatedAllies, enemy: updatedEnemy } = updateActionGauges(allies, enemy, BATTLE_CONST);
    expect(updatedAllies[0].actionGauge).toBe(100 + allies[0].spd * BATTLE_CONST.AG_TICK_RATE);
    expect(updatedEnemy.actionGauge).toBe(50 + enemy.spd * BATTLE_CONST.AG_TICK_RATE);
  });
});
