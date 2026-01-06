/**
 * 루나 (ID: 2) 스킬 데이터
 * 역할: 힐러, 원소: 빛
 */
export const character2Skills = {
  skills: { 
    normal: '달빛 화살', 
    skill: '치유의 노래', 
    ultimate: '월광 소나타',
    passive1: '재생의 기원',
    passive2: '달의 축복'
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
      desc: '체력이 가장 낮은 아군 회복 (공격력 120%), 2턴 동안 재생 8%', 
      cooldown: 3, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ONE', 
      isBuff: true 
    },
    ultimate: { 
      desc: '아군 전체 회복 (공격력 200%), 2턴 동안 받는 피해 -15%', 
      cooldown: 5, 
      elementalPotency: 2, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ALL', 
      isBuff: true 
    },
    passive1: { 
      desc: '전투 시작 시 아군 전체 HP +10%', 
      cooldown: 0 
    },
    passive2: { 
      desc: '치유량 +15%', 
      cooldown: 0 
    }
  }
};
