import React, { useMemo, useState } from 'react';
import { CharacterStatsGrid } from './CharacterStatsGrid';
import { BreakthroughDisplay } from './BreakthroughDisplay';
import { LevelCapDisplay } from './LevelCapDisplay';
import { CharacterSkillsList } from './CharacterSkillsList';
import { getLevelFromExp, calculateStatsByLevel, LEVEL_EXP_TABLE } from '../../data/levelSystem';
import { getMaxLevelByBreakthrough } from '../../data/breakthroughItems';

/**
 * 캐릭터 전투 정보 탭 컴포넌트
 * 스탯 및 스킬 정보 표시
 */
export const CharacterInfoTab = ({ charData, getSkillInfo, items, expPerChip = 200, onLevelUp, onBreakthrough }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chipsToUse, setChipsToUse] = useState(1);

  const levelCap = useMemo(() => getMaxLevelByBreakthrough(charData.breakthrough || 0), [charData.breakthrough]);
  const ownedChips = items?.exp_chip || 0;
  const baseExp = typeof charData.exp === 'number' ? charData.exp : (LEVEL_EXP_TABLE[charData.level || 1] || 0);
  const currentDef = charData.currentDef || charData.baseDef || 30;

  const preview = useMemo(() => {
    const totalGain = Math.max(0, chipsToUse) * expPerChip;
    const cappedExp = Math.min(baseExp + totalGain, LEVEL_EXP_TABLE[levelCap] || baseExp + totalGain);
    const { level: nextLevel } = getLevelFromExp(cappedExp);
    const stats = calculateStatsByLevel(
      charData.baseAtk || charData.currentAtk || 100,
      charData.baseHp || charData.currentHp || 1000,
      nextLevel,
      charData.breakthrough || 0,
      charData.baseDef || charData.currentDef || 30
    );
    return { nextLevel, nextAtk: stats.atk, nextHp: stats.hp, nextDef: stats.def, expAfter: cappedExp };
  }, [chipsToUse, expPerChip, baseExp, levelCap, charData]);

  const handleConfirm = () => {
    if (!onLevelUp) return;
    if (chipsToUse <= 0) return;
    onLevelUp(charData.uid || charData.id, chipsToUse);
    setIsModalOpen(false);
  };

  const canLevelUp = (charData.level || 1) < levelCap;

  return (
    <div className="space-y-6 relative z-10 animate-fade-in pt-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-cyan-200 tracking-wide">레벨 & 성장</div>
        {canLevelUp ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-100 hover:bg-cyan-500/30 transition"
          >
            레벨업
          </button>
        ) : (
          <button
            onClick={onBreakthrough}
            className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-100 hover:bg-amber-500/30 transition"
          >
            돌파 준비
          </button>
        )}
      </div>

      {/* 스탯 그리드 */}
      <CharacterStatsGrid charData={charData} />

      {/* 레벨 캡 및 돌파 정보 */}
      <LevelCapDisplay charData={charData} items={items} onBreakthrough={onBreakthrough} />

      {/* 돌파 정보 (필살기) */}
      <BreakthroughDisplay ultLevel={charData.ultLevel} />

      {/* 스킬 목록 */}
      <CharacterSkillsList charData={charData} getSkillInfo={getSkillInfo} ultLevel={charData.ultLevel || 0} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-900/80 border border-cyan-400/30 rounded-2xl p-6 w-[420px] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-cyan-100">기억 추출물 주입</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-white">✕</button>
            </div>

            <div className="text-sm text-slate-300">보유 기억 추출물: {ownedChips}개</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setChipsToUse((v) => Math.max(1, v - 1))}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10"
              >
                -
              </button>
              <div className="flex-1 text-center text-lg font-semibold text-white">{chipsToUse}개 사용</div>
              <button
                onClick={() => setChipsToUse((v) => Math.min(ownedChips, v + 1))}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10"
              >
                +
              </button>
            </div>

            <div className="p-3 rounded-lg border border-white/10 bg-white/5 text-sm text-slate-200 space-y-1">
              <div>예상 레벨: <span className="text-cyan-200">Lv.{charData.level} → Lv.{preview.nextLevel}</span> (Max {levelCap})</div>
              <div>ATK: {charData.currentAtk || charData.baseAtk} → {preview.nextAtk}</div>
              <div>HP: {charData.currentHp || charData.baseHp} → {preview.nextHp}</div>
              <div>DEF: {currentDef} → {preview.nextDef}</div>
            </div>

            <button
              disabled={chipsToUse <= 0 || ownedChips <= 0}
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl bg-cyan-500/80 text-slate-900 font-bold hover:bg-cyan-400 transition disabled:opacity-40"
            >
              성장 (기억 추출물 {chipsToUse}개)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
