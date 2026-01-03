/**
 * 전투 승패 판정 유틸
 */
export const BattleResult = {
  VICTORY: 'VICTORY',
  DEFEAT: 'DEFEAT',
  NONE: null,
};

/**
 * 승패 판정
 * @param {Object} params
 * @param {number} params.enemyHp - 적 HP
 * @param {number} params.missionGauge - 미션 게이지 (0~100)
 * @param {number} params.partyAliveCount - 생존 아군 수
 * @returns {'VICTORY'|'DEFEAT'|null}
 */
export const checkBattleResult = ({ enemyHp = 0, missionGauge = 0, partyAliveCount = 0 }) => {
  if (enemyHp <= 0 || missionGauge >= 100) return BattleResult.VICTORY;
  if (partyAliveCount <= 0) return BattleResult.DEFEAT;
  return BattleResult.NONE;
};
