import React from 'react';
import { ELEMENTS } from '../../constants';
import { Tag } from 'lucide-react';

/**
 * 캐릭터 상단 헤더 영역 컴포넌트
 * 캐릭터 이름, 레벨, 속성, 역할, 태그 표시
 */
export const CharacterHeader = ({ charData }) => {
  return (
    <div className="p-6 pb-0 flex gap-6 items-end relative z-10 shrink-0">
      <div
        className={`w-24 h-24 rounded-full border-2 ${ELEMENTS[charData.element].border} ${ELEMENTS[charData.element].bg.replace('/20', '/80')} shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center shrink-0`}
      >
        <span className="text-2xl font-bold text-white shadow-sm">{charData.name[0]}</span>
      </div>
      <div className="mb-2 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] border ${ELEMENTS[charData.element].border} ${ELEMENTS[charData.element].color} bg-slate-950/50`}
          >
            {ELEMENTS[charData.element].name} 속성
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] border border-white/20 text-slate-300 bg-slate-950/50">
            {charData.role === 'FRONT' ? '전열' : charData.role === 'BACK' ? '후열' : '만능'}
          </span>
          {charData.tags &&
            charData.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border border-indigo-400/30 text-indigo-300 bg-indigo-950/50">
                <Tag size={10} /> {tag}
              </span>
            ))}
        </div>

        <h1 className="text-3xl font-serif font-bold text-white flex items-end gap-2">
          {charData.name} <span className="text-sm font-normal text-slate-400 mb-1.5 opacity-80">Lv.{charData.level || 1}</span>
        </h1>
        <p className="text-slate-400 text-sm italic">"{charData.desc}"</p>
      </div>
    </div>
  );
};
