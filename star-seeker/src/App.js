import React, { useState, useEffect, useMemo } from 'react';
import { Star, Moon, Sun, Cloud, Flame, Droplets, Mountain, Sparkles, Sword, Shield, Home, Users, Play, Search, Gift, ChevronRight, X } from 'lucide-react';

// --- 데이터 모델 및 상수 ---

// 속성 정의
const ELEMENTS = {
  FIRE: { name: '불', color: 'text-red-500', bg: 'bg-red-500' },
  WATER: { name: '물', color: 'text-blue-500', bg: 'bg-blue-500' },
  EARTH: { name: '대지', color: 'text-green-500', bg: 'bg-green-500' },
  LIGHT: { name: '빛', color: 'text-yellow-400', bg: 'bg-yellow-400' },
  DARK: { name: '어둠', color: 'text-purple-500', bg: 'bg-purple-500' },
};

// 태그(시너지) 정의
const SYNERGIES = {
  '조영': {
    name: '조영',
    desc: '그림자를 비추는 빛',
    levels: [
      { count: 2, effect: '공격력 +10%' },
      { count: 4, effect: '공격력 +20%' },
      { count: 6, effect: '공격력 +30%' },
      { count: 8, effect: '공격력 +50%' },
    ]
  },
  '조호': {
    name: '조호',
    desc: '수호하는 호랑이',
    levels: [
      { count: 2, effect: '전열 "조호" 캐릭터 사망 시 1회 20% 체력 부활' },
    ]
  },
  '신장의 의지': {
    name: '신장의 의지',
    desc: '신성한 장군의 기백',
    levels: [
      { count: 1, effect: '아군 전체 방어력 +5%' },
      { count: 3, effect: '아군 전체 방어력 +15%' },
    ]
  },
  '별의 여행자': {
    name: '별의 여행자',
    desc: '우주를 여행하는 자들',
    levels: [
      { count: 2, effect: '탐험 속도 +20%' },
    ]
  }
};

// 캐릭터 데이터베이스 (예시)
const CHAR_DB = [
  { id: 1, name: '서주목', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '조호', '신장의 의지'], baseAtk: 100, baseHp: 500, desc: '별의 인도를 받는 사령관' },
  { id: 2, name: '루나', rarity: 4, element: 'DARK', role: 'BACK', tags: ['별의 여행자', '조영'], baseAtk: 80, baseHp: 300, desc: '달빛 아래 노래하는 음유시인' },
  { id: 3, name: '이그니스', rarity: 4, element: 'FIRE', role: 'FRONT', tags: ['조호', '신장의 의지'], baseAtk: 120, baseHp: 600, desc: '불꽃을 다루는 검사' },
  { id: 4, name: '아쿠아', rarity: 3, element: 'WATER', role: 'BACK', tags: ['별의 여행자'], baseAtk: 60, baseHp: 350, desc: '치유의 물방울' },
  { id: 5, name: '테라', rarity: 3, element: 'EARTH', role: 'FRONT', tags: ['조호'], baseAtk: 90, baseHp: 700, desc: '대지의 방패' },
  { id: 6, name: '솔라', rarity: 5, element: 'LIGHT', role: 'BOTH', tags: ['조영', '신장의 의지'], baseAtk: 110, baseHp: 550, desc: '태양의 기사' },
  { id: 7, name: '녹스', rarity: 4, element: 'DARK', role: 'FRONT', tags: ['조영', '별의 여행자'], baseAtk: 130, baseHp: 450, desc: '어둠 속의 암살자' },
  { id: 8, name: '실바', rarity: 3, element: 'EARTH', role: 'BACK', tags: ['조호'], baseAtk: 50, baseHp: 400, desc: '숲의 관리자' },
];

// --- 컴포넌트 시작 ---

export default function StarSeekerApp() {
  // --- 상태 관리 ---
  const [screen, setScreen] = useState('HOME'); // 화면 상태: HOME, PARTY, GACHA, GARDEN, BATTLE
  const [gems, setGems] = useState(3000); // 재화
  const [inventory, setInventory] = useState([]); // 보유 캐릭터: { ...charData, ultLevel, bond }
  const [party, setParty] = useState({ front: [null, null, null, null], back: [null, null, null, null] }); // 파티 구성
  const [garden, setGarden] = useState({ chars: [], furniture: [] }); // 정원 상태
  
  // 알림 메시지 상태
  const [toast, setToast] = useState(null);

  // 초기 데이터 로드 (첫 실행 시 기본 캐릭터 지급)
  useEffect(() => {
    if (inventory.length === 0) {
      const starter = { ...CHAR_DB[0], ultLevel: 0, bond: 0, uid: Date.now() };
      setInventory([starter]);
    }
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // --- 로직 함수들 ---

  // 파티 시너지 계산
  const activeSynergies = useMemo(() => {
    const counts = {};
    const activeChars = [...party.front, ...party.back].filter(c => c !== null);
    
    activeChars.forEach(char => {
      char.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    const results = [];
    Object.entries(counts).forEach(([tag, count]) => {
      const synData = SYNERGIES[tag];
      if (!synData) return;
      
      // 현재 count에 해당하는 가장 높은 효과 찾기
      const effects = synData.levels.filter(l => count >= l.count);
      if (effects.length > 0) {
        const currentEffect = effects[effects.length - 1]; // 가장 높은 단계
        results.push({ name: tag, count, effect: currentEffect.effect, max: count === effects[effects.length-1].count });
      }
    });
    return results;
  }, [party]);

  // 가차 로직
  const handleGacha = (count) => {
    const cost = count * 100;
    if (gems < cost) {
      showToast('별의 조각(재화)이 부족합니다!');
      return;
    }

    setGems(prev => prev - cost);
    const newChars = [];
    let payback = 0;

    for (let i = 0; i < count; i++) {
      const randIdx = Math.floor(Math.random() * CHAR_DB.length);
      const picked = CHAR_DB[randIdx];
      
      // 중복 체크
      const existingIdx = inventory.findIndex(c => c.id === picked.id);
      
      if (existingIdx >= 0) {
        const target = inventory[existingIdx];
        if (target.ultLevel < 5) {
          // 필살기 강화
          const newInv = [...inventory];
          newInv[existingIdx] = { ...target, ultLevel: target.ultLevel + 1 };
          setInventory(newInv);
          showToast(`${picked.name} 중복! 필살기 레벨 UP!`);
        } else {
          // 페이백
          payback += 20;
        }
      } else {
        // 신규 획득
        const newChar = { ...picked, ultLevel: 0, bond: 0, uid: Date.now() + i };
        newChars.push(newChar);
      }
    }

    if (newChars.length > 0) {
      setInventory(prev => [...prev, ...newChars]);
    }
    if (payback > 0) {
      setGems(prev => prev + payback);
      setTimeout(() => showToast(`${payback} 별의 조각 페이백!`), 500);
    }
  };

  // --- 화면 렌더링 컴포넌트 ---

  const Navigation = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-700 p-2 flex justify-around items-center z-50 h-16 text-xs sm:text-sm">
      <button onClick={() => setScreen('HOME')} className={`flex flex-col items-center ${screen === 'HOME' ? 'text-yellow-400' : 'text-slate-400'}`}>
        <Home size={20} /> <span className="mt-1">홈</span>
      </button>
      <button onClick={() => setScreen('PARTY')} className={`flex flex-col items-center ${screen === 'PARTY' ? 'text-yellow-400' : 'text-slate-400'}`}>
        <Users size={20} /> <span className="mt-1">파티</span>
      </button>
      <button onClick={() => setScreen('BATTLE')} className={`flex flex-col items-center ${screen === 'BATTLE' ? 'text-yellow-400' : 'text-slate-400'}`}>
        <Sword size={20} /> <span className="mt-1">전투</span>
      </button>
      <button onClick={() => setScreen('GARDEN')} className={`flex flex-col items-center ${screen === 'GARDEN' ? 'text-yellow-400' : 'text-slate-400'}`}>
        <Cloud size={20} /> <span className="mt-1">모형정원</span>
      </button>
      <button onClick={() => setScreen('GACHA')} className={`flex flex-col items-center ${screen === 'GACHA' ? 'text-yellow-400' : 'text-slate-400'}`}>
        <Search size={20} /> <span className="mt-1">관측(뽑기)</span>
      </button>
    </nav>
  );

  const TopBar = () => (
    <div className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md p-3 flex justify-between items-center z-50 border-b border-slate-700">
      <div className="font-bold text-lg text-yellow-100 flex items-center gap-2">
        <Sparkles className="text-yellow-400" /> Star Seeker
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-slate-800 px-3 py-1 rounded-full flex items-center gap-2 border border-slate-600">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-xs text-slate-300">Lv. 12 (계정)</span>
        </div>
        <div className="bg-slate-800 px-3 py-1 rounded-full flex items-center gap-2 border border-slate-600 text-yellow-300">
          <Star size={14} fill="currentColor" />
          <span>{gems}</span>
        </div>
      </div>
    </div>
  );

  // 홈 화면
  const HomeScreen = () => (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-center p-8">
      <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 absolute blur-3xl animate-pulse"></div>
      <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
        STAR SEEKER
      </h1>
      <p className="text-slate-400 text-sm md:text-lg mb-12 font-light">
        "별의 소리를 듣는 자, 우주의 끝에서 답을 찾으리라"
      </p>
      
      {/* 메인 캐릭터 전시 (인연도 표시) */}
      <div className="relative group cursor-pointer" onClick={() => showToast(`서주목: "오늘 별이 참 밝군요, 대장."`)}>
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-yellow-500/30 bg-slate-800 flex items-center justify-center overflow-hidden relative shadow-2xl transition-transform transform group-hover:scale-105">
          {/* 캐릭터 이미지 대용 아이콘 */}
          <Users size={64} className="text-slate-600" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span className="absolute bottom-4 text-white font-bold">서주목</span>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full border border-white flex items-center gap-1">
          ♥ 인연 Lv.3
        </div>
      </div>
    </div>
  );

  // 파티 화면
  const PartyScreen = () => {
    const [selectedSlot, setSelectedSlot] = useState(null); // { line: 'front'|'back', index: 0 }
    
    const handleAssign = (char) => {
      if (!selectedSlot) return;
      
      // 역할 검사
      const { line } = selectedSlot;
      if (char.role !== 'BOTH' && char.role.toLowerCase() !== line) {
        showToast('이 위치에는 배치할 수 없는 캐릭터입니다.');
        return;
      }

      // 이미 파티에 있는지 확인
      const isAlreadyIn = [...party.front, ...party.back].find(c => c && c.id === char.id);
      if (isAlreadyIn) {
        showToast('이미 파티에 배치된 캐릭터입니다.');
        return;
      }

      const newParty = { ...party };
      newParty[line][selectedSlot.index] = char;
      setParty(newParty);
      setSelectedSlot(null);
    };

    const removeChar = (line, index) => {
      const newParty = { ...party };
      newParty[line][index] = null;
      setParty(newParty);
    };

    return (
      <div className="flex h-full pt-16 pb-20 gap-4 p-4 overflow-hidden">
        {/* 파티 배치 구역 */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* 후열 */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-xs mb-2 uppercase tracking-wider flex items-center gap-2">
              <Shield size={12} /> 후열 (Support / Back)
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {party.back.map((char, idx) => (
                <div key={`back-${idx}`} 
                  onClick={() => char ? removeChar('back', idx) : setSelectedSlot({line: 'back', index: idx})}
                  className={`aspect-[3/4] rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all relative
                    ${char ? 'border-yellow-500/50 bg-slate-700' : 'border-dashed border-slate-600 hover:bg-slate-700/50'}
                  `}>
                  {char ? (
                    <>
                      <div className={`text-xs ${ELEMENTS[char.element].color} font-bold`}>{char.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{char.role}</div>
                    </>
                  ) : (
                    <span className="text-slate-600">+</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 전열 */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-xs mb-2 uppercase tracking-wider flex items-center gap-2">
              <Sword size={12} /> 전열 (Attack / Front)
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {party.front.map((char, idx) => (
                <div key={`front-${idx}`}
                  onClick={() => char ? removeChar('front', idx) : setSelectedSlot({line: 'front', index: idx})}
                  className={`aspect-[3/4] rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all relative
                    ${char ? 'border-red-500/50 bg-slate-700' : 'border-dashed border-slate-600 hover:bg-slate-700/50'}
                  `}>
                  {char ? (
                    <>
                      <div className={`text-xs ${ELEMENTS[char.element].color} font-bold`}>{char.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{char.role}</div>
                    </>
                  ) : (
                    <span className="text-slate-600">+</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 정보 패널 */}
        <div className="w-1/3 bg-slate-900/80 border-l border-slate-700 p-4 overflow-y-auto">
          <h2 className="text-yellow-100 font-bold mb-4">활성화된 시너지</h2>
          {activeSynergies.length === 0 ? (
            <p className="text-slate-500 text-sm">활성화된 태그 효과가 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {activeSynergies.map((syn, idx) => (
                <div key={idx} className="bg-slate-800 p-3 rounded border border-slate-600">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-yellow-400 font-bold text-sm">
                      &lt;{syn.name}&gt; ({syn.count}인)
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">{syn.effect}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 캐릭터 선택 모달 */}
        {selectedSlot && (
          <div className="absolute inset-0 z-50 bg-black/80 flex flex-col p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-bold">캐릭터 선택 ({selectedSlot.line === 'front' ? '전열' : '후열'})</h3>
              <button onClick={() => setSelectedSlot(null)} className="p-2 bg-slate-700 rounded-full"><X size={20} className="text-white"/></button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 overflow-y-auto pb-20">
              {inventory.map((char) => (
                <div key={char.uid} onClick={() => handleAssign(char)}
                  className="bg-slate-800 p-2 rounded border border-slate-600 hover:border-yellow-400 cursor-pointer flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full mb-2 ${ELEMENTS[char.element].bg}`}></div>
                  <span className="text-slate-200 text-xs font-bold text-center">{char.name}</span>
                  <span className="text-[10px] text-slate-500 mt-1">{char.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // 가차 화면
  const GachaScreen = () => (
    <div className="flex flex-col items-center justify-center h-full pt-16 pb-20 bg-black relative overflow-hidden">
       {/* 배경 애니메이션 (망원경 렌즈 효과) */}
       <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-[600px] h-[600px] rounded-full border border-slate-600 flex items-center justify-center animate-[spin_60s_linear_infinite]">
            <div className="w-[400px] h-[400px] rounded-full border border-slate-700 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
               <div className="w-[200px] h-[200px] rounded-full border border-slate-800"></div>
            </div>
          </div>
       </div>

       <div className="z-10 text-center space-y-8">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700 backdrop-blur-md max-w-md mx-4">
             <h2 className="text-2xl text-yellow-100 font-serif mb-2">성운 관측</h2>
             <p className="text-slate-400 text-sm mb-6">새로운 별(캐릭터)을 찾기 위해 망원경 초점을 맞춥니다.</p>
             
             <div className="flex gap-4 justify-center">
                <button onClick={() => handleGacha(1)} 
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-lg flex flex-col items-center min-w-[100px] transition-colors">
                  <span className="text-sm mb-1">1회 관측</span>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs">
                    <Star size={10} fill="currentColor"/> 100
                  </div>
                </button>
                <button onClick={() => handleGacha(10)}
                  className="bg-indigo-600 hover:bg-indigo-500 border border-indigo-400 text-white px-6 py-3 rounded-lg flex flex-col items-center min-w-[100px] transition-colors shadow-lg shadow-indigo-500/20">
                  <span className="text-sm mb-1 font-bold">10회 관측</span>
                  <div className="flex items-center gap-1 text-yellow-200 text-xs">
                    <Star size={10} fill="currentColor"/> 1000
                  </div>
                </button>
             </div>
          </div>
       </div>
    </div>
  );

  // 모형 정원 화면
  const GardenScreen = () => {
    // 5명의 배치된 캐릭터 상태 (간소화를 위해 랜덤 위치)
    const [gardenChars, setGardenChars] = useState([]);

    useEffect(() => {
      // 인벤토리에서 최대 5명 가져와서 배치
      const placed = inventory.slice(0, 5).map(c => ({
        ...c,
        x: Math.random() * 80 + 10, // % 단위
        y: Math.random() * 60 + 20,
        dir: Math.random() > 0.5 ? 1 : -1
      }));
      setGardenChars(placed);

      // 간단한 움직임 시뮬레이션
      const interval = setInterval(() => {
        setGardenChars(prev => prev.map(c => ({
          ...c,
          x: Math.max(10, Math.min(90, c.x + (Math.random() - 0.5) * 5)), // 조금씩 이동
          dir: Math.random() > 0.5 ? 1 : -1
        })));
      }, 2000);

      return () => clearInterval(interval);
    }, [inventory]);

    return (
      <div className="h-full pt-16 pb-20 bg-emerald-900/20 relative overflow-hidden">
        {/* 배경 (모형 정원 느낌) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-slate-800 rounded-lg transform skew-x-12 opacity-50 border border-slate-600"></div>
        <div className="absolute top-32 right-20 w-24 h-40 bg-slate-800 rounded-full opacity-50 border border-slate-600 flex items-center justify-center">
            <div className="text-slate-500 text-xs">분수대</div>
        </div>

        {/* 캐릭터들 */}
        {gardenChars.map((char, idx) => (
          <div key={idx} 
            className="absolute transition-all duration-[2000ms] ease-in-out cursor-pointer group flex flex-col items-center"
            style={{ left: `${char.x}%`, top: `${char.y}%` }}
            onClick={() => showToast(`${char.name}: "이곳은 참 평화롭군요."`)}
          >
            {/* 말풍선 */}
            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-white text-slate-900 text-[10px] px-2 py-1 rounded-lg whitespace-nowrap shadow-lg transition-opacity">
               ♪
            </div>
            
            {/* 캐릭터 아바타 */}
            <div className={`w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center bg-slate-700 ${char.dir === 1 ? 'scale-x-100' : '-scale-x-100'}`}>
               <span className="text-[10px] font-bold text-white select-none">{char.name[0]}</span>
            </div>
            <div className="w-8 h-2 bg-black/20 rounded-full mt-1 blur-sm"></div>
          </div>
        ))}

        <div className="absolute top-20 left-4 bg-slate-900/80 p-2 rounded text-xs text-slate-300">
           * 캐릭터들은 자유롭게 돌아다니며 상호작용합니다.
        </div>
      </div>
    );
  };

  // 전투 화면 (시뮬레이션)
  const BattleScreen = () => {
    return (
      <div className="h-full pt-16 pb-20 flex flex-col p-4 bg-slate-950">
        {/* 적 진영 */}
        <div className="flex-1 flex items-center justify-center gap-4 bg-red-900/10 rounded-t-xl border border-red-900/30 p-4">
           <div className="w-20 h-20 bg-red-900/50 rounded-full animate-pulse border-2 border-red-500 flex items-center justify-center text-red-200 text-xs font-bold">BOSS<br/>화염룡</div>
           <div className="text-slate-400 text-xs text-left">
              <p>속성: <span className="text-red-500">불(Fire)</span></p>
              <p>약점: <span className="text-blue-500">물(Water)</span></p>
           </div>
        </div>

        {/* 전투 로그 및 시너지 표시 */}
        <div className="h-24 bg-black/50 border-y border-slate-700 p-2 text-xs overflow-y-auto font-mono text-green-400">
           <p>{'>'} 전투 개시!</p>
           {activeSynergies.map((syn, i) => (
             <p key={i} className="text-yellow-300">{'>'} [시너지 발동] {syn.name}: {syn.effect}</p>
           ))}
           <p>{'>'} 서주목이(가) 스킬을 사용했습니다.</p>
           <p>{'>'} 아군의 공격력이 20% 상승했습니다.</p>
        </div>

        {/* 아군 진영 (파티) */}
        <div className="flex-1 bg-blue-900/10 rounded-b-xl border border-blue-900/30 p-4 flex flex-col justify-end">
           <div className="flex justify-center gap-2 mb-4">
              {party.front.map((c, i) => (
                <div key={i} className={`w-12 h-16 rounded border ${c ? 'border-blue-400 bg-blue-900/40' : 'border-slate-700 bg-slate-900/40'} flex items-center justify-center text-[10px]`}>
                   {c ? c.name : '빈자리'}
                </div>
              ))}
           </div>
           <div className="flex justify-center gap-2 opacity-70 scale-90">
              {party.back.map((c, i) => (
                <div key={i} className={`w-12 h-16 rounded border ${c ? 'border-indigo-400 bg-indigo-900/40' : 'border-slate-700 bg-slate-900/40'} flex items-center justify-center text-[10px]`}>
                   {c ? c.name : '빈자리'}
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  };

  // --- 메인 렌더링 ---
  return (
    <div className="w-full h-screen bg-slate-900 text-slate-200 overflow-hidden font-sans select-none relative">
      <TopBar />
      
      {screen === 'HOME' && <HomeScreen />}
      {screen === 'PARTY' && <PartyScreen />}
      {screen === 'GACHA' && <GachaScreen />}
      {screen === 'GARDEN' && <GardenScreen />}
      {screen === 'BATTLE' && <BattleScreen />}

      <Navigation />

      {/* 토스트 알림 */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg border border-yellow-500/50 z-[60] animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}