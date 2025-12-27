import React from 'react';

/**
 * 캐릭터 스킬 정보 표시 컴포넌트
 * 스킬 타입, 이름, 설명을 카드 형식으로 표시
 */
export const SkillBlock = ({ type, name, desc, colorClass }) => (
  <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 flex gap-3 items-center">
    <div className={`w-8 h-8 rounded flex items-center justify-center text-[10px] shrink-0 border bg-opacity-20 ${colorClass}`}>
      {type}
    </div>
    <div>
      <div className={`text-sm font-bold ${colorClass.split(' ')[0].replace('border-','text-')}`}>{name}</div>
      <div className="text-xs text-slate-500">{desc}</div>
    </div>
  </div>
);
