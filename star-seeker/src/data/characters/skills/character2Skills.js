/**
 * 아다드 (ID: 2) 스킬 데이터
 * 역할: 힐러, 원소: 중력
 */
export const character2Skills = {
  skills: { 
    normal: '공황 매도 Panic Sell', 
    skill: '분할 매수 Dollar Cost Averaging', 
    ultimate: '리버스 1920 Reverse 1920',
    passive1: '존재의 증명',
    passive2: '풍요는 사랑의 약속'
  },
  skillLevels: {
    normal: 1, 
    skill: 1, 
    ultimate: 1
  },
  skillDetails: {
    normal: { 
      desc: '적 1체에게 공격력의 90% 피해', 
      cooldown: 0, 
      elementalPotency: 0, 
      isAttributeAttack: false, 
      damageFactor: 0.9, 
      targetType: 'ENEMY', 
      isBuff: false 
    },
    skill: { 
      desc: '체력이 가장 낮은 아군을 공격력의 200% 위력으로 회복, 모든 아군에게 공격력의 8% 위력으로 지속회복 부여 (지속 2턴)', 
      cooldown: 2, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ONE', 
      isBuff: true 
    },
    ultimate: { 
      desc: '전체 아군을 공격력의 160% 위력으로 회복, 모든 아군의 2턴 동안 받는 피해 -15%', 
      cooldown: 5, 
      elementalPotency: 2, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ALL', 
      isBuff: true 
    },
    passive1: { 
      desc: '자신의 공격력 +10%', 
      cooldown: 0 
    },
    passive2: { 
      desc: '치유 스킬 사용시, 치유 스킬의 치유량 +15%', 
      cooldown: 0 
    }
  }
};
