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
export const useGameState = (partyData, enemyData) => {
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

  // partyData, enemyData가 항상 유효하도록 보장
  const safePartyData = Array.isArray(partyData) && partyData.length > 0 ? partyData : null;
  const safeEnemyData = Array.isArray(enemyData) && enemyData.length > 0 ? enemyData : null;
  // 데이터가 준비되지 않았으면 battleSystem도 null 반환
  const battleSystem = (safePartyData && safeEnemyData)
    ? useBattleSystem(safePartyData, safeEnemyData)
    : {
        allies: [],
        enemy: null,
        battleState: 'INIT',
        turnCount: 0,
        logs: [],
        battleCp: 100,
        setBattleCp: () => {},
      };
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

  // [디버깅] 전투 데이터 흐름 추적
  console.log('[useGameState][FLOW] battleSystem:', battleSystem);
  console.log('[useGameState][FLOW] battleAllies:', battleSystem.allies);
  console.log('[useGameState][FLOW] battleEnemy:', battleSystem.enemy);
  console.log('[useGameState][FLOW] battleState:', battleSystem.battleState);

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
    // 전투 시스템 (세부 데이터 분리)
    battleSystem,
    battleAllies: Array.isArray(battleSystem.allies) ? battleSystem.allies : [],
    battleEnemy: battleSystem.enemy ?? null,
    battleState: battleSystem.battleState ?? 'INIT',
    battleTurnCount: typeof battleSystem.turnCount === 'number' ? battleSystem.turnCount : 0,
    battleLogs: Array.isArray(battleSystem.logs) ? battleSystem.logs : [],
    // 기타 시스템
    synergy,
  };
};
