import { useCallback } from 'react';
import { CHAR_DB } from '../data/characters';
import { GAME_CONST } from '../constants';

export const useGacha = (items, setItems, inventory, setInventory, showToast, playerLevel = 1) => {
  const handleGacha = useCallback((count) => {
    const cost = count * GAME_CONST.GACHA_COST_PER_PULL;
    if (items.gems < cost) { 
      showToast('별의 조각이 부족합니다!'); 
      return null;
    }
    
    setItems(prev => ({ ...prev, gems: prev.gems - cost }));
    let payback = 0;
    const gachaResults = []; // 뽑은 캐릭터들 저장
    
    // 불변성을 지키기 위해 복사본 생성
    const currentInventory = [...inventory]; 

    for (let i = 0; i < count; i++) {
      // 랜덤 캐릭터 뽑기 (가중치 로직 등을 추가하려면 여기서 수정)
      const picked = CHAR_DB[Math.floor(Math.random() * CHAR_DB.length)];
      gachaResults.push(picked); // 뽑은 결과 저장
      const existingIdx = currentInventory.findIndex(c => c.id === picked.id);
      
      if (existingIdx >= 0) {
        // 중복 캐릭터: 필살기 레벨 강화
        const target = currentInventory[existingIdx];
        if (target.ultLevel < GAME_CONST.MAX_ULTIMATE_LEVEL) {
          currentInventory[existingIdx] = { ...target, ultLevel: target.ultLevel + 1 };
          showToast(`${picked.name} 중복! 필살기 강화!`);
        } else { 
          // 만렙이면 페이백
          payback += GAME_CONST.GACHA_PAYBACK_AMOUNT; 
        }
      } else {
        // 신규 캐릭터 획득 - 플레이어 레벨로 초기화
        const newChar = { ...picked, ultLevel: 0, bondLevel: 0, uid: Date.now() + i, level: playerLevel };
        currentInventory.push(newChar);
      }
    }
    
    setInventory(currentInventory);

    if (payback > 0) {
      setItems(prev => ({ ...prev, gems: prev.gems + payback }));
      setTimeout(() => showToast(`${payback} 별의 조각 페이백!`), 500);
    }

    return gachaResults; // 뽑은 캐릭터 배열 반환
  }, [items.gems, inventory, setItems, setInventory, showToast, playerLevel]);

  return handleGacha;
};