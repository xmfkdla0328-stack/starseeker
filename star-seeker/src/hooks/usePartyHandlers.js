import { useCallback } from 'react';

/**
 * PartyScreen 이벤트 핸들러 훅
 */
export const usePartyHandlers = ({
  party,
  selectedCharacter,
  setSelectedCharacter,
  handleAssign,
  removeChar,
}) => {
  // 캐릭터 클릭: 파티에 추가 또는 상세 정보 보기
  const handleCharacterClick = useCallback((char) => {
    const isDeployed = party.members.some(p => p && p.id === char.id);
    if (!isDeployed && party.members.filter(p => p).length < 4) {
      // 빈 슬롯에 추가
      const emptyIndex = party.members.findIndex(p => !p);
      handleAssign(char, false, true, { line: 'members', index: emptyIndex });
    }
    setSelectedCharacter(char);
  }, [party.members, handleAssign, setSelectedCharacter]);

  // 슬롯 클릭: 캐릭터 제거
  const handleSlotClick = useCallback((idx, event) => {
    const char = party.members[idx];
    // 빈 슬롯이면 무시
    if (!char) return;
    
    // 클릭하면 바로 제거
    removeChar('members', idx);
    
    // 선택된 캐릭터였다면 선택 해제
    if (selectedCharacter?.id === char.id) {
      setSelectedCharacter(null);
    }
  }, [party.members, removeChar, selectedCharacter, setSelectedCharacter]);

  return {
    handleCharacterClick,
    handleSlotClick,
  };
};
