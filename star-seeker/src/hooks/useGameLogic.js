import { useState, useEffect, useCallback } from 'react';
import { CHAR_DB } from '../data/characters';

// 분리한 하위 훅들 가져오기
import { useBattleSystem } from './useBattleSystem';
import { useSynergy } from './useSynergy';
import { useGacha } from './useGacha';

export const useGameLogic = () => {
  const [screen, setScreen] = useState('HOME');
  const [gems, setGems] = useState(3000);
  const [inventory, setInventory] = useState([]);
  const [party, setParty] = useState({ front: [null, null, null, null], back: [null, null, null, null] });
  const [toast, setToast] = useState(null);
  const [mainChar, setMainChar] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  // 1. 시너지 계산 (전투 시스템보다 먼저 계산되어야 함)
  const activeSynergies = useSynergy(party);
  
  // 2. 전투 시스템 (activeSynergies 전달)
  const battleSystem = useBattleSystem(party, activeSynergies);
  
  // 3. 가챠 로직
  const handleGacha = useGacha(gems, setGems, inventory, setInventory, showToast);

  // 초기화 및 자동 처리
  useEffect(() => {
    if (inventory.length === 0) {
      const starter = { ...CHAR_DB[0], ultLevel: 0, bond: 0, uid: Date.now() };
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

  return {
    screen, setScreen,
    gems, setGems,
    inventory, setInventory,
    party, setParty,
    mainChar, setMainChar,
    toast, showToast,
    activeSynergies,
    handleGacha,
    battleSystem
  };
};