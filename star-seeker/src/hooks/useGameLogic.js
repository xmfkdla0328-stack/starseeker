import { useState, useEffect, useCallback } from 'react';
import { CHAR_DB } from '../data/characters/index';
import { DEFAULT_PLAYER_INFO, DEFAULT_PLAYER_STATS } from '../data/playerStats';

// 분리한 하위 훅들 가져오기
import { useBattleSystem } from './useBattleSystem';
import { useSynergy } from './useSynergy';
import { useGacha } from './useGacha';
import { useLevelSync } from './useLevelSync';
import { useBondSystem } from './useBondSystem';

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
    gems: 3000,  // 가챠용 재화
    star_fragment_fire: 10,   // 별의 조각 (불)
    star_fragment_water: 10,  // 별의 조각 (물)
    star_fragment_earth: 10,  // 별의 조각 (대지)
    star_fragment_light: 20,  // 별의 조각 (빛) - 테스트용 추가
    star_fragment_dark: 10,   // 별의 조각 (어둠)
    boundary_potion: 5,       // 경계의 물약 (테스트용)
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

  // 4. 인연도 시스템
  const { increaseBondFromBattle } = useBondSystem(inventory, setInventory, party, screen);

  // 초기화 및 자동 처리
  useEffect(() => {
    if (inventory.length === 0) {
      const starter = { ...CHAR_DB[0], ultLevel: 0, bondLevel: 0, breakthrough: 0, uid: Date.now(), level: 1 };
      setInventory([starter]);
    }
  }, []);

  useEffect(() => {
    if (inventory.length > 0 && !mainChar) {
      setMainChar(inventory[0]);
    }
  }, [inventory, mainChar]);

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
    // 인연도 증가
    increaseBondFromBattle,
    // 아이템
    items, setItems,
  };
};