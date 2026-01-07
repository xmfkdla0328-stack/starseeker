import React from 'react';
import { StarField } from './observation/StarField';
import { ObservationHeader } from './observation/ObservationHeader';
import { ObservationSidebar } from './observation/ObservationSidebar';
import { ObservationViewport } from './observation/ObservationViewport';
import { ObservationInfoPanel } from './observation/ObservationInfoPanel';
import { useObservationState } from '../hooks/useObservationState';
import { useObservationHandlers } from '../hooks/useObservationHandlers';
import './ObservationConsole.css';

/**
 * 관측 콘솔 (Observatory Console)
 * Master-Detail View: 좌측 스테이지 리스트 + 우측 뷰포트
 */
const ObservationScreen = ({ setScreen, startBattle, party }) => {
  // 관측 상태 훅
  const {
    selectedStage,
    setSelectedStage,
    isTransitioning,
    setIsTransitioning,
    isDeploying,
    setIsDeploying,
    observations,
  } = useObservationState();

  // 관측 핸들러 훅
  const {
    handleStageSelect,
    handleEngage,
  } = useObservationHandlers({
    selectedStage,
    isTransitioning,
    isDeploying,
    party,
    setSelectedStage,
    setIsTransitioning,
    setIsDeploying,
    setScreen,
    startBattle,
  });

  return (
    <div className="h-screen w-screen bg-transparent text-white flex relative overflow-hidden flex-col">
      {/* 배경: 암흑 우주 (투명) */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-950/30 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
        <StarField count={200} variant="outside" />
      </div>

      {/* 배경 그리드 라인 (더 희미하게) */}
      <div className="absolute inset-0 opacity-3 pointer-events-none z-0">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 상단 헤더 */}
      <div className="relative z-20">
        <ObservationHeader onBackClick={() => setScreen('HOME')} />
      </div>

      {/* 좌측/우측 콘텐츠 영역 */}
      <div className="flex-1 flex relative overflow-hidden z-10">
        {/* 좌측: 관측 로그 (Stage List) */}
        <ObservationSidebar
          observations={observations}
          selectedStage={selectedStage}
          onStageSelect={handleStageSelect}
        />

        {/* 우측: 뷰포트 + 정보 패널 (스크롤 가능) */}
        <div className="flex-1 relative flex flex-col overflow-y-auto overflow-x-hidden">
          {/* 망원경 렌즈 영역 */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <ObservationViewport
              selectedStage={selectedStage}
              isTransitioning={isTransitioning}
            />
          </div>

          {/* 하단 정보 패널 */}
          <div className="flex-shrink-0">
            <ObservationInfoPanel
              selectedStage={selectedStage}
              isDeploying={isDeploying}
              onEngage={handleEngage}
            />
          </div>
        </div>
      </div>

      {/* 배포 중 전체 오버레이 */}
      {isDeploying && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-2xl font-bold text-cyan-400 tracking-widest">관측 시작</div>
            <div className="text-sm text-slate-400">전투 시스템 준비 중...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObservationScreen;
