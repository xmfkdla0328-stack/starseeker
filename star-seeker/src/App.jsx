import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useGameLogic } from './hooks/useGameLogic';

// ★ 경로 수정됨: 각각의 파일에서 가져오기
import { Sidebar } from './components/layout/Sidebar';
import { StatusBar } from './components/layout/StatusBar';
import { Background } from './components/layout/Background';
import { ProfileModal } from './components/ProfileModal';

import { HomeScreen, PartyScreen, GachaScreen, GardenScreen, BattleScreen, CodexScreen, InventoryScreen, ObservationScreen } from './components/Screens';

export default function StarSeekerApp() {
  const {
    screen, setScreen,
    inventory, setInventory,
    party, setParty,
    mainChar, setMainChar,
    toast, showToast,
    activeSynergies,
    handleGacha,
    battleSystem,
    playerInfo, setPlayerInfo,
    playerStats,
    unlockedAchievements,
    handleSelectTitle,
    addExp,
    items, setItems,
    increaseBondFromBattle,
  } = useGameLogic();

  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="app-shell flex h-screen w-screen text-slate-200 overflow-hidden font-sans select-none relative">
      <Background />
      {screen === 'HOME' && <Sidebar screen={screen} setScreen={setScreen} />}
      
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        {screen === 'HOME' && <StatusBar gems={items.gems} playerInfo={playerInfo} onProfileClick={() => setShowProfile(true)} />}
        <div className="flex-1 overflow-y-auto relative no-scrollbar screen-scroll">
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
              <GachaScreen handleGacha={handleGacha} setScreen={setScreen} />
            )}
            {screen === 'GARDEN' && (
              <GardenScreen inventory={inventory} showToast={showToast} setScreen={setScreen} />
            )}
            {screen === 'OBSERVATION' && (
              <ObservationScreen setScreen={setScreen} startBattle={battleSystem.startBattle} party={party} />
            )}
            {screen === 'BATTLE' && (
              <BattleScreen battleSystem={battleSystem} addExp={addExp} setScreen={setScreen} increaseBondFromBattle={increaseBondFromBattle} startBattle={battleSystem.startBattle} />
            )}
            {screen === 'CODEX' && (
              <CodexScreen 
                inventory={inventory} 
                items={items} 
                setItems={setItems} 
                setInventory={setInventory} 
                showToast={showToast} 
                setScreen={setScreen}
              />
            )}
            {screen === 'INVENTORY' && (
              <InventoryScreen items={items} setItems={setItems} setPlayerInfo={setPlayerInfo} showToast={showToast} setScreen={setScreen} />
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