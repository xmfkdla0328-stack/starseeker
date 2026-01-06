import React from 'react';
import { Lock, AlertTriangle } from 'lucide-react';

/**
 * 관측 화면 좌측 사이드바 (스테이지 리스트)
 * @param {Object} props
 * @param {Array} props.observations - 관측 스테이지 목록
 * @param {Object} props.selectedStage - 현재 선택된 스테이지
 * @param {Function} props.onStageSelect - 스테이지 선택 핸들러
 */
export const ObservationSidebar = ({ observations, selectedStage, onStageSelect }) => {
  return (
    <div className="relative w-[30%] min-w-[280px] md:min-w-[320px] z-40 border-r border-white/10 bg-slate-900/30 backdrop-blur-md flex flex-col">
      {/* 패널 헤더 */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-slate-900/40 to-transparent relative">
        <h2 className="text-sm font-bold text-cyan-200 tracking-widest">관측 기록</h2>
        <p className="text-xs text-slate-400 mt-1 font-mono">Detected Anomalies</p>
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400/50 to-transparent"></div>
      </div>

      {/* 스테이지 리스트 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
        {observations.map((stage, index) => {
          const isSelected = selectedStage?.id === stage.id;
          const isLocked = false; // TODO: 잠금 로직 추가
          
          return (
            <button
              key={stage.id}
              onClick={() => !isLocked && onStageSelect(stage)}
              disabled={isLocked}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
                isSelected
                  ? 'border-cyan-400/50 bg-slate-800/60 shadow-[inset_0_0_15px_rgba(34,211,238,0.15)]'
                  : isLocked
                  ? 'border-slate-700/30 bg-slate-950/30 opacity-50 cursor-not-allowed'
                  : 'border-white/10 bg-slate-900/30 hover:border-cyan-400/40 hover:bg-slate-800/40'
              }`}
            >
              {/* 선택된 아이템 - 좌측 표시기 */}
              {isSelected && (
                <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-400/50 to-transparent rounded-l-lg"></div>
              )}
              
              {/* 잠금 오버레이 */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <Lock className="w-8 h-8 text-slate-600" />
                </div>
              )}

              <div className="relative z-10">
                {/* 섹터 번호 */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400/70 tracking-widest">
                    SECTOR {String(index + 1).padStart(2, '0')}
                  </span>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/80" />
                  )}
                </div>

                {/* 재앙 명칭 */}
                <h3 className={`text-lg font-bold mb-1 ${stage.textColor}`}>
                  {stage.name}
                </h3>

                {/* 짧은 설명 */}
                <p className="text-xs text-slate-400 mb-2 line-clamp-2">
                  {stage.description}
                </p>

                {/* 위험도 */}
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-slate-300 font-semibold">
                    위험도: {stage.level}
                  </span>
                </div>
              </div>

              {/* 하단 액센트 라인 */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
