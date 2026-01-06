import React, { useEffect, useRef, useState } from 'react';
import PhaserGame from './battle/PhaserGame';
import { checkBattleResult, BattleResult } from '../utils/battle/battleUtils';
import { MISSION_TYPES } from '../constants/battle';
import { REACTION_NAMES, BATTLE_TIMING } from '../constants/battleConstants';
import SoundManager, { AUDIO_KEYS } from '../utils/audio/SoundManager';

// Context
import { useUI, usePlayer } from '../context/useGameContext';

// UI 컴포넌트
import TurnOrderPanel from './battle/sub/TurnOrderPanel';
import ControlDeck from './battle/sub/ControlDeck';
import MissionBanner from './battle/sub/MissionBanner';
import EnemyStatusBar from './battle/sub/EnemyStatusBar';
import TurnIndicator from './battle/ui/TurnIndicator';
import PauseButton from './battle/ui/PauseButton';
import PauseMenu from './battle/ui/PauseMenu';
import BattleResultModal from './battle/ui/BattleResultModal';

// 커스텀 훅
import { useTurnSystem } from '../hooks/useTurnSystem';
import { useBattleAction } from '../hooks/useBattleAction';

/**
 * 속성 반응 타입을 한글 이름으로 변환
 */
const getReactionName = (reactionType) => {
  return REACTION_NAMES[reactionType] || reactionType;
};

/**
 * BattleScreen 컴포넌트
 * Phaser 게임 엔진 기반의 전투 화면을 표시합니다.
 * 미션 게이지, 속성 반응 결과 등을 UI로 표시합니다.
 * @param {{
 *  partyData: any[],
 *  enemyData: object,
 *  missionType?: any,
 *  handleAttackResult?: Function,
 *  extractionRewards?: Array,
 *  onVictory?: Function,
 * }} props
 */
export const BattleScreen = ({ 
  partyData, 
  enemyData, 
  missionType,
  handleAttackResult,
  extractionRewards,
  onVictory,
}) => {
  // Context에서 setScreen과 addExp 가져오기
  const { setScreen } = useUI();
  const { addExp } = usePlayer();
  // 전투 상태
  const [battleStatus, setBattleStatus] = useState({
    missionGauge: 0,
    enemyHp: enemyData?.maxHp || 100,
    lastReaction: null,
    lastDamage: 0,
    turn: 'PLAYER',
    actionPoints: partyData?.length || 4,
    result: BattleResult.NONE,
    isEnemyAttacking: false,
  });

  const [battleSession, setBattleSession] = useState(0);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [showRetreatConfirm, setShowRetreatConfirm] = useState(false);
  const [showMissionComplete, setShowMissionComplete] = useState(false);
  const hasLoggedTurnInit = useRef(false);
  const lastAdvancedTurnId = useRef(null);
  const missionCompleteShown = useRef(false);
  const battleStartTimeRef = useRef(null);

  useEffect(() => {
    hasLoggedTurnInit.current = false;
    lastAdvancedTurnId.current = null;
    missionCompleteShown.current = false;
    battleStartTimeRef.current = null;
  }, [battleSession]);

  // 미션 달성 시각 효과
  useEffect(() => {
    if (battleStatus.missionGauge >= 100 && !missionCompleteShown.current && battleStatus.result === BattleResult.NONE) {
      missionCompleteShown.current = true;
      setShowMissionComplete(true);
      SoundManager.playSFX(AUDIO_KEYS.SFX_WIN, { volume: 0.6 });
      
      setTimeout(() => {
        setShowMissionComplete(false);
      }, 2500);
    }
  }, [battleStatus.missionGauge, battleStatus.result]);


  // 턴 시스템 훅
  const {
    turnQueue,
    setTurnQueue,
    partyState,
    setPartyState,
    selectedCharacter,
    activeTurn,
    activeCharacter,
    nextTurn,
    lastResolvedTurnId,
    setLastResolvedTurnId,
      isWaitingAnimation,
      setIsWaitingAnimation,
      resumeTurn,
  } = useTurnSystem(partyData, enemyData, battleSession);

  // 전투 액션 훅
  const {
    handleAttackComplete: onAttackComplete,
    handleEnemyAttackResult: onEnemyAttackResult,
    triggerSkillSelection,
  } = useBattleAction({
    setPartyState,
    setBattleStatus,
    setTurnQueue,
    partyDataLength: partyData?.length || 0,
    enemyMaxHp: enemyData?.maxHp || 100,
  });

  // BGM 정리
  useEffect(() => {
    return () => {
      SoundManager.stopBGM();
    };
  }, []);

  // 턴 큐가 생성되었을 때 로그 출력 및 첫 턴 시작 확인
  useEffect(() => {
    if (hasLoggedTurnInit.current) return;
    if (turnQueue.length > 0) {
      console.log('[BattleScreen] 턴 큐 생성 확인:', turnQueue.map(t => `${t.name}(${t.speed})`), '길이:', turnQueue.length);
      if (activeTurn) {
        console.log('[BattleScreen] 첫 번째 턴 시작:', activeTurn.name);
      }
      hasLoggedTurnInit.current = true;
    }
  }, [turnQueue, activeTurn]);

  // 적 턴 자동 실행 감시
  useEffect(() => {
    if (!activeTurn || activeTurn.type !== 'enemy') return undefined;
    if (battleStatus.result !== BattleResult.NONE) return undefined;
    if (isPauseOpen) return undefined;
    if (battleStatus.isEnemyAttacking) return undefined;
      if (isWaitingAnimation) return undefined;

    const timer = setTimeout(() => {
        console.log('[BattleScreen] 적 턴 시작 - 애니메이션 대기 잠금 활성화');
        setIsWaitingAnimation(true);
      setBattleStatus((prev) => ({ ...prev, isEnemyAttacking: true }));
      window.dispatchEvent(new CustomEvent('enemy-turn-start'));
    }, BATTLE_TIMING.ENEMY_TURN_DELAY);

    return () => clearTimeout(timer);
    }, [activeTurn, battleStatus.result, battleStatus.isEnemyAttacking, isPauseOpen, isWaitingAnimation, setIsWaitingAnimation]);

  // 이미 행동한 턴이 큐 맨 앞에 남아있으면 강제로 넘기기 (중복 호출 방지)
  useEffect(() => {
      if (isWaitingAnimation) return;
    if (!turnQueue?.length) return;
    const head = turnQueue[0];
    if (!head) return;

    if (lastResolvedTurnId && head.id === lastResolvedTurnId && head.id !== lastAdvancedTurnId.current) {
      console.warn(`[BattleScreen] 선두 턴이 이미 행동 완료 → 강제 회전 (${head.name})`);
      lastAdvancedTurnId.current = head.id;
      setLastResolvedTurnId(null);
      nextTurn();
    }
    }, [turnQueue, lastResolvedTurnId, nextTurn, isWaitingAnimation]);

  // 전투 결과에 따른 효과음
  useEffect(() => {
    if (battleStatus.result === BattleResult.VICTORY) {
      SoundManager.stopBGM();
      SoundManager.playSFX(AUDIO_KEYS.SFX_WIN, { volume: 0.85 });
    } else if (battleStatus.result === BattleResult.DEFEAT) {
      SoundManager.stopBGM();
      SoundManager.playSFX(AUDIO_KEYS.SFX_LOSE, { volume: 0.9 });
    }
  }, [battleStatus.result]);

  // 전투 종료 시 일시정지 메뉴 닫기
  useEffect(() => {
    if (battleStatus.result !== BattleResult.NONE) {
      setIsPauseOpen(false);
      setShowRetreatConfirm(false);
    }
  }, [battleStatus.result]);

  const isDataReady = partyData && Array.isArray(partyData) && partyData.length > 0 && !!enemyData && partyState && partyState.length > 0;

  // 전투 데이터가 준비되면 시작 시각 기록 (패배 체크 지연용)
  useEffect(() => {
    if (!isDataReady) return;
    if (!battleStartTimeRef.current) {
      battleStartTimeRef.current = Date.now();
    }
  }, [isDataReady]);

  // 아군 전멸 체크: 모든 파티원이 사망하면 즉시 패배 처리 (early return 전에 위치해야 함)
  useEffect(() => {
    // battleStatus.result로 직접 체크 (isBattleActive 변수 선언 전이므로)
    if (battleStatus.result !== BattleResult.NONE) return;
    if (!Array.isArray(partyState) || partyState.length === 0) return;
    if (!battleStartTimeRef.current || Date.now() - battleStartTimeRef.current < 800) return;

    const alive = partyState.filter((c) => c && typeof c.hp === 'number' && c.hp > 0).length;
    const checked = partyState.filter((c) => c && typeof c.hp === 'number').length;
    if (checked === 0) return; // 아직 HP 세팅 안 됨 → 패스
    if (alive > 0) return;

    console.warn('[BattleScreen] 아군 전멸 감지 → 패배 처리');
    setIsWaitingAnimation(false);
    setBattleStatus((prev) => ({
      ...prev,
      result: BattleResult.DEFEAT,
      turn: 'ENDED',
      isEnemyAttacking: false,
    }));
  }, [partyState, battleStatus.result, setBattleStatus, setIsWaitingAnimation]);

  if (!isDataReady) {
    return (
      <div className="flex items-center justify-center w-full h-full text-slate-200 bg-slate-950/70">
        데이터 로딩 중...
      </div>
    );
  }

  const gaugePercent = battleStatus.missionGauge;
  const showHud = battleStatus.result === BattleResult.NONE;
  const isBattleActive = battleStatus.result === BattleResult.NONE;

  // 액션 트리거 핸들러 (UI 즉시 잠금 및 쿨타임 반영)
  const handleNormalClick = () => {
    if (!activeTurn || activeTurn.type !== 'party') return;
    if (isWaitingAnimation) return; // 이미 대기 중이면 무시
    console.log('[BattleScreen] 일반 공격 트리거');
    setIsWaitingAnimation(true);
    lockPlayerInput();
    triggerSkillSelection(activeCharacter, 'normal', activeTurn.index);
  };

  const handleSkillClick = () => {
    if (!activeTurn || activeTurn.type !== 'party') return;
    if (isWaitingAnimation) return; // 이미 대기 중이면 무시
    if ((activeCharacter?.currentSkillCooldown || 0) > 0) return;
    console.log('[BattleScreen] 스킬 공격 트리거');
    setIsWaitingAnimation(true);
    lockPlayerInput();
    applyInstantSkillCooldown();
    triggerSkillSelection(activeCharacter, 'skill', activeTurn.index);
  };

  const handleUltimateClick = () => {
    if (!activeTurn || activeTurn.type !== 'party') return;
    if (isWaitingAnimation) return; // 이미 대기 중이면 무시
    console.log('[BattleScreen] 필살기 트리거');
    setIsWaitingAnimation(true);
    lockPlayerInput();
    triggerSkillSelection(activeCharacter, 'ultimate', activeTurn.index);
  };

  // 이벤트 핸들러
  const handlePauseOpen = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setIsPauseOpen(true);
    setShowRetreatConfirm(false);
  };

  const handleResumeBattle = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setIsPauseOpen(false);
    setShowRetreatConfirm(false);
  };

  const handleRetreatClick = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setShowRetreatConfirm(true);
  };

  const handleRetreatCancel = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setShowRetreatConfirm(false);
  };

  const handleRetreatConfirm = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    SoundManager.stopBGM();
    setIsPauseOpen(false);
    setShowRetreatConfirm(false);
    setScreen('HOME');
  };

  const handleBackToObservation = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    if (extractionRewards && onVictory && battleStatus.result === BattleResult.VICTORY) {
      onVictory(extractionRewards);
    } else {
      setScreen('OBSERVATION');
    }
  };

  const handleBattleRestart = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setBattleSession((s) => s + 1);
    setLastResolvedTurnId(null);
    setBattleStatus({
      missionGauge: 0,
      enemyHp: enemyData?.maxHp || 100,
      lastReaction: null,
      lastDamage: 0,
      turn: 'PLAYER',
      actionPoints: partyData?.length || 4,
      result: BattleResult.NONE,
      isEnemyAttacking: false,
    });
  };

  // 공격 완료 핸들러 (상위 컴포넌트 결과 전달 포함)
  const lockPlayerInput = () => {
    // Phaser 씬 입력 잠금 이벤트
    window.dispatchEvent(new CustomEvent('player-turn-locked'));
  };

  // 즉시 쿨타임 반영 도우미 (UI 재노출 방지)
  const applyInstantSkillCooldown = () => {
    if (!activeTurn || activeTurn.type !== 'party') return;
    const idx = activeTurn.index;
    setPartyState((prev) => {
      if (!Array.isArray(prev)) return prev;
      const updated = [...prev];
      const actor = updated[idx];
      if (!actor) return prev;
      const maxCd = actor.skillMaxCooldown || 3;
      if ((actor.currentSkillCooldown || 0) >= maxCd) return prev;
      updated[idx] = { ...actor, currentSkillCooldown: maxCd };
      return updated;
    });

    setTurnQueue((prevQueue) => {
      if (!Array.isArray(prevQueue)) return prevQueue;
      return prevQueue.map((t) => {
        if (t.type !== 'party' || t.index !== activeTurn.index) return t;
        const maxCd = t.data?.skillMaxCooldown || 3;
        return { ...t, data: { ...t.data, currentSkillCooldown: maxCd } };
      });
    });
  };

  const handleAttackCompleteWrapper = (result) => {
    console.log('[BattleScreen] 플레이어 공격 완료 처리');
    onAttackComplete(result);
    setLastResolvedTurnId(activeTurn?.id || null);
    lastAdvancedTurnId.current = activeTurn?.id || null;
    
    if (handleAttackResult) {
      handleAttackResult(result);
    }
  };

  // 적 공격 완료 핸들러
  const handleEnemyAttackResultWrapper = (data) => {
    console.log('[BattleScreen] 적 공격 완료 처리');
    onEnemyAttackResult(data);
    setLastResolvedTurnId(activeTurn?.id || 'enemy');
    lastAdvancedTurnId.current = activeTurn?.id || 'enemy';
  };

  // resumeTurn 래퍼: 턴 진행 + 잠금 해제
  const resumeTurnWithAdvance = () => {
    if (battleStatus.result !== BattleResult.NONE) return;
    console.log('[BattleScreen] resumeTurnWithAdvance: 애니메이션 완료, 턴 진행');
    resumeTurn(); // 잠금 해제
    nextTurn(); // 턴 진행
  };

  return (
    <div 
      className="animate-fade-in overflow-hidden" 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative',
        background: 'radial-gradient(circle at 50% 20%, rgba(107,220,255,0.08), transparent 45%), radial-gradient(circle at 80% 70%, rgba(211,178,111,0.12), transparent 50%)'
      }}
    >
      {/* Phaser 게임 컨테이너 */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <PhaserGame
          partyData={partyState}
          enemyData={enemyData}
          battleTurn={activeTurn?.type === 'enemy' ? 'ENEMY' : 'PLAYER'}
          activeTurn={activeTurn}
          isPaused={isPauseOpen}
          missionType={missionType}
          handleAttackResult={handleAttackCompleteWrapper}
          handleEnemyAttackResult={handleEnemyAttackResultWrapper}
            resumeTurn={resumeTurnWithAdvance}
          key={`battle-${battleSession}`}
        />
      </div>

      {/* 턴 순서 패널 */}
      {showHud && turnQueue.length > 0 && (
        <TurnOrderPanel turnQueue={turnQueue} />
      )}

      {/* 현재 턴 표시 */}
      {showHud && <TurnIndicator activeTurn={activeTurn} />}

      {/* 적 상태 바 */}
      {showHud && (
        <EnemyStatusBar 
          enemyHp={battleStatus.enemyHp} 
          enemyMaxHp={enemyData.maxHp || 100} 
        />
      )}

      {/* 미션 배너 */}
      {showHud && (
        <MissionBanner 
          missionType={missionType} 
          style={{ top: '100px', left: '20px', transform: 'translateY(0)', zIndex: 15 }} 
        />
      )}

      {/* 인과율 게이지 (미션 배너 아래 - 네온 박스 스타일) */}
      {showHud && (
        <div 
          style={{ 
            position: 'absolute', 
            top: '145px', 
            left: '20px', 
            zIndex: 15, 
            width: '240px'
          }}
        >
          {/* 네온 박스 컨테이너 */}
          <div style={{
            position: 'relative',
            width: '240px',
            height: '40px',
            backgroundColor: 'rgba(10, 16, 32, 0.8)',
            border: '2px solid rgba(68, 102, 170, 0.8)',
            borderRadius: '8px',
            overflow: 'hidden',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 0 12px rgba(68, 102, 170, 0.4), inset 0 0 12px rgba(68, 102, 170, 0.2)'
          }}>
            {/* 게이지 바 (왼쪽에서 차오름) */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%',
              width: `${gaugePercent}%`,
              background: 'linear-gradient(90deg, rgba(0, 255, 255, 0.3) 0%, rgba(0, 255, 255, 0.5) 100%)',
              transition: 'width 0.3s ease-out'
            }} />
            
            {/* 게이지 하이라이트 (위쪽 테두리 빛남) */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%',
              width: `${gaugePercent}%`,
              borderTop: '2px solid rgba(0, 255, 255, 0.8)',
              boxShadow: '0 0 8px rgba(0, 255, 255, 0.6)',
              transition: 'width 0.3s ease-out',
              pointerEvents: 'none'
            }} />
            
            {/* 텍스트 (중앙 정렬) */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ffffff',
              textShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 4px rgba(255, 255, 255, 0.6)',
              letterSpacing: '1px',
              pointerEvents: 'none'
            }}>
              인과율 {battleStatus.missionGauge}%
            </div>
          </div>
        </div>
      )}

      {/* 일시정지 버튼 */}
      {showHud && <PauseButton onClick={handlePauseOpen} />}

      {/* 컨트롤 덱 */}
      {showHud && (
        <ControlDeck
          gaugePercent={gaugePercent}
          missionGauge={battleStatus.missionGauge}
          lastReaction={battleStatus.lastReaction ? getReactionName(battleStatus.lastReaction) : null}
          activeTurn={activeTurn}
          activeCharacter={activeCharacter}
          onNormal={handleNormalClick}
          onSkill={handleSkillClick}
          onUltimate={handleUltimateClick}
          isLocked={isWaitingAnimation || battleStatus.result !== BattleResult.NONE}
        />
      )}

      {/* 일시정지 메뉴 */}
      <PauseMenu
        isOpen={isPauseOpen}
        showRetreatConfirm={showRetreatConfirm}
        onResume={handleResumeBattle}
        onRetreatPrompt={handleRetreatClick}
        onRetreatCancel={handleRetreatCancel}
        onRetreatConfirm={handleRetreatConfirm}
      />

      {/* 전투 결과 모달 */}
      <BattleResultModal
        result={battleStatus.result}
        onBack={handleBackToObservation}
        onRestart={handleBattleRestart}
      />

      {/* 미션 달성 시각 효과 */}
      {showMissionComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none animate-fade-in">
          {/* 어두운 배경 */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-pulse" />
          
          {/* 중앙 텍스트 */}
          <div className="relative z-10 text-center space-y-6">
            <h1 className="text-7xl font-black italic bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.9)] animate-bounce-in tracking-wider font-serif">
              CAUSAL REVERSAL
            </h1>
            <p className="text-2xl text-cyan-200 tracking-[0.3em] font-mono drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] animate-fade-in">
              인과 역전
            </p>
            
            {/* 파티클 효과 */}
            <div className="absolute -inset-32 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-particle-burst"
                  style={{
                    left: '50%',
                    top: '50%',
                    animation: `particle-burst 1.5s ease-out ${i * 0.1}s forwards`,
                    transform: `rotate(${i * 30}deg) translateY(-80px)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
