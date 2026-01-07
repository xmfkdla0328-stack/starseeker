import React, { useMemo, useState } from 'react';
import { ArrowLeft, Brain, Gem, Sparkles, Shield, Sword, FlaskConical } from 'lucide-react';
import { DUNGEONS, DUNGEON_CATEGORIES, DUNGEON_TYPES } from '../data/dungeonData';

const typeIcons = {
  [DUNGEON_TYPES.MEMORY]: Brain,
  [DUNGEON_TYPES.STARSTONE]: Gem,
  [DUNGEON_TYPES.STIGMA]: FlaskConical,
};

const rewardLabel = {
  exp_chip: '기억 추출물',
  gold: '성석',
  star_fragment: '별의 파편',
};

const ExtractionScreen = ({ setScreen, onStartExtraction, party }) => {
  const [category, setCategory] = useState(DUNGEON_TYPES.MEMORY);
  const stages = useMemo(() => DUNGEONS[category] || [], [category]);
  const [selectedStage, setSelectedStage] = useState(() => stages[0] || null);

  const handleCategoryChange = (key) => {
    setCategory(key);
    setSelectedStage((DUNGEONS[key] || [])[0] || null);
  };

  const handleStart = () => {
    if (!selectedStage) return;
    const partySize = party?.members?.filter((m) => m).length || 0;
    if (partySize === 0) {
      alert('최소 1명의 파티원이 필요합니다.');
      return;
    }
    onStartExtraction?.(selectedStage);
  };

  return (
    <div className="min-h-screen bg-slate-950/90 text-white flex relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.06),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.08),transparent_40%)]" />

      <header className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center gap-4 border-b border-white/10 backdrop-blur-xl bg-slate-900/50">
        <button
          onClick={() => setScreen('OBSERVATION')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-cyan-300/70 font-mono tracking-[0.3em]">RESOURCE EXTRACTION</p>
          <h1 className="text-2xl font-bold text-white">자원 추출</h1>
        </div>
        <div className="text-right text-xs text-slate-400 font-mono">
          <div>MEM / STAR / STG</div>
          <div className="text-cyan-300">3 Sectors Online</div>
        </div>
      </header>

      <div className="flex w-full pt-20">
        <aside className="w-[280px] border-r border-white/10 bg-slate-900/40 backdrop-blur-md p-4 space-y-3">
          {DUNGEON_CATEGORIES.map((cat) => {
            const Icon = typeIcons[cat.key] || Shield;
            const isActive = category === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 backdrop-blur-sm ${
                  isActive
                    ? `border-cyan-400/50 bg-gradient-to-r ${cat.accent}`
                    : 'border-white/10 bg-white/5 hover:border-cyan-300/40'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center border border-white/10">
                  <Icon className="w-5 h-5 text-cyan-200" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">{cat.title}</div>
                  <div className="text-xs text-slate-300/80">{cat.subtitle}</div>
                </div>
              </button>
            );
          })}
        </aside>

        <main className="flex-1 p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {stages.map((stage) => {
              const isSelected = selectedStage?.id === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage)}
                  className={`relative text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-sm ${
                    isSelected
                      ? 'border-cyan-400/60 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 shadow-[0_0_20px_rgba(34,211,238,0.25)]'
                      : 'border-white/10 bg-white/5 hover:border-cyan-300/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-cyan-200/70 font-mono tracking-widest">STAGE</div>
                      <div className="text-lg font-bold text-white">{stage.name}</div>
                    </div>
                    <div className="flex flex-col items-end text-xs text-slate-300">
                      <span>요구 레벨 {stage.level}</span>
                      <span className="text-cyan-200 font-semibold">전투력 {stage.power}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-300" />
                    <span>추천 파티 전투력 {Math.round(stage.power * 0.9)}+</span>
                  </div>

                  <div className="mt-4 text-xs text-slate-400 uppercase tracking-wide">보상</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {stage.rewards.map((r) => (
                      <span key={r.id} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white">
                        {rewardLabel[r.id] || r.id} +{r.count}
                      </span>
                    ))}
                  </div>

                  {isSelected && (
                    <div className="absolute inset-0 border border-cyan-400/50 rounded-2xl pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="space-y-1 text-sm text-slate-200">
              <div className="text-xs text-cyan-300/70 font-mono">선택된 스테이지</div>
              <div className="text-lg font-bold text-white">{selectedStage?.name || '스테이지를 선택하세요'}</div>
              {selectedStage && (
                <div className="text-xs text-slate-300">필요 레벨 {selectedStage.level} · 예상 적 전투력 {selectedStage.power}</div>
              )}
            </div>
            <button
              onClick={handleStart}
              disabled={!selectedStage}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold border border-cyan-300 shadow-lg hover:scale-[1.01] transition disabled:opacity-40"
            >
              추출 시작
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExtractionScreen;
