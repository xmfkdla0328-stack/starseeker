import React from 'react';
import { ElementIcon } from '../common/ElementIcon';
import { getRoleLabel, getRoleColor } from '../../utils/roleHelpers';
import { ELEMENTS } from '../../constants/index';

/**
 * 파티 슬롯 그리드 (4개 슬롯)
 */
export const PartySlotGrid = ({ members, onSlotClick }) => {
  return (
    <div className="relative w-full max-w-3xl">
      {/* 별자리 연결선 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <line x1="12.5%" y1="50%" x2="37.5%" y2="50%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
        <line x1="37.5%" y1="50%" x2="62.5%" y2="50%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
        <line x1="62.5%" y1="50%" x2="87.5%" y2="50%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
      </svg>

      <div className="relative grid grid-cols-4 gap-4" style={{ zIndex: 1 }}>
        {members.map((char, idx) => (
          <div
            key={`slot-${idx}`}
            onClick={(e) => onSlotClick(idx, e)}
            className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden ${
              char
                ? 'border-cyan-400/60 bg-gradient-to-br from-cyan-900/40 to-slate-900/60 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 cursor-pointer group'
                : 'border-dashed border-slate-600/50 bg-slate-900/20 cursor-default'
            }`}
          >
            {char ? (
              <>
                {/* 캐릭터 배경 그라데이션 */}
                <div className={`absolute inset-0 ${ELEMENTS[char.element].bg} opacity-10`}></div>
                
                {/* 속성 아이콘 */}
                <div className="absolute top-2 left-2 p-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm">
                  <ElementIcon element={char.element} size={16} />
                </div>

                {/* 슬롯 번호 */}
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-cyan-300">{idx + 1}</span>
                </div>

                {/* 캐릭터 정보 */}
                <div className="text-center z-10 space-y-1">
                  <div className="text-lg font-bold text-cyan-100">{char.name}</div>
                  <div className={`text-xs font-semibold ${getRoleColor(char.role)}`}>
                    {getRoleLabel(char.role)}
                  </div>
                </div>

                {/* 호버 시 힌트 */}
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-xs font-bold text-red-300 bg-red-900/80 px-3 py-1 rounded-full">Remove</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 opacity-40">
                <div className="text-4xl text-slate-500">+</div>
                <span className="text-xs text-slate-500 uppercase">빈 슬롯</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
