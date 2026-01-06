import React, { useState } from 'react';
import { ChevronLeft, Lock, AlertTriangle, Swords, Gift } from 'lucide-react';
import { observations as observationDefs } from '../data/observations';
import { StarField } from './observation/StarField';
import { ObservationBody } from './observation/ObservationBody';
import { ElementIcon } from './common/ElementIcon';
import './ObservationConsole.css';

/**
 * 관측 콘솔 (Observatory Console)
 * Master-Detail View: 좌측 스테이지 리스트 + 우측 뷰포트
 */
export const ObservationScreen = ({ setScreen, startBattle, party }) => {
  const [selectedStage, setSelectedStage] = useState(observationDefs[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  
  const observations = observationDefs;

  // 스테이지 선택 핸들러
  const handleStageSelect = (stage) => {
    if (selectedStage?.id === stage.id || isTransitioning) return;
    
    setIsTransitioning(true);
    setSelectedStage(stage);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // 관측 개시 핸들러
  const handleEngage = () => {
    if (!selectedStage || isDeploying) return;
    
    // 파티 체크 - 최소 1명 이상 필요
    const partyChars = party.members.filter((c) => c !== null);
    if (partyChars.length === 0) {
      alert('최소 1명의 캐릭터가 필요합니다.');
      return;
    }
    
    // 스테이지별 처리
    if (selectedStage.id === 'RUIN') {
      // 자원 관측 → 자원 추출 화면으로
      setIsDeploying(true);
      setTimeout(() => {
        setScreen('EXTRACTION');
      }, 800);
    } else if (selectedStage.id === 'CALAMITY') {
      setIsDeploying(true);
      startBattle();
      setTimeout(() => {
        setScreen('BATTLE');
      }, 1000);
    } else {
      setIsDeploying(true);
      setTimeout(() => {
        setScreen('PARTY');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex relative overflow-hidden">
      {/* 배경: 암흑 우주 (투명) */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-950/30 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <StarField count={200} variant="outside" />
      </div>

      {/* 배경 그리드 라인 (더 희미하게) */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 상단 헤더 - 유리 패널 */}
      <div className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex items-center gap-4 border-b border-white/10 backdrop-blur-xl bg-slate-900/40">
        <button
          onClick={() => setScreen('HOME')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-serif font-bold bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 text-transparent tracking-wider">
            우주 망원경 제어실
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 tracking-widest font-mono">DEEP SPACE OBSERVATION SYSTEM</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-cyan-400/60 tracking-wider font-mono">STATUS</div>
          <div className="text-sm text-green-400 font-bold font-mono">● OPERATIONAL</div>
        </div>
      </div>

      {/* === 좌측: 관측 로그 (Stage List) - 유리 패널 === */}
      <div className="relative w-[30%] min-w-[320px] pt-20 z-40 border-r border-white/10 bg-slate-900/30 backdrop-blur-md">
        {/* 패널 헤더 */}
        <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-slate-900/40 to-transparent relative">
          <h2 className="text-sm font-bold text-cyan-200 tracking-widest">관측 기록</h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">Detected Anomalies</p>
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400/50 to-transparent"></div>
        </div>

        {/* 스테이지 리스트 */}
        <div className="overflow-y-auto h-[calc(100vh-140px)] px-4 py-4 space-y-3 custom-scrollbar">
          {observations.map((stage, index) => {
            const isSelected = selectedStage?.id === stage.id;
            const isLocked = false; // TODO: 잠금 로직 추가
            
            return (
              <button
                key={stage.id}
                onClick={() => !isLocked && handleStageSelect(stage)}
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

      {/* === 우측: 뷰포트 (Main Viewport) === */}
      <div className="flex-1 relative pt-20 flex flex-col">
        {/* 망원경 렌즈 영역 */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* 중앙 원형 렌즈 */}
          <div 
            className={`relative transition-all duration-700 ease-out ${
              isTransitioning ? 'scale-110 rotate-12 opacity-0' : 'scale-100 rotate-0 opacity-100'
            }`}
            style={{
              width: 'min(60vw, 60vh)',
              height: 'min(60vw, 60vh)',
            }}
          >
            {/* 외부 링 프레임 */}
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20" />
            <div className="absolute -inset-2 rounded-full border border-cyan-400/20" />
            
            {/* 렌즈 내부 */}
            <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-radial from-indigo-950/80 via-slate-950 to-black shadow-inner">
              {/* 배경 별 */}
              <StarField count={80} variant="inside" />
              
              {/* 포커스 그리드 */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" strokeDasharray="8,8" />
                  <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="0.5" strokeDasharray="8,8" />
                  <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" className="text-cyan-500" strokeWidth="0.5" opacity="0.3" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" className="text-cyan-500" strokeWidth="0.5" opacity="0.3" />
                </svg>
              </div>

              {/* 중앙 조준점 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full border border-cyan-400/40" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/80" />
                </div>
              </div>

              {/* 선택된 스테이지 비주얼 */}
              {selectedStage && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className={`transition-all duration-500 ${
                    isTransitioning ? 'scale-50 opacity-0 rotate-180' : 'scale-100 opacity-100 rotate-0'
                  }`}>
                    {/* 외부 글로우 */}
                    <div className={`absolute -inset-16 rounded-full blur-3xl bg-gradient-to-r ${selectedStage.glowColor} opacity-60`} />
                    
                    {/* 행성/별 본체 */}
                    <div className="relative">
                      <ObservationBody obs={selectedStage} isHovered={false} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 렌즈 반사광 효과 */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 40%)',
              }}
            />
          </div>

          {/* 스캔 라인 효과 */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan" />
          </div>
        </div>

        {/* 하단 정보 패널 - 유리 패널 */}
        {selectedStage && (
          <div className="relative z-40 px-8 pb-8 pt-6 border-t border-white/10 bg-slate-900/60 backdrop-blur-xl">
            {/* 상단 스캔라인 장식 */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
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
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleEngage}
                disabled={isDeploying}
                className={`px-8 py-4 rounded-full font-bold text-lg tracking-widest transition-all duration-300 border font-serif ${
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
        )}
      </div>

      {/* 배포 중 전체 오버레이 */}
      {isDeploying && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
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
