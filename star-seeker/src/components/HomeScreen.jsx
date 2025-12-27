import React from 'react';
import { Sword } from 'lucide-react';
import { ELEMENTS } from '../constants';

export const HomeScreen = ({ showToast, mainChar, setMainChar, inventory, setScreen }) => {
  // 메인 캐릭터 변경 핸들러
  const cycleMainChar = () => {
    if (inventory.length <= 1) return;
    const currentIndex = inventory.findIndex(c => c.id === mainChar.id);
    const nextIndex = (currentIndex + 1) % inventory.length;
    setMainChar(inventory[nextIndex]);
    showToast(`${inventory[nextIndex].name}(으)로 변경되었습니다.`);
  };

  if (!mainChar) return null;

  return (
    <div className="h-full relative flex flex-col items-center justify-center p-6 animate-fade-in">
      
      {/* ★ 게임 타이틀 (복구됨) */}
      <div className="absolute top-12 left-0 right-0 text-center z-20 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-600 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
          Star Seeker
        </h1>
        <p className="text-slate-400 text-xs md:text-sm tracking-[0.5em] uppercase mt-2 opacity-70">
          Beyond the Horizon
        </p>
      </div>

      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r ${ELEMENTS[mainChar.element].bg.replace('/20','/10')} to-transparent rounded-full blur-3xl opacity-30 animate-pulse-slow`}></div>
      </div>

      {/* 메인 캐릭터 일러스트 */}
      <div onClick={cycleMainChar} className="relative z-10 cursor-pointer group mt-10">
         <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full border-4 ${ELEMENTS[mainChar.element].border} ${ELEMENTS[mainChar.element].bg} flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 relative overflow-hidden`}>
             <span className="text-6xl md:text-8xl font-serif font-bold text-white opacity-80 drop-shadow-lg select-none">
               {mainChar.name[0]}
             </span>
             {/* 입자 효과 */}
             <div className="absolute inset-0 animate-spin-slow opacity-30">
               <div className="absolute top-10 left-1/2 w-2 h-2 bg-white rounded-full blur-[1px]"></div>
               <div className="absolute bottom-10 right-1/3 w-1.5 h-1.5 bg-white rounded-full blur-[1px]"></div>
             </div>
         </div>
         <div className="mt-6 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-md flex items-center justify-center gap-2">
               {mainChar.name}
               <span className={`text-xs px-2 py-0.5 rounded-full border ${ELEMENTS[mainChar.element].border} ${ELEMENTS[mainChar.element].color} bg-slate-950/50`}>
                  {ELEMENTS[mainChar.element].name}
               </span>
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto italic">"{mainChar.desc}"</p>
         </div>
      </div>

      {/* ★ 전투 진입 버튼 (중앙 하단으로 이동) */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
         <button 
           onClick={() => setScreen('BATTLE')}
           className="group relative px-10 py-4 bg-slate-900 border border-red-500/50 text-red-100 font-bold tracking-widest uppercase rounded-sm overflow-hidden hover:border-red-400 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
         >
            {/* 버튼 내부 배경 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-transparent to-red-900/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            
            {/* 텍스트 및 아이콘 */}
            <div className="relative flex items-center gap-3 text-lg">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
               <span>Mission Start</span>
               <Sword size={20} className="text-red-400 group-hover:rotate-45 transition-transform duration-300"/>
            </div>

            {/* 테두리 장식 */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500"></div>
         </button>
      </div>

    </div>
  );
};