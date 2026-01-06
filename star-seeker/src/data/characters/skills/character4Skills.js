/**
 * 아쿠아 (ID: 4) 스킬 데이터
 * 역할: 서포터/힐러, 원소: 물
 */
export const character4Skills = {
  skills: { 
    normal: '물줄기 공격', 
    skill: '정화의 비', 
    ultimate: '대해일',
    passive1: '물의 가호',
    passive2: '치유의 파동'
  },
  skillLevels: {
    normal: 1, 
    skill: 1, 
    ultimate: 1
  },
  skillDetails: {
    normal: { 
      desc: '적 1체에게 공격력의 95% 피해', 
      cooldown: 0, 
      elementalPotency: 0, 
      isAttributeAttack: false, 
      damageFactor: 0.95, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    skill: { 
      desc: '체력이 가장 낮은 아군 회복 (공격력 120%), 2턴 동안 치유량 +15%', 
      cooldown: 3, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ONE', 
      isBuff: true 
    },
    ultimate: { 
      desc: '아군 전체 상태이상 해제, 2턴 동안 방어력 +20%', 
      cooldown: 5, 
      elementalPotency: 2, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ALL', 
      isBuff: true 
    },
    passive1: { 
      desc: '받는 디버프 지속시간 -1턴', 
      cooldown: 0 
    },
    passive2: { 
      desc: '턴 시작 시 10% 확률로 아군 전체 HP 5% 회복', 
      cooldown: 0 
    }
  }
};
