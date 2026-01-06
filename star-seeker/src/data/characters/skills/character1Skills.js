/**
 * 서주목 (ID: 1) 스킬 데이터
 * 역할: 지휘관, 원소: 천체
 */
export const character1Skills = {
  skills: { 
    normal: '지휘 사격', 
    skill: '전술 명령: 돌격', 
    ultimate: '성운의 포격',
    passive1: '정밀 관측', 
    passive2: '성운의 가호' 
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
      desc: '아군 전체 공격력 +20% & 행동 게이지 +10% (지속 2턴)', 
      cooldown: 3, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ALL', 
      isBuff: true 
    },
    ultimate: { 
      desc: '모든 적에게 공격력의 220% 피해, 방어력 -15% (지속 2턴)', 
      cooldown: 4, 
      elementalPotency: 2, 
      isAttributeAttack: true, 
      damageFactor: 2.2, 
      targetType: 'ENEMY_ALL', 
      isBuff: false 
    },
    passive1: { 
      desc: '아군 치명타 확률 +15%', 
      cooldown: 0 
    },
    passive2: { 
      desc: '전투 시작 시 아군 전체에게 보호막 (공격력의 150%) 부여', 
      cooldown: 0 
    }
  }
};
