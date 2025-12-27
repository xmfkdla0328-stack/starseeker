import React, { useState } from 'react';
import { Shield, Sword } from 'lucide-react';
// 분리한 컴포넌트들 불러오기
import { PartySlot } from './party/PartySlot';
import { SynergyPanel } from './party/SynergyPanel';
import { PartySelector } from './party/PartySelector';

export const PartyScreen = ({ party, setParty, inventory, showToast, activeSynergies }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [highlightedSynergy, setHighlightedSynergy] = useState(null);
  
  const toggleSynergyHighlight = (synergyName) => {
    setHighlightedSynergy(prev => prev === synergyName ? null : synergyName);
  };

  const handleAssign = (char, isPlaced, isRoleMatch) => {
    if (!selectedSlot) return;
    if (isPlaced) { showToast('이미 다른 위치에 배치된 캐릭터입니다.'); return; }
    if (!isRoleMatch) { showToast('이 위치에는 배치할 수 없는 캐릭터입니다.'); return; }

    const { line } = selectedSlot;
    const newParty = { ...party }; 
    newParty[line][selectedSlot.index] = char;
    setParty(newParty); 
    setSelectedSlot(null);
  };

  const removeChar = (line, index) => {
      const newParty = { ...party }; 
      newParty[line][index] = null; 
      setParty(newParty);
  };

  return (
    <div className="flex h-full gap-4 p-4 overflow-hidden relative">
      <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">
        
        {/* 전열 영역 */}
        <div className={`flex-1 bg-slate-900/40 backdrop-blur-md p-3 rounded-xl border border-red-900/30 flex flex-col shadow-inner shadow-red-900/10 min-h-0 justify-center transition-opacity duration-300`}>
          <h3 className="text-red-300/80 text-[10px] md:text-xs mb-2 uppercase tracking-wider flex items-center gap-2 font-bold shrink-0 justify-center">
            <Sword size={12} /> 전열 (Attack)
          </h3>
          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-4 gap-3">
              {party.front.map((char, idx) => (
                <PartySlot 
                  key={`front-${idx}`} 
                  char={char} 
                  line="front" 
                  idx={idx} 
                  removeChar={removeChar} 
                  setSelectedSlot={setSelectedSlot} 
                  highlightedSynergy={highlightedSynergy}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 후열 영역 */}
        <div className={`flex-1 bg-slate-900/40 backdrop-blur-md p-3 rounded-xl border border-blue-900/30 flex flex-col shadow-inner shadow-blue-900/10 min-h-0 justify-center transition-opacity duration-300`}>
          <h3 className="text-blue-300/80 text-[10px] md:text-xs mb-2 uppercase tracking-wider flex items-center gap-2 font-bold shrink-0 justify-center">
            <Shield size={12} /> 후열 (Support)
          </h3>
          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-4 gap-3">
              {party.back.map((char, idx) => (
                <PartySlot 
                  key={`back-${idx}`} 
                  char={char} 
                  line="back" 
                  idx={idx} 
                  removeChar={removeChar} 
                  setSelectedSlot={setSelectedSlot} 
                  highlightedSynergy={highlightedSynergy}
                />
              ))}
            </div>
          </div>
        </div>
        
      </div>

      {/* 시너지 패널 */}
      <SynergyPanel 
        activeSynergies={activeSynergies} 
        highlightedSynergy={highlightedSynergy} 
        toggleSynergyHighlight={toggleSynergyHighlight}
      />

      {/* 캐릭터 선택 팝업 */}
      {selectedSlot && (
        <PartySelector 
          inventory={inventory}
          party={party}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          handleAssign={handleAssign}
        />
      )}
    </div>
  );
};