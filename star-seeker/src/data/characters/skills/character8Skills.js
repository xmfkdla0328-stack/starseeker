/**
 * 박주옥 (ID: 8) 스킬 데이터
 * 역할: 지휘관/서포터, 원소: 천체
 * 특징: 조호 태그와의 시너지
 */
export const character8Skills = {
  skills: { 
    normal: '지휘봉 일격', 
    skill: '방어 태세 명령', 
    ultimate: '남겨진 자의 증명',
    passive1: '불굴의 지휘',
    passive2: '조호의 후예'
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
      desc: '아군 전체 방어력 +20% (2턴), 보호막 (사용자 체력의 15%) 부여', 
      cooldown: 3, 
      elementalPotency: 1, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ALL', 
      isBuff: true 
    },
    ultimate: { 
      desc: '"조호" 태그 아군에게 즉시 차례 부여, 아군 전체 받는 피해 -20% (2턴)', 
      cooldown: 4, 
      elementalPotency: 2, 
      isAttributeAttack: true, 
      damageFactor: 0, 
      targetType: 'ALLY_ALL', 
      isBuff: true 
    },
    passive1: { 
      desc: '아군 전체 방어력 +10%', 
      cooldown: 0 
    },
    passive2: { 
      desc: '"조호" 태그 아군이 있을 경우 자신의 HP +20%', 
      cooldown: 0 
    }
  }
};
