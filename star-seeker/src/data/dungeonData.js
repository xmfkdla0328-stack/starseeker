// Extraction dungeon definitions
export const DUNGEON_TYPES = {
  MEMORY: 'MEMORY',
  STARSTONE: 'STARSTONE',
  STIGMA: 'STIGMA',
};

// Core dungeon list per category
export const DUNGEONS = {
  [DUNGEON_TYPES.MEMORY]: [
    { id: 'mem_1', name: '기억 추출 I', level: 5, power: 180, rewards: [{ id: 'exp_chip', count: 5 }], element: 'RES', wave: 1 },
    { id: 'mem_2', name: '기억 추출 II', level: 15, power: 420, rewards: [{ id: 'exp_chip', count: 12 }], element: 'CHAOS', wave: 1 },
    { id: 'mem_3', name: '기억 추출 III', level: 25, power: 760, rewards: [{ id: 'exp_chip', count: 24 }], element: 'GRAV', wave: 2 },
  ],
  [DUNGEON_TYPES.STARSTONE]: [
    { id: 'gold_1', name: '성석 추출 I', level: 5, power: 160, rewards: [{ id: 'gold', count: 800 }], element: 'AXIOM', wave: 1 },
    { id: 'gold_2', name: '성석 추출 II', level: 18, power: 480, rewards: [{ id: 'gold', count: 1800 }], element: 'PARA', wave: 1 },
    { id: 'gold_3', name: '성석 추출 III', level: 30, power: 900, rewards: [{ id: 'gold', count: 3600 }], element: 'STASIS', wave: 2 },
  ],
  [DUNGEON_TYPES.STIGMA]: [
    { id: 'skill_1', name: '성흔 추출 I', level: 10, power: 240, rewards: [{ id: 'star_fragment', count: 2 }], element: 'CHAOS', wave: 1 },
    { id: 'skill_2', name: '성흔 추출 II', level: 22, power: 520, rewards: [{ id: 'star_fragment', count: 5 }], element: 'RES', wave: 1 },
    { id: 'skill_3', name: '성흔 추출 III', level: 35, power: 980, rewards: [{ id: 'star_fragment', count: 10 }], element: 'GRAV', wave: 2 },
  ],
};

export const DUNGEON_CATEGORIES = [
  {
    key: DUNGEON_TYPES.MEMORY,
    title: '기억 추출',
    subtitle: '경험치 재료 확보',
    accent: 'from-cyan-500/20 to-emerald-500/20',
  },
  {
    key: DUNGEON_TYPES.STARSTONE,
    title: '성석 추출',
    subtitle: '성석(골드) 수급',
    accent: 'from-amber-500/20 to-orange-500/15',
  },
  {
    key: DUNGEON_TYPES.STIGMA,
    title: '성흔 추출',
    subtitle: '스킬 재료 파밍',
    accent: 'from-purple-500/20 to-pink-500/15',
  },
];

// Helper to estimate enemy data from a dungeon stage
export const buildEnemyFromDungeon = (stage) => {
  const hp = Math.max(600, Math.floor(stage.power * 8));
  return {
    name: stage.name,
    hp,
    maxHp: hp,
    attack: Math.max(10, Math.floor(stage.power * 0.6)),
    speed: 100 + Math.floor(stage.level * 1.5),
    element: stage.element || 'NEUTRAL',
  };
};
