import React from 'react';
import { Swords, Gift } from 'lucide-react';
import { ElementIcon } from '../common/ElementIcon';

/**
 * 관측 화면 하단 정보 패널
 * @param {Object} props
 * @param {Object} props.selectedStage - 선택된 스테이지
 * @param {boolean} props.isDeploying - 배치 진행 상태
 * @param {Function} props.onEngage - 관측 개시 핸들러
 */
export const ObservationInfoPanel = ({ selectedStage, isDeploying, onEngage }) => {
  if (!selectedStage) return null;

  return (
    <div className="relative z-40 px-4 md:px-8 py-6 pb-8 md:pb-12 border-t border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-x-hidden">
      {/* 상단 스캔라인 장식 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* 좌: 위협 정보 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyan-300 mb-2">
            <Swords className="w-4 h-4" />
            <h3 className="text-sm font-bold tracking-wider font-mono">관측 데이터</h3>
          </div>
          <div className="pl-6 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-400" />
              <span>Classification: <span className={selectedStage.textColor}>{selectedStage.shortName}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-yellow-400" />
              <span>Danger Level: {selectedStage.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-400" />
              <span>Status: Active</span>
            </div>
          </div>
        </div>

        {/* 중앙: 속성 정보 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyan-300 mb-2">
            <div className="w-4 h-4 rounded-full border-2 border-cyan-400" />
            <h3 className="text-sm font-bold tracking-wider font-mono">주요 속성</h3>
          </div>
          <div className="pl-6 flex items-center gap-2">
            <ElementIcon element="FIRE" size={20} />
            <ElementIcon element="WATER" size={20} />
            <ElementIcon element="WIND" size={20} />
            <span className="text-xs text-slate-400 ml-2">Multiple elements detected</span>
          </div>
        </div>

        {/* 우: 보상 정보 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyan-300 mb-2">
            <Gift className="w-4 h-4" />
            <h3 className="text-sm font-bold tracking-wider font-mono">획득 보상</h3>
          </div>
          <div className="pl-6 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span>Star Fragments x5-10</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💎</span>
              <span>Stellar Dust x100-200</span>
            </div>
          </div>
        </div>
      </div>

      {/* 관측 개시 버튼 - 네온 캡슐 스타일 */}
      <div className="mt-6 flex justify-center md:justify-end">
        <button
          onClick={onEngage}
          disabled={isDeploying}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg tracking-widest transition-all duration-300 border font-serif ${
            isDeploying
              ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed border-slate-700'
              : 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:bg-cyan-500/30 transform hover:scale-105'
          }`}
        >
          {isDeploying ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              배치 중...
            </span>
          ) : (
            '► 관측 개시'
          )}
        </button>
      </div>
    </div>
  );
};
