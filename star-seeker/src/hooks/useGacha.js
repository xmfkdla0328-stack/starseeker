import { useCallback } from 'react';
import { CHAR_DB } from '../data/characters';

export const useGacha = (gems, setGems, inventory, setInventory, showToast) => {
  const handleGacha = useCallback((count) => {
    const cost = count * 100;
    if (gems < cost) { 
      showToast('별의 조각이 부족합니다!'); 
      return; 
    }
    
    setGems(prev => prev - cost);
    let payback = 0;
    
    // 불변성을 지키기 위해 복사본 생성
    const currentInventory = [...inventory]; 

    for (let i = 0; i < count; i++) {
      // 랜덤 캐릭터 뽑기 (가중치 로직 등을 추가하려면 여기서 수정)
      const picked = CHAR_DB[Math.floor(Math.random() * CHAR_DB.length)];
      const existingIdx = currentInventory.findIndex(c => c.id === picked.id);
      
      if (existingIdx >= 0) {
        // 중복 캐릭터: 필살기 레벨 강화
        const target = currentInventory[existingIdx];
        if (target.ultLevel < 5) {
          currentInventory[existingIdx] = { ...target, ultLevel: target.ultLevel + 1 };
          showToast(`${picked.name} 중복! 필살기 강화!`);
        } else { 
          // 만렙이면 페이백
          payback += 20; 
        }
      } else {
        // 신규 캐릭터 획득
        const newChar = { ...picked, ultLevel: 0, bond: 0, uid: Date.now() + i };
        currentInventory.push(newChar);
      }
    }
    
    setInventory(currentInventory);

    if (payback > 0) {
      setGems(prev => prev + payback);
      setTimeout(() => showToast(`${payback} 별의 조각 페이백!`), 500);
    }
  }, [gems, inventory, setGems, setInventory, showToast]);

  return handleGacha;
};