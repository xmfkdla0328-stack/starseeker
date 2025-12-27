import React, { useState, useMemo } from 'react';
import { Shield, Sword, Compass, Sparkles, X, Lock, Tag } from 'lucide-react';
import { ELEMENTS } from '../constants';

export const PartyScreen = ({ party, setParty, inventory, showToast, activeSynergies }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  // ★ 추가됨: 현재 클릭해서 보고 있는 시너지 이름 (없으면 null)
  const [highlightedSynergy, setHighlightedSynergy] = useState(null);
  
  // 시너지 클릭 핸들러 (토글 방식)
  const toggleSynergyHighlight = (synergyName) => {
    if (highlightedSynergy === synergyName) {
      setHighlightedSynergy(null); // 이미 선택된 거면 해제
    } else {
      setHighlightedSynergy(synergyName); // 선택
    }
  };

  // 캐릭터 배치 함수
  const handleAssign = (char, isPlaced, isRoleMatch) => {
    if (!selectedSlot) return;
    if (isPlaced) { showToast('이미 다른 위치에 배치된 캐릭터입니다.'); return; }
    if (!isRoleMatch) { showToast('이 위치에는 배치할 수 없는 캐릭터입니다.'); return; }

    const { line } = selectedSlot;
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

  const sortedInventory = useMemo(() => {
    if (!selectedSlot) return [];
    return [...inventory].sort((a, b) => {
      const isPlacedA = [...party.front, ...party.back].some(p => p && p.id === a.id);
      const isPlacedB = [...party.front, ...party.back].some(p => p && p.id === b.id);
      if (isPlacedA === isPlacedB) return 0;
      return isPlacedA ? 1 : -1; 
    });
  }, [inventory, party, selectedSlot]);

  // 캐릭터 슬롯 컴포넌트 (하이라이트 로직 추가됨)
  const CharSlot = ({ char, line, idx }) => {
    // 하이라이트 관련 상태 계산
    const isSynergyActive = highlightedSynergy !== null;
    const isMatch = char && isSynergyActive && char.tags.includes(highlightedSynergy);
    const isDimmed = isSynergyActive && !isMatch; // 시너지 보는 중인데 해당 안되면 흐리게

    return (
      <div onClick={() => char ? removeChar(line, idx) : setSelectedSlot({line, index: idx})}
        className={`aspect-[3/4] rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden group w-full
          ${char ? `${ELEMENTS[char.element].border} bg-slate-900/60 backdrop-blur-sm` : 'border-dashed border-slate-700/50 hover:bg-white/5 hover:border-slate-500/50'}
          ${isMatch ? 'ring-2 ring-yellow-400 scale-105 z-10 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : ''}
          ${isDimmed ? 'opacity-20 grayscale scale-95' : ''}
        `}>
        {char ? (
          <>
            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${ELEMENTS[char.element].bg.replace('/20', '/0')} via-transparent to-transparent`}></div>
            <div className={`text-xs ${ELEMENTS[char.element].color} font-bold z-10 flex flex-col items-center text-center leading-tight`}>
                {char.name}
                <span className="text-[9px] text-slate-400 font-normal opacity-70 mt-0.5 scale-90">{char.role === 'BOTH' ? '만능' : (char.role==='FRONT'?'전열':'후열')}</span>
            </div>
            {/* 태그 표시 (평소엔 점, 하이라이트 시 해당 태그 강조) */}
            <div className="flex gap-0.5 mt-1 absolute bottom-2 items-center">
               {isMatch ? (
                 <span className="text-[8px] bg-yellow-500 text-black px-1 rounded-sm font-bold flex items-center gap-0.5 animate-bounce-slight">
                   <Sparkles size={8}/> {highlightedSynergy}
                 </span>
               ) : (
                 char.tags.map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-slate-500"></div>)
               )}
            </div>
          </>
        ) : (
          <span className={`text-slate-600 text-lg ${isDimmed ? 'opacity-10' : 'opacity-50'}`}>+</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full gap-4 p-4 overflow-hidden relative">
      <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">
        
        {/* 전열 영역 */}
        <div className={`flex-1 bg-slate-900/40 backdrop-blur-md p-3 rounded-xl border border-red-900/30 flex flex-col shadow-inner shadow-red-900/10 min-h-0 justify-center transition-opacity duration-300`}>
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
        <div className={`flex-1 bg-slate-900/40 backdrop-blur-md p-3 rounded-xl border border-blue-900/30 flex flex-col shadow-inner shadow-blue-900/10 min-h-0 justify-center transition-opacity duration-300`}>
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
            <div 
              key={idx} 
              onClick={() => toggleSynergyHighlight(syn.name)}
              className={`p-2 rounded-lg border relative overflow-hidden cursor-pointer transition-all duration-200
                ${highlightedSynergy === syn.name 
                  ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)] scale-105' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}
              `}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold text-xs flex items-center gap-1 ${highlightedSynergy === syn.name ? 'text-yellow-400' : 'text-yellow-200'}`}>
                  <Sparkles size={10} className={highlightedSynergy === syn.name ? 'animate-spin' : ''}/> 
                  {syn.name} 
                  <span className="text-slate-400 text-[10px] font-normal">({syn.count})</span>
                </span>
              </div>
              <p className="text-slate-300 text-[10px] pl-2 border-l-2 border-yellow-500/30">{syn.effect}</p>
              
              {/* 클릭 유도 힌트 (선택 안됐을 때만) */}
              {highlightedSynergy !== syn.name && (
                <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Tag size={12} className="text-slate-500"/>
                </div>
              )}
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
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {sortedInventory.map((char) => {
                const isPlaced = [...party.front, ...party.back].some(p => p && p.id === char.id);
                const isRoleMatch = char.role === 'BOTH' || char.role.toLowerCase() === selectedSlot.line;
                
                return (
                  <div key={char.uid} 
                    onClick={() => handleAssign(char, isPlaced, isRoleMatch)}
                    className={`bg-slate-900/80 p-2 rounded-xl border flex flex-col gap-2 transition-all relative overflow-hidden min-h-[120px]
                      ${isPlaced 
                          ? 'opacity-50 border-slate-700 cursor-not-allowed grayscale' 
                          : !isRoleMatch 
                            ? 'opacity-60 border-slate-700 cursor-not-allowed' 
                            : `border-white/10 cursor-pointer hover:scale-105 hover:${ELEMENTS[char.element].border} group`
                      }
                    `}>
                    
                    <div className="flex items-center gap-2">
                       <div className={`w-8 h-8 rounded-full ${ELEMENTS[char.element].bg} border ${ELEMENTS[char.element].border} flex items-center justify-center shrink-0`}>
                          <div className={`w-2 h-2 rounded-full ${ELEMENTS[char.element].bg.replace('/20','/80')}`}></div>
                       </div>
                       <div className="flex flex-col min-w-0">
                          <span className="text-slate-200 text-[10px] font-bold truncate leading-tight">{char.name}</span>
                          <span className={`text-[8px] font-bold ${
                             char.role === 'BOTH' ? 'text-purple-300' :
                             char.role === 'FRONT' ? 'text-red-300' : 'text-blue-300'
                          }`}>
                            {char.role === 'BOTH' ? '만능' : char.role === 'FRONT' ? '전열' : '후열'}
                          </span>
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-1 content-start flex-1">
                       {char.tags.map((tag, i) => (
                         <span key={i} className="text-[8px] px-1.5 py-0.5 rounded-sm bg-white/5 text-slate-400 border border-white/5 whitespace-nowrap">
                            {tag}
                         </span>
                       ))}
                    </div>

                    {isPlaced && (
                      <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
                         <span className="text-xs font-bold text-white flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full"><Lock size={10}/> 배치됨</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};