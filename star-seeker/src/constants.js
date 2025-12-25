// src/constants.js
// 게임 시스템 전반에 사용되는 상수(속성, 시너지 등)를 정의합니다.

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