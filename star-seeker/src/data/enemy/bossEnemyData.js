// src/data/enemy/bossEnemyData.js
// 전투 시스템에서 바로 사용할 수 있는 보스 몬스터 데이터

export const BOSS_ENEMIES = [
  {
    id: 'boss-entropy',
    name: '보스: 엔트로피',
    type: 'enemy',
    classType: 'Boss',
    speed: 110,
    maxHp: 5000,
    hp: 5000,
    maxEp: 100,
    ep: 0,
    color: 'bg-red-600',
    icon: '💀',
    element: 'ENTROPY',
    skills: [
      {
        id: 'entropy-strike',
        name: '엔트로피 스트라이크',
        desc: '모든 아군에게 강력한 피해를 입힙니다.',
        power: 350,
        targetType: 'ALLY_ALL',
      },
      {
        id: 'chaos-wave',
        name: '카오스 웨이브',
        desc: '무작위 아군 2명에게 피해를 입힙니다.',
        power: 180,
        targetType: 'ALLY_RANDOM',
      },
    ],
    aiPattern: ['entropy-strike', 'chaos-wave', 'chaos-wave'],
  },
  {
    id: 'boss-calamity',
    name: '보스: 칼라미티',
    type: 'enemy',
    classType: 'Boss',
    speed: 120,
    maxHp: 7000,
    hp: 7000,
    maxEp: 120,
    ep: 0,
    color: 'bg-purple-700',
    icon: '🦑',
    element: 'CHAOS',
    skills: [
      {
        id: 'calamity-blast',
        name: '칼라미티 블라스트',
        desc: '단일 아군에게 매우 강한 피해를 입힙니다.',
        power: 500,
        targetType: 'ALLY',
      },
      {
        id: 'void-pulse',
        name: '보이드 펄스',
        desc: '모든 아군의 EP를 감소시킵니다.',
        power: 0,
        effect: { epChange: -30 },
        targetType: 'ALLY_ALL',
      },
    ],
    aiPattern: ['calamity-blast', 'void-pulse', 'calamity-blast'],
  },
];

// 필요시 export default BOSS_ENEMIES;
