import React, { useState } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { TITLES, getRarityStyles } from '../../data/playerStats';

export const TitleSelector = ({ playerInfo, onSelectTitle }) => {
  const [showTitleSelector, setShowTitleSelector] = useState(false);
  
  return (
    <div className="bg-gradient-to-br from-cyan-500/8 to-blue-600/8 border border-cyan-300/15 rounded-xl p-5 backdrop-blur-md hover:border-cyan-300/25 transition-all duration-300">
      <button
        onClick={() => setShowTitleSelector(!showTitleSelector)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-2">
          <Star size={18} className="text-cyan-300" />
          <h3 className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Starlit Titles</h3>
        </div>
        <ChevronRight size={18} className={`text-cyan-300 transition-transform duration-300 ${showTitleSelector ? 'rotate-90' : ''}`} />
      </button>
      
      {showTitleSelector && (
        <div className="mt-4 space-y-2">
          {Object.entries(TITLES).map(([key, title]) => {
            const isUnlocked = playerInfo.unlockedTitles?.includes(title.id) ?? false;
            const isSelected = playerInfo.selectedTitle === title.id;
            const rarityStyles = getRarityStyles(title.rarity);
            
            return (
              <button
                key={title.id}
                onClick={() => {
                  if (isUnlocked && onSelectTitle) {
                    onSelectTitle(title.id);
                  }
                }}
                disabled={!isUnlocked}
                className={`w-full p-3 rounded-lg transition-all duration-300 flex items-center justify-between backdrop-blur-sm ${
                  isUnlocked
                    ? isSelected
                      ? `${rarityStyles.bg} border ${rarityStyles.border} shadow-[0_0_15px_rgba(34,211,238,0.2)]`
                      : `bg-cyan-500/8 border border-cyan-300/15 hover:border-cyan-300/30 hover:bg-cyan-500/15`
                    : 'bg-slate-700/20 border border-slate-600/20 opacity-40'
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-bold text-cyan-100">{title.name}</p>
                  <p className="text-xs text-cyan-300/50 mt-0.5">{title.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${rarityStyles.bg} ${rarityStyles.text} border ${rarityStyles.border} backdrop-blur-sm`}>
                    {title.rarity.toUpperCase()}
                  </span>
                  {isSelected && <span className="text-cyan-300 text-lg">✦</span>}
                  {!isUnlocked && <span className="text-slate-500 text-lg">◇</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
