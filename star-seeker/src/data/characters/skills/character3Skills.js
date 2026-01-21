/**
 * 시에 (ID: 3) 스킬 데이터
 * 역할: 딜러, 원소: 엔트로피
 */
export const character3Skills = {
  skills: { 
    normal: '인간 세상이 쉬지 않고 변천하니', 
    skill: '이는 우주의 모든 사물도 같은 이치라', 
    ultimate: '그러나 이곳에 나 홀로 변함없으니',
    passive1: '천상천아 유아독존 天上天下 唯我獨尊',
    passive2: '삼계개고아당안지 三界皆苦我當安之'
  },
  skillLevels: {
    normal: 1, 
    skill: 1, 
    ultimate: 1
  },
  skillDetails: {
    normal: { 
      desc: '적 1체에게 공격력의 150% 피해', 
      cooldown: 0, 
      elementalPotency: 0, 
      isAttributeAttack: false, 
      damageFactor: 1.5, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    skill: { 
      desc: '자신의 치명타 확률+20% (지속 2턴), 자신의 치명타 피해+30% (지속 2턴)', 
      cooldown: 2, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ENEMY_ALL', 
      
      isBuff: false 
    },
    ultimate: { 
      desc: '적 1체에게 공격력의 300% 피해, 자신의 스킬 쿨다운 -1턴', 
      cooldown: 0, 
      elementalPotency: 2, 
      isAttributeAttack: true, 
      damageFactor: 3.0, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    passive1: { 
      desc: '자신의 치명타 확률 +10%', 
      cooldown: 0 
    },
    passive2: { 
      desc: '일반 공격시 EP 20을 추가 획득', 
      cooldown: 0 
    }
  }
};
