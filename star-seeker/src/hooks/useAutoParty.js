import { useCallback } from 'react';

/**
 * 자동 파티 편성 로직
 * 캐릭터들을 레어도와 공격력 기준으로 정렬한 후 자동 배치
 */
export const useAutoParty = (inventory, showToast, setParty) => {
  return useCallback(() => {
    if (inventory.length === 0) {
      showToast('보유한 캐릭터가 없습니다.');
      return;
    }

    // 레어도 높은 순, 같으면 공격력 높은 순으로 정렬
    const sortedChars = [...inventory].sort((a, b) => {
      if (a.rarity !== b.rarity) return b.rarity - a.rarity;
      return b.baseAtk - a.baseAtk;
    });

    const newFront = [null, null, null, null];
    const newBack = [null, null, null, null];
    const usedIds = new Set();

    // 전열 캐릭터 배치
    let fIdx = 0;
    sortedChars.forEach(char => {
      if (fIdx < 4 && char.role === 'FRONT' && !usedIds.has(char.id)) {
        newFront[fIdx++] = char;
        usedIds.add(char.id);
      }
    });

    // 후열 캐릭터 배치
    let bIdx = 0;
    sortedChars.forEach(char => {
      if (bIdx < 4 && char.role === 'BACK' && !usedIds.has(char.id)) {
        newBack[bIdx++] = char;
        usedIds.add(char.id);
      }
    });

    // 만능 캐릭터 배치
    sortedChars.forEach(char => {
      if (char.role === 'BOTH' && !usedIds.has(char.id)) {
        if (fIdx < 4) {
          newFront[fIdx++] = char;
          usedIds.add(char.id);
        } else if (bIdx < 4) {
          newBack[bIdx++] = char;
          usedIds.add(char.id);
        }
      }
    });

    setParty({ front: newFront, back: newBack });
    showToast('전투력이 높은 순으로 자동 편성되었습니다.');
  }, [inventory, showToast, setParty]);
};
