import { useState, useEffect, useCallback, useMemo } from 'react';
import { SYNERGIES, CHAR_DB } from '../constants';

export const useGameLogic = () => {
  const [screen, setScreen] = useState('HOME');
  const [gems, setGems] = useState(3000);
  const [inventory, setInventory] = useState([]);
  const [party, setParty] = useState({ front: [null, null, null, null], back: [null, null, null, null] });
  const [toast, setToast] = useState(null);
  const [mainChar, setMainChar] = useState(null);

  // 초기화 로직
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

  // 알림 표시 함수
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  // 시너지 계산 로직
  const activeSynergies = useMemo(() => {
    const counts = {};
    const activeChars = [...party.front, ...party.back].filter(c => c !== null);
    activeChars.forEach(char => {
      char.tags.forEach(tag => { counts[tag] = (counts[tag] || 0) + 1; });
    });
    const results = [];
    Object.entries(counts).forEach(([tag, count]) => {
      const synData = SYNERGIES[tag];
      if (!synData) return;
      const effects = synData.levels.filter(l => count >= l.count);
      if (effects.length > 0) {
        results.push({ name: tag, count, effect: effects[effects.length - 1].effect });
      }
    });
    return results;
  }, [party]);

  // 가챠 로직
  const handleGacha = useCallback((count) => {
    const cost = count * 100;
    if (gems < cost) { showToast('별의 조각이 부족합니다!'); return; }
    
    setGems(prev => prev - cost);
    const newChars = [];
    let payback = 0;
    
    const currentInventory = [...inventory]; 

    for (let i = 0; i < count; i++) {
      const picked = CHAR_DB[Math.floor(Math.random() * CHAR_DB.length)];
      const existingIdx = currentInventory.findIndex(c => c.id === picked.id);
      
      if (existingIdx >= 0) {
        const target = currentInventory[existingIdx];
        if (target.ultLevel < 5) {
          currentInventory[existingIdx] = { ...target, ultLevel: target.ultLevel + 1 };
          showToast(`${picked.name} 중복! 필살기 강화!`);
        } else { payback += 20; }
      } else {
        const newChar = { ...picked, ultLevel: 0, bond: 0, uid: Date.now() + i };
        newChars.push(newChar);
        currentInventory.push(newChar);
      }
    }
    setInventory(currentInventory);

    if (payback > 0) {
      setGems(prev => prev + payback);
      setTimeout(() => showToast(`${payback} 별의 조각 페이백!`), 500);
    }
  }, [gems, inventory, showToast]);

  // 필요한 모든 데이터와 함수를 반환
  return {
    screen, setScreen,
    gems, setGems,
    inventory, setInventory,
    party, setParty,
    mainChar, setMainChar,
    toast, showToast,
    activeSynergies,
    handleGacha
  };
};