import React, { useEffect } from 'react';
import { BossDisplay } from './battle/BossDisplay';
import { BattleLog } from './battle/BattleLog';
import { AllyCard } from './battle/AllyCard';
import { BattleControls } from './battle/BattleControls';

export const BattleScreen = ({ battleSystem, addExp, setScreen, increaseBondFromBattle, startBattle }) => {
  const { enemy, allies, logs, battleState, processTurn, isAuto, setIsAuto } = battleSystem;

  // 전투 시작 (처음 진입 시)
  useEffect(() => {
    if (battleState === 'IDLE' && startBattle) {
      startBattle();
    }
  }, [battleState, startBattle]);

  // 승리 시 경험치 획득 및 인연도 증가
  useEffect(() => {
    if (battleState === 'VICTORY') {
      const expReward = 100; // 기본 경험치 보상
      addExp(expReward);
      if (increaseBondFromBattle) {
        increaseBondFromBattle();
      }
      
      // 2초 후 자동으로 HOME 화면으로 이동
      const timer = setTimeout(() => {
        setScreen('HOME');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [battleState, addExp, setScreen, increaseBondFromBattle]);

  if (!enemy || allies.length === 0) return <div className="text-center p-10 text-slate-400">전투 준비 중...</div>;

  return (
    <div className="min-h-full flex flex-col p-2 md:p-3 gap-2 md:gap-3 relative animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
      
      {/* 1. 보스 디스플레이 - 모바일에서 축소 */}
      <div className="flex-shrink-0">
        <BossDisplay enemy={enemy} battleState={battleState} />
      </div>

      {/* 2. 전투 로그 - 모바일에서 스크롤 가능 */}
      <div className="flex-1 min-h-0">
        <BattleLog logs={logs} />
      </div>

      {/* 3. 아군 영역 & 컨트롤 패널 */}
      <div className="flex-shrink-0 glass-panel rounded-xl p-2 flex flex-col justify-end shadow-inner relative">
         
         {/* 전열 */}
         <div className="flex justify-center gap-2 mb-2 md:mb-4 relative z-10 items-end">
            {allies.filter(c => c.position === 'FRONT').map((char, i) => (
               <AllyCard key={`front-${i}`} char={char} isBack={false} onSelect={undefined} selected={false} />
            ))}
         </div>

         {/* 후열 */}
         <div className="flex justify-center gap-2 relative z-10 items-start scale-90 opacity-90">
            {allies.filter(c => c.position === 'BACK').map((char, i) => (
               <AllyCard key={`back-${i}`} char={char} isBack={true} onSelect={undefined} selected={false} />
            ))}
         </div>

         {/* 4. 컨트롤 패널 */}
         <BattleControls 
            isAuto={isAuto} 
            setIsAuto={setIsAuto} 
            battleState={battleState} 
            processTurn={processTurn} 
         />
      </div>
    </div>
  );
};