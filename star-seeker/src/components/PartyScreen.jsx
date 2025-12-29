import React, { useState, useCallback } from 'react';
import { PartyFormation } from './party/PartyFormation';
import { SynergyPanel } from './party/SynergyPanel';
import { PartySelector } from './party/PartySelector';
import { useAutoParty } from '../hooks/useAutoParty';
import { usePartyAssignment } from '../hooks/usePartyAssignment';

export const PartyScreen = ({ party, setParty, inventory, showToast, activeSynergies, setScreen }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [highlightedSynergy, setHighlightedSynergy] = useState(null);
  
  // 자동 파티 편성 hook
  const handleAutoParty = useAutoParty(inventory, showToast, setParty);
  
  // 파티 할당/제거 hook
  const { handleAssign, removeChar } = usePartyAssignment(party, setParty, showToast);
  
  const toggleSynergyHighlight = (synergyName) => {
    setHighlightedSynergy(prev => prev === synergyName ? null : synergyName);
  };

  const handleAssignWithSlot = useCallback((char, isPlaced, isRoleMatch) => {
    handleAssign(char, isPlaced, isRoleMatch, selectedSlot);
    setSelectedSlot(null);
  }, [selectedSlot, handleAssign]);

  return (
    <div className="flex h-full gap-4 p-4 overflow-hidden relative">
      {/* 파티 편성 영역 */}
      <PartyFormation
        party={party}
        setSelectedSlot={setSelectedSlot}
        removeChar={removeChar}
        highlightedSynergy={highlightedSynergy}
      />

      {/* 시너지 패널 */}
      <SynergyPanel 
        activeSynergies={activeSynergies} 
        highlightedSynergy={highlightedSynergy} 
        toggleSynergyHighlight={toggleSynergyHighlight}
        handleAutoParty={handleAutoParty} 
        onStartBattle={() => setScreen('OBSERVATION')}
      />

      {/* 캐릭터 선택 모달 */}
      {selectedSlot && (
        <PartySelector 
          inventory={inventory}
          party={party}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          handleAssign={handleAssignWithSlot}
        />
      )}
    </div>
  );
};