// src/data/characters.js

export const CHAR_DB = [
  { 
    id: 1, name: '서주목', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '조호', '신장의 의지'], baseAtk: 100, baseHp: 500, desc: '별의 인도를 받는 사령관',
    skills: { 
      // 전열 배치 시 사용
      normal: '지휘 사격', 
      skill: '전술 명령: 돌격', 
      ultimate: '성운의 포격',
      // 후열 배치 시 사용
      supportSkill: '정밀 관측', 
      supportUlt: '성운의 가호'
    },
    profile: { age: '??', height: '182cm', like: '오래된 지도', hate: '흐린 날씨' },
    stories: [{ title: '만남', unlockBond: 1 }, { title: '과거의 기억', unlockBond: 5 }, { title: '진실', unlockBond: 10 }]
  },
  { 
    id: 2, name: '루나', rarity: 4, element: 'DARK', role: 'BACK', tags: ['별의 여행자', '조영'], baseAtk: 80, baseHp: 300, desc: '달빛 아래 노래하는 음유시인',
    skills: { 
      // 후열 전용
      supportSkill: '치유의 노래', 
      supportUlt: '월광 소나타' 
    },
    profile: { age: '19', height: '160cm', like: '노래, 밤산책', hate: '소음' },
    stories: [{ title: '첫 번째 노래', unlockBond: 1 }, { title: '잃어버린 악보', unlockBond: 3 }]
  },
  { 
    id: 3, name: '이그니스', rarity: 4, element: 'FIRE', role: 'FRONT', tags: ['조호', '신장의 의지'], baseAtk: 120, baseHp: 600, desc: '불꽃을 다루는 검사',
    skills: { 
      // 전열 전용
      normal: '화염 베기', 
      skill: '불꽃의 춤', 
      ultimate: '인페르노 슬래시' 
    },
    profile: { age: '24', height: '178cm', like: '대련', hate: '차가운 것' },
    stories: [{ title: '검의 맹세', unlockBond: 1 }]
  },
  { 
    id: 4, name: '아쿠아', rarity: 3, element: 'WATER', role: 'BACK', tags: ['별의 여행자'], baseAtk: 60, baseHp: 350, desc: '치유의 물방울',
    skills: { 
      // 후열 전용
      supportSkill: '정화의 비', 
      supportUlt: '대해일' 
    },
    profile: { age: '16', height: '155cm', like: '깨끗한 물', hate: '건조함' },
    stories: [{ title: '작은 샘물', unlockBond: 1 }]
  },
  { 
    id: 5, name: '테라', rarity: 3, element: 'EARTH', role: 'FRONT', tags: ['조호'], baseAtk: 90, baseHp: 700, desc: '대지의 방패',
    skills: { 
      // 전열 전용
      normal: '바위 던지기', 
      skill: '철벽 방어', 
      ultimate: '지진파' 
    },
    profile: { age: '28', height: '185cm', like: '명상', hate: '가벼운 행동' },
    stories: [{ title: '묵묵한 수호', unlockBond: 1 }]
  },
  { 
    id: 6, name: '솔라', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '신장의 의지'], baseAtk: 110, baseHp: 550, desc: '태양의 기사',
    skills: { 
      // 전열
      normal: '빛의 일격', 
      skill: '태양의 가호', 
      ultimate: '솔라 이클립스',
      // 후열
      supportSkill: '태양의 축복',
      supportUlt: '여명의 빛'
    },
    profile: { age: '22', height: '172cm', like: '정오의 햇살', hate: '거짓말' },
    stories: [{ title: '기사의 맹세', unlockBond: 1 }]
  },
  { 
    id: 7, name: '녹스', rarity: 4, element: 'DARK', role: 'FRONT', tags: ['조영', '별의 여행자'], baseAtk: 130, baseHp: 450, desc: '어둠 속의 암살자',
    skills: { 
      // 전열
      normal: '단검 투척', 
      skill: '그림자 숨기', 
      ultimate: '팬텀 엑시큐션' 
    },
    profile: { age: '25', height: '175cm', like: '고요함', hate: '눈에 띄는 것' },
    stories: [{ title: '그림자', unlockBond: 1 }]
  },
  { 
    id: 8, name: '실바', rarity: 3, element: 'EARTH', role: 'BACK', tags: ['조호'], baseAtk: 50, baseHp: 400, desc: '숲의 관리자',
    skills: { 
      // 후열
      supportSkill: '광합성', 
      supportUlt: '숲의 분노' 
    },
    profile: { age: '102', height: '165cm', like: '식물', hate: '산불' },
    stories: [{ title: '숲의 목소리', unlockBond: 1 }]
  },
];