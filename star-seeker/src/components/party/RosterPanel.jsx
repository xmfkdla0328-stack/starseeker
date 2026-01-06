import React from 'react';
import { HelpCircle } from 'lucide-react';
import { PartyRosterCard } from './PartyRosterCard';

/**
 * 대기 명단 패널 (좌측)
 */
export const RosterPanel = ({ 
  inventory, 
  party, 
  selectedCharacter, 
  onCharacterClick,
  onAutoParty,
  onShowGuide,
}) => {
  return (
    <div className="col-span-3 flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl border border-cyan-500/20 overflow-hidden">
      <div className="px-4 py-3 bg-cyan-950/30 border-b border-cyan-500/30 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">대기 명단</h2>
          <p className="text-xs text-slate-400 mt-1">{inventory.length} Available</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onShowGuide}
            className="p-1.5 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
            title="전술 데이터베이스"
          >
            <HelpCircle size={16} />
          </button>
          <button 
            onClick={onAutoParty}
            className="px-3 py-1.5 rounded-md bg-cyan-600/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold hover:bg-cyan-500/30 transition-all uppercase tracking-wider"
            title="Auto-assign best characters"
          >
            Auto
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {inventory.map((char) => (
          <PartyRosterCard
            key={char.uid}
            char={char}
            isDeployed={party.members.some(p => p && p.id === char.id)}
            isSelected={selectedCharacter?.id === char.id}
            onClick={() => onCharacterClick(char)}
          />
        ))}
      </div>
    </div>
  );
};
