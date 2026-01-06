/**
 * 이그니스 (ID: 3) 스킬 데이터
 * 역할: 딜러, 원소: 불
 */
export const character3Skills = {
  skills: { 
    normal: '화염 베기', 
    skill: '불꽃의 춤', 
    ultimate: '인페르노 슬래시',
    passive1: '화염 증폭',
    passive2: '열정의 기세'
  },
  skillLevels: {
    normal: 1, 
    skill: 1, 
    ultimate: 1
  },
  skillDetails: {
    normal: { 
      desc: '적 1체에게 공격력의 110% 피해', 
      cooldown: 0, 
      elementalPotency: 0, 
      isAttributeAttack: false, 
      damageFactor: 1.1, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    skill: { 
      desc: '모든 적에게 공격력의 140% 피해, 2턴 동안 화상(턴당 공격력 20%)', 
      cooldown: 3, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 1.4, 
      targetType: 'ENEMY_ALL', 
      isBuff: false 
    },
    ultimate: { 
      desc: '적 1체에게 공격력의 260% 피해, 2턴 동안 방어력 -20%', 
      cooldown: 4, 
      elementalPotency: 2, 
      isAttributeAttack: true, 
      damageFactor: 2.6, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    passive1: { 
      desc: '화상 피해 +25%', 
      cooldown: 0 
    },
    passive2: { 
      desc: '공격 시 10% 확률로 추가 공격', 
      cooldown: 0 
    }
  }
};
