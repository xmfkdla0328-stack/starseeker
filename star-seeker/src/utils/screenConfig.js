/**
 * 게임 화면 전용 상수들
 */

// GardenScreen 상수
export const GARDEN_CONFIG = {
  CHARACTER_LIMIT: 5,           // 정원에 배치할 최대 캐릭터 수
  POSITION_MIN_X: 10,            // X 좌표 최소값 (%)
  POSITION_MAX_X: 80,            // X 좌표 최대값 (%)
  POSITION_MIN_Y: 20,            // Y 좌표 최소값 (%)
  POSITION_MAX_Y: 60,            // Y 좌표 최대값 (%)
  MOVEMENT_RANGE: 5,             // 한 번에 이동할 최대 거리 (%)
  MOVEMENT_INTERVAL: 2000,       // 이동 간격 (ms)
  CHAR_SIZE_CLASSES: 'w-10 h-10', // 캐릭터 아이콘 크기
};

// PartyScreen 상수
export const PARTY_CONFIG = {
  FRONT_SLOTS: 4,               // 전열 슬롯 개수
  BACK_SLOTS: 4,                // 후열 슬롯 개수
};

// BattleScreen 상수
export const BATTLE_SCREEN_CONFIG = {
  VICTORY_EXP_REWARD: 100,       // 승리 시 경험치 보상
  VICTORY_SCREEN_DURATION: 2000, // 승리 화면 표시 시간 (ms)
};

// ProfileModal 상수
export const PROFILE_MODAL_CONFIG = {
  SELECTED_CHAR_LIMIT: 8,        // 수집 완료 기준 캐릭터 수
};
