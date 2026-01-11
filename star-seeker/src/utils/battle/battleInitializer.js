import { calculateStatsByLevel } from '../../data/playerStats';

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
      distance: 10000, // 거리 시스템 적용
      maxDistance: 10000,
      // ...existing code...
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
      distance: 10000, // 거리 시스템 적용
      maxDistance: 10000,
      // ...existing code...
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
  distance: 10000, // 거리 시스템 적용
  maxDistance: 10000,
});
