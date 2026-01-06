import React, { useMemo } from 'react';
import { Lock } from 'lucide-react';
import { ELEMENTS } from '../../constants/index';
import { ElementIcon } from '../common/ElementIcon';
import { getRoleColor, getRoleLabel } from '../../utils/roleHelpers';

export const PartySelector = ({ inventory, party, selectedSlot, setSelectedSlot, handleAssign }) => {
  // 인벤토리 정렬 (배치된 캐릭터를 뒤로 보냄)
  const sortedInventory = useMemo(() => {
    if (!selectedSlot) return [];
    return [...inventory].sort((a, b) => {
      const isPlacedA = party.members.some(p => p && p.id === a.id);
      const isPlacedB = party.members.some(p => p && p.id === b.id);
      if (isPlacedA === isPlacedB) return 0;
      return isPlacedA ? 1 : -1; 
    });
  }, [inventory, party, selectedSlot]);

  return (
    <>
      {/* 반투명 백그라운드 오버레이 */}
      <div 
        className="fixed inset-0 z-[50] bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setSelectedSlot(null)}
      />
      
      {/* Bottom Sheet 스타일 모달 */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-slate-950/95 backdrop-blur-md rounded-t-3xl border-t border-white/10 flex flex-col animate-slide-up max-h-[75vh] md:max-h-[70vh]">
        {/* 헤더 */}
        <div onClick={(e) => e.stopPropagation()} className="flex justify-between items-center px-4 py-3 border-b border-white/10 shrink-0">
          <h3 className="text-base md:text-lg text-white font-bold font-serif flex items-center gap-2">
              파티 캐릭터 선택
          </h3>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSlot(null); }} 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 pointer-events-auto" 
            type="button"
            aria-label="닫기"
          >
            X
          </button>
        </div>
        
        {/* 스크롤 가능한 캐릭터 목록 */}
        <div className="overflow-y-auto flex-1 p-3" onClick={(e) => e.stopPropagation()}>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {sortedInventory.map((char) => {
              const isPlaced = party.members.some(p => p && p.id === char.id);
              const isRoleMatch = true;
              
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
                       <ElementIcon element={char.element} size={16} />
                     </div>
                     <div className="flex flex-col min-w-0">
                       <span className="text-slate-200 text-[10px] font-bold truncate leading-tight">{char.name}</span>
                       <div className="flex items-center gap-1">
                         <span className={`text-[8px] font-bold ${getRoleColor(char.role)}`}>
                            {getRoleLabel(char.role)}
                        </span>
                       </div>
                     </div>
                   </div>

                 <div className="flex flex-wrap gap-1 content-start flex-1">
                   {(char.tags || []).map((tag, i) => (
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
    </>
  );
};