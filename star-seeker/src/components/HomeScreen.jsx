import React, { useMemo } from 'react';
import { Sword, Sparkles } from 'lucide-react';
import { ELEMENTS } from '../constants';
import { getTitleById } from '../data/playerStats';

export const HomeScreen = ({ showToast, mainChar, setMainChar, inventory, setScreen, playerInfo }) => {
  const cycleMainChar = () => {
    if (inventory.length <= 1) return;
    const currentIndex = inventory.findIndex(c => c.id === mainChar.id);
    const nextIndex = (currentIndex + 1) % inventory.length;
    setMainChar(inventory[nextIndex]);
    showToast(`${inventory[nextIndex].name}(으)로 변경되었습니다.`);
  };

  // 선택된 타이틀 데이터 (메모이제이션)
  const selectedTitle = useMemo(() => getTitleById(playerInfo?.selectedTitle), [playerInfo?.selectedTitle]);

  if (!mainChar) return null;

  return (
    <div className="h-full relative flex flex-col items-center justify-between p-4 md:p-6 py-8 md:py-6 animate-fade-in overflow-hidden">
      
      {/* 우주 먼지 떠다니는 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-px bg-cyan-300/40 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-px h-px bg-purple-300/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-px h-px bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* 게임 타이틀 */}
      <div className="w-full text-center z-20 pointer-events-none shrink-0 relative">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] relative">
          Star Seeker
          {/* 별 장식 */}
          <Sparkles className="inline-block ml-2 text-cyan-300 w-6 h-6 md:w-8 md:h-8 animate-pulse-slow" />
        </h1>
        <div className="flex items-center justify-center gap-2 mt-1 md:mt-2">
          <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          <p className="text-cyan-400/70 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase opacity-80">
            Beyond the Horizon
          </p>
          <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        </div>
        {/* 스캔 라인 효과 */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-scan"></div>
      </div>

      {/* 메인 캐릭터 일러스트 */}
      <div onClick={cycleMainChar} className="relative z-10 cursor-pointer group flex-shrink-0">
         
         {/* 성운 배경 효과 */}
         <div className={`absolute inset-0 rounded-full bg-gradient-radial from-${ELEMENTS[mainChar.element].color.replace('text-', '')}-500/20 via-transparent to-transparent blur-3xl scale-150 animate-pulse-slow`}></div>
         
         {/* 회전하는 궤도 링 */}
         <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin-slow scale-110"></div>
         <div className="absolute inset-0 rounded-full border border-purple-400/10 animate-spin-slow scale-125" style={{ animationDirection: 'reverse', animationDuration: '40s' }}></div>

         {/* 캐릭터 원형 컨테이너 - 태블릿에서 더 작게 */}
         <div className={`w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-2 ${ELEMENTS[mainChar.element].border} ${ELEMENTS[mainChar.element].bg} flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] relative overflow-hidden backdrop-blur-sm`}>
             {/* 홀로그램 스캔 라인 */}
             <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-scan"></div>
             
             {/* 캐릭터 이니셜 */}
             <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] select-none relative z-10">
               {mainChar.name[0]}
             </span>
             
             {/* 별 입자 효과 */}
             <div className="absolute inset-0 animate-spin-slow opacity-40">
               <div className="absolute top-10 left-1/2 w-1 h-1 bg-cyan-300 rounded-full blur-[1px] shadow-[0_0_4px_rgba(34,211,238,0.8)]"></div>
               <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-purple-300 rounded-full blur-[1px] shadow-[0_0_4px_rgba(168,85,247,0.8)]"></div>
               <div className="absolute top-1/2 right-10 w-0.5 h-0.5 bg-blue-200 rounded-full blur-[1px]"></div>
             </div>
             
             {/* 테두리 글로우 효과 */}
             <div className="absolute inset-0 rounded-full border-2 border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-500"></div>
         </div>

         {/* 하단 텍스트 - 간격 조절 */}
         <div className="mt-3 md:mt-4 lg:mt-6 text-center relative z-20">
            {/* 캐릭터 이름 */}
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-200 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] flex items-center justify-center gap-2 flex-wrap">
               {mainChar.name}
               <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded border ${ELEMENTS[mainChar.element].border} ${ELEMENTS[mainChar.element].color} bg-black/40 backdrop-blur-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]`}>
                  {ELEMENTS[mainChar.element].name}
               </span>
            </h1>
            <p className="text-cyan-300/60 text-xs md:text-sm mt-1 md:mt-2 max-w-xs md:max-w-md mx-auto italic line-clamp-2">"{mainChar.desc}"</p>
            
            {/* 구분선 */}
            <div className="flex items-center justify-center gap-2 mt-4 md:mt-5">
              <div className="w-6 h-px bg-gradient-to-r from-transparent to-cyan-400/30"></div>
              <div className="w-1 h-1 bg-cyan-400/50 rounded-full"></div>
              <div className="w-6 h-px bg-gradient-to-l from-transparent to-cyan-400/30"></div>
            </div>
            
            {/* 유저 정보: 타이틀과 닉네임 */}
            <div className="mt-4 md:mt-5">
              {/* 타이틀 (작은 글씨, 윗줄) */}
              {selectedTitle && (
                <p className="text-xs md:text-sm text-cyan-300/70 tracking-widest uppercase font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] mb-1">
                  {selectedTitle.name}
                </p>
              )}
              {/* 유저 닉네임 (큰 글씨, 밑줄) */}
              <p className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-200 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                {playerInfo?.nickname || 'Observer'}
              </p>
            </div>
         </div>
      </div>

      {/* 전투 진입 버튼 - 하단 고정에서 상대 위치로 변경 */}
      <div className="w-full flex justify-center z-20 shrink-0">
         <button 
           onClick={() => setScreen('BATTLE')}
           className="group relative px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-red-950/40 to-orange-950/40 border border-red-400/40 text-red-100 font-bold tracking-widest uppercase rounded overflow-hidden hover:border-red-300 transition-all shadow-[0_0_25px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] backdrop-blur-sm"
         >
            {/* 배경 애니메이션 */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
            
            {/* 버튼 내용 */}
            <div className="relative flex items-center gap-2 md:gap-3 text-base md:text-lg">
               <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span>
               <span className="text-sm md:text-base drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]">Mission Start</span>
               <Sword size={18} className="text-red-300 group-hover:rotate-45 transition-transform duration-300 md:w-5 md:h-5 drop-shadow-[0_0_6px_rgba(248,113,113,0.6)]"/>
            </div>
            
            {/* 코너 장식 */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-400/60"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-400/60"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-400/30"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-400/30"></div>
            
            {/* 스캔 라인 */}
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-400/40 to-transparent animate-scan"></div>
         </button>
      </div>

    </div>
  );
};