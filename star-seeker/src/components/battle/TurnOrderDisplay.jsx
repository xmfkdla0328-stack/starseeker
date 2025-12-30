import React from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { ELEMENTS } from '../../constants/index';

/**
 * 턴 순서 표시 컴포넌트
 * - 현재 턴 캐릭터를 가장 위에 강조 표시
 * - 다음 턴 예정 캐릭터들을 순서대로 나열
 */
export const TurnOrderDisplay = ({ allies, currentTurnIndex = 0 }) => {
  if (!allies || allies.length === 0) {
    return (
      <div className="bg-slate-950/85 border border-white/10 rounded-2xl p-4 shadow-lg">
        <p className="text-xs text-slate-400">턴 정보 없음</p>
      </div>
    );
  }

  // 현재 턴 캐릭터
  const currentTurn = allies[currentTurnIndex % allies.length];
  
  // 다음 턴 캐릭터들 (최대 4개 표시)
  const upcomingTurns = [];
  for (let i = 1; i <= 4; i++) {
    const nextIndex = (currentTurnIndex + i) % allies.length;
    upcomingTurns.push(allies[nextIndex]);
  }

  const renderCharacterCard = (char, isCurrent = false) => {
    const element = ELEMENTS[char.element] || ELEMENTS.LIGHT;
    const hpPercent = Math.max(0, Math.min(100, (char.hp / char.maxHp) * 100));
    
    return (
      <div
        key={char.uid}
        className={`relative rounded-xl border backdrop-blur-sm transition-all ${
          isCurrent
            ? 'bg-gradient-to-br from-cyan-500/25 to-blue-500/25 border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-100'
            : 'bg-slate-900/60 border-white/10 hover:border-white/20 scale-95 opacity-80'
        } ${char.isDead ? 'grayscale opacity-50' : ''}`}
      >
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${element.color} ${isCurrent ? 'animate-pulse' : ''}`} />
            <span className={`text-sm font-bold ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
              {char.name}
            </span>
            {char.isDead && (
              <span className="ml-auto text-[9px] text-red-400 font-bold">전투불능</span>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>HP</span>
              <span>{char.hp} / {char.maxHp}</span>
            </div>
            <div className="h-1.5 bg-slate-950/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300"
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>

          {isCurrent && (
            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-cyan-300 font-bold">
              <Clock size={10} className="animate-spin" />
              <span>현재 턴</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-950/85 border border-white/10 rounded-2xl p-4 shadow-lg backdrop-blur-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Turn Order</div>
        <Clock size={14} className="text-cyan-400" />
      </div>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar">
        {/* 현재 턴 */}
        {renderCharacterCard(currentTurn, true)}

        {/* 다음 턴 표시 화살표 */}
        <div className="flex justify-center">
          <ChevronDown size={16} className="text-slate-500" />
        </div>

        {/* 다음 턴들 */}
        <div className="space-y-2">
          {upcomingTurns.map((char, index) => (
            <div key={`upcoming-${index}-${char.uid}`} className="relative">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-mono">
                {index + 1}
              </div>
              {renderCharacterCard(char, false)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-500 text-center">
        턴이 진행되면 순서가 갱신됩니다
      </div>
    </div>
  );
};
