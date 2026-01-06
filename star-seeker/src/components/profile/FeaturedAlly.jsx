import React from 'react';
import { Star } from 'lucide-react';

export const FeaturedAlly = ({ mainChar }) => {
  if (!mainChar) return null;
  
  return (
    <div className="bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl shadow-lg shadow-cyan-500/20 p-5 backdrop-blur-md transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Star size={18} className="text-cyan-400" />
        <h3 className="text-sm font-bold text-cyan-100 uppercase tracking-widest">대표 파트너</h3>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-white/10 flex items-center justify-center flex-shrink-0 relative backdrop-blur-md shadow-lg shadow-cyan-500/40">
          <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse opacity-50"></div>
          <span className="text-xl font-serif font-bold text-cyan-100 relative z-10">{mainChar.name[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-serif font-bold text-cyan-100 truncate">
            {mainChar.name}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono flex-wrap">
            <span>★{mainChar.rarity}</span>
            <span>•</span>
            <span>{mainChar.element}</span>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase">궁극기</span>
              <span className="text-[10px] font-bold text-cyan-100 font-mono">{mainChar.ultLevel}/5</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 backdrop-blur-md">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                style={{ width: `${(mainChar.ultLevel / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
