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

// 스킬/스토리 데이터가 추가된 캐릭터 DB
export const CHAR_DB = [
  { 
    id: 1, name: '서주목', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '조호', '신장의 의지'], baseAtk: 100, baseHp: 500, desc: '별의 인도를 받는 사령관',
    skills: { normal: '지휘 사격', skill: '전술 명령: 돌격', ultimate: '성운의 포격' },
    profile: { age: '??', height: '182cm', like: '오래된 지도', hate: '흐린 날씨' },
    stories: [{ title: '만남', unlockBond: 1 }, { title: '과거의 기억', unlockBond: 5 }, { title: '진실', unlockBond: 10 }]
  },
  { 
    id: 2, name: '루나', rarity: 4, element: 'DARK', role: 'BACK', tags: ['별의 여행자', '조영'], baseAtk: 80, baseHp: 300, desc: '달빛 아래 노래하는 음유시인',
    skills: { normal: '음표 날리기', skill: '치유의 노래', ultimate: '월광 소나타' },
    profile: { age: '19', height: '160cm', like: '노래, 밤산책', hate: '소음' },
    stories: [{ title: '첫 번째 노래', unlockBond: 1 }, { title: '잃어버린 악보', unlockBond: 3 }]
  },
  { 
    id: 3, name: '이그니스', rarity: 4, element: 'FIRE', role: 'FRONT', tags: ['조호', '신장의 의지'], baseAtk: 120, baseHp: 600, desc: '불꽃을 다루는 검사',
    skills: { normal: '화염 베기', skill: '불꽃의 춤', ultimate: '인페르노 슬래시' },
    profile: { age: '24', height: '178cm', like: '대련', hate: '차가운 것' },
    stories: [{ title: '검의 맹세', unlockBond: 1 }]
  },
  { 
    id: 4, name: '아쿠아', rarity: 3, element: 'WATER', role: 'BACK', tags: ['별의 여행자'], baseAtk: 60, baseHp: 350, desc: '치유의 물방울',
    skills: { normal: '물방울 톡', skill: '정화의 비', ultimate: '대해일' },
    profile: { age: '16', height: '155cm', like: '깨끗한 물', hate: '건조함' },
    stories: [{ title: '작은 샘물', unlockBond: 1 }]
  },
  { 
    id: 5, name: '테라', rarity: 3, element: 'EARTH', role: 'FRONT', tags: ['조호'], baseAtk: 90, baseHp: 700, desc: '대지의 방패',
    skills: { normal: '바위 던지기', skill: '철벽 방어', ultimate: '지진파' },
    profile: { age: '28', height: '185cm', like: '명상', hate: '가벼운 행동' },
    stories: [{ title: '묵묵한 수호', unlockBond: 1 }]
  },
  { 
    id: 6, name: '솔라', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '신장의 의지'], baseAtk: 110, baseHp: 550, desc: '태양의 기사',
    skills: { normal: '빛의 일격', skill: '태양의 가호', ultimate: '솔라 이클립스' },
    profile: { age: '22', height: '172cm', like: '정오의 햇살', hate: '거짓말' },
    stories: [{ title: '기사의 맹세', unlockBond: 1 }]
  },
  { 
    id: 7, name: '녹스', rarity: 4, element: 'DARK', role: 'FRONT', tags: ['조영', '별의 여행자'], baseAtk: 130, baseHp: 450, desc: '어둠 속의 암살자',
    skills: { normal: '단검 투척', skill: '그림자 숨기', ultimate: '팬텀 엑시큐션' },
    profile: { age: '25', height: '175cm', like: '고요함', hate: '눈에 띄는 것' },
    stories: [{ title: '그림자', unlockBond: 1 }]
  },
  { 
    id: 8, name: '실바', rarity: 3, element: 'EARTH', role: 'BACK', tags: ['조호'], baseAtk: 50, baseHp: 400, desc: '숲의 관리자',
    skills: { normal: '덩굴 채찍', skill: '광합성', ultimate: '숲의 분노' },
    profile: { age: '102', height: '165cm', like: '식물', hate: '산불' },
    stories: [{ title: '숲의 목소리', unlockBond: 1 }]
  },
];