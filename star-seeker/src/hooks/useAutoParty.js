import { useCallback } from 'react';

/**
 * 자동 파티 편성 로직
 * 캐릭터들을 레어도와 공격력 기준으로 정렬한 후 최대 4명 배치
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

    const newMembers = [null, null, null, null];
    let idx = 0;

    // 최대 4명까지 배치
    for (const char of sortedChars) {
      if (idx >= 4) break;
      newMembers[idx++] = char;
    }

    setParty({ members: newMembers });
    showToast('파티가 자동 편성되었습니다.');
  }, [inventory, showToast, setParty]);
};
