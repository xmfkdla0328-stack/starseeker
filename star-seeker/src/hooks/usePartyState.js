import { useState } from 'react';

/**
 * PartyScreen 상태 관리 훅
 */
export const usePartyState = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  return {
    selectedCharacter,
    setSelectedCharacter,
    showGuide,
    setShowGuide,
  };
};
