/**
 * 캐릭터 스킬 정보
 * 모든 캐릭터는 다음 스킬 구성을 가집니다:
 * - 일반 공격 (normal)
 * - 스킬 (skill)
 * - 필살기 (ultimate)
 * - 패시브 스킬 2개 (passive1, passive2)
 */

export const CHARACTER_SKILLS = {
  1: { // 서주목
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
      normal: { desc: '적 1체에게 공격력의 100% 피해', cooldown: 0, elementalPotency: 1, isAttributeAttack: true },
      skill: { desc: '아군 전체 공격력 +20% & 행동 게이지 +10% (지속 2턴)', cooldown: 3, elementalPotency: 1, isAttributeAttack: true },
      ultimate: { desc: '모든 적에게 공격력의 220% 피해, 방어력 -15% (지속 2턴)', cooldown: 4, elementalPotency: 2, isAttributeAttack: true },
      passive1: { desc: '아군 치명타 확률 +15%', cooldown: 0 },
      passive2: { desc: '전투 시작 시 아군 전체에게 보호막 (공격력의 150%) 부여', cooldown: 0 }
    }
  },
  2: { // 루나
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
      normal: { desc: '적 1체에게 공격력의 90% 피해', cooldown: 0, elementalPotency: 0, isAttributeAttack: false },
      skill: { desc: '체력이 가장 낮은 아군 회복 (공격력 120%), 2턴 동안 재생 8%', cooldown: 3, elementalPotency: 1, isAttributeAttack: true },
      ultimate: { desc: '아군 전체 회복 (공격력 200%), 2턴 동안 받는 피해 -15%', cooldown: 5, elementalPotency: 2, isAttributeAttack: true },
      passive1: { desc: '전투 시작 시 아군 전체 HP +10%', cooldown: 0 },
      passive2: { desc: '치유량 +15%', cooldown: 0 }
    }
  },
  3: { // 이그니스
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
      normal: { desc: '적 1체에게 공격력의 110% 피해', cooldown: 0, elementalPotency: 0, isAttributeAttack: false },
      skill: { desc: '모든 적에게 공격력의 140% 피해, 2턴 동안 화상(턴당 공격력 20%)', cooldown: 3, elementalPotency: 1, isAttributeAttack: true },
      ultimate: { desc: '적 1체에게 공격력의 260% 피해, 2턴 동안 방어력 -20%', cooldown: 4, elementalPotency: 2, isAttributeAttack: true },
      passive1: { desc: '화상 피해 +25%', cooldown: 0 },
      passive2: { desc: '공격 시 10% 확률로 추가 공격', cooldown: 0 }
    }
  },
  4: { // 아쿠아
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
      normal: { desc: '적 1체에게 공격력의 95% 피해', cooldown: 0, elementalPotency: 0, isAttributeAttack: false },
      skill: { desc: '체력이 가장 낮은 아군 회복 (공격력 120%), 2턴 동안 치유량 +15%', cooldown: 3, elementalPotency: 1, isAttributeAttack: true },
      ultimate: { desc: '아군 전체 상태이상 해제, 2턴 동안 방어력 +20%', cooldown: 5, elementalPotency: 2, isAttributeAttack: true },
      passive1: { desc: '받는 디버프 지속시간 -1턴', cooldown: 0 },
      passive2: { desc: '턴 시작 시 10% 확률로 아군 전체 HP 5% 회복', cooldown: 0 }
    }
  },
  5: { // 테라
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
      normal: { desc: '적 1체에게 공격력의 90% 피해, 1턴 동안 도발', cooldown: 0, elementalPotency: 0, isAttributeAttack: false },
      skill: { desc: '자신 방어력 +40% & 피해 감소 20% (2턴), 보호막 (자신 체력의 20%)', cooldown: 3, elementalPotency: 1, isAttributeAttack: true },
      ultimate: { desc: '모든 적에게 공격력의 150% 피해, 30% 확률로 1턴 기절', cooldown: 4, elementalPotency: 2, isAttributeAttack: true },
      passive1: { desc: '피격 시 10% 확률로 보호막 생성 (최대 HP의 10%)', cooldown: 0 },
      passive2: { desc: '방어력 +15%', cooldown: 0 }
    }
  },
  6: { // 솔라
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
      normal: { desc: '적 1체에게 공격력의 120% 피해', cooldown: 0, elementalPotency: 0, isAttributeAttack: false },
      skill: { desc: '아군 전체 공격력 +25% & 치명 피해 +20% (2턴)', cooldown: 3, elementalPotency: 1, isAttributeAttack: true },
      ultimate: { desc: '모든 적에게 공격력의 230% 피해, 2턴 동안 화상(턴당 공격력 25%)', cooldown: 4, elementalPotency: 2, isAttributeAttack: true },
      passive1: { desc: '아군 속도 +10, 치명타 확률 +10%', cooldown: 0 },
      passive2: { desc: '전투 시작 시 아군 전체에게 보호막 (공격력의 180%) & 공격력 +15% (2턴)', cooldown: 0 }
    }
  },
  7: { // 녹스
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
      normal: { desc: '적 1체에게 공격력의 130% 피해, 1턴 동안 자신의 치명타 확률 +10%', cooldown: 0, elementalPotency: 0, isAttributeAttack: false },
      skill: { desc: '은신 1턴 획득, 다음 공격 치명 피해 +50%, 행동 게이지 +20%', cooldown: 3, elementalPotency: 1, isAttributeAttack: true },
      ultimate: { desc: '적 1체에게 공격력의 280% 피해, 2턴 동안 방어력 -25%', cooldown: 4, elementalPotency: 2, isAttributeAttack: true },
      passive1: { desc: '치명타 확률 +15%', cooldown: 0 },
      passive2: { desc: '치명 피해 +30%', cooldown: 0 }
    }
  },
  8: { // 박주옥
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
      normal: { desc: '적 1체에게 공격력의 100% 피해', cooldown: 0, elementalPotency: 1, isAttributeAttack: true },
      skill: { desc: '아군 전체 방어력 +20% (2턴), 보호막 (사용자 체력의 15%) 부여', cooldown: 3, elementalPotency: 1, isAttributeAttack: true },
      ultimate: { desc: '"조호" 태그 아군에게 즉시 차례 부여, 아군 전체 받는 피해 -20% (2턴)', cooldown: 4, elementalPotency: 2, isAttributeAttack: true },
      passive1: { desc: '아군 전체 방어력 +10%', cooldown: 0 },
      passive2: { desc: '"조호" 태그 아군이 있을 경우 자신의 HP +20%', cooldown: 0 }
    }
  },
};
