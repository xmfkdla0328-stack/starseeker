import React from 'react';
import { partyData } from './data/partyData';
import { Sparkles } from 'lucide-react';
import { useUI, useInventory } from './context/useGameContext';
import { StatusBar } from './components/layout/StatusBar';
import { Background } from './components/layout/Background';
import { HomeScreen, PartyScreen, GachaScreen, CodexScreen, InventoryScreen, ObservationScreen, ExtractionScreen, BattleScreen, ProfileScreen } from './components/Screens';


function StarSeekerAppContent() {
  // 파티 상태를 App.jsx에서 단일 관리
  const [party, setParty] = React.useState([null, null, null, null]);
  const { screen, setScreen, toast, showToast } = useUI();
  const { inventory, setInventory, items, setItems, handleGacha, handleLevelUp, EXP_PER_CHIP } = useInventory();

  return (
    <div className="flex flex-col min-h-screen">
      <StatusBar />
      <Background />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto relative no-scrollbar screen-scroll">
          {screen === 'HOME' && (
            <HomeScreen setScreen={setScreen} onProfileClick={() => setScreen('PROFILE')} />
          )}
          {screen === 'PARTY' && (
            <PartyScreen party={party} setParty={setParty} inventory={Array.isArray(inventory) ? inventory : partyData} showToast={showToast} setScreen={setScreen} />
          )}
          {screen === 'GACHA' && (
            <GachaScreen handleGacha={handleGacha} setScreen={setScreen} />
          )}
          {screen === 'CODEX' && (
            <CodexScreen
              inventory={inventory}
              setInventory={setInventory}
              items={items}
              setItems={setItems}
              handleLevelUp={handleLevelUp}
              expPerChip={EXP_PER_CHIP}
              showToast={showToast}
              setScreen={setScreen}
            />
          )}
          {screen === 'OBSERVATION' && (
            <ObservationScreen setScreen={setScreen} party={Array.isArray(party) ? party : []} startBattle={() => setScreen('BATTLE')} />
          )}
          {screen === 'EXTRACTION' && (
            <ExtractionScreen setScreen={setScreen} party={Array.isArray(party) ? party : []} />
          )}
          {screen === 'INVENTORY' && (
            <InventoryScreen items={items} setItems={setItems} showToast={showToast} setScreen={setScreen} />
          )}
          {screen === 'BATTLE' && (
            <BattleScreen party={party} />
          )}
          {screen === 'PROFILE' && (
            <ProfileScreen />
          )}
        </div>
      </main>
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white px-6 py-2 rounded-full shadow-lg border border-yellow-500/30 z-[70] animate-bounce-slight flex items-center gap-2 backdrop-blur-md text-xs">
          <Sparkles size={14} className="text-yellow-400"/> {toast}
        </div>
      )}
    </div>
  );
}


import { GameContextProvider } from './context/GameContext';

export default function App() {
  return (
    <GameContextProvider>
      <StarSeekerAppContent />
    </GameContextProvider>
  );
}