import React, { createContext } from 'react';
import { useSceneManager } from '../hooks/useSceneManager';
import { usePlayerSystem } from '../hooks/usePlayerSystem';
import { useInventorySystem } from '../hooks/useInventorySystem';
import { useLevelSync } from '../hooks/useLevelSync';
import { useBondSystem } from '../hooks/useBondSystem';
import { useBattleSystem } from '../hooks/useBattleSystem';
import { useSynergy } from '../hooks/useSynergy';
import { useState } from 'react';
import { useLevelSystem } from '../hooks/useLevelSystem';

// ★ 플레이어 정보 Context (레벨, 경험치, 업적, 타이틀)
export const PlayerContext = createContext(null);

// ★ 인벤토리/아이템/가챠 Context (캐릭터, 메인 캐릭터, 재화, 가챠)
export const InventoryContext = createContext(null);

// ★ UI/화면 전환 Context (화면, 토스트)
export const UIContext = createContext(null);

/**
 * GameContextProvider
 * 리팩토링된 모든 훅을 조합해 3가지 Context를 제공
 * App 최상단에서 이 Provider로 감싼다
 */
export const GameContextProvider = ({ children }) => {
  // 화면/토스트 관리
  const { screen, setScreen, toast, showToast } = useSceneManager();

  // 파티 상태 (레벨 동기화/인연도 등에서 공유)
  const [party, setParty] = useState({ members: [null, null, null, null] });

  // 플레이어 시스템
  const {
    playerInfo,
    setPlayerInfo,
    playerStats,
    setPlayerStats,
    unlockedAchievements,
    setUnlockedAchievements,
    handleSelectTitle,
    addExp,
  } = usePlayerSystem();

  // 인벤토리/가챠/메인 캐릭터 시스템
  const {
    inventory,
    setInventory,
    items,
    setItems,
    mainChar,
    setMainChar,
    handleGacha,
  } = useInventorySystem({ showToast, playerLevel: playerInfo.level });

  // 플레이어 레벨과 캐릭터 레벨 동기화
  useLevelSync(
    playerInfo,
    setPlayerInfo,
    inventory,
    setInventory,
    party,
    setParty,
    mainChar,
    setMainChar,
    showToast
  );

  // 인연도 시스템 (정원/전투)
  const { increaseBondFromBattle } = useBondSystem(inventory, setInventory, party, screen);

  // 향후 확장: 전투/시너지 시스템
  const battleSystem = useBattleSystem();
  const synergy = useSynergy();
  const { handleLevelUp, EXP_PER_CHIP } = useLevelSystem({
    inventory,
    setInventory,
    items,
    setItems,
    party,
    setParty,
    showToast,
  });

  // ★ PlayerContext 값
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

  // ★ InventoryContext 값
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

  // ★ UIContext 값
  const uiContextValue = {
    screen,
    setScreen,
    toast,
    showToast,
  };

  return (
    <UIContext.Provider value={uiContextValue}>
      <PlayerContext.Provider value={playerContextValue}>
        <InventoryContext.Provider value={inventoryContextValue}>
          {children}
        </InventoryContext.Provider>
      </PlayerContext.Provider>
    </UIContext.Provider>
  );
};
