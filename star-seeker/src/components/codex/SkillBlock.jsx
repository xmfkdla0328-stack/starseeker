import React from 'react';

/**
 * 캐릭터 스킬 정보 표시 컴포넌트
 * 스킬 타입, 이름, 설명을 카드 형식으로 표시
 * 필살기의 경우 한계 돌파 보너스를 함께 표시
 */
export const SkillBlock = ({ 
  type, 
  name, 
  desc, 
  colorClass, 
  level = 1, 
  cooldown, 
  accentClass,
  isUltimate = false,
  ultLevel = 0,
  descWithBonus = null // 한계 돌파 보너스가 포함된 설명
}) => {
  // 한계 돌파 보너스 계산: 1: 20%, 2: 30%, 3: 40%, 4: 50%, 5: 70%
  const bonusLevels = [20, 30, 40, 50, 70];
  const breakthroughBonus = (isUltimate && ultLevel > 0) 
    ? bonusLevels[ultLevel - 1] || 0
    : 0;
  
  const breakthroughBadge = breakthroughBonus > 0 
    ? `(+${breakthroughBonus}%)` 
    : null;

  return (
    <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 flex gap-3 items-center">
      <div className={`w-8 h-8 rounded flex items-center justify-center text-[10px] shrink-0 border bg-opacity-20 ${colorClass}`}>
        {type}
      </div>
      <div className="flex-1">
        <div className={`text-sm font-bold flex items-center gap-2 flex-wrap ${accentClass || 'text-slate-200'}`}>
          {name}
          <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-slate-300">Lv.{level}</span>
          {breakthroughBadge && (
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 font-semibold">
              {breakthroughBadge}
            </span>
          )}
          {cooldown !== undefined && (
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800/60 border border-white/10 text-slate-300">CT {cooldown}T</span>
          )}
        </div>
        <div className="text-xs text-slate-500">
          {descWithBonus || desc}
        </div>
      </div>
    </div>
  );
};
