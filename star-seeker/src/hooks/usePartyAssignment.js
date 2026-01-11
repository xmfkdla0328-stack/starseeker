import { useCallback } from 'react';

/**
 * 파티 캐릭터 할당 로직
 * 선택된 슬롯에 캐릭터를 배치하고 검증
 */
export const usePartyAssignment = (party, setParty, showToast) => {
  const handleAssign = useCallback((char, isPlaced, isRoleMatch, selectedSlot) => {
    if (!selectedSlot) return;
    if (isPlaced) {
      showToast('이미 배치된 캐릭터입니다.');
      return;
    }

    const newParty = [...party];
    newParty[selectedSlot.index] = char;
    setParty(newParty);
  }, [party, setParty, showToast]);

  const removeChar = useCallback((line, index) => {
    const newParty = [...party];
    newParty[index] = null;
    setParty(newParty);
  }, [party, setParty]);

  return { handleAssign, removeChar };
};
