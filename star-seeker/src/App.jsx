// src/App.jsx
import React from 'react';
import { Sparkles, Sword } from 'lucide-react';

// 커스텀 훅 가져오기
import { useGameLogic } from './hooks/useGameLogic';

// UI 컴포넌트들
import { Sidebar, StatusBar, Background } from './components/Layout';
import { HomeScreen, PartyScreen, GachaScreen, GardenScreen, BattleScreen, CodexScreen } from './components/Screens';

export default function StarSeekerApp() {
  const {
    screen, setScreen,
    gems,
    inventory,
    party, setParty,
    mainChar, setMainChar,
    toast, showToast,
    activeSynergies,
    handleGacha,
    battleSystem 
  } = useGameLogic();

  return (
    <div className="flex h-screen w-screen bg-slate-900 text-slate-200 overflow-hidden font-sans select-none relative">
      <Background />
      <Sidebar screen={screen} setScreen={setScreen} />
      
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        <StatusBar gems={gems} />
        <div className="flex-1 overflow-y-auto relative no-scrollbar">
            {screen === 'HOME' && (
              <HomeScreen showToast={showToast} mainChar={mainChar} setMainChar={setMainChar} inventory={inventory} />
            )}
            {screen === 'PARTY' && (
              <PartyScreen party={party} setParty={setParty} inventory={inventory} showToast={showToast} activeSynergies={activeSynergies} />
            )}
            {screen === 'GACHA' && (
              <GachaScreen handleGacha={handleGacha} />
            )}
            {screen === 'GARDEN' && (
              <GardenScreen inventory={inventory} showToast={showToast} />
            )}
            {screen === 'BATTLE' && (
              <BattleScreen 
                activeSynergies={activeSynergies} 
                battleSystem={battleSystem} 
              />
            )}
            {screen === 'CODEX' && (
              <CodexScreen inventory={inventory} />
            )}
        </div>
      </main>

      {/* 우측 하단 전투 진입 플로팅 버튼 (전투 화면이 아닐 때만 표시) */}
      {screen !== 'BATTLE' && (
        <button 
          onClick={() => setScreen('BATTLE')}
          className="fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.6)]"
          title="전투 개시"
        >
           <div className="absolute inset-0 rounded-full bg-slate-900 border-[3px] border-slate-600 group-hover:border-red-500/50 transition-colors shadow-inner"></div>
           <div className="absolute inset-1 rounded-full bg-gradient-to-br from-slate-800 via-slate-950 to-slate-900 overflow-hidden border border-white/5">
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-45 pointer-events-none blur-sm"></div>
           </div>
           <div className="absolute inset-0 z-10 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-300">
               <div className="absolute w-full h-[1px] bg-red-500/20 group-hover:bg-red-500/50 transition-colors"></div>
               <div className="absolute h-full w-[1px] bg-red-500/20 group-hover:bg-red-500/50 transition-colors"></div>
               <div className="absolute w-[70%] h-[70%] border border-dashed border-red-500/30 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-red-500/60"></div>
               <div className="absolute w-[85%] h-[85%] border border-red-500/10 rounded-full"></div>
           </div>
           <Sword size={32} className="relative z-20 text-red-400 opacity-80 group-hover:text-red-200 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
           <span className="absolute -bottom-10 bg-slate-900/90 border border-red-500/30 px-3 py-1 rounded-full text-xs text-red-200 font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg pointer-events-none whitespace-nowrap z-30 backdrop-blur-md">
              TARGET LOCKED
           </span>
        </button>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white px-6 py-2 rounded-full shadow-lg border border-yellow-500/30 z-[70] animate-bounce-slight flex items-center gap-2 backdrop-blur-md text-xs">
          <Sparkles size={14} className="text-yellow-400"/> {toast}
        </div>
      )}
    </div>
  );
}