import React from 'react';
import { Timeline } from './battle/Timeline'; // 아까 만든 Timeline 컴포넌트
import { AllyCard } from './battle/AllyCard';
import { BattleControls } from './battle/BattleControls';

export const BattleScreen = ({ battleSystem, addExp, setScreen }) => {
  // battleSystem이 아직 준비되지 않았으면 로딩 표시
  if (!battleSystem || !battleSystem.enemy || !battleSystem.allies) {
    return <div className="text-white text-center mt-20">전투 데이터 로딩 중...</div>;
  }

  const { enemy, allies, battleState, processTurn, isAuto, setIsAuto } = battleSystem;

  return (
    <div className="h-full w-full flex flex-col relative bg-slate-950 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black z-0"></div>
      
      {/* 1. 상단: 적(Enemy) 구역 */}
      <div className="flex-[3] flex flex-col items-center justify-center relative z-10 p-4">
        {/* 보스 이미지 및 HP */}
        <div className="relative animate-float">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.4)] overflow-hidden bg-black">
              <img 
                src={enemy.image || '/assets/boss_placeholder.png'} 
                alt={enemy.name}
                className="w-full h-full object-cover"
                onError={(e) => e.target.style.backgroundColor = '#333'} 
              />
            </div>
            {/* HP 게이지 */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-4 bg-slate-800 rounded-full border border-slate-600 overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-300 ease-out"
                  style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
                ></div>
            </div>
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-red-200 font-bold text-lg whitespace-nowrap">
                {enemy.name} <span className="text-sm font-normal text-red-400">({Math.floor(enemy.hp)}/{enemy.maxHp})</span>
            </div>
        </div>
      </div>

      {/* 2. 중앙: 타임라인 (관측 렌즈) */}
      <div className="flex-[2] w-full px-4 py-2 z-10 flex items-center bg-black/20 backdrop-blur-sm border-y border-white/10">
         {/* Timeline 컴포넌트에 데이터 전달 */}
         <Timeline allies={allies} enemy={enemy} maxDistance={10000} />
      </div>

      {/* 3. 하단: 아군 배치 및 컨트롤 */}
      <div className="flex-[4] flex flex-col bg-slate-900/80 backdrop-blur-md border-t border-blue-500/30 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20 p-4">
         
         {/* 아군 카드 영역 */}
         <div className="flex-1 flex justify-center items-end gap-2 mb-4 overflow-x-auto pb-2">
            {/* 후열 먼저 렌더링 (뒤에 있는 느낌) */}
            {allies.filter(c => c.position === 'BACK').map((char, i) => (
               <div key={`back-${i}`} className="scale-90 opacity-90 mb-4">
                  <AllyCard char={char} isBack={true} />
               </div>
            ))}
            {/* 전열 렌더링 */}
            {allies.filter(c => c.position === 'FRONT').map((char, i) => (
               <div key={`front-${i}`} className="z-10">
                  <AllyCard char={char} />
               </div>
            ))}
         </div>

         {/* 컨트롤 패널 */}
         <div className="h-16">
            <BattleControls 
                isAuto={isAuto} 
                setIsAuto={setIsAuto} 
                battleState={battleState} 
                processTurn={processTurn} 
            />
         </div>
      </div>
    </div>
  );
};

export default BattleScreen;