// src/App.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

// 분리한 파일들 불러오기
import { SYNERGIES, CHAR_DB } from './constants';
import { Sidebar, StatusBar, Background } from './components/Layout';
// Screens.jsx를 통해 개별 화면 컴포넌트들을 가져옵니다.
import { HomeScreen, PartyScreen, GachaScreen, GardenScreen, BattleScreen } from './components/Screens';

export default function StarSeekerApp() {
  const [screen, setScreen] = useState('HOME');
  const [gems, setGems] = useState(3000);
  const [inventory, setInventory] = useState([]);
  const [party, setParty] = useState({ front: [null, null, null, null], back: [null, null, null, null] });
  const [toast, setToast] = useState(null);

  // 메인 화면에 세워둘 캐릭터 (없으면 인벤토리 첫 번째 캐릭터 사용)
  const [mainChar, setMainChar] = useState(null);

  useEffect(() => {
    // 게임 시작 시 인벤토리가 비어있으면 기본 캐릭터 지급
    if (inventory.length === 0) {
      const starter = { ...CHAR_DB[0], ultLevel: 0, bond: 0, uid: Date.now() };
      setInventory([starter]);
    }
  }, []);

  // 인벤토리가 로드되었는데 메인 캐릭터가 안정해져 있다면 첫 번째 캐릭터로 설정
  useEffect(() => {
    if (inventory.length > 0 && !mainChar) {
      setMainChar(inventory[0]);
    }
  }, [inventory, mainChar]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const activeSynergies = useMemo(() => {
    const counts = {};
    const activeChars = [...party.front, ...party.back].filter(c => c !== null);
    activeChars.forEach(char => {
      char.tags.forEach(tag => { counts[tag] = (counts[tag] || 0) + 1; });
    });
    const results = [];
    Object.entries(counts).forEach(([tag, count]) => {
      const synData = SYNERGIES[tag];
      if (!synData) return;
      const effects = synData.levels.filter(l => count >= l.count);
      if (effects.length > 0) {
        results.push({ name: tag, count, effect: effects[effects.length - 1].effect });
      }
    });
    return results;
  }, [party]);

  const handleGacha = useCallback((count) => {
    const cost = count * 100;
    if (gems < cost) { showToast('별의 조각이 부족합니다!'); return; }
    
    setGems(prev => prev - cost);
    const newChars = [];
    let payback = 0;
    
    const currentInventory = [...inventory]; 

    for (let i = 0; i < count; i++) {
      const picked = CHAR_DB[Math.floor(Math.random() * CHAR_DB.length)];
      const existingIdx = currentInventory.findIndex(c => c.id === picked.id);
      
      if (existingIdx >= 0) {
        const target = currentInventory[existingIdx];
        if (target.ultLevel < 5) {
          currentInventory[existingIdx] = { ...target, ultLevel: target.ultLevel + 1 };
          showToast(`${picked.name} 중복! 필살기 강화!`);
        } else { payback += 20; }
      } else {
        const newChar = { ...picked, ultLevel: 0, bond: 0, uid: Date.now() + i };
        newChars.push(newChar);
        currentInventory.push(newChar);
      }
    }
    setInventory(currentInventory);

    if (payback > 0) {
      setGems(prev => prev + payback);
      setTimeout(() => showToast(`${payback} 별의 조각 페이백!`), 500);
    }
  }, [gems, inventory, showToast]);

  return (
    <div className="flex h-screen w-screen bg-slate-900 text-slate-200 overflow-hidden font-sans select-none relative">
      <Background />
      <Sidebar screen={screen} setScreen={setScreen} />
      
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        <StatusBar gems={gems} />
        <div className="flex-1 overflow-y-auto relative no-scrollbar">
            {/* HomeScreen에 메인 캐릭터 정보와 변경 함수 전달 */}
            {screen === 'HOME' && <HomeScreen showToast={showToast} mainChar={mainChar} setMainChar={setMainChar} inventory={inventory} />}
            {screen === 'PARTY' && <PartyScreen party={party} setParty={setParty} inventory={inventory} showToast={showToast} activeSynergies={activeSynergies} />}
            {screen === 'GACHA' && <GachaScreen handleGacha={handleGacha} />}
            {screen === 'GARDEN' && <GardenScreen inventory={inventory} showToast={showToast} />}
            {screen === 'BATTLE' && <BattleScreen party={party} activeSynergies={activeSynergies} />}
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white px-6 py-2 rounded-full shadow-lg border border-yellow-500/30 z-[70] animate-bounce-slight flex items-center gap-2 backdrop-blur-md text-xs">
          <Sparkles size={14} className="text-yellow-400"/> {toast}
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .animate-pulse-slow { animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pan-slow { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
        .animate-pan-slow { animation: pan-slow 60s linear infinite; }
        @keyframes twinkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.5); } }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        @keyframes bounce-slight { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, -10px); } }
        .animate-bounce-slight { animation: bounce-slight 2s ease-in-out infinite; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}