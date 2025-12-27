import React from 'react';
import { ELEMENTS } from '../../constants';
import { Lock, Scroll } from 'lucide-react';

/**
 * 캐릭터 선택 목록 컴포넌트
 * 캐릭터 목록을 표시하고 선택 가능
 */
export const CharacterList = ({ charList, selectedCharId, onSelectChar, inventory }) => {
  return (
    <div className="w-1/3 max-w-[200px] bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/10 flex flex-col overflow-hidden">
      <h2 className="p-3 text-sm font-bold text-slate-300 border-b border-white/10 bg-white/5 flex items-center gap-2">
        <Scroll size={14} className="text-yellow-400" /> 캐릭터 관리
      </h2>
      <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-2">
        {charList.map(char => {
          const owned = inventory.some(c => c.id === char.id);
          return (
            <div
              key={char.id}
              onClick={() => onSelectChar(char.id)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all border ${
                selectedCharId === char.id
                  ? `bg-slate-700/60 border-yellow-400/50`
                  : 'bg-transparent border-transparent hover:bg-white/5'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center relative overflow-hidden shrink-0 ${
                  owned ? ELEMENTS[char.element].border : 'border-slate-700 bg-slate-800'
                }`}
              >
                {owned ? (
                  <div className={`w-full h-full ${ELEMENTS[char.element].bg.replace('/20', '/50')}`}></div>
                ) : (
                  <Lock size={14} className="text-slate-500" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`text-xs font-bold truncate ${owned ? 'text-slate-200' : 'text-slate-500'}`}>
                  {char.name}
                </span>
                <span className="text-[10px] text-slate-500 truncate">{owned ? '보유중' : '미보유'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
