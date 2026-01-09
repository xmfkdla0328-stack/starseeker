// Star Seeker 행동/스킬/개입 타입 및 데이터 구조

export const ACTION_TYPE = {
  NORMAL_ATTACK: 'NORMAL_ATTACK', // 일반 공격
  SKILL: 'SKILL', // 전투 스킬
  ULTIMATE: 'ULTIMATE', // 필살기
  INTERVENTION_PULL: 'INTERVENTION_PULL', // 중력 가속(아군 당기기)
  INTERVENTION_PUSH: 'INTERVENTION_PUSH', // 궤도 이탈(적 밀기)
  INTERVENTION_SWAP: 'INTERVENTION_SWAP', // 인과 교차(위치 교환)
  INTERVENTION_BLACKHOLE: 'INTERVENTION_BLACKHOLE', // 블랙홀(적 전체 궁극기 취소)
};

// 행동/스킬/개입 데이터 구조 예시
export class Action {
  constructor({
    type,
    name,
    epCost = 0,
    cpCost = 0,
    cooldown = 0,
    effect = null,
    description = '',
  }) {
    this.type = type; // ACTION_TYPE
    this.name = name;
    this.epCost = epCost; // EP 소모량
    this.cpCost = cpCost; // CP 소모량
    this.cooldown = cooldown; // 쿨타임
    this.effect = effect; // 효과 함수 또는 객체
    this.description = description;
  }
}

// 사용 예시:
// const attack = new Action({ type: ACTION_TYPE.NORMAL_ATTACK, name: '기본 공격', epCost: 0, cpCost: 0, effect: ... });
