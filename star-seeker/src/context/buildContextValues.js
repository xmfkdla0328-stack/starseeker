/**
 * Context에 전달할 값 객체들을 생성
 * 각 Context가 필요로 하는 데이터와 함수를 그룹화
 */
export const buildContextValues = (gameState) => {
  const {
    // UI
    screen,
    setScreen,
    toast,
    showToast,
    // Player
    playerInfo,
    setPlayerInfo,
    playerStats,
    setPlayerStats,
    unlockedAchievements,
    setUnlockedAchievements,
    handleSelectTitle,
    addExp,
    // Inventory
    inventory,
    setInventory,
    items,
    setItems,
    mainChar,
    setMainChar,
    handleGacha,
    party,
    setParty,
    increaseBondFromBattle,
    handleLevelUp,
    EXP_PER_CHIP,
    battleSystem,
    battleAllies,
    battleEnemy,
    battleState,
    battleTurnCount,
    battleLogs,
  } = gameState;

  // PlayerContext 값
  const playerContextValue = {
    playerInfo,
    setPlayerInfo,
    playerStats,
    setPlayerStats,
    unlockedAchievements,
    setUnlockedAchievements,
    handleSelectTitle,
    addExp,
  };

  // InventoryContext 값
  const inventoryContextValue = {
    inventory,
    setInventory,
    items,
    setItems,
    mainChar,
    setMainChar,
    handleGacha,
    party,
    setParty,
    increaseBondFromBattle,
    handleLevelUp,
    EXP_PER_CHIP,
  };

  // UIContext 값
  const uiContextValue = {
    screen,
    setScreen,
    toast,
    showToast,
  };

  // BattleContext 값 (기본값 보장)
  const battleContextValue = {
    battleSystem,
    battleAllies: Array.isArray(battleAllies) ? battleAllies : [],
    battleEnemy: battleEnemy || {},
    battleState: battleState || 'INIT',
    battleTurnCount: typeof battleTurnCount === 'number' ? battleTurnCount : 0,
    battleLogs: Array.isArray(battleLogs) ? battleLogs : [],
  };

  // [디버깅] battleContextValue 생성 시 값 확인
  if (!battleContextValue.battleAllies.length || !battleContextValue.battleEnemy) {
    console.warn('[buildContextValues][WARN] battleContextValue에 실제 데이터가 없습니다:', battleContextValue);
  } else {
    console.log('[buildContextValues][FLOW] battleContextValue:', battleContextValue);
  }

  return {
    playerContextValue,
    inventoryContextValue,
    uiContextValue,
    battleContextValue,
  };
};
