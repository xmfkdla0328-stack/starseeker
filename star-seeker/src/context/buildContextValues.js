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

  return {
    playerContextValue,
    inventoryContextValue,
    uiContextValue,
  };
};
