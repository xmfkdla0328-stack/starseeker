/**
 * 녹스 (ID: 7) 스킬 데이터
 * 역할: 암살자, 원소: 어둠
 */
export const character7Skills = {
  skills: { 
    normal: '단검 투척', 
    skill: '그림자 숨기', 
    ultimate: '팬텀 엑시큐션',
    passive1: '은신의 달인',
    passive2: '암습의 기술'
  },
  skillLevels: {
    normal: 1, 
    skill: 1, 
    ultimate: 1
  },
  skillDetails: {
    normal: { 
      desc: '적 1체에게 공격력의 130% 피해, 1턴 동안 자신의 치명타 확률 +10%', 
      cooldown: 0, 
      elementalPotency: 0, 
      isAttributeAttack: false, 
      damageFactor: 1.3, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    skill: { 
      desc: '은신 1턴 획득, 다음 공격 치명 피해 +50%, 행동 게이지 +20%', 
      cooldown: 3, 
      elementalPotency: 0, 
      isAttributeAttack: false, 
      damageFactor: 0, 
      targetType: 'SELF', 
      isBuff: true, 
      buffName: 'Stealth' 
    },
    ultimate: { 
      desc: '적 1체에게 공격력의 280% 피해, 2턴 동안 방어력 -25%', 
      cooldown: 4, 
      elementalPotency: 0, 
      isAttributeAttack: false, 
      damageFactor: 2.8, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    passive1: { 
      desc: '치명타 확률 +15%', 
      cooldown: 0 
    },
    passive2: { 
      desc: '치명 피해 +30%', 
      cooldown: 0 
    }
  }
};
