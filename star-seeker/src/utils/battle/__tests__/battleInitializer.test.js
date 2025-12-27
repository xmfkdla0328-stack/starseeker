import { initializeBattleAllies, initializeBoss } from '../../battle/battleInitializer';
import { BOSS_DATA } from '../../battle/battleData';

describe('battleInitializer', () => {
  const front = [
    { id: 'f1', baseAtk: 100, baseHp: 1000, baseSpd: 100, level: 1 },
  ];
  const back = [
    { id: 'b1', baseAtk: 50, baseHp: 500, baseSpd: 80, level: 1 },
  ];

  test('initializeBattleAllies creates front/back allies with positions', () => {
    const allies = initializeBattleAllies(front, back, { atkBonusPct: 10, defBonusPct: 5 }, { addedAtk: 20, addedHp: 100 });
    expect(allies.length).toBe(2);
    expect(allies[0].position).toBe('FRONT');
    expect(allies[1].position).toBe('BACK');
    expect(allies[0]).toHaveProperty('actionGauge');
    expect(allies[0]).toHaveProperty('buffs');
  });

  test('initializeBoss sets hp and actionGauge', () => {
    const boss = initializeBoss(BOSS_DATA);
    expect(boss.hp).toBe(BOSS_DATA.maxHp);
    expect(boss).toHaveProperty('actionGauge');
  });
});
