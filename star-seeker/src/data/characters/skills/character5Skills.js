/**
 * 테라 (ID: 5) 스킬 데이터
 * 역할: 탱커, 원소: 땅
 */
export const character5Skills = {
  skills: { 
    normal: '바위 던지기', 
    skill: '철벽 방어', 
    ultimate: '지진파',
    passive1: '대지의 가호',
    passive2: '불굴의 의지'
  },
  skillLevels: {
    normal: 1, 
    skill: 1, 
    ultimate: 1
  },
  skillDetails: {
    normal: { 
      desc: '적 1체에게 공격력의 90% 피해, 1턴 동안 도발', 
      cooldown: 0, 
      elementalPotency: 0, 
      isAttributeAttack: false, 
      damageFactor: 0.9, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    skill: { 
      desc: '자신 방어력 +40% & 피해 감소 20% (2턴), 보호막 (자신 체력의 20%)', 
      cooldown: 3, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'SELF', 
      isBuff: true 
    },
    ultimate: { 
      desc: '모든 적에게 공격력의 150% 피해, 30% 확률로 1턴 기절', 
      cooldown: 4, 
      elementalPotency: 2, 
      isAttributeAttack: true, 
      damageFactor: 1.5, 
      targetType: 'ENEMY_ALL', 
      isBuff: false 
    },
    passive1: { 
      desc: '피격 시 10% 확률로 보호막 생성 (최대 HP의 10%)', 
      cooldown: 0 
    },
    passive2: { 
      desc: '방어력 +15%', 
      cooldown: 0 
    }
  }
};
