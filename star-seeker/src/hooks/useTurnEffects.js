import { useEffect } from 'react';
import { BattleResult } from '../utils/battle/battleUtils';
import { BATTLE_TIMING } from '../constants/battleConstants';

/**
 * 턴 관련 사이드 이펙트를 관리하는 커스텀 훅
 * @param {Object} params - 이펙트 파라미터
 * @param {Array} params.turnQueue - 턴 큐
 * @param {Object} params.activeTurn - 현재 활성 턴
 * @param {Object} params.battleStatus - 전투 상태
 * @param {boolean} params.isPauseOpen - 일시정지 메뉴 열림 상태
 * @param {boolean} params.isWaitingAnimation - 애니메이션 대기 상태
 * @param {Array} params.partyState - 파티 상태
 * @param {Object} params.hasLoggedTurnInit - 턴 초기화 로그 ref
 * @param {Object} params.lastAdvancedTurnId - 마지막 진행된 턴 ID ref
 * @param {Object} params.battleStartTimeRef - 전투 시작 시각 ref
 * @param {string} params.lastResolvedTurnId - 마지막 해결된 턴 ID
 * @param {Function} params.setBattleStatus - 전투 상태 설정
 * @param {Function} params.setIsWaitingAnimation - 애니메이션 대기 상태 설정
 * @param {Function} params.setLastResolvedTurnId - 마지막 해결된 턴 ID 설정
 * @param {Function} params.nextTurn - 다음 턴으로 진행
 * @param {boolean} params.isDataReady - 데이터 준비 상태
 */
export const useTurnEffects = ({
  turnQueue,
  activeTurn,
  battleStatus,
  isPauseOpen,
  isWaitingAnimation,
  partyState,
  hasLoggedTurnInit,
  lastAdvancedTurnId,
  battleStartTimeRef,
  lastResolvedTurnId,
  setBattleStatus,
  setIsWaitingAnimation,
  setLastResolvedTurnId,
  nextTurn,
  isDataReady,
}) => {
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
  }, [turnQueue, activeTurn, hasLoggedTurnInit]);

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
  }, [
    activeTurn,
    battleStatus.result,
    battleStatus.isEnemyAttacking,
    isPauseOpen,
    isWaitingAnimation,
    setIsWaitingAnimation,
    setBattleStatus,
  ]);

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
  }, [turnQueue, lastResolvedTurnId, nextTurn, isWaitingAnimation, lastAdvancedTurnId, setLastResolvedTurnId]);

  // 아군 전멸 체크: 모든 파티원이 사망하면 즉시 패배 처리
  useEffect(() => {
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
  }, [partyState, battleStatus.result, setBattleStatus, setIsWaitingAnimation, battleStartTimeRef]);

  // 전투 데이터가 준비되면 시작 시각 기록 (패배 체크 지연용)
  useEffect(() => {
    if (!isDataReady) return;
    if (!battleStartTimeRef.current) {
      battleStartTimeRef.current = Date.now();
    }
  }, [isDataReady, battleStartTimeRef]);
};
