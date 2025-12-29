// 관측 화면 버튼/배치 상수
export const OBS_BUTTON_CONFIG = {
  edge: { sizeClass: 'w-64 h-64', offset: 128, edgePos: { x: 0, y: 260 } },
  large: { sizeClass: 'w-40 h-40', offset: 80 },
  normal: { sizeClass: 'w-32 h-32', offset: 64 },
};

export const LENS_CONFIG = {
  viewportVH: 80, // 뷰포트 지름 비율
  rimVH: 100,     // 렌즈 테두리 지름 비율
};

export const OBS_ANIM = {
  orbitSpinSec: 20,
  hoverScale: 1.25,
  glowOpacity: 0.8,
  glowScale: 1.5,
  pingDurationSec: 0.75,
};

// 관측 대상 좌표/크기 해석기
export const resolveObservationLayout = (obs) => {
  if (obs.size === 'edge') {
    const cfg = OBS_BUTTON_CONFIG.edge;
    return {
      buttonSize: cfg.sizeClass,
      offset: cfg.offset,
      posX: cfg.edgePos.x,
      posY: cfg.edgePos.y,
    };
  }
  const key = obs.size === 'large' ? 'large' : 'normal';
  const cfg = OBS_BUTTON_CONFIG[key];
  return {
    buttonSize: cfg.sizeClass,
    offset: cfg.offset,
    posX: obs.posX,
    posY: obs.posY,
  };
};
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
