/**
 * 적 AI: 간단한 무작위 타겟 선택 + 고정 배율 데미지
 */
export const executeEnemyTurn = (enemyData = {}, partyStatus = []) => {
  const aliveIndexes = partyStatus
    .map((c, idx) => (c && c.hp > 0 ? idx : null))
    .filter((v) => v !== null);

  if (aliveIndexes.length === 0) {
    return { damage: [] }; // 빈 배열 반환
  }

  const targetIndex = aliveIndexes[Math.floor(Math.random() * aliveIndexes.length)];
  const baseAtk = enemyData.attack || 10;
  const damageValue = Math.max(1, Math.floor(baseAtk * (0.9 + Math.random() * 0.3)));

  // damage를 배열 형태로 반환 (단일 타겟이지만 배열에 담아서)
  return { 
    damage: [{ index: targetIndex, damage: damageValue }]
  };
};
