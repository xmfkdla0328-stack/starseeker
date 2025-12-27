import React from 'react';
import { Star } from 'lucide-react';

export const FeaturedAlly = ({ mainChar }) => {
  if (!mainChar) return null;
  
  return (
    <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-300/15 rounded-xl p-5 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4">
        <Star size={18} className="text-emerald-300" />
        <h3 className="text-sm font-bold text-emerald-200 uppercase tracking-widest">Featured Ally</h3>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-emerald-300/40 bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0 relative backdrop-blur-sm">
          <div className="absolute inset-0 rounded-full border border-emerald-300/10 animate-pulse opacity-50"></div>
          <span className="text-xl font-serif font-bold text-emerald-100 relative z-10">{mainChar.name[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-serif font-bold text-emerald-100 truncate drop-shadow-[0_0_6px_rgba(52,211,153,0.2)]">
            {mainChar.name}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-emerald-300/60 flex-wrap">
            <span>★{mainChar.rarity}</span>
            <span>•</span>
            <span>{mainChar.element}</span>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-emerald-300/50 uppercase">Ultimate</span>
              <span className="text-[10px] font-bold text-emerald-100">{mainChar.ultLevel}/5</span>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden border border-emerald-300/15 backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                style={{ width: `${(mainChar.ultLevel / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
