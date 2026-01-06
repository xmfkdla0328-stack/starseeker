import React from 'react';
import { ELEMENTS } from '../../constants/index';
import { Lock, Database } from 'lucide-react';

/**
 * 캐릭터 선택 목록 컴포넌트
 * 캐릭터 목록을 표시하고 선택 가능하며 유리 패널 스타일 적용
 */
export const CharacterList = ({ charList, selectedCharId, onSelectChar, inventory }) => {
  return (
    <div className="w-1/4 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)] relative">
      {/* CODEX 헤더 */}
      <div className="px-6 py-4 flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-slate-900/40 to-transparent relative">
        <Database size={18} className="text-cyan-400 shrink-0" />
        <h2 className="text-sm font-bold text-cyan-200 tracking-wider">CODEX</h2>
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-transparent"></div>
      </div>

      {/* 캐릭터 목록 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 p-3">
        {charList.map(char => {
          const owned = inventory.some(c => c.id === char.id);
          const isSelected = selectedCharId === char.id;
          
          return (
            <div
              key={char.id}
              onClick={() => onSelectChar(char.id)}
              className={`relative p-3 rounded-lg cursor-pointer transition-all duration-200 border backdrop-blur-sm ${
                isSelected
                  ? 'bg-slate-800/60 border-cyan-400/50 shadow-[inset_0_0_15px_rgba(34,211,238,0.15)]'
                  : 'bg-slate-900/30 border-white/5 hover:bg-slate-800/40 hover:border-cyan-400/30'
              }`}
            >
              {/* 선택 표시기 - 왼쪽 하늘색 띠 */}
              {isSelected && (
                <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-400/50 to-transparent rounded-l-lg"></div>
              )}

              <div className="flex items-center gap-3 relative z-10">
                {/* 캐릭터 아이콘 박스 */}
                <div
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                    owned ? ELEMENTS[char.element].border : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {owned ? (
                    <div className={`w-full h-full rounded-[calc(0.5rem-1px)] ${ELEMENTS[char.element].bg.replace('/20', '/40')}`}></div>
                  ) : (
                    <Lock size={16} className="text-slate-500" />
                  )}
                </div>

                {/* 텍스트 영역 */}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className={`text-xs font-bold truncate drop-shadow-md tracking-tight ${
                    owned ? 'text-slate-100' : 'text-slate-500'
                  }`}>
                    {char.name}
                  </span>
                  <span className={`text-[11px] truncate ${
                    owned ? 'text-cyan-200/60' : 'text-slate-600'
                  }`}>
                    {owned ? `Lv.${inventory.find(c => c.id === char.id)?.level || 1}` : '미보유'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
