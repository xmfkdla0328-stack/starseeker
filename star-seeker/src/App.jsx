import React, { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { MISSION_TYPES } from './constants/battle';
import { GameContextProvider } from './context/GameContext';
import { useUI, useInventory, usePlayer } from './context/useGameContext';

/** @typedef {import('./constants/battle').MissionType} MissionType */

// ★ 경로 수정됨: 각각의 파일에서 가져오기
import { StatusBar } from './components/layout/StatusBar';
import { Background } from './components/layout/Background';

import { HomeScreen, PartyScreen, GachaScreen, GardenScreen, CodexScreen, InventoryScreen, ObservationScreen, BattleScreen, ProfileScreen } from './components/Screens';
import { ExtractionScreen } from './components/ExtractionScreen';
import { buildEnemyFromDungeon } from './data/dungeonData';

function StarSeekerAppContent() {
  const { screen, setScreen, toast, showToast } = useUI();
  const { inventory, setInventory, party, setParty, items, setItems, handleGacha, handleLevelUp, EXP_PER_CHIP } = useInventory();
  const { playerInfo, playerStats, unlockedAchievements, handleSelectTitle, setPlayerInfo } = usePlayer();

  // 미션 타입은 'CHAOS' | 'SILENCE' 리터럴 유니언을 명시
  const [missionType, setMissionType] = useState(
    /** @type {MissionType} */ (MISSION_TYPES.CHAOS)
  );
  const [extractionStage, setExtractionStage] = useState(null);

  const handleAttackResult = useCallback((result) => {
    // BattleScreen에서 이미 전투 상태를 관리하므로 여기서는 로그만 출력
    console.log('[App] 공격 결과:', {
      damage: result?.damage,
      gaugeAdded: result?.gaugeAdded,
      reactionType: result?.reactionType,
      isWin: result?.isWin,
    });
  }, []);

  const startBattle = () => {
    showToast(`전투 시작 - 미션: ${missionType === MISSION_TYPES.CHAOS ? '카오스' : '사일런스'}`);
  };

  const handleStartExtraction = (stage) => {
    setExtractionStage(stage);
    showToast(`${stage.name} 시작...`);
    setTimeout(() => {
      setScreen('EXTRACTION_BATTLE');
    }, 800);
  };

  return (
    <div className="app-shell flex h-screen w-screen text-slate-200 overflow-hidden font-sans select-none relative">
      <Background />
      
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
          {screen !== 'PROFILE' && (
            <StatusBar
              gems={items.gems}
              screen={screen}
            />
          )}
        <div className="flex-1 overflow-y-auto relative no-scrollbar screen-scroll">
            {screen === 'HOME' && (
              <HomeScreen 
                setScreen={setScreen}
                onProfileClick={() => setScreen('PROFILE')}
              />
            )}
            {screen === 'PARTY' && (
              <PartyScreen 
                party={party} setParty={setParty} inventory={inventory} 
                showToast={showToast} setScreen={setScreen}
                missionType={missionType}
                setMissionType={setMissionType}
              />
            )}
            {screen === 'GACHA' && (
              <GachaScreen handleGacha={handleGacha} setScreen={setScreen} />
            )}
            {screen === 'GARDEN' && (
              <GardenScreen inventory={inventory} showToast={showToast} setScreen={setScreen} />
            )}
            {screen === 'OBSERVATION' && (
              <ObservationScreen setScreen={setScreen} startBattle={startBattle} party={party} />
            )}
            {screen === 'EXTRACTION' && (
              <ExtractionScreen
                setScreen={setScreen}
                onStartExtraction={handleStartExtraction}
                party={party}
              />
            )}
            {screen === 'EXTRACTION_BATTLE' && extractionStage && (
              <BattleScreen
                partyData={party.members.filter(c => c !== null)}
                enemyData={buildEnemyFromDungeon(extractionStage)}
                missionType={missionType}
                extractionRewards={extractionStage.rewards}
                onVictory={(rewards) => {
                  rewards.forEach((r) => {
                    if (r.id === 'gold') {
                      setItems((prev) => ({ ...prev, gold: (prev?.gold || 0) + r.count }));
                    } else {
                      setItems((prev) => ({
                        ...prev,
                        [r.id]: (prev?.[r.id] || 0) + r.count,
                      }));
                    }
                  });
                  showToast('자원 추출 성공!');
                  setTimeout(() => {
                    setExtractionStage(null);
                    setScreen('EXTRACTION');
                  }, 2000);
                }}
                handleAttackResult={handleAttackResult}
              />
            )}
            {screen === 'BATTLE' && (
              <BattleScreen 
                partyData={party.members.filter(c => c !== null)} 
                enemyData={{ 
                  hp: 1500, 
                  maxHp: 1500, 
                  attack: 15, 
                  name: '화염룡',
                  element: 'ENTROPY',
                  currentElement: null,
                  speed: 110,
                }} 
                missionType={missionType}
                handleAttackResult={handleAttackResult}
              />
            )}
            {screen === 'CODEX' && (
              <CodexScreen 
                inventory={inventory} 
                items={items} 
                setItems={setItems} 
                setInventory={setInventory} 
                handleLevelUp={handleLevelUp}
                expPerChip={EXP_PER_CHIP}
                showToast={showToast} 
                setScreen={setScreen}
              />
            )}
            {screen === 'INVENTORY' && (
              <InventoryScreen items={items} setItems={setItems} setPlayerInfo={setPlayerInfo} showToast={showToast} setScreen={setScreen} />
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

export default function StarSeekerApp() {
  return (
    <GameContextProvider>
      <StarSeekerAppContent />
    </GameContextProvider>
  );
}