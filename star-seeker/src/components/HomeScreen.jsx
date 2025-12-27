import React from 'react';
import { Sword } from 'lucide-react';
import { ELEMENTS } from '../constants';

export const HomeScreen = ({ showToast, mainChar, setMainChar, inventory, setScreen }) => {
  const cycleMainChar = () => {
    if (inventory.length <= 1) return;
    const currentIndex = inventory.findIndex(c => c.id === mainChar.id);
    const nextIndex = (currentIndex + 1) % inventory.length;
    setMainChar(inventory[nextIndex]);
    showToast(`${inventory[nextIndex].name}(으)로 변경되었습니다.`);
  };

  if (!mainChar) return null;

  return (
    <div className="h-full relative flex flex-col items-center justify-between p-4 md:p-6 py-8 md:py-6 animate-fade-in overflow-hidden">
      
      {/* 게임 타이틀 */}
      <div className="w-full text-center z-20 pointer-events-none shrink-0">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-600 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
          Star Seeker
        </h1>
        <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase mt-1 md:mt-2 opacity-70">
          Beyond the Horizon
        </p>
      </div>

      {/* 메인 캐릭터 일러스트 */}
      <div onClick={cycleMainChar} className="relative z-10 cursor-pointer group flex-shrink-0">
         
         {/* ★ 수정됨: 훨씬 은은하고 부드러운 회전 광원 효과 */}
         <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${ELEMENTS[mainChar.element].bg} via-transparent to-${ELEMENTS[mainChar.element].bg} blur-2xl animate-spin-slow opacity-40 scale-105 group-hover:scale-110 transition-all duration-500`}></div>

         {/* 캐릭터 원형 컨테이너 - 태블릿에서 더 작게 */}
         <div className={`w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-4 ${ELEMENTS[mainChar.element].border} ${ELEMENTS[mainChar.element].bg} flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-105 relative overflow-hidden backdrop-blur-sm`}>
             <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white opacity-80 drop-shadow-lg select-none">
               {mainChar.name[0]}
             </span>
             {/* 입자 효과 */}
             <div className="absolute inset-0 animate-spin-slow opacity-30">
               <div className="absolute top-10 left-1/2 w-2 h-2 bg-white rounded-full blur-[1px]"></div>
               <div className="absolute bottom-10 right-1/3 w-1.5 h-1.5 bg-white rounded-full blur-[1px]"></div>
             </div>
         </div>

         {/* 하단 텍스트 - 간격 조절 */}
         <div className="mt-3 md:mt-4 lg:mt-6 text-center relative z-20">
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white drop-shadow-md flex items-center justify-center gap-2 flex-wrap">
               {mainChar.name}
               <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full border ${ELEMENTS[mainChar.element].border} ${ELEMENTS[mainChar.element].color} bg-slate-950/50`}>
                  {ELEMENTS[mainChar.element].name}
               </span>
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1 md:mt-2 max-w-xs md:max-w-md mx-auto italic line-clamp-2">"{mainChar.desc}"</p>
         </div>
      </div>

      {/* 전투 진입 버튼 - 하단 고정에서 상대 위치로 변경 */}
      <div className="w-full flex justify-center z-20 shrink-0">
         <button 
           onClick={() => setScreen('BATTLE')}
           className="group relative px-6 py-3 md:px-10 md:py-4 bg-slate-900 border border-red-500/50 text-red-100 font-bold tracking-widest uppercase rounded-sm overflow-hidden hover:border-red-400 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
         >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-transparent to-red-900/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <div className="relative flex items-center gap-2 md:gap-3 text-base md:text-lg">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
               <span className="text-sm md:text-base">Mission Start</span>
               <Sword size={18} className="text-red-400 group-hover:rotate-45 transition-transform duration-300 md:w-5 md:h-5"/>
            </div>
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500"></div>
         </button>
      </div>

    </div>
  );
};