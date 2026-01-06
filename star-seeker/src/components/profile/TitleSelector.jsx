import React, { useState } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { TITLES, getRarityStyles } from '../../data/playerStats';

export const TitleSelector = ({ playerInfo, onSelectTitle }) => {
  const [showTitleSelector, setShowTitleSelector] = useState(false);
  
  return (
    <div className="bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl shadow-lg shadow-cyan-500/10 p-5 backdrop-blur-md transition-all duration-300">
      <button
        onClick={() => setShowTitleSelector(!showTitleSelector)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-2">
          <Star size={18} className="text-cyan-400" />
          <h3 className="text-sm font-bold text-cyan-100 uppercase tracking-widest">칭호 변경</h3>
        </div>
        <ChevronRight size={18} className={`text-cyan-400 transition-transform duration-300 ${showTitleSelector ? 'rotate-90' : ''}`} />
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
                className={`w-full p-3 rounded-lg transition-all duration-300 flex items-center justify-between backdrop-blur-md ${
                  isUnlocked
                    ? isSelected
                      ? `bg-white/10 border ${rarityStyles.border} shadow-lg shadow-cyan-500/20`
                      : `bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20`
                    : 'bg-white/3 border border-white/5 opacity-40'
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-bold text-white">{title.name}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{title.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${rarityStyles.bg} ${rarityStyles.text} border ${rarityStyles.border} backdrop-blur-sm font-mono`}>
                    {title.rarity.toUpperCase()}
                  </span>
                  {isSelected && <span className="text-cyan-400 text-lg">✦</span>}
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
