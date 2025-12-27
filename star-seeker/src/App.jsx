import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useGameLogic } from './hooks/useGameLogic';

// ★ 경로 수정됨: 각각의 파일에서 가져오기
import { Sidebar } from './components/layout/Sidebar';
import { StatusBar } from './components/layout/StatusBar';
import { Background } from './components/layout/Background';
import { ProfileModal } from './components/ProfileModal';

import { HomeScreen, PartyScreen, GachaScreen, GardenScreen, BattleScreen, CodexScreen, InventoryScreen } from './components/Screens';

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
    battleSystem,
    playerInfo,
    playerStats,
    unlockedAchievements,
    handleSelectTitle,
    addExp,
    items,
  } = useGameLogic();

  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-slate-900 text-slate-200 overflow-hidden font-sans select-none relative">
      <Background />
      <Sidebar screen={screen} setScreen={setScreen} />
      
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        <StatusBar gems={gems} playerInfo={playerInfo} onProfileClick={() => setShowProfile(true)} />
        <div className="flex-1 overflow-y-auto relative no-scrollbar">
            {screen === 'HOME' && (
              <HomeScreen 
                showToast={showToast} mainChar={mainChar} setMainChar={setMainChar} 
                inventory={inventory} setScreen={setScreen} playerInfo={playerInfo}
              />
            )}
            {screen === 'PARTY' && (
              <PartyScreen 
                party={party} setParty={setParty} inventory={inventory} 
                showToast={showToast} activeSynergies={activeSynergies} setScreen={setScreen}
              />
            )}
            {screen === 'GACHA' && (
              <GachaScreen handleGacha={handleGacha} />
            )}
            {screen === 'GARDEN' && (
              <GardenScreen inventory={inventory} showToast={showToast} />
            )}
            {screen === 'BATTLE' && (
              <BattleScreen activeSynergies={activeSynergies} battleSystem={battleSystem} addExp={addExp} setScreen={setScreen} />
            )}
            {screen === 'CODEX' && (
              <CodexScreen inventory={inventory} />
            )}
            {screen === 'INVENTORY' && (
              <InventoryScreen items={items} />
            )}
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white px-6 py-2 rounded-full shadow-lg border border-yellow-500/30 z-[70] animate-bounce-slight flex items-center gap-2 backdrop-blur-md text-xs">
          <Sparkles size={14} className="text-yellow-400"/> {toast}
        </div>
      )}

      {/* 프로필 모달 */}
      {showProfile && (
        <ProfileModal
          playerInfo={playerInfo}
          playerStats={playerStats}
          mainChar={mainChar}
          inventory={inventory}
          unlockedAchievements={unlockedAchievements}
          onClose={() => setShowProfile(false)}
          onSelectTitle={handleSelectTitle}
        />
      )}
    </div>
  );
}