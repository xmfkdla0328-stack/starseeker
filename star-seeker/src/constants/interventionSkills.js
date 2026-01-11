// Star Seeker - 유저 개입 스킬(Intervention) 정보 상수/데이터

export const INTERVENTION_SKILLS = [
  {
    key: 'gravity_accel',
    name: '중력 가속',
    icon: '🧲',
    short: 'Pull',
    cpCost: 10,
    description: '우측(미래)의 아군 1명을 좌측 끝(현재)으로 당겨옴.',
    tactical: ['힐러 긴급 호출', '선제 타격'],
  },
  {
    key: 'orbit_break',
    name: '궤도 이탈',
    icon: '✋',
    short: 'Push',
    cpCost: 10,
    description: '좌측(현재)의 적 1명을 우측(미래)으로 밀어냄.',
    tactical: ['적 필살기 지연', '브레이크 타임'],
  },
  {
    key: 'causal_swap',
    name: '인과 교차',
    icon: '🔄',
    short: 'Swap',
    cpCost: 20,
    description: '아군 1명과 적 1명의 위치를 서로 맞바꿈.',
    tactical: ['공격권 강탈', '딜링 타이밍 설계'],
  },
  {
    key: 'blackhole',
    name: '블랙홀',
    icon: '⚫',
    short: 'Ult',
    cpCost: 40,
    description: '[궁극기] 모든 적의 스킬을 취소하고 일반 공격으로 변경.',
    tactical: ['전멸 위기 회피', '판세 초기화'],
  },
];
