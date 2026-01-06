import { useState, useEffect } from 'react';
import { CHAR_DB } from '../data/characters/index';
import { useGacha } from './useGacha';

const DEFAULT_ITEMS = {
  gems: 1000,
  exp_chip: 10,
  star_fragment: 0,
  gold: 0,
  star_fragment_entropy: 0,
  star_fragment_stasis: 0,
  star_fragment_gravity: 0,
  star_fragment_resonance: 0,
  star_fragment_paradox: 0,
  star_fragment_axiom: 0,
};

// 인벤토리, 메인 캐릭터, 재화, 가챠 로직을 관리하는 훅
export const useInventorySystem = ({ showToast, playerLevel = 1 }) => {
  const [inventory, setInventory] = useState([]);
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [mainChar, setMainChar] = useState(null);

  const handleGacha = useGacha(items, setItems, inventory, setInventory, showToast, playerLevel);

  // 스타터 캐릭터 지급
  useEffect(() => {
    if (inventory.length === 0) {
      const starter = {
        ...CHAR_DB[0],
        ultLevel: 0,
        bondLevel: 0,
        breakthrough: 0,
        uid: Date.now(),
        level: 1,
        skillLevels: CHAR_DB[0].skillLevels
          ? { ...CHAR_DB[0].skillLevels }
          : { normal: 1, skill: 1, ultimate: 1, supportSkill: 1, supportUlt: 1 },
      };
      setInventory([starter]);
    }
  }, [inventory.length]);

  // 메인 캐릭터 자동 설정
  useEffect(() => {
    if (inventory.length > 0 && !mainChar) {
      setMainChar(inventory[0]);
    }
  }, [inventory, inventory.length, mainChar]);

  return {
    inventory,
    setInventory,
    items,
    setItems,
    mainChar,
    setMainChar,
    handleGacha,
  };
};
