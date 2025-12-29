import React from 'react';
import { Unlock, Lock } from 'lucide-react';
import { getMaxLevelByBreakthrough, checkBreakthroughRequired, BREAKTHROUGH_ITEM_DATA, getRequiredFragmentId } from '../../data/breakthroughItems';
import { ELEMENTS } from '../../constants/elements';

/**
 * 레벨 캡 및 돌파 정보 표시 컴포넌트
 */
export const LevelCapDisplay = ({ charData, items, onBreakthrough }) => {
  const breakthrough = charData.breakthrough || 0;
  const maxLevel = getMaxLevelByBreakthrough(breakthrough);
  const breakthroughInfo = checkBreakthroughRequired(charData);
  const isLevelCapped = charData.level >= maxLevel && breakthroughInfo;
  
  // 최대 돌파 단계(3)에 도달했고 레벨도 최대(60)이면 표시 안 함
  if (breakthrough >= 3 && charData.level >= 60) {
    return null;
  }
  
  // 레벨 캡에 도달했거나 돌파 가능한 상태가 아니면 표시 안 함
  if (!isLevelCapped && !breakthroughInfo) {
    return null;
  }

  const fragmentId = getRequiredFragmentId(charData.element);
  const fragmentData = BREAKTHROUGH_ITEM_DATA[fragmentId];
  const currentFragments = items?.[fragmentId] || 0;
  const requiredFragments = breakthroughInfo?.requiredFragments || 0;
  const canBreakthrough = currentFragments >= requiredFragments;

  const elementInfo = ELEMENTS[charData.element];

  return (
    <div className={`border rounded-lg p-4 ${
      isLevelCapped 
        ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30' 
        : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/20'
    }`}>
      <div className="space-y-3">
        {/* 레벨 캡 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isLevelCapped ? (
              <Lock className="w-4 h-4 text-orange-400" />
            ) : (
              <Unlock className="w-4 h-4 text-blue-400" />
            )}
            <span className="text-sm font-bold text-slate-300">
              {isLevelCapped ? '레벨 한계 도달' : '돌파 가능'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">최대 레벨</span>
            <span className="text-lg font-bold text-slate-200">{maxLevel}</span>
          </div>
        </div>

        {/* 돌파 단계 표시 */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">돌파 단계</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((stage) => (
              <div
                key={stage}
                className={`w-8 h-2 rounded-full transition-all ${
                  stage < breakthrough
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                    : stage === breakthrough && breakthroughInfo
                    ? 'bg-orange-400/50 animate-pulse'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-300">{breakthrough}/3</span>
        </div>

        {/* 돌파 요구사항 */}
        {breakthroughInfo && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">돌파 조건</span>
              <span className="text-xs text-slate-300">
                레벨 {breakthroughInfo.requiredLevel} 이상
              </span>
            </div>
            
            {/* 필요 아이템 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{fragmentData.icon}</span>
                <span className={`text-xs font-medium ${elementInfo.color}`}>
                  {fragmentData.name}
                </span>
              </div>
              <span className={`text-sm font-bold ${
                canBreakthrough ? 'text-green-400' : 'text-red-400'
              }`}>
                {currentFragments} / {requiredFragments}
              </span>
            </div>

            {/* 돌파 보너스 미리보기 */}
            <div className="bg-black/20 rounded p-2 space-y-1">
              <span className="text-xs text-slate-400 block">돌파 시 추가 보너스:</span>
              <div className="flex gap-3 text-xs">
                <span className="text-red-300">공격력 +{breakthroughInfo.statBonus.atk}</span>
                <span className="text-green-300">체력 +{breakthroughInfo.statBonus.hp}</span>
                <span className="text-blue-300">방어력 +{breakthroughInfo.statBonus.def}</span>
              </div>
            </div>

            {/* 돌파 버튼 */}
            {onBreakthrough && (
              <button
                onClick={() => onBreakthrough(charData)}
                disabled={!canBreakthrough}
                className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition-all ${
                  canBreakthrough
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                {canBreakthrough ? '레벨 한계 돌파' : '재료 부족'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
