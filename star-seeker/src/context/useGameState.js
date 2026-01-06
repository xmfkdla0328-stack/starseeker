import { useState } from 'react';
import { useSceneManager } from '../hooks/useSceneManager';
import { usePlayerSystem } from '../hooks/usePlayerSystem';
import { useInventorySystem } from '../hooks/useInventorySystem';
import { useLevelSync } from '../hooks/useLevelSync';
import { useBondSystem } from '../hooks/useBondSystem';
import { useBattleSystem } from '../hooks/useBattleSystem';
import { useSynergy } from '../hooks/useSynergy';
import { useLevelSystem } from '../hooks/useLevelSystem';

/**
 * 게임 전체 상태를 관리하는 커스텀 훅
 * 모든 하위 시스템 훅을 초기화하고 조합
 */
export const useGameState = () => {
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

  return {
    // UI 시스템
    screen,
    setScreen,
    toast,
    showToast,
    // 플레이어 시스템
    playerInfo,
    setPlayerInfo,
    playerStats,
    setPlayerStats,
    unlockedAchievements,
    setUnlockedAchievements,
    handleSelectTitle,
    addExp,
    // 인벤토리 시스템
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
    // 미사용 (향후 확장)
    battleSystem,
    synergy,
  };
};
