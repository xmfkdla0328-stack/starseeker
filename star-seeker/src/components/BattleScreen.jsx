import React, { useEffect } from 'react';
import { BossDisplay } from './battle/BossDisplay';
import { BattleLog } from './battle/BattleLog';
import { AllyCard } from './battle/AllyCard';
import { BattleControls } from './battle/BattleControls';

export const BattleScreen = ({ battleSystem, addExp, setScreen }) => {
  const { enemy, allies, logs, battleState, processTurn, isAuto, setIsAuto } = battleSystem;

  // 승리 시 경험치 획득
  useEffect(() => {
    if (battleState === 'VICTORY') {
      const expReward = 100; // 기본 경험치 보상
      addExp(expReward);
      
      // 2초 후 자동으로 HOME 화면으로 이동
      const timer = setTimeout(() => {
        setScreen('HOME');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [battleState, addExp, setScreen]);

  if (!enemy || allies.length === 0) return <div className="text-center p-10 text-slate-400">전투 준비 중...</div>;

  return (
    <div className="h-full flex flex-col p-3 gap-3 relative animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
      
      {/* 1. 보스 디스플레이 */}
      <BossDisplay enemy={enemy} battleState={battleState} />

      {/* 2. 전투 로그 */}
      <BattleLog logs={logs} />

      {/* 3. 아군 영역 & 컨트롤 패널 */}
      <div className="flex-[3] bg-blue-950/40 backdrop-blur-md rounded-xl border border-blue-500/20 p-2 flex flex-col justify-end shadow-inner shadow-blue-900/20 relative overflow-hidden min-h-0">
         
         {/* 전열 */}
         <div className="flex justify-center gap-2 mb-4 relative z-10 h-1/2 items-end">
            {allies.filter(c => c.position === 'FRONT').map((char, i) => (
               <AllyCard key={`front-${i}`} char={char} />
            ))}
         </div>

         {/* 후열 */}
         <div className="flex justify-center gap-2 relative z-10 h-1/2 items-start scale-90 opacity-90">
            {allies.filter(c => c.position === 'BACK').map((char, i) => (
               <AllyCard key={`back-${i}`} char={char} isBack={true} />
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