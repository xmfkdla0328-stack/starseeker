import { calculateStatsByLevel } from '../../data/playerStats';

export const getInitialActionGauge = () => Math.floor(Math.random() * 200);

export const initializeBattleAllies = (
  frontChars,
  backChars,
  { atkBonusPct = 0, defBonusPct = 0 } = {},
  { addedAtk = 0, addedHp = 0 } = {}
) => {
  const allies = [];

  frontChars.forEach((c) => {
    const charLevel = c.level || 1;
    const levelStats = calculateStatsByLevel(c.baseAtk, c.baseHp, charLevel);
    const finalAtk = Math.floor(levelStats.atk * (1 + atkBonusPct / 100)) + addedAtk;
    const finalHp = levelStats.hp + addedHp;

    allies.push({
      ...c,
      position: 'FRONT',
      maxHp: finalHp,
      hp: finalHp,
      atk: finalAtk,
      defPct: defBonusPct,
      spd: c.baseSpd,
      actionGauge: getInitialActionGauge(),
      isDead: false,
      buffs: [],
    });
  });

  backChars.forEach((c) => {
    const charLevel = c.level || 1;
    const levelStats = calculateStatsByLevel(c.baseAtk, c.baseHp, charLevel);

    allies.push({
      ...c,
      position: 'BACK',
      maxHp: levelStats.hp,
      hp: levelStats.hp,
      atk: levelStats.atk,
      defPct: 0,
      spd: c.baseSpd,
      actionGauge: getInitialActionGauge(),
      isDead: false,
      buffs: [],
    });
  });

  return allies;
};

export const initializeBoss = (bossData) => ({
  ...bossData,
  hp: bossData.maxHp,
  spd: bossData.spd,
  actionGauge: getInitialActionGauge(),
});
