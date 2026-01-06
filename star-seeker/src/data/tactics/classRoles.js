/**
 * 직업 분류 정보
 * 캐릭터들의 역할과 특성을 정의
 */

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
