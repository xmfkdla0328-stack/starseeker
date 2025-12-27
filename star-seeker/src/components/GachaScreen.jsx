import React, { useState } from 'react';
import { Telescope, Star, Sparkles } from 'lucide-react';
import { GachaResultModal } from './GachaResultModal';

export const GachaScreen = ({ handleGacha }) => {
  const [gachaResults, setGachaResults] = useState(null);

  const handleGachaClick = (count) => {
    const results = handleGacha(count);
    setGachaResults(results);
  };

  return (
    <>
      <div className="flex w-full h-full items-center justify-center relative overflow-hidden p-4">
         <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div className="w-[40vh] h-[40vh] md:w-[60vh] md:h-[60vh] rounded-full border border-indigo-500/30 flex items-center justify-center animate-[spin_60s_linear_infinite]">
              <div className="w-[28vh] h-[28vh] md:w-[45vh] md:h-[45vh] rounded-full border border-purple-500/30 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                 <div className="w-[15vh] h-[15vh] md:w-[30vh] md:h-[30vh] rounded-full border border-yellow-500/20 shadow-[0_0_50px_rgba(253,224,71,0.1)]"></div>
              </div>
            </div>
         </div>

         <div className="z-10 flex flex-col items-center justify-center gap-3 md:gap-6 max-w-xl w-full bg-slate-950/70 p-5 md:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-yellow-500/10 opacity-50 pointer-events-none rounded-3xl"></div>
               
               <div className="text-center shrink-0">
                  <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-yellow-300 font-serif mb-1 relative z-10 flex items-center justify-center gap-2">
                      <Telescope size={24} className="text-yellow-400"/> 성운 관측
                  </h2>
                  <p className="text-slate-400 text-xs md:text-sm mb-4 relative z-10 font-light opacity-80">
                      미지의 별을 찾기 위해 렌즈의 초점을 맞춥니다.
                  </p>
               </div>
               
               <div className="flex gap-4 w-full justify-center relative z-10">
                  <button onClick={() => handleGachaClick(1)} 
                    className="flex-1 bg-slate-800/80 hover:bg-slate-700/80 border border-white/20 text-white py-3 rounded-xl flex flex-col items-center transition-all active:scale-95 group">
                    <span className="text-sm font-bold mb-1 group-hover:text-yellow-200 transition-colors">1회</span>
                    <div className="flex items-center gap-1 text-yellow-400 text-[10px] bg-slate-950/50 px-2 py-0.5 rounded-full border border-yellow-500/30">
                      <Star size={10} fill="currentColor"/> 100
                    </div>
                  </button>
                  <button onClick={() => handleGachaClick(10)}
                    className="flex-1 bg-gradient-to-br from-indigo-600/80 to-purple-600/80 hover:from-indigo-500/80 hover:to-purple-500/80 border border-indigo-400/50 text-white py-3 rounded-xl flex flex-col items-center transition-all active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.3)] group">
                    <span className="text-sm font-bold mb-1 flex items-center gap-1"><Sparkles size={12} className="text-yellow-200"/> 10회</span>
                    <div className="flex items-center gap-1 text-yellow-200 text-[10px] bg-indigo-950/50 px-2 py-0.5 rounded-full border border-yellow-500/30">
                      <Star size={10} fill="currentColor"/> 1000
                    </div>
                  </button>
               </div>
         </div>
      </div>

      {/* 가챠 결과 모달 */}
      {gachaResults && (
        <GachaResultModal 
          results={gachaResults}
          onClose={() => setGachaResults(null)}
        />
      )}
    </>
  );
};