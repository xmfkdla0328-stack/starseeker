import React, { useMemo } from 'react';
import { X } from 'lucide-react';
import { getTitleById, getRarityStyles } from '../../data/playerStats';

export const ProfileHeader = ({ playerInfo, onClose }) => {
  const selectedTitleData = useMemo(() => getTitleById(playerInfo.selectedTitle), [playerInfo.selectedTitle]);
  
  return (
    <div className="relative border-b border-cyan-400/10 bg-gradient-to-r from-cyan-500/5 via-indigo-500/3 to-blue-500/5 p-6 backdrop-blur-md">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"></div>
      
      <div className="relative flex items-center justify-between z-10">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-300/40 bg-gradient-to-br from-cyan-500/25 to-blue-600/25 flex items-center justify-center relative overflow-hidden flex-shrink-0 group backdrop-blur-sm">
            <div className="absolute inset-0 rounded-full border border-cyan-300/10 animate-pulse opacity-50"></div>
            <span className="text-2xl font-serif font-bold text-cyan-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] relative z-10">
              {playerInfo.nickname[0]}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {selectedTitleData && (
                (() => {
                  const rarityStyles = getRarityStyles(selectedTitleData.rarity);
                  return (
                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${rarityStyles.bg} border ${rarityStyles.border} ${rarityStyles.text} font-bold tracking-widest flex-shrink-0 backdrop-blur-sm`}>
                      ✦ {selectedTitleData.rarity.toUpperCase()}
                    </span>
                  );
                })()
              )}
            </div>
            <p className="text-xs text-cyan-300/70 font-serif font-semibold tracking-wider uppercase mb-1">
              {selectedTitleData?.name}
            </p>
            <p className="text-2xl font-serif font-bold text-cyan-100 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] leading-tight">{playerInfo.nickname}</p>
            <p className="text-xs text-cyan-300/60 tracking-wider uppercase mt-2">LV {playerInfo.level} ✧ {playerInfo.totalBattles} Encounters</p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 text-cyan-300/50 hover:text-cyan-200 hover:bg-white/5 transition-all rounded-lg relative group flex-shrink-0"
        >
          <X size={24} />
          <div className="absolute inset-0 rounded-lg border border-cyan-300/0 group-hover:border-cyan-300/20 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.15)]"></div>
        </button>
      </div>
    </div>
  );
};
