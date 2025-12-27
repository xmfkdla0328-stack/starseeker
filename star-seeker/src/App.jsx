import React from 'react';
import { Sparkles } from 'lucide-react';

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
              // 홈 화면에 setScreen 전달 (전투 진입 버튼용)
              <HomeScreen 
                showToast={showToast} 
                mainChar={mainChar} 
                setMainChar={setMainChar} 
                inventory={inventory} 
                setScreen={setScreen} 
              />
            )}
            {screen === 'PARTY' && (
              // 파티 화면에 setScreen 전달 (전투 진입 버튼용)
              <PartyScreen 
                party={party} 
                setParty={setParty} 
                inventory={inventory} 
                showToast={showToast} 
                activeSynergies={activeSynergies}
                setScreen={setScreen}
              />
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

      {/* 기존의 플로팅 버튼 코드 삭제됨 */}

      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white px-6 py-2 rounded-full shadow-lg border border-yellow-500/30 z-[70] animate-bounce-slight flex items-center gap-2 backdrop-blur-md text-xs">
          <Sparkles size={14} className="text-yellow-400"/> {toast}
        </div>
      )}
    </div>
  );
}