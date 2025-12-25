// src/App.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

// 분리한 파일들 불러오기 (확장자 명시)
import { SYNERGIES, CHAR_DB } from './constants.js';
import { Sidebar, StatusBar, Background } from './components/Layout.jsx';
import { HomeScreen, PartyScreen, GachaScreen, GardenScreen, BattleScreen } from './components/Screens.jsx';

export default function StarSeekerApp() {
  const [screen, setScreen] = useState('HOME');
  const [gems, setGems] = useState(3000);
  const [inventory, setInventory] = useState([]);
  const [party, setParty] = useState({ front: [null, null, null, null], back: [null, null, null, null] });
  const [toast, setToast] = useState(null);

  // [수정 1] 초기화 로직 강화: 인벤토리가 비어있을 때만 확실하게 스타터 지급
  useEffect(() => {
    setInventory((prev) => {
      if (prev.length > 0) return prev; // 이미 캐릭터가 있다면 건너뜀
      const starter = { ...CHAR_DB[0], ultLevel: 0, bond: 0, uid: Date.now() };
      return [starter];
    });
  }, []);

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

  // [수정 2] 가차 로직 최적화: 중복 생성 원천 차단
  const handleGacha = useCallback((count) => {
    const cost = count * 100;
    
    // 재화 확인은 상태 업데이트 밖에서 먼저 수행 (사용자 경험상 즉각 반응 필요)
    // 단, setGems 내부에서 다시 한 번 체크하면 더 안전하지만, 여기서는 UI 편의성을 위해 간단히 처리
    if (gems < cost) { 
      showToast('별의 조각이 부족합니다!'); 
      return; 
    }
    
    setGems(prev => prev - cost);
    
    // 핵심 수정: setInventory 안에서 'prev'(최신 목록)를 직접 참조하여 로직 수행
    setInventory(prevInventory => {
      const currentInventory = [...prevInventory]; // 최신 상태 복사
      let payback = 0;
      let newMsg = '';

      for (let i = 0; i < count; i++) {
        const picked = CHAR_DB[Math.floor(Math.random() * CHAR_DB.length)];
        
        // 최신 currentInventory 기준으로 중복 검사
        const existingIdx = currentInventory.findIndex(c => c.id === picked.id);
        
        if (existingIdx >= 0) {
          // 중복: 강화 또는 페이백
          const target = currentInventory[existingIdx];
          if (target.ultLevel < 5) {
            currentInventory[existingIdx] = { ...target, ultLevel: target.ultLevel + 1 };
            newMsg = `${picked.name} 중복! 필살기 강화!`;
          } else {
            payback += 20;
          }
        } else {
          // 신규: 추가
          // uid에 난수(Math.random)를 더해 고유성 보장 강화
          const newChar = { ...picked, ultLevel: 0, bond: 0, uid: Date.now() + i + Math.random() };
          currentInventory.push(newChar);
        }
      }

      // 상태 업데이트 함수 내부에서 부수 효과(토스트, 페이백) 처리
      if (newMsg && count === 1) showToast(newMsg); // 1회 뽑기일 때만 개별 메시지
      if (count > 1) showToast(`${count}회 관측 완료!`);

      if (payback > 0) {
        // 페이백 발생 시 비동기로 처리 (렌더링 사이클 충돌 방지)
        setTimeout(() => {
            setGems(g => g + payback);
            showToast(`${payback} 별의 조각 페이백!`);
        }, 500);
      }

      return currentInventory;
    });

  }, [gems, showToast]); // inventory 의존성 제거 (함수형 업데이트 사용으로 불필요)

  return (
    <div className="flex h-screen w-screen bg-slate-900 text-slate-200 overflow-hidden font-sans select-none relative">
      <Background />
      <Sidebar screen={screen} setScreen={setScreen} />
      
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        <StatusBar gems={gems} />
        <div className="flex-1 overflow-y-auto relative no-scrollbar">
            {screen === 'HOME' && <HomeScreen showToast={showToast} />}
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

      {/* 스타일은 보통 index.css로 빼지만, 편의를 위해 여기에 둡니다 */}
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