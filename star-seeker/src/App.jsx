import React, { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { useGameLogic } from './hooks/useGameLogic';
import { MISSION_TYPES } from './constants/battle';

/** @typedef {import('./constants/battle').MissionType} MissionType */

// ★ 경로 수정됨: 각각의 파일에서 가져오기
import { Sidebar } from './components/layout/Sidebar';
import { StatusBar } from './components/layout/StatusBar';
import { Background } from './components/layout/Background';
import { ProfileModal } from './components/ProfileModal';

import { HomeScreen, PartyScreen, GachaScreen, GardenScreen, CodexScreen, InventoryScreen, ObservationScreen, BattleScreen } from './components/Screens';

export default function StarSeekerApp() {
  const {
    screen, setScreen,
    inventory, setInventory,
    party, setParty,
    mainChar, setMainChar,
    toast, showToast,
    handleGacha,
    playerInfo, setPlayerInfo,
    playerStats,
    unlockedAchievements,
    handleSelectTitle,
    items, setItems,
  } = useGameLogic();

  const [showProfile, setShowProfile] = useState(false);
  // 미션 타입은 'CHAOS' | 'SILENCE' 리터럴 유니언을 명시
  const [missionType, setMissionType] = useState(
    /** @type {MissionType} */ (MISSION_TYPES.CHAOS)
  );

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
                inventory={inventory} setScreen={setScreen}
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
            {screen === 'BATTLE' && (
              <BattleScreen 
                partyData={party.members.filter(c => c !== null)} 
                enemyData={{ 
                  hp: 1500, 
                  maxHp: 1500, 
                  attack: 15, 
                  name: '화염룡',
                  element: 'ENTROPY', // 적의 기본 속성 (변하지 않음)
                  currentElement: null, // 현재 부착된 속성 (초기값 null, 공격받으면 변경됨)
                  speed: 110, // 적의 속도 스탯
                }} 
                setScreen={setScreen}
                handleAttackResult={handleAttackResult}
                missionType={missionType}
              />
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