/**
 * 솔라 (ID: 6) 스킬 데이터
 * 역할: 버퍼/딜러, 원소: 빛
 */
export const character6Skills = {
  skills: { 
    normal: '빛의 일격', 
    skill: '태양의 가호', 
    ultimate: '솔라 이클립스',
    passive1: '태양의 축복', 
    passive2: '여명의 빛' 
  },
  skillLevels: {
    normal: 1, 
    skill: 1, 
    ultimate: 1
  },
  skillDetails: {
    normal: { 
      desc: '적 1체에게 공격력의 120% 피해', 
      cooldown: 0, 
      elementalPotency: 0, 
      isAttributeAttack: false, 
      damageFactor: 1.2, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    skill: { 
      desc: '아군 전체 공격력 +25% & 치명 피해 +20% (2턴)', 
      cooldown: 3, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ALL', 
      isBuff: true 
    },
    ultimate: { 
      desc: '모든 적에게 공격력의 230% 피해, 2턴 동안 화상(턴당 공격력 25%)', 
      cooldown: 4, 
      elementalPotency: 2, 
      isAttributeAttack: true, 
      damageFactor: 2.3, 
      targetType: 'ENEMY_ALL', 
      isBuff: false 
    },
    passive1: { 
      desc: '아군 속도 +10, 치명타 확률 +10%', 
      cooldown: 0 
    },
    passive2: { 
      desc: '전투 시작 시 아군 전체에게 보호막 (공격력의 180%) & 공격력 +15% (2턴)', 
      cooldown: 0 
    }
  }
};
