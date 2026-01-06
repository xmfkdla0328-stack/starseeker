import { useState } from 'react';
import { useSceneManager } from './useSceneManager';
import { usePlayerSystem } from './usePlayerSystem';
import { useInventorySystem } from './useInventorySystem';
import { useLevelSync } from './useLevelSync';
import { useBondSystem } from './useBondSystem';
import { useBattleSystem } from './useBattleSystem';
import { useSynergy } from './useSynergy';

// 루트 게임 로직 훅: 도메인별 훅을 조합해 통합 API 제공
export const useGameLogic = () => {
  // 화면/토스트 관리
  const { screen, setScreen, toast, showToast } = useSceneManager();

  // 파티 상태는 전역 루트에서 유지 (레벨 동기화/인연도 등에서 필요)
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

  // 인벤토리/가챠/메인 캐릭터 시스템 (플레이어 레벨을 전달해 가챠 초기 레벨 반영)
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
  useLevelSync(playerInfo, setPlayerInfo, inventory, setInventory, party, setParty, mainChar, setMainChar, showToast);

  // 인연도 시스템 (정원/전투)
  const { increaseBondFromBattle } = useBondSystem(inventory, setInventory, party, screen);

  // 향후 확장: 전투/시너지 시스템 자리 표시자
  const battleSystem = useBattleSystem();
  const synergy = useSynergy();

  return {
    // 화면/토스트
    screen,
    setScreen,
    toast,
    showToast,

    // 파티
    party,
    setParty,

    // 인벤토리/가챠
    inventory,
    setInventory,
    items,
    setItems,
    mainChar,
    setMainChar,
    handleGacha,

    // 플레이어
    playerInfo,
    setPlayerInfo,
    playerStats,
    setPlayerStats,
    unlockedAchievements,
    setUnlockedAchievements,
    handleSelectTitle,
    addExp,

    // 인연도
    increaseBondFromBattle,

    // 확장 포인트
    battleSystem,
    synergy,
  };
};