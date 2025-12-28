/**
 * 캐릭터 스킬 정보
 * 스킬명, 스킬 레벨, 스킬 상세, 서포트 효과 포함
 */

export const CHARACTER_SKILLS = {
  1: { // 서주목
    skills: { 
      normal: '지휘 사격', 
      skill: '전술 명령: 돌격', 
      ultimate: '성운의 포격',
      supportSkill: '정밀 관측', 
      supportUlt: '성운의 가호' 
    },
    skillLevels: {
      normal: 1, skill: 1, ultimate: 1,
      supportSkill: 1, supportUlt: 1
    },
    skillDetails: {
      normal: { desc: '적 1체에게 공격력의 100% 피해', cooldown: 0 },
      skill: { desc: '전열 아군 공격력 +20% & 행동 게이지 +10% (지속 2턴)', cooldown: 3 },
      ultimate: { desc: '모든 적에게 공격력의 220% 피해, 방어력 -15% (지속 2턴)', cooldown: 4 },
      supportSkill: { desc: '후열 아군 치명타 확률 +15% (지속 2턴)', cooldown: 3 },
      supportUlt: { desc: '아군 전체 보호막 (사용자 공격력 150%) 부여, 받는 피해 -20% (2턴)', cooldown: 5 }
    },
    supportEffects: {
      skill: { type: 'BUFF_FRONT_ATK', params: { value: 10 } },
      ultimate: { type: 'BUFF_FRONT_ATK', params: { value: 30 } }
    },
  },
  2: { // 루나
    skills: { 
      supportSkill: '치유의 노래', 
      supportUlt: '월광 소나타' 
    },
    skillLevels: {
      supportSkill: 1, 
      supportUlt: 1
    },
    skillDetails: {
      supportSkill: { desc: '체력이 가장 낮은 아군 회복 (공격력 120%), 2턴 동안 재생 8%', cooldown: 3 },
      supportUlt: { desc: '아군 전체 회복 (공격력 200%), 2턴 동안 받는 피해 -15%', cooldown: 5 }
    },
    supportEffects: {
      skill: { type: 'HEAL_LOWEST', params: { ratio: 1.2 } },
      ultimate: { type: 'HEAL_LOWEST', params: { ratio: 2.5 } }
    },
  },
  3: { // 이그니스
    skills: { 
      normal: '화염 베기', 
      skill: '불꽃의 춤', 
      ultimate: '인페르노 슬래시'
    },
    skillLevels: {
      normal: 1, 
      skill: 1, 
      ultimate: 1
    },
    skillDetails: {
      normal: { desc: '적 1체에게 공격력의 110% 피해', cooldown: 0 },
      skill: { desc: '모든 적에게 공격력의 140% 피해, 2턴 동안 화상(턴당 공격력 20%)', cooldown: 3 },
      ultimate: { desc: '적 1체에게 공격력의 260% 피해, 2턴 동안 방어력 -20%', cooldown: 4 }
    },
  },
  4: { // 아쿠아
    skills: { 
      supportSkill: '정화의 비', 
      supportUlt: '대해일' 
    },
    skillLevels: {
      supportSkill: 1, 
      supportUlt: 1
    },
    skillDetails: {
      supportSkill: { desc: '체력이 가장 낮은 아군 회복 (공격력 120%), 2턴 동안 치유량 +15%', cooldown: 3 },
      supportUlt: { desc: '아군 전체 상태이상 해제, 2턴 동안 방어력 +20%', cooldown: 5 }
    },
    supportEffects: {
      skill: { type: 'HEAL_LOWEST', params: { ratio: 1.2 } },
      ultimate: { type: 'HEAL_LOWEST', params: { ratio: 2.5 } }
    },
  },
  5: { // 테라
    skills: { 
      normal: '바위 던지기', 
      skill: '철벽 방어', 
      ultimate: '지진파'
    },
    skillLevels: {
      normal: 1, 
      skill: 1, 
      ultimate: 1
    },
    skillDetails: {
      normal: { desc: '적 1체에게 공격력의 90% 피해, 1턴 동안 도발', cooldown: 0 },
      skill: { desc: '자신 방어력 +40% & 피해 감소 20% (2턴), 보호막 (자신 체력의 20%)', cooldown: 3 },
      ultimate: { desc: '모든 적에게 공격력의 150% 피해, 30% 확률로 1턴 기절', cooldown: 4 }
    },
  },
  6: { // 솔라
    skills: { 
      normal: '빛의 일격', 
      skill: '태양의 가호', 
      ultimate: '솔라 이클립스',
      supportSkill: '태양의 축복', 
      supportUlt: '여명의 빛' 
    },
    skillLevels: {
      normal: 1, 
      skill: 1, 
      ultimate: 1,
      supportSkill: 1, 
      supportUlt: 1
    },
    skillDetails: {
      normal: { desc: '적 1체에게 공격력의 120% 피해', cooldown: 0 },
      skill: { desc: '전열 아군 공격력 +25% & 치명 피해 +20% (2턴)', cooldown: 3 },
      ultimate: { desc: '모든 적에게 공격력의 230% 피해, 2턴 동안 화상(턴당 공격력 25%)', cooldown: 4 },
      supportSkill: { desc: '후열 아군 속도 +10, 치명타 확률 +10% (2턴)', cooldown: 3 },
      supportUlt: { desc: '아군 전체 보호막 (사용자 공격력 180%), 2턴 동안 공격력 +15%', cooldown: 5 }
    },
    supportEffects: {
      skill: { type: 'BUFF_FRONT_ATK', params: { value: 10 } },
      ultimate: { type: 'BUFF_FRONT_ATK', params: { value: 30 } }
    },
  },
  7: { // 녹스
    skills: { 
      normal: '단검 투척', 
      skill: '그림자 숨기', 
      ultimate: '팬텀 엑시큐션' 
    },
    skillLevels: {
      normal: 1, 
      skill: 1, 
      ultimate: 1
    },
    skillDetails: {
      normal: { desc: '적 1체에게 공격력의 130% 피해, 1턴 동안 자신의 치명타 확률 +10%', cooldown: 0 },
      skill: { desc: '은신 1턴 획득, 다음 공격 치명 피해 +50%, 행동 게이지 +20%', cooldown: 3 },
      ultimate: { desc: '적 1체에게 공격력의 280% 피해, 2턴 동안 방어력 -25%', cooldown: 4 }
    },
  },
  8: { // 박주옥
    skills: { 
      supportSkill: '방어 태세 명령', 
      supportUlt: '남겨진 자의 증명'
    },
    skillLevels: {
      supportSkill: 1, 
      supportUlt: 1
    },
    skillDetails: {
      supportSkill: { desc: '전열 아군 방어력 +20% (2턴), 보호막 (사용자 체력의 15%) 부여', cooldown: 3 },
      supportUlt: { desc: '전열 "조호" 태그 아군에게 즉시 차례 부여, 2턴 동안 받는 피해 -20%', cooldown: 4 }
    },
    supportEffects: {
      skill: { type: 'BUFF_FRONT_DEF', params: { value: 20 } },
      ultimate: { type: 'GRANT_TURN', params: { targetTag: '조호' } }
    },
  },
};
