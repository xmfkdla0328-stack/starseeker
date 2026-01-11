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
    battleAllies: battleAllies,
    battleEnemy: battleEnemy,
    battleState: battleState || 'INIT',
    battleTurnCount: typeof battleTurnCount === 'number' ? battleTurnCount : 0,
    battleLogs: Array.isArray(battleLogs) ? battleLogs : [],
    battleCp: battleSystem?.battleCp ?? 0,
    setBattleCp: battleSystem?.setBattleCp,
  };
  // 데이터가 준비되지 않았으면 빈 값으로 유지 (throw 제거)

  return {
    playerContextValue,
    inventoryContextValue,
    uiContextValue,
    battleContextValue,
  };
};
