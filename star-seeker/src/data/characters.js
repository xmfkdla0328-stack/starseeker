// 인연도 레벨별 보상 및 스토리
export const BOND_LEVELS = {
  0: { name: '인연 없음', story: '아직 인연이 시작되지 않았습니다' },
  1: { name: '만남', story: '처음 만난 그날의 기억' },
  2: { name: '친숙', story: '함께하는 시간들' },
  3: { name: '깊어짐', story: '마음을 열기 시작하다' },
  4: { name: '신뢰', story: '내가 믿고 따를 사람' },
  5: { name: '인연의 끝', story: '영원한 인연의 맹세' },
};

export const CHAR_DB = [
  { 
    id: 1, name: '서주목', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '조호', '신장의 의지'], 
    baseAtk: 100, baseHp: 500, baseSpd: 130, baseDef: 80,
    desc: '별의 인도를 받는 사령관',
    skills: { 
      normal: '지휘 사격', skill: '전술 명령: 돌격', ultimate: '성운의 포격',
      supportSkill: '정밀 관측', supportUlt: '성운의 가호' 
    },
     skillLevels: {
       normal: 1, skill: 1, ultimate: 1,
       supportSkill: 1, supportUlt: 1
     },
     skillDetails: {
       normal: { desc: '적 1체에게 공격력의 100% 피해', cooldown: 0 },
       skill: { desc: '전열 아군 공격력 +20% & 행동 게이지 +10% (지속 2턴)', cooldown: 3 },
       ultimate: { desc: '모든 적에게 공격력의 220% 피해, 방어력 -15% (지속 2턴)', cooldown: 4 },
       supportSkill: { desc: '후열 아군 치명타 확률 +15% (지속 2턴)', cooldown: 3 },
       supportUlt: { desc: '아군 전체 보호막 (사용자 공격력 150%) 부여, 받는 피해 -20% (2턴)', cooldown: 5 }
     },
     supportEffects: {
      skill: { type: 'BUFF_FRONT_ATK', params: { value: 10 } },
      ultimate: { type: 'BUFF_FRONT_ATK', params: { value: 30 } }
    },
    profile: { age: '??', height: '182cm', like: '오래된 지도', hate: '흐린 날씨' },
    stories: [{ title: '만남', unlockBond: 1 }]
  },
  { 
    id: 2, name: '루나', rarity: 4, element: 'DARK', role: 'BACK', tags: ['별의 여행자', '조영'], 
    baseAtk: 80, baseHp: 300, baseSpd: 115, baseDef: 60, 
    desc: '달빛 아래 노래하는 음유시인',
    skills: { 
      supportSkill: '치유의 노래', supportUlt: '월광 소나타' 
    },
     skillLevels: {
       supportSkill: 1, supportUlt: 1
     },
     skillDetails: {
       supportSkill: { desc: '체력이 가장 낮은 아군 회복 (공격력 120%), 2턴 동안 재생 8%', cooldown: 3 },
       supportUlt: { desc: '아군 전체 회복 (공격력 200%), 2턴 동안 받는 피해 -15%', cooldown: 5 }
     },
     supportEffects: {
      skill: { type: 'HEAL_LOWEST', params: { ratio: 1.2 } },
      ultimate: { type: 'HEAL_LOWEST', params: { ratio: 2.5 } }
    },
    profile: { age: '19', height: '160cm', like: '노래', hate: '소음' },
    stories: [{ title: '첫 번째 노래', unlockBond: 1 }]
  },
  { 
    id: 3, name: '이그니스', rarity: 4, element: 'FIRE', role: 'FRONT', tags: ['조호', '신장의 의지'], 
    baseAtk: 120, baseHp: 600, baseSpd: 125, baseDef: 75, 
    desc: '불꽃을 다루는 검사',
    skills: { 
      normal: '화염 베기', skill: '불꽃의 춤', ultimate: '인페르노 슬래시'
    },
     skillLevels: {
       normal: 1, skill: 1, ultimate: 1
     },
     skillDetails: {
       normal: { desc: '적 1체에게 공격력의 110% 피해', cooldown: 0 },
       skill: { desc: '모든 적에게 공격력의 140% 피해, 2턴 동안 화상(턴당 공격력 20%)', cooldown: 3 },
       ultimate: { desc: '적 1체에게 공격력의 260% 피해, 2턴 동안 방어력 -20%', cooldown: 4 }
     },
     profile: { age: '24', height: '178cm', like: '대련', hate: '차가운 것' },
    stories: [{ title: '검의 맹세', unlockBond: 1 }]
  },
  { 
    id: 4, name: '아쿠아', rarity: 3, element: 'WATER', role: 'BACK', tags: ['별의 여행자'], 
    baseAtk: 60, baseHp: 350, baseSpd: 110, baseDef: 55, 
    desc: '치유의 물방울',
    skills: { 
      supportSkill: '정화의 비', supportUlt: '대해일' 
    },
     skillLevels: {
       supportSkill: 1, supportUlt: 1
     },
     skillDetails: {
       supportSkill: { desc: '체력이 가장 낮은 아군 회복 (공격력 120%), 2턴 동안 치유량 +15%', cooldown: 3 },
       supportUlt: { desc: '아군 전체 상태이상 해제, 2턴 동안 방어력 +20%', cooldown: 5 }
     },
     supportEffects: {
      skill: { type: 'HEAL_LOWEST', params: { ratio: 1.2 } },
      ultimate: { type: 'HEAL_LOWEST', params: { ratio: 2.5 } }
    },
    profile: { age: '16', height: '155cm', like: '깨끗한 물', hate: '건조함' },
    stories: [{ title: '작은 샘물', unlockBond: 1 }]
  },
  { 
    id: 5, name: '테라', rarity: 3, element: 'EARTH', role: 'FRONT', tags: ['조호'], 
    baseAtk: 90, baseHp: 700, baseSpd: 95, baseDef: 120,
    desc: '대지의 방패',
    skills: { 
      normal: '바위 던지기', skill: '철벽 방어', ultimate: '지진파'
    },
     skillLevels: {
       normal: 1, skill: 1, ultimate: 1
     },
     skillDetails: {
       normal: { desc: '적 1체에게 공격력의 90% 피해, 1턴 동안 도발', cooldown: 0 },
       skill: { desc: '자신 방어력 +40% & 피해 감소 20% (2턴), 보호막 (자신 체력의 20%)', cooldown: 3 },
       ultimate: { desc: '모든 적에게 공격력의 150% 피해, 30% 확률로 1턴 기절', cooldown: 4 }
     },
     profile: { age: '28', height: '185cm', like: '명상', hate: '가벼운 행동' },
    stories: [{ title: '묵묵한 수호', unlockBond: 1 }]
  },
  { 
    id: 6, name: '솔라', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '신장의 의지'], 
    baseAtk: 110, baseHp: 550, baseSpd: 135, baseDef: 85, 
    desc: '태양의 기사',
    skills: { 
      normal: '빛의 일격', skill: '태양의 가호', ultimate: '솔라 이클립스',
      supportSkill: '태양의 축복', supportUlt: '여명의 빛' 
    },
     skillLevels: {
       normal: 1, skill: 1, ultimate: 1,
       supportSkill: 1, supportUlt: 1
     },
     skillDetails: {
       normal: { desc: '적 1체에게 공격력의 120% 피해', cooldown: 0 },
       skill: { desc: '전열 아군 공격력 +25% & 치명 피해 +20% (2턴)', cooldown: 3 },
       ultimate: { desc: '모든 적에게 공격력의 230% 피해, 2턴 동안 화상(턴당 공격력 25%)', cooldown: 4 },
       supportSkill: { desc: '후열 아군 속도 +10, 치명타 확률 +10% (2턴)', cooldown: 3 },
       supportUlt: { desc: '아군 전체 보호막 (사용자 공격력 180%), 2턴 동안 공격력 +15%', cooldown: 5 }
     },
     supportEffects: {
      skill: { type: 'BUFF_FRONT_ATK', params: { value: 10 } },
      ultimate: { type: 'BUFF_FRONT_ATK', params: { value: 30 } }
    },
    profile: { age: '22', height: '172cm', like: '정오의 햇살', hate: '거짓말' },
    stories: [{ title: '기사의 맹세', unlockBond: 1 }]
  },
  { 
    id: 7, name: '녹스', rarity: 4, element: 'DARK', role: 'FRONT', tags: ['조영', '별의 여행자'], 
    baseAtk: 130, baseHp: 450, baseSpd: 145, baseDef: 65,
    desc: '어둠 속의 암살자',
    skills: { 
      normal: '단검 투척', skill: '그림자 숨기', ultimate: '팬텀 엑시큐션' 
    },
     skillLevels: {
       normal: 1, skill: 1, ultimate: 1
     },
     skillDetails: {
       normal: { desc: '적 1체에게 공격력의 130% 피해, 1턴 동안 자신의 치명타 확률 +10%', cooldown: 0 },
       skill: { desc: '은신 1턴 획득, 다음 공격 치명 피해 +50%, 행동 게이지 +20%', cooldown: 3 },
       ultimate: { desc: '적 1체에게 공격력의 280% 피해, 2턴 동안 방어력 -25%', cooldown: 4 }
     },
     profile: { age: '25', height: '175cm', like: '고요함', hate: '눈에 띄는 것' },
    stories: [{ title: '그림자', unlockBond: 1 }]
  },
  { 
    id: 8, name: '박주옥', rarity: 3, element: 'EARTH', role: 'BACK', tags: ['조호'], 
    baseAtk: 50, baseHp: 400, baseSpd: 105, baseDef: 90, 
    desc: '깐깐한 보급관',
    skills: { 
      supportSkill: '방어 태세 명령', 
      supportUlt: '남겨진 자의 증명' // ★ 스킬명 수정됨
    },
     skillLevels: {
       supportSkill: 1, supportUlt: 1
     },
     skillDetails: {
       supportSkill: { desc: '전열 아군 방어력 +20% (2턴), 보호막 (사용자 체력의 15%) 부여', cooldown: 3 },
       supportUlt: { desc: '전열 "조호" 태그 아군에게 즉시 차례 부여, 2턴 동안 받는 피해 -20%', cooldown: 4 }
     },
     supportEffects: {
      skill: { type: 'BUFF_FRONT_DEF', params: { value: 20 } },
      ultimate: { type: 'GRANT_TURN', params: { targetTag: '조호' } }
    },
    profile: { age: '34', height: '165cm', like: '장부 정리', hate: '낭비' },
    stories: [{ title: '보급의 중요성', unlockBond: 1 }]
  },
];