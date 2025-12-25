// src/components/Screens.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, Feather, Shield, Sword, Compass, Sparkles, X, 
  Telescope, Star, Flame 
} from 'lucide-react';
import { ELEMENTS } from '../constants.js'; 

// --- 홈 화면 ---
export const HomeScreen = ({ showToast }) => (
  <div className="flex flex-col items-center justify-center h-full text-center relative p-4">
    <div className="flex flex-col items-center z-10">
      <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-300 mb-2 tracking-widest drop-shadow-[0_0_25px_rgba(253,224,71,0.4)]">
        STAR SEEKER
      </h1>
      <p className="text-slate-300 text-sm md:text-lg mb-8 font-light italic opacity-80 flex items-center gap-2">
        <Feather size={14} className="text-slate-400"/> 별의 파편을 줍는 여정 <Feather size={14} className="text-slate-400 transform scale-x-[-1]"/>
      </p>
      
      <div className="relative group cursor-pointer animate-float-slow" onClick={() => showToast(`서주목: "당신의 렌즈 너머엔 무엇이 보이나요?"`)}>
        <div className="w-36 h-36 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr from-yellow-400/50 to-indigo-500/50 shadow-[0_0_30px_rgba(253,224,71,0.2)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(253,224,71,0.4)] group-hover:scale-105">
           <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center overflow-hidden relative border border-white/20">
              <Users size={60} className="text-slate-500/50 group-hover:text-yellow-200/50 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent"></div>
              <span className="absolute bottom-5 text-yellow-100 font-bold text-lg tracking-wider font-serif">서주목</span>
           </div>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] px-2 py-1 rounded-full border border-white/30 flex items-center gap-1 shadow-lg">
          <span className="text-pink-200">♥</span> 인연 Lv.3
        </div>
      </div>
    </div>
  </div>
);

// --- 파티 화면 ---
export const PartyScreen = ({ party, setParty, inventory, showToast, activeSynergies }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const handleAssign = (char) => {
    if (!selectedSlot) return;
    const { line } = selectedSlot;
    if (char.role !== 'BOTH' && char.role.toLowerCase() !== line) {
      showToast('이 위치에는 배치할 수 없는 캐릭터입니다.'); return;
    }
    if ([...party.front, ...party.back].find(c => c && c.id === char.id)) {
      showToast('이미 파티에 배치된 캐릭터입니다.'); return;
    }
    const newParty = { ...party }; newParty[line][selectedSlot.index] = char;
    setParty(newParty); setSelectedSlot(null);
  };
  const removeChar = (line, index) => {
      const newParty = { ...party }; newParty[line][index] = null; setParty(newParty);
  };

  const CharSlot = ({ char, line, idx }) => (
      <div onClick={() => char ? removeChar(line, idx) : setSelectedSlot({line, index: idx})}
        className={`aspect-[3/4] rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group w-full
          ${char ? `${ELEMENTS[char.element].border} bg-slate-900/60 backdrop-blur-sm` : 'border-dashed border-slate-700/50 hover:bg-white/5 hover:border-slate-500/50'}
        `}>
        {char ? (
          <>
            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${ELEMENTS[char.element].bg.replace('/20', '/0')} via-transparent to-transparent`}></div>
            <div className={`text-xs ${ELEMENTS[char.element].color} font-bold z-10 flex flex-col items-center text-center leading-tight`}>
                {char.name}
                <span className="text-[9px] text-slate-400 font-normal opacity-70 mt-0.5 scale-90">{char.role === 'BOTH' ? '만능' : (char.role==='FRONT'?'전열':'후열')}</span>
            </div>
          </>
        ) : (
          <span className="text-slate-600 text-lg opacity-50">+</span>
        )}
      </div>
  );

  return (
    <div className="flex h-full gap-4 p-4 overflow-hidden relative">
      <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">
        {/* 후열 영역 */}
        <div className="flex-1 bg-slate-900/40 backdrop-blur-md p-3 rounded-xl border border-blue-900/30 flex flex-col shadow-inner shadow-blue-900/10 min-h-0 justify-center">
          <h3 className="text-blue-300/80 text-[10px] md:text-xs mb-2 uppercase tracking-wider flex items-center gap-2 font-bold shrink-0 justify-center">
            <Shield size={12} /> 후열 (Support)
          </h3>
          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-4 gap-3">
              {party.back.map((char, idx) => <CharSlot key={`back-${idx}`} char={char} line="back" idx={idx} />)}
            </div>
          </div>
        </div>
        
        {/* 전열 영역 */}
        <div className="flex-1 bg-slate-900/40 backdrop-blur-md p-3 rounded-xl border border-red-900/30 flex flex-col shadow-inner shadow-red-900/10 min-h-0 justify-center">
          <h3 className="text-red-300/80 text-[10px] md:text-xs mb-2 uppercase tracking-wider flex items-center gap-2 font-bold shrink-0 justify-center">
            <Sword size={12} /> 전열 (Attack)
          </h3>
          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-4 gap-3">
              {party.front.map((char, idx) => <CharSlot key={`front-${idx}`} char={char} line="front" idx={idx} />)}
            </div>
          </div>
        </div>
      </div>

      {/* 시너지 패널 */}
      <div className="w-56 bg-slate-950/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl overflow-y-auto no-scrollbar h-full shadow-xl flex flex-col shrink-0">
        <h2 className="text-yellow-100 font-bold mb-3 flex items-center gap-2 text-sm border-b border-white/10 pb-2 shrink-0">
            <Compass size={16} className="text-yellow-400"/> 활성 시너지
        </h2>
        <div className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
          {activeSynergies.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs italic text-center">태그를 조합하여<br/>효과를 발동시키세요.</div>
          ) : activeSynergies.map((syn, idx) => (
            <div key={idx} className="bg-white/5 p-2 rounded-lg border border-white/10 relative overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className="text-yellow-300 font-bold text-xs flex items-center gap-1">
                  <Sparkles size={10}/> {syn.name} <span className="text-slate-400 text-[10px] font-normal">({syn.count})</span>
                </span>
              </div>
              <p className="text-slate-300 text-[10px] pl-2 border-l-2 border-yellow-500/30">{syn.effect}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 캐릭터 선택 팝업 */}
      {selectedSlot && (
        <div className="absolute inset-0 z-[60] bg-slate-950/90 backdrop-blur-md flex flex-col p-4 animate-fade-in">
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2 shrink-0">
            <h3 className="text-lg text-white font-bold font-serif flex items-center gap-2">
                {selectedSlot.line === 'front' ? <Sword size={18} className="text-red-400"/> : <Shield size={18} className="text-blue-400"/>}
                {selectedSlot.line === 'front' ? '전열' : '후열'} 배치 선택
            </h3>
            <button onClick={() => setSelectedSlot(null)} className="p-1 bg-white/10 hover:bg-white/20 rounded-full"><X size={18} className="text-slate-300"/></button>
          </div>
          
          <div className="overflow-y-auto p-1 no-scrollbar flex-1">
            {/* 그리드 컬럼 수를 늘려서(5->6~8) 아이템 크기를 줄임 */}
            <div className="grid grid-cols-6 md:grid-cols-8 gap-2">
              {inventory.map((char) => (
                <div key={char.uid} onClick={() => handleAssign(char)}
                  className={`bg-slate-900/80 p-1.5 rounded-lg border cursor-pointer flex flex-col items-center transition-all hover:scale-105 group relative overflow-hidden
                    ${(char.role !== 'BOTH' && char.role.toLowerCase() !== selectedSlot.line) ? 'opacity-40 grayscale border-slate-700' : `border-white/10 hover:${ELEMENTS[char.element].border}`}
                  `}>
                  <div className={`w-8 h-8 rounded-full mb-1 ${ELEMENTS[char.element].bg} border ${ELEMENTS[char.element].border} flex items-center justify-center shadow-sm relative z-10`}>
                    <div className={`w-2 h-2 rounded-full ${ELEMENTS[char.element].bg.replace('/20','/80')}`}></div>
                  </div>
                  <span className="text-slate-200 text-[9px] font-bold text-center z-10 truncate w-full">{char.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 가챠 화면 ---
export const GachaScreen = ({ handleGacha }) => (
  <div className="flex w-full h-full items-center justify-center relative overflow-hidden p-4">
     <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[40vh] h-[40vh] md:w-[60vh] md:h-[60vh] rounded-full border border-indigo-500/30 flex items-center justify-center animate-[spin_60s_linear_infinite]">
          <div className="w-[28vh] h-[28vh] md:w-[45vh] md:h-[45vh] rounded-full border border-purple-500/30 flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
             <div className="w-[15vh] h-[15vh] md:w-[30vh] md:h-[30vh] rounded-full border border-yellow-500/20 shadow-[0_0_50px_rgba(253,224,71,0.1)]"></div>
          </div>
        </div>
     </div>

     <div className="z-10 flex flex-col items-center justify-center gap-3 md:gap-6 max-w-xl w-full bg-slate-950/70 p-5 md:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-yellow-500/10 opacity-50 pointer-events-none rounded-3xl"></div>
           
           <div className="text-center shrink-0">
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-yellow-300 font-serif mb-1 relative z-10 flex items-center justify-center gap-2">
                  <Telescope size={24} className="text-yellow-400"/> 성운 관측
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mb-4 relative z-10 font-light opacity-80">
                  미지의 별을 찾기 위해 렌즈의 초점을 맞춥니다.
              </p>
           </div>
           
           <div className="flex gap-4 w-full justify-center relative z-10">
              <button onClick={() => handleGacha(1)} 
                className="flex-1 bg-slate-800/80 hover:bg-slate-700/80 border border-white/20 text-white py-3 rounded-xl flex flex-col items-center transition-all active:scale-95 group">
                <span className="text-sm font-bold mb-1 group-hover:text-yellow-200 transition-colors">1회</span>
                <div className="flex items-center gap-1 text-yellow-400 text-[10px] bg-slate-950/50 px-2 py-0.5 rounded-full border border-yellow-500/30">
                  <Star size={10} fill="currentColor"/> 100
                </div>
              </button>
              <button onClick={() => handleGacha(10)}
                className="flex-1 bg-gradient-to-br from-indigo-600/80 to-purple-600/80 hover:from-indigo-500/80 hover:to-purple-500/80 border border-indigo-400/50 text-white py-3 rounded-xl flex flex-col items-center transition-all active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.3)] group">
                <span className="text-sm font-bold mb-1 flex items-center gap-1"><Sparkles size={12} className="text-yellow-200"/> 10회</span>
                <div className="flex items-center gap-1 text-yellow-200 text-[10px] bg-indigo-950/50 px-2 py-0.5 rounded-full border border-yellow-500/30">
                  <Star size={10} fill="currentColor"/> 1000
                </div>
              </button>
           </div>
     </div>
  </div>
);

// --- 정원 화면 ---
export const GardenScreen = ({ inventory, showToast }) => {
  const [gardenChars, setGardenChars] = useState([]);
  useEffect(() => {
    const placed = inventory.slice(0, 5).map(c => ({ ...c, x: Math.random() * 80 + 10, y: Math.random() * 60 + 20, dir: Math.random() > 0.5 ? 1 : -1 }));
    setGardenChars(placed);
    const interval = setInterval(() => {
      setGardenChars(prev => prev.map(c => ({ ...c, x: Math.max(10, Math.min(90, c.x + (Math.random() - 0.5) * 5)), dir: Math.random() > 0.5 ? 1 : -1 })));
    }, 2000);
    return () => clearInterval(interval);
  }, [inventory]);

  return (
    <div className="h-full relative overflow-hidden rounded-2xl m-3 border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 to-teal-950/50"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute bottom-8 left-16 w-32 h-20 bg-slate-800/50 rounded-lg transform skew-x-12 border border-white/10 backdrop-blur-sm flex items-end justify-center pb-2 shadow-lg">
          <span className="text-slate-500 text-[10px]">벤치</span>
      </div>
      {gardenChars.map((char, idx) => (
        <div key={idx} 
          className="absolute transition-all duration-[2000ms] ease-in-out cursor-pointer group flex flex-col items-center z-20 hover:scale-110"
          style={{ left: `${char.x}%`, top: `${char.y}%` }}
          onClick={() => showToast(`${char.name}: "이곳의 공기는 맑군요."`)}
        >
          <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-white/90 text-slate-900 text-[10px] px-2 py-1 rounded-full whitespace-nowrap shadow-lg transition-all font-bold flex items-center gap-1">
             <Sparkles size={8} className="text-yellow-500"/> 휴식
          </div>
          <div className={`w-10 h-10 rounded-full border-2 ${ELEMENTS[char.element].border} shadow-lg flex items-center justify-center ${ELEMENTS[char.element].bg.replace('/20','/80')} backdrop-blur-sm ${char.dir === 1 ? 'scale-x-100' : '-scale-x-100'} relative overflow-hidden`}>
             <span className="text-[10px] font-bold text-white select-none relative z-10">{char.name[0]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- 전투 화면 ---
export const BattleScreen = ({ party, activeSynergies }) => (
  <div className="h-full flex flex-col p-3 gap-3 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
    
    <div className="flex-[2] flex items-center justify-center gap-6 bg-red-950/40 backdrop-blur-md rounded-xl border border-red-500/20 p-2 shadow-inner shadow-red-900/20 relative overflow-hidden min-h-0">
       <div className="w-20 h-20 bg-red-900/30 rounded-full animate-pulse-slow border-4 border-red-500/50 flex flex-col items-center justify-center text-red-100 font-bold relative z-10">
          <Flame size={24} className="text-red-500 mb-1"/>
          <span className="text-xs">BOSS</span>
       </div>
       <div className="text-slate-300 text-xs text-left bg-slate-900/50 p-2 rounded-lg border border-white/10 backdrop-blur-sm relative z-10">
          <h4 className="font-bold text-red-400 mb-1 flex items-center gap-1">화염룡</h4>
          <p><span className="text-red-400">불</span> / 약점: <span className="text-blue-400">물</span></p>
       </div>
    </div>

    <div className="h-20 bg-slate-950/60 border border-white/10 rounded-lg p-2 text-[10px] overflow-y-auto font-mono text-slate-300 no-scrollbar shadow-inner shrink-0">
       <p className="text-green-400 font-bold mb-1">{'>'} 전투 개시!</p>
       {activeSynergies.map((syn, i) => (
         <p key={i} className="text-yellow-300">{'>'} [시너지] {syn.name}: {syn.effect}</p>
       ))}
       <p className="opacity-70">{'>'} 서주목 스킬 사용.</p>
       <p className="opacity-70">{'>'} 공격력 상승.</p>
    </div>

    <div className="flex-[3] bg-blue-950/40 backdrop-blur-md rounded-xl border border-blue-500/20 p-2 flex flex-col justify-end shadow-inner shadow-blue-900/20 relative overflow-hidden min-h-0">
       <div className="flex justify-center gap-2 mb-2 relative z-10">
          {party.front.map((c, i) => (
            <div key={i} className={`w-12 h-16 rounded-lg border transition-all ${c ? `${ELEMENTS[c.element].border} ${ELEMENTS[c.element].bg}` : 'border-slate-700/50 bg-slate-900/30'} flex flex-col items-center justify-center backdrop-blur-sm`}>
               {c ? <Sword size={12} className="text-red-400 opacity-70"/> : null}
            </div>
          ))}
       </div>
       <div className="flex justify-center gap-2 scale-90 opacity-80 relative z-10">
          {party.back.map((c, i) => (
            <div key={i} className={`w-12 h-16 rounded-lg border transition-all ${c ? `${ELEMENTS[c.element].border} ${ELEMENTS[c.element].bg}` : 'border-slate-700/50 bg-slate-900/30'} flex flex-col items-center justify-center backdrop-blur-sm`}>
               {c ? <Shield size={12} className="text-blue-400 opacity-70"/> : null}
            </div>
          ))}
       </div>
    </div>
  </div>
);