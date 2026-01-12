/**
 * 전술 가이드 데이터
 * 속성 조합 공식과 직업 분류 정보
 */

// ===== 인과 연산 공식 (속성 조합) =====
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

// ===== 직업 분류 =====
export const CLASS_ROLES = [
  {
    icon: '⚔️',
    name: '패스파인더',
    nameEn: 'PATHFINDER',
    color: 'text-cyan-400',
    description: '선봉에서 적을 탐색하고 초기 전투를 주도하는 전투원. 기동력과 속성 부여 능력이 뛰어남.',
    traits: ['높은 속도', '속성 공격 특화', '선제 타격'],
  },
  {
    icon: '🗡️',
    name: '엑시큐터',
    nameEn: 'EXECUTOR',
    color: 'text-red-400',
    description: '적을 처치하는 데 특화된 공격수. 강력한 단일 타겟 화력으로 핵심 적을 제거.',
    traits: ['최고 화력', '치명타 특화', '단일 대상 집중'],
  },
  {
    icon: '🛡️',
    name: '키퍼',
    nameEn: 'KEEPER',
    color: 'text-blue-400',
    description: '아군을 보호하고 전선을 유지하는 방어형 역할. 높은 내구력과 도발 능력 보유.',
    traits: ['높은 HP/방어력', '도발/보호막', '생존 특화'],
  },
  {
    icon: '💚',
    name: '서스테이너',
    nameEn: 'SUSTAINER',
    color: 'text-green-400',
    description: '아군의 생명을 유지하고 회복시키는 지원형 역할. 치유와 버프 제공.',
    traits: ['회복 능력', '버프/디버프 관리', '팀 생존 보장'],
  },
  {
    icon: '⚡',
    name: '리액터',
    nameEn: 'REACTOR',
    color: 'text-purple-400',
    description: '속성 반응을 극대화하는 전문가. 조합 공격으로 강력한 시너지 효과를 발동.',
    traits: ['속성 반응 강화', '조합 딜러', '시너지 극대화'],
  },
  {
    icon: '🎯',
    name: '태틱션',
    nameEn: 'TACTICIAN',
    color: 'text-amber-400',
    description: '전술적 우위를 제공하는 지원형 역할. 적의 약점을 노출시키고 아군의 전략을 강화.',
    traits: ['디버프 특화', '적 약화', '전술 지원'],
  },
];

// ===== 속성 조합 검색 헬퍼 함수 =====
/**
 * 두 속성의 조합으로 시너지 레시피를 찾습니다
 * @param {string} element1 - 첫 번째 속성
 * @param {string} element2 - 두 번째 속성
 * @returns {object|null} - 매칭되는 시너지 레시피 또는 null
 */
export const findSynergyRecipe = (element1, element2) => {
  return SYNERGY_RECIPES.find(recipe => {
    const [e1, e2] = recipe.elements;
    return (e1 === element1 && e2 === element2) || (e1 === element2 && e2 === element1);
  }) || null;
};

// ===== 직업 정보 검색 헬퍼 함수 =====
/**
 * 영문 이름으로 직업 정보를 찾습니다
 * @param {string} roleNameEn - 영문 직업명 (예: 'PATHFINDER')
 * @returns {object|null} - 매칭되는 직업 정보 또는 null
 */
export const findClassRole = (roleNameEn) => {
  return CLASS_ROLES.find(role => role.nameEn === roleNameEn) || null;
};
