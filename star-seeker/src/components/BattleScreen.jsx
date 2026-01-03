import React, { useEffect, useState, useMemo, useRef } from 'react';
import PhaserGame from './battle/PhaserGame';
import { checkBattleResult, BattleResult } from '../utils/battle/battleUtils';
import { MISSION_TYPES } from '../constants/battle';
/** @typedef {import('../constants/battle').MissionType} MissionType */
import SoundManager, { AUDIO_KEYS } from '../utils/audio/SoundManager';
import TurnOrderPanel from './battle/sub/TurnOrderPanel';
import ControlDeck from './battle/sub/ControlDeck';
import MissionBanner from './battle/sub/MissionBanner';
import EnemyStatusBar from './battle/sub/EnemyStatusBar';
import { calculateEnergyGain } from '../utils/battle/battleCalculator';
import { CHARACTER_SKILLS } from '../data/characters/skillData';

/**
 * 속성 반응 타입을 한글 이름으로 변환
 */
const getReactionName = (reactionType) => {
  const reactionNames = {
    FUSION: '융합',
    THERMAL_SHOCK: '열충격',
    PLASMA: '플라즈마',
    ABSOLUTE_ZERO: '절대영도',
    OVERLOAD: '과부하',
    BLACK_HOLE: '블랙홀',
    PARADOX_TRIGGER: '패러독스 트리거 ⚡',
    AXIOM_TRIGGER: '공리 트리거 ✨',
  };
  return reactionNames[reactionType] || reactionType;
};

/**
 * BattleScreen 컴포넌트
 * Phaser 게임 엔진 기반의 전투 화면을 표시합니다.
 * 미션 게이지, 속성 반응 결과 등을 UI로 표시합니다.
 * @param {{
 *  partyData: any[],
 *  enemyData: object,
 *  setScreen: (screen: string) => void,
 *  handleAttackResult?: Function,
 *  missionType?: MissionType,
 * }} props
 */
export const BattleScreen = ({ partyData, enemyData, setScreen, handleAttackResult, missionType = MISSION_TYPES.CHAOS }) => {
  // 턴 큐 시스템
  const [turnQueue, setTurnQueue] = useState([]); // 항상 turnQueue[0]이 현재 턴
  const [partyState, setPartyState] = useState(partyData || []); // 전투 중 HP를 반영할 로컬 파티 상태
  const [lastResolvedTurnId, setLastResolvedTurnId] = useState(null); // 막 행동을 끝낸 턴 식별자
  
  // 쿨타임 감소를 위한 턴 추적 ref
  const lastCooldownDecrementTurnId = useRef(null);
  
  // 전투 상태: 미션 게이지, 적 HP, 마지막 반응 타입
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

  const [battleSession, setBattleSession] = useState(0); // Phaser 재마운트 키
  const [selectedCharacter, setSelectedCharacter] = useState(null); // 현재 턴 캐릭터 자동 선택
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [showRetreatConfirm, setShowRetreatConfirm] = useState(false);

  // 턴 큐 생성기: 아군 + 적을 speed 내림차순으로 정렬해 큐를 만든다.
  const generateTurnQueue = useMemo(() => (party, enemy) => {
    const participants = [];

    (party || []).forEach((char, index) => {
      const member = char || {};
      participants.push({
        type: 'party',
        data: member,
        index,
        speed: Number(member.baseSpd ?? member.speed ?? 100),
        name: member.name || `Ally-${index + 1}`,
        id: member.id || `party-${index}`,
      });
    });

    if (enemy) {
      participants.push({
        type: 'enemy',
        data: enemy,
        speed: Number(enemy.speed ?? enemy.baseSpd ?? 100),
        name: enemy.name || 'Enemy',
        id: enemy.id || 'enemy',
      });
    }

    participants.sort((a, b) => {
      if (b.speed !== a.speed) return b.speed - a.speed;
      if (a.type === 'party' && b.type === 'enemy') return -1;
      if (a.type === 'enemy' && b.type === 'party') return 1;
      return 0;
    });

    return participants;
  }, []);

  // 전투 시작 시 턴 큐 생성
  useEffect(() => {
    // 파티 데이터 초기화: SP, 쿨타임 필드 추가
    const initializedParty = (partyData || []).map(char => {
      const skillData = CHARACTER_SKILLS[char.id];
      const skillCooldown = skillData?.skillDetails?.skill?.cooldown || 3;
      
      return {
        ...char,
        sp: char.sp ?? 0,
        maxSp: char.maxSp ?? 100,
        currentSkillCooldown: 0, // 전투 시작 시 쿨타임 없음
        skillMaxCooldown: skillCooldown, // 스킬 최대 쿨타임 저장
      };
    });
    setPartyState(initializedParty);
    
    const queue = generateTurnQueue(initializedParty, enemyData);
    setTurnQueue(queue);
    const expectedLength = (initializedParty.length || 0) + (enemyData ? 1 : 0);
    console.log('[BattleScreen] 턴 큐 생성:', queue.map(t => `${t.name}(${t.speed})`), '길이:', queue.length, '예상 길이:', expectedLength);
    if (queue.length !== expectedLength) {
      console.warn('[BattleScreen] 턴 큐 길이가 예상과 다릅니다. 입력 데이터를 확인하세요.');
    }
  }, [partyData, enemyData, battleSession]);

  useEffect(() => {
    // Clean up BGM when leaving the battle screen
    return () => {
      SoundManager.stopBGM();
    };
  }, []);

  // 턴 헤드 변화에 따라 자동으로 액티브 캐릭터 선택 + 쿨타임 감소
  useEffect(() => {
    const head = turnQueue[0];
    if (head && head.type === 'party') {
      const member = partyState?.[head.index];
      if (member) {
        // 턴 시작 시 쿨타임 감소 (같은 턴에서 한 번만 실행)
        const currentTurnId = `${head.type}-${head.index}-${head.id}`;
        
        if (member.currentSkillCooldown > 0 && lastCooldownDecrementTurnId.current !== currentTurnId) {
          lastCooldownDecrementTurnId.current = currentTurnId;
          
          setPartyState((prev) => {
            const updated = [...prev];
            const currentMember = prev[head.index];
            if (!currentMember || currentMember.currentSkillCooldown <= 0) {
              return prev; // 이미 0이면 업데이트하지 않음
            }
            
            const newCooldown = Math.max(0, currentMember.currentSkillCooldown - 1);
            updated[head.index] = {
              ...currentMember,
              currentSkillCooldown: newCooldown,
            };
            
            console.log(`[BattleScreen] ${currentMember.name} 쿨타임 감소: ${currentMember.currentSkillCooldown} → ${newCooldown}`);
            
            // 쿨타임이 0이 되면 효과음 재생
            if (newCooldown === 0 && currentMember.currentSkillCooldown > 0) {
              SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK, { volume: 0.5 });
            }
            
            return updated;
          });
        }
        
        setSelectedCharacter({ ...member, actorIndex: head.index, id: head.id });
      } else {
        setSelectedCharacter(null);
      }
    } else {
      setSelectedCharacter(null);
    }
  }, [turnQueue]);

  // selectedCharacter를 최신 partyState로 동기화
  useEffect(() => {
    const head = turnQueue[0];
    if (head && head.type === 'party') {
      const member = partyState?.[head.index];
      if (member) {
        setSelectedCharacter({ ...member, actorIndex: head.index, id: head.id });
      }
    }
  }, [partyState, turnQueue]);

  useEffect(() => {
    if (battleStatus.result === BattleResult.VICTORY) {
      SoundManager.stopBGM();
      SoundManager.playSFX(AUDIO_KEYS.SFX_WIN, { volume: 0.85 });
    } else if (battleStatus.result === BattleResult.DEFEAT) {
      SoundManager.stopBGM();
      SoundManager.playSFX(AUDIO_KEYS.SFX_LOSE, { volume: 0.9 });
    }
  }, [battleStatus.result]);

  useEffect(() => {
    if (battleStatus.result !== BattleResult.NONE) {
      setIsPauseOpen(false);
      setShowRetreatConfirm(false);
    }
  }, [battleStatus.result]);

  if (!partyData || !enemyData) return null;

  const gaugePercent = battleStatus.missionGauge;
  
  // 현재 턴 정보
  const activeTurn = turnQueue[0];

  // 생존 여부 확인
  const isAlive = (turn) => {
    if (!turn) return false;
    if (turn.type === 'party') {
      const turnHp = typeof turn?.data?.hp === 'number' ? turn.data.hp : null;
      const member = partyState?.[turn.index];
      const memberHp = typeof member?.hp === 'number' ? member.hp : null;
      const hpValue = turnHp ?? memberHp;
      return typeof hpValue === 'number' ? hpValue > 0 : true;
    }
    if (turn.type === 'enemy') {
      return battleStatus.enemyHp > 0;
    }
    return false;
  };

  // 턴 넘기기: 현재 턴을 뒤로 보내면서 사망자는 제거
  const advanceTurn = () => {
    setTurnQueue((prev) => {
      if (!prev || prev.length === 0) return prev;
      const [current, ...rest] = prev;
      const aliveRest = rest.filter((t) => isAlive(t));
      const nextQueue = isAlive(current) ? [...aliveRest, current] : aliveRest;
      if (nextQueue.length === 0) {
        console.log('[BattleScreen] 더 이상 유효한 턴이 없음 (전투 종료)');
        return nextQueue;
      }

      console.log('[BattleScreen] 턴 진행:', current?.name, '->', nextQueue[0]?.name);
      return nextQueue;
    });
    setSelectedCharacter(null);
  };

  // 이미 행동한 턴이 큐 맨 앞에 남아있으면 강제로 넘기기
  useEffect(() => {
    if (!turnQueue?.length) return;
    const head = turnQueue[0];
    if (!head) return;

    // 직전에 행동을 끝낸 턴이 아직 선두라면 회전
    if (lastResolvedTurnId && head.id === lastResolvedTurnId) {
      console.warn('[BattleScreen] 선두 턴이 이미 행동 완료 → 강제 회전');
      setLastResolvedTurnId(null);
      advanceTurn();
    }
  }, [turnQueue, battleStatus.isEnemyAttacking, battleStatus.turn, lastResolvedTurnId]);

  // 적 턴 자동 실행 감시
  useEffect(() => {
    if (!activeTurn || activeTurn.type !== 'enemy') return undefined;
    if (battleStatus.result !== BattleResult.NONE) return undefined;
    if (isPauseOpen) return undefined;

    // 이미 적 행동 중이면 중복 트리거 방지
    if (battleStatus.isEnemyAttacking) return undefined;

    const timer = setTimeout(() => {
      setBattleStatus((prev) => ({ ...prev, isEnemyAttacking: true }));
      window.dispatchEvent(new CustomEvent('enemy-turn-start'));
    }, 400);

    return () => clearTimeout(timer);
  }, [activeTurn, battleStatus.result, battleStatus.isEnemyAttacking, isPauseOpen]);

  // Phaser에서 발행한 attack-complete 이벤트를 받아서 전투 상태 업데이트
  const handleAttackComplete = (result) => {
    // SP 업데이트 및 스킬 쿨타임 설정
    const attackerIndex = result?.attackerIndex;
    if (typeof attackerIndex === 'number' && attackerIndex >= 0) {
      setPartyState((prev) => {
        const updated = [...prev];
        const attacker = updated[attackerIndex];
        if (attacker) {
          const skillType = result?.skillType || 'normal';
          
          // SP 업데이트 (필살기 사용 시 SP 소모, 아니면 획득)
          const spGain = skillType === 'ultimate' 
            ? -attacker.maxSp 
            : calculateEnergyGain(skillType, {
                isCritical: result?.isCritical,
                hasReaction: result?.reactionType && result.reactionType !== 'null',
              });
          
          const newSp = Math.min(
            attacker.maxSp || 100, 
            Math.max(0, (attacker.sp || 0) + spGain)
          );
          
          // 스킬 쿨타임 설정 (스킬 사용 시에만)
          let newCooldown = attacker.currentSkillCooldown || 0;
          if (skillType === 'skill') {
            newCooldown = attacker.skillMaxCooldown || 3;
            console.log(`[BattleScreen] ${attacker.name} 스킬 사용 → 쿨타임 ${newCooldown}턴 시작`);
          }
          
          updated[attackerIndex] = {
            ...attacker,
            sp: newSp,
            currentSkillCooldown: newCooldown,
          };
          
          console.log(`[BattleScreen] ${attacker.name} SP: ${attacker.sp} → ${newSp} (${spGain >= 0 ? '+' : ''}${spGain})`);
        }
        return updated;
      });
    }
    
    setBattleStatus((prev) => {
      const newGauge = Math.min(100, Math.max(0, prev.missionGauge + (result?.gaugeAdded || 0)));
      const enemyHpAfter = Math.max(0, prev.enemyHp - (result?.damage || 0));
      const partyAlive = result?.partyAliveCount ?? partyData.length;
      const battleResult = checkBattleResult({
        enemyHp: enemyHpAfter,
        missionGauge: newGauge,
        partyAliveCount: partyAlive,
      });
      
      return {
        missionGauge: newGauge,
        enemyHp: enemyHpAfter,
        lastReaction: result?.reactionType || null,
        lastDamage: result?.damage || 0,
        turn: battleResult === BattleResult.VICTORY ? 'ENDED' : prev.turn,
        actionPoints: prev.actionPoints,
        result: battleResult,
        isEnemyAttacking: battleResult === BattleResult.VICTORY ? false : prev.isEnemyAttacking,
      };
    });
    
    console.log('[BattleScreen] 공격 결과 처리:', {
      damage: result?.damage,
      gaugeAdded: result?.gaugeAdded,
      reactionType: result?.reactionType,
    });

    setLastResolvedTurnId(activeTurn?.id || null);

    // 턴 넘기기 (플레이어 행동 후 회전)
    advanceTurn();

    // 상위 컴포넌트(App.jsx)에 결과 전달
    if (handleAttackResult) {
      handleAttackResult(result);
    }
  };

  const showHud = battleStatus.result === BattleResult.NONE;

  const activeCharacter = activeTurn?.type === 'party' ? partyState?.[activeTurn.index] : null;

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

  const handleRetreatPrompt = () => {
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
          partyData={partyData}
          enemyData={enemyData}
          battleTurn={activeTurn?.type === 'enemy' ? 'ENEMY' : 'PLAYER'}
          activeTurn={activeTurn}
          isPaused={isPauseOpen}
          missionType={missionType}
          handleAttackResult={handleAttackComplete}
          handleEnemyAttackResult={(data) => {
            console.log('[BattleScreen] 적 공격 결과:', data);
            const resolvedId = activeTurn?.id || 'enemy';
            
            // 피격 시 SP 증가
            if (Array.isArray(data?.partyStatus)) {
              setPartyState((prev) => {
                const updated = prev.map((char, idx) => {
                  const patch = data.partyStatus.find(p => p && p.index === idx);
                  if (patch) {
                    // 피격한 캐릭터의 SP 증가
                    const spGain = calculateEnergyGain('hit');
                    const newSp = Math.min(
                      char.maxSp || 100,
                      Math.max(0, (char.sp || 0) + spGain)
                    );
                    console.log(`[BattleScreen] ${char.name} 피격 SP: ${char.sp} → ${newSp} (+${spGain})`);
                    return { ...char, ...patch, sp: newSp };
                  }
                  return char;
                });
                
                // 턴 큐 내 data에도 HP 및 SP 반영
                setTurnQueue((prevQueue) => prevQueue.map((t) => {
                  if (t.type !== 'party') return t;
                  const updatedChar = updated[t.index];
                  return updatedChar ? { ...t, data: updatedChar } : t;
                }));
                
                return updated;
              });
            }
            
            setBattleStatus((prev) => {
              const partyAlive = data?.partyAliveCount ?? partyData.length;
              const battleResult = checkBattleResult({
                enemyHp: prev.enemyHp,
                missionGauge: prev.missionGauge,
                partyAliveCount: partyAlive,
              });
              
              return {
                ...prev,
                turn: battleResult === BattleResult.DEFEAT ? 'ENDED' : 'PLAYER',
                actionPoints: partyAlive,
                result: battleResult,
                isEnemyAttacking: false,
              };
            });

            setLastResolvedTurnId(resolvedId);

            // 턴 넘기기 (적 턴 종료 후 회전)
            advanceTurn();
          }}
          key={`battle-${battleSession}`}
        />
      </div>

      {showHud && turnQueue.length > 0 && (
        <TurnOrderPanel turnQueue={turnQueue} />
      )}

      {/* ===== [좌측 상단] 현재 턴 정보 ===== */}
      {showHud && activeTurn && (
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 15, textAlign: 'left' }}>
          <div className="astro-panel px-4 py-2 rounded-xl text-xs tracking-[0.14em] glow-text font-semibold mb-2" style={{ borderColor: activeTurn.type === 'party' ? 'rgba(107,220,255,0.5)' : 'rgba(211,178,111,0.5)' }}>
            {activeTurn.type === 'party' ? `${activeTurn.name}의 턴` : '적의 턴'}
          </div>
        </div>
      )}

      {showHud && (
        <EnemyStatusBar enemyHp={battleStatus.enemyHp} enemyMaxHp={enemyData.maxHp || 100} />
      )}

      {showHud && (
        <MissionBanner missionType={missionType} style={{ top: '100px', left: '20px', transform: 'translateY(0)', zIndex: 15 }} />
      )}

      {/* ===== [우측 상단] 일시정지 버튼 ===== */}
      {showHud && (
        <button
          type="button"
          aria-label="일시정지"
          className="pause-toggle"
          onClick={handlePauseOpen}
          style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 25 }}
        >
          <span className="pause-toggle-icon">II</span>
        </button>
      )}

      {showHud && (
        <ControlDeck
          gaugePercent={gaugePercent}
          missionGauge={battleStatus.missionGauge}
          lastReaction={battleStatus.lastReaction ? getReactionName(battleStatus.lastReaction) : null}
          activeTurn={activeTurn}
          activeCharacter={activeCharacter}
          onNormal={() => window.dispatchEvent(new CustomEvent('skill-selected', { detail: { character: { ...activeCharacter, actorIndex: activeTurn.index }, skillType: 'normal' } }))}
          onSkill={() => window.dispatchEvent(new CustomEvent('skill-selected', { detail: { character: { ...activeCharacter, actorIndex: activeTurn.index }, skillType: 'skill' } }))}
          onUltimate={() => window.dispatchEvent(new CustomEvent('skill-selected', { detail: { character: { ...activeCharacter, actorIndex: activeTurn.index }, skillType: 'ultimate' } }))}
        />
      )}

      {isPauseOpen && (
        <div className="pause-overlay">
          <div className="pause-modal">
            <div className="pause-chip">LIVE OPS</div>
            {!showRetreatConfirm ? (
              <>
                <h2 className="pause-title">작전 일시정지</h2>
                <p className="pause-subtitle">필요한 선택지를 고르세요.</p>
                <div className="pause-menu">
                  <button type="button" className="pause-action primary" onClick={handleResumeBattle}>
                    계속하기
                  </button>
                  <button type="button" className="pause-action warning" onClick={handleRetreatPrompt}>
                    작전 중단
                  </button>
                  <button type="button" className="pause-action secondary" disabled>
                    환경 설정 (준비 중)
                  </button>
                </div>
              </>
            ) : (
              <div className="pause-confirm">
                <h2 className="pause-title">작전을 이탈할까요?</h2>
                <p className="pause-subtitle">"정말 전투를 중단하시겠습니까?"</p>
                <div className="pause-confirm-actions">
                  <button type="button" onClick={handleRetreatCancel} className="pause-action secondary">
                    계속 전투
                  </button>
                  <button type="button" onClick={handleRetreatConfirm} className="pause-action warning">
                    작전 중단
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 결과 모달 (최상위 레이어) */}
      {battleStatus.result && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="astro-modal p-6 min-w-[320px] text-center">
            <div className="text-2xl font-cinzel glow-text mb-2">
              {battleStatus.result === BattleResult.VICTORY ? 'MISSION SUCCESS' : 'MISSION FAILED'}
            </div>
            <div className="text-sm text-slate-200/80 mb-5">
              {battleStatus.result === BattleResult.VICTORY
                ? '적을 제압하거나 인과율 게이지를 가득 채웠습니다.'
                : '아군이 전멸했습니다.'}
            </div>
            <button
              onClick={() => {
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
              }}
              className="ghost-button w-full"
            >
              재시작
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
