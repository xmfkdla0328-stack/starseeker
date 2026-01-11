// 전투 중 실시간 변동값 관리용 템플릿
export const unitInstanceTemplate = {
  id: null,
  name: '',
  position: '',
  currentHp: 0,
  currentEp: 0,
  // ...existing code...
  maxHp: 0,
  maxEp: 0,
  // ...existing code...
  speed: 0,
  element: '',
  job: '',
  portrait: '',
  skills: [],
  equipment: [],
  statusEffects: [], // 상태이상, 버프/디버프
  isDead: false,
  timelinePosition: 0, // 타임라인상 거리
  actionQueue: [], // 행동 큐
};