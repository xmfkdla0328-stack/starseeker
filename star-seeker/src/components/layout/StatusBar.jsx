import React from 'react';
import { Star } from 'lucide-react';

export const StatusBar = ({ gems, screen }) => {
  return (
    <header className="absolute top-0 right-0 left-0 z-40 h-16 px-3 md:px-6 flex items-center justify-end pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>

      {screen === 'HOME' && (
        <div className="flex items-center gap-3 relative z-10 flex-shrink-0 pointer-events-auto">
          <div className="relative group">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-cyan-400/40 backdrop-blur-md">
              <Star size={14} className="text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] flex-shrink-0" />
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-bold text-white min-w-[50px] text-right tracking-wider drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]">
                  {gems.toLocaleString()}
                </span>
                <span className="text-[7px] text-cyan-300/60 tracking-widest leading-none">FRAG</span>
              </div>
            </div>
            <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/40 transition-all duration-300 shadow-[0_0_0_rgba(34,211,238,0)] group-hover:shadow-[0_0_16px_rgba(34,211,238,0.25)]"></div>
          </div>
        </div>
      )}
    </header>
  );
};
