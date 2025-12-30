/**
 * 전투 커맨드 패널 (UI 전용)
 * - 캐릭터 선택, 액션 버튼(일반/스킬/필살기) 표시
 * - 현재 전투 로직에는 연결되어 있지 않음 (추후 통합 예정)
 */
import React from 'react';
import { Sword, Sparkles, Zap, MousePointer2 } from 'lucide-react';
import { ELEMENTS } from '../../constants/index';

export const CommandPanel = ({ allies, selectedAllyUid, onSelectAlly, onSelectAction }) => {
  const selected = allies.find(a => a.uid === selectedAllyUid) || allies[0];
  const actionGauge = selected ? selected.actionGauge ?? 0 : 0;
  const maxGauge = selected ? selected.maxActionGauge ?? 1000 : 1000;
  const gaugePercent = Math.max(0, Math.min(100, (actionGauge / maxGauge) * 100));
  const readyUltimate = gaugePercent >= 100 && !selected?.isDead;

  return (
    <div className="bg-slate-950/85 border border-white/10 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Command</div>
        <div className="flex items-center gap-1 text-[11px] text-slate-300">
          <MousePointer2 size={12} /> 조작 준비
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] text-slate-400">대상 선택</p>
        <div className="flex flex-wrap gap-2">
          {allies.map((ally) => {
            const element = ELEMENTS[ally.element] || ELEMENTS.LIGHT;
            const isSelected = ally.uid === selected?.uid;
            return (
              <button
                key={ally.uid}
                onClick={() => onSelectAlly?.(ally.uid)}
                className={`px-2 py-1 rounded-lg text-[11px] border transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-500/20 text-white border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-cyan-200/40'
                }`}
              >
                <span className={`font-bold ${element.color}`}>{ally.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] text-slate-400">행동 선택 (미연동 UI)</p>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => onSelectAction?.('normal')}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-100 hover:border-emerald-300/50 hover:bg-emerald-500/10 transition"
          >
            <span className="flex items-center gap-2 text-sm font-semibold"><Sword size={14}/> 일반 공격</span>
            <span className="text-[11px] text-slate-300">기본</span>
          </button>
          <button
            onClick={() => onSelectAction?.('skill')}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-100 hover:border-blue-300/50 hover:bg-blue-500/10 transition"
          >
            <span className="flex items-center gap-2 text-sm font-semibold"><Sparkles size={14}/> 스킬</span>
            <span className="text-[11px] text-slate-300">쿨타임 기반</span>
          </button>
          <button
            onClick={() => onSelectAction?.('ultimate')}
            disabled={!readyUltimate}
            className={`flex items-center justify-between px-3 py-2 rounded-xl border text-slate-100 transition ${
              readyUltimate
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-300/60 hover:from-amber-500/30 hover:to-orange-500/30 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-500 cursor-not-allowed'
            }`}
            title={readyUltimate ? '필살기 사용 가능' : '게이지가 부족합니다'}
          >
            <span className="flex items-center gap-2 text-sm font-semibold"><Zap size={14}/> 필살기</span>
            <span className="text-[11px] text-slate-300">게이지 {Math.round(gaugePercent)}%</span>
          </button>
        </div>
      </div>

      <div className="mt-auto text-[11px] text-slate-500">
        * 현재는 연출/UI만 제공됩니다. 추후 전투 로직에 통합 예정.
      </div>
    </div>
  );
};
