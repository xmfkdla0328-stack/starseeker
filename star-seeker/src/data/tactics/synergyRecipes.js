/**
 * 인과 연산 공식 (속성 조합)
 * 두 가지 속성을 조합하여 발동하는 시너지 효과
 */

export const SYNERGY_RECIPES = [
  {
    elements: ['엔트로피', '중력'],
    colors: ['text-red-400', 'text-purple-400'],
    emoji: '💥',
    name: '핵융합',
    nameEn: 'Nuclear Fusion',
    effect: '[광역 폭발] 타겟과 주변 적들에게 데미지 확산.',
    usage: '쫄몹 처리용',
  },
  {
    elements: ['엔트로피', '정체'],
    colors: ['text-red-400', 'text-blue-400'],
    emoji: '💔',
    name: '열충격',
    nameEn: 'Thermal Shock',
    effect: '[방어 파괴] 적의 방어력/보호막을 무시하고 데미지 적용.',
    usage: '보스전용',
  },
  {
    elements: ['엔트로피', '공명'],
    colors: ['text-red-400', 'text-yellow-400'],
    emoji: '🔥',
    name: '플라즈마',
    nameEn: 'Plasma',
    effect: '[지속 피해 전이] 타겟에게 걸린 화상/출혈 등의 DoT를 주변 적에게 복사.',
    usage: '지속딜 전략',
  },
  {
    elements: ['정체', '중력'],
    colors: ['text-blue-400', 'text-purple-400'],
    emoji: '❄️',
    name: '절대영도',
    nameEn: 'Absolute Zero',
    effect: '[빙결/정지] 적을 얼려 1턴간 행동 불가.',
    usage: '적 턴 스킵',
  },
  {
    elements: ['정체', '공명'],
    colors: ['text-blue-400', 'text-yellow-400'],
    emoji: '⚡',
    name: '과부하',
    nameEn: 'Overload',
    effect: '[마비] 적의 스킬 쿨타임을 1~2턴 증가.',
    usage: '스킬 봉인',
  },
  {
    elements: ['중력', '공명'],
    colors: ['text-purple-400', 'text-yellow-400'],
    emoji: '🌑',
    name: '사건의 지평선',
    nameEn: 'Event Horizon',
    effect: '[실명] 적의 명중률 50% 감소.',
    usage: '아군 생존용',
  },
];
