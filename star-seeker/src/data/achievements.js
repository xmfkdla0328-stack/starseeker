/**
 * 업적 시스템
 * 플레이어가 달성 가능한 다양한 업적 정의
 */

// 업적 정의
export const ACHIEVEMENTS = {
  // 전투 관련
  FIRST_WIN: {
    id: 'first_win',
    name: '첫 승리',
    desc: '전투에서 처음으로 승리한다',
    icon: '⚔️',
    reward: 50,
  },
  BATTLE_10: {
    id: 'battle_10',
    name: '전투 초보자',
    desc: '전투를 10회 치룬다',
    icon: '🎖️',
    reward: 100,
  },
  BATTLE_50: {
    id: 'battle_50',
    name: '전투 경험자',
    desc: '전투를 50회 치룬다',
    icon: '🎖️',
    reward: 200,
  },
  WIN_STREAK_3: {
    id: 'win_streak_3',
    name: '3연승',
    desc: '연속으로 3번 승리한다',
    icon: '🔥',
    reward: 150,
  },
  // 수집 관련
  COLLECT_5: {
    id: 'collect_5',
    name: '캐릭터 수집가',
    desc: '캐릭터를 5명 이상 보유한다',
    icon: '⭐',
    reward: 100,
  },
  COLLECT_ALL: {
    id: 'collect_all',
    name: '완전한 집단',
    desc: '모든 캐릭터를 보유한다',
    icon: '👑',
    reward: 500,
  },
  // 레벨 관련
  LEVEL_10: {
    id: 'level_10',
    name: '10레벨 달성',
    desc: '계정 레벨 10에 도달한다',
    icon: '📈',
    reward: 200,
  },
};
