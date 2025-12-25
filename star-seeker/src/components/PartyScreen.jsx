import React, { useState } from 'react';
import { Shield, Sword, Compass, Sparkles, X } from 'lucide-react';
import { ELEMENTS } from '../constants.js';

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
            <div className="grid grid-cols-6 md:grid-cols-8 gap-2">
              {inventory.map((char) => (
                <div key={char.uid} onClick={() => handleAssign(char)}
                  className={`bg-slate-900/80 p-1.5 rounded-lg border cursor-pointer flex flex-col items-center justify-between transition-all hover:scale-105 group relative overflow-hidden h-20
                    ${(char.role !== 'BOTH' && char.role.toLowerCase() !== selectedSlot.line) ? 'opacity-40 grayscale border-slate-700' : `border-white/10 hover:${ELEMENTS[char.element].border}`}
                  `}>
                  <div className={`w-8 h-8 rounded-full ${ELEMENTS[char.element].bg} border ${ELEMENTS[char.element].border} flex items-center justify-center shadow-sm relative z-10 shrink-0`}>
                    <div className={`w-2 h-2 rounded-full ${ELEMENTS[char.element].bg.replace('/20','/80')}`}></div>
                  </div>
                  <div className="flex flex-col items-center w-full z-10">
                    <span className="text-slate-200 text-[9px] font-bold text-center truncate w-full leading-tight">{char.name}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full mt-1 font-bold ${
                      char.role === 'BOTH' ? 'bg-purple-500/20 text-purple-300' :
                      char.role === 'FRONT' ? 'bg-red-500/20 text-red-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {char.role === 'BOTH' ? '만능' : char.role === 'FRONT' ? '전열' : '후열'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};