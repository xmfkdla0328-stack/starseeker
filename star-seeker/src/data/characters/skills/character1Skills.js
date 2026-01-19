/**
 * 서주목 (ID: 1) 스킬 데이터
 * 역할: 지휘관, 원소: 공명
 */
export const character1Skills = {
  skills: { 
    normal: '처음부터 가지고 있던 것', 
    skill: '조호단의 백호', 
    ultimate: '프로토콜: 신장의 의지',
    passive1: '남겨진 자의 몫', 
    passive2: '삶의 증명' 
  },
  skillLevels: {
    normal: 1, 
    skill: 1, 
    ultimate: 1
  },
  skillDetails: {
    normal: { 
      desc: '적 1체에게 공격력의 100% 피해', 
      cooldown: 0, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 1.0, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    skill: {
      desc: '아군 전체 공격력 +20% (지속 2턴) & 전체 아군 행동 게이지 +10%',
      cooldown: 2,
      elementalPotency: 1,
      isAttributeAttack: true,
      damageFactor: 0,
      targetType: 'ALLY_ALL',
      isBuff: true,
      effectType: ['ATK_UP', 'GAUGE_UP'], // 효과 타입: 공격력 증가, 게이지 증가
      effectValue: [20, 10], // 각각의 효과 수치
      effectTarget: ['ALLY_ALL', 'ALLY_ALL'], // 효과 대상
      duration: [2, 0], // 각 효과의 지속 턴 (게이지는 즉시 적용)
    },
    ultimate: {
      desc: '모든 적에게 공격력의 220% 피해, 적 방어력 -15% (지속 2턴)',
      cooldown: 4,
      elementalPotency: 2,
      isAttributeAttack: true,
      damageFactor: 2.2,
      targetType: 'ENEMY_ALL',
      isBuff: false,
      // 데이터 기반 효과 구조 추가
      effectType: ['DAMAGE', 'DEF_DOWN'], // 1: 데미지, 2: 방깎
      effectValue: [2.2, 15], // 1: 데미지 배수, 2: 방어력 감소 %
      effectTarget: ['ENEMY_ALL', 'ENEMY_ALL'],
      duration: [0, 2], // 데미지는 즉시, 방깎은 2턴
    },
    passive1: { 
      desc: '전체 아군의 치명타 확률 +5%', 
      cooldown: 0 
    },
    passive2: { 
      desc: '전체 아군의 EP 충전 효율 + 5%', 
      cooldown: 0 
    }
  }
};
