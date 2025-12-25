// src/constants.js

export const ELEMENTS = {
  FIRE: { name: '불', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' },
  WATER: { name: '물', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/50' },
  EARTH: { name: '대지', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' },
  LIGHT: { name: '빛', color: 'text-yellow-300', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' },
  DARK: { name: '어둠', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/50' },
};

export const SYNERGIES = {
  '조영': {
    name: '조영',
    desc: '그림자를 비추는 빛',
    levels: [
      { count: 2, effect: '공격력 +10%' },
      { count: 4, effect: '공격력 +20%' },
      { count: 6, effect: '공격력 +30%' },
      { count: 8, effect: '공격력 +50%' },
    ]
  },
  '조호': {
    name: '조호',
    desc: '수호하는 호랑이',
    levels: [
      { count: 2, effect: '전열 "조호" 캐릭터 사망 시 1회 20% 체력 부활' },
    ]
  },
  '신장의 의지': {
    name: '신장의 의지',
    desc: '신성한 장군의 기백',
    levels: [
      { count: 1, effect: '아군 전체 방어력 +5%' },
      { count: 3, effect: '아군 전체 방어력 +15%' },
    ]
  },
  '별의 여행자': {
    name: '별의 여행자',
    desc: '우주를 여행하는 자들',
    levels: [
      { count: 2, effect: '탐험 속도 +20%' },
    ]
  }
};

export const CHAR_DB = [
  { id: 1, name: '서주목', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '조호', '신장의 의지'], baseAtk: 100, baseHp: 500, desc: '별의 인도를 받는 사령관' },
  { id: 2, name: '루나', rarity: 4, element: 'DARK', role: 'BACK', tags: ['별의 여행자', '조영'], baseAtk: 80, baseHp: 300, desc: '달빛 아래 노래하는 음유시인' },
  { id: 3, name: '이그니스', rarity: 4, element: 'FIRE', role: 'FRONT', tags: ['조호', '신장의 의지'], baseAtk: 120, baseHp: 600, desc: '불꽃을 다루는 검사' },
  { id: 4, name: '아쿠아', rarity: 3, element: 'WATER', role: 'BACK', tags: ['별의 여행자'], baseAtk: 60, baseHp: 350, desc: '치유의 물방울' },
  { id: 5, name: '테라', rarity: 3, element: 'EARTH', role: 'FRONT', tags: ['조호'], baseAtk: 90, baseHp: 700, desc: '대지의 방패' },
  { id: 6, name: '솔라', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '신장의 의지'], baseAtk: 110, baseHp: 550, desc: '태양의 기사' },
  { id: 7, name: '녹스', rarity: 4, element: 'DARK', role: 'FRONT', tags: ['조영', '별의 여행자'], baseAtk: 130, baseHp: 450, desc: '어둠 속의 암살자' },
  { id: 8, name: '실바', rarity: 3, element: 'EARTH', role: 'BACK', tags: ['조호'], baseAtk: 50, baseHp: 400, desc: '숲의 관리자' },
];