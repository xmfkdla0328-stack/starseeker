/**
 * 전투 UI 텍스트 및 메시지
 */

// ===== UI 텍스트 상수 =====
export const UI_TEXT = {
  PAUSE: {
    TITLE: '작전 일시정지',
    SUBTITLE: '필요한 선택지를 고르세요.',
    CHIP: 'LIVE OPS',
    RESUME: '계속하기',
    RETREAT: '작전 중단',
    SETTINGS: '환경 설정 (준비 중)',
  },
  RETREAT_CONFIRM: {
    TITLE: '작전을 이탈할까요?',
    SUBTITLE: '"정말 전투를 중단하시겠습니까?"',
    CONTINUE: '계속 전투',
    CONFIRM: '작전 중단',
  },
  RESULT: {
    VICTORY_TITLE: 'MISSION SUCCESS',
    VICTORY_MESSAGE: '전투에서 승리했습니다.',
    DEFEAT_TITLE: 'MISSION FAILED',
    DEFEAT_MESSAGE: '아군이 전멸했습니다.',
    BACK: '돌아가기',
    RESTART: '재시작',
  },
  TURN_INFO: {
    PLAYER_TURN: (name) => `${name}의 턴`,
    ENEMY_TURN: '적의 턴',
    ENEMY_ATTACKING: '적이 행동 중입니다...',
    WAITING: (name) => name ? `${name}의 차례입니다` : '턴을 대기 중입니다',
  },
};

// ===== 전투 텍스트 메시지 =====
export const BATTLE_MESSAGES = {
  VICTORY: '전투에서 승리했습니다.',
  DEFEAT: '아군이 전멸했습니다.',
  ENEMY_TURN: '적이 행동 중입니다...',
  WAITING_TURN: '턴을 대기 중입니다',
  MISSION_SUCCESS: 'MISSION SUCCESS',
  MISSION_FAILED: 'MISSION FAILED',
};
