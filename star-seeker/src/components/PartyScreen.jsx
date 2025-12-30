import React, { useState, useCallback } from 'react';
import { PartyFormation } from './party/PartyFormation';
import { SynergyPanel } from './party/SynergyPanel';
import { PartySelector } from './party/PartySelector';
import { BackButton } from './common/BackButton';
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
    <div className="flex flex-col min-h-full gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 p-1.5 sm:p-2 md:p-2.5 lg:p-3 relative">
      {/* 뒤로가기 버튼 */}
      <BackButton onClick={() => setScreen('HOME')} disabled={!!selectedSlot} />

      {/* 파티 편성 영역 */}
      <div className="flex flex-col md:flex-row flex-1 gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 overflow-y-auto">
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

      </div>

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