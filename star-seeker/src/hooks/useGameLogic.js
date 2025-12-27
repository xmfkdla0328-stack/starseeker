import { useState, useEffect, useCallback } from 'react';
import { CHAR_DB } from '../data/characters';
import { DEFAULT_PLAYER_INFO, DEFAULT_PLAYER_STATS, ACHIEVEMENTS } from '../data/playerStats';

// 분리한 하위 훅들 가져오기
import { useBattleSystem } from './useBattleSystem';
import { useSynergy } from './useSynergy';
import { useGacha } from './useGacha';
import { useLevelSync } from './useLevelSync';
import { getTitleById } from '../data/playerStats';

export const useGameLogic = () => {
  const [screen, setScreen] = useState('HOME');
  const [inventory, setInventory] = useState([]);
  const [party, setParty] = useState({ front: [null, null, null, null], back: [null, null, null, null] });
  const [toast, setToast] = useState(null);
  const [mainChar, setMainChar] = useState(null);
  
  // 플레이어 정보
  const [playerInfo, setPlayerInfo] = useState(DEFAULT_PLAYER_INFO);
  const [playerStats, setPlayerStats] = useState(DEFAULT_PLAYER_STATS);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  // 아이템 인벤토리
  const [items, setItems] = useState({
    stardust: 0, // 별의 먼지
    gems: 3000,  // 별의 조각
  });

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  // 1. 시너지 계산 (전투 시스템보다 먼저 계산되어야 함)
  const activeSynergies = useSynergy(party);
  
  // 2. 전투 시스템 (activeSynergies 전달)
  const battleSystem = useBattleSystem(party, activeSynergies);
  
  // 3. 가챠 로직 (플레이어 레벨 전달)
  const handleGacha = useGacha(items, setItems, inventory, setInventory, showToast, playerInfo.level);

  // 초기화 및 자동 처리
  useEffect(() => {
    if (inventory.length === 0) {
      const starter = { ...CHAR_DB[0], ultLevel: 0, bond: 0, uid: Date.now(), level: 1 };
      setInventory([starter]);
    }
  }, []);

  useEffect(() => {
    if (inventory.length > 0 && !mainChar) {
      setMainChar(inventory[0]);
    }
  }, [inventory, mainChar]);

  useEffect(() => {
    if (screen === 'BATTLE' && battleSystem.battleState === 'IDLE') {
      battleSystem.startBattle();
    }
  }, [screen]);

  // 플레이어 레벨 동기화
  useLevelSync(playerInfo, setPlayerInfo, inventory, setInventory, party, setParty, mainChar, setMainChar, showToast);

  // 타이틀 선택 핸들러
  const handleSelectTitle = useCallback((titleId) => {
    setPlayerInfo(prev => ({
      ...prev,
      selectedTitle: titleId,
    }));
  }, []);

  // 경험치 추가 함수
  const addExp = useCallback((expAmount) => {
    setPlayerInfo(prev => ({
      ...prev,
      exp: prev.exp + expAmount,
    }));
  }, []);

  return {
    screen, setScreen,
    inventory, setInventory,
    party, setParty,
    mainChar, setMainChar,
    toast, showToast,
    activeSynergies,
    handleGacha,
    battleSystem,
    // 플레이어 정보 추가
    playerInfo, setPlayerInfo,
    playerStats, setPlayerStats,
    unlockedAchievements, setUnlockedAchievements,
    // 타이틀 선택
    handleSelectTitle,
    // 경험치 추가
    addExp,
    // 아이템
    items, setItems,
  };
};