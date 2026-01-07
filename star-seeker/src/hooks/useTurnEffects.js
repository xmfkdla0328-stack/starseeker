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
  battleStatus,
  isPauseOpen,
  isWaitingAnimation,
  partyState,
  lastResolvedTurnId,
  setBattleStatus,
  setIsWaitingAnimation,
  setLastResolvedTurnId,
  nextTurn,
  isDataReady,
}) => {
  // ...불필요한 턴 초기화 로직 제거...

  // 적 턴 자동 실행 감시
  // ...적 턴 자동 실행 로직은 유지...

  // 이미 행동한 턴이 큐 맨 앞에 남아있으면 강제로 넘기기 (중복 호출 방지)
  // ...불필요한 턴 강제 회전 로직 제거...

  // 아군 전멸 체크: 모든 파티원이 사망하면 즉시 패배 처리
  useEffect(() => {
    if (battleStatus.result !== BattleResult.NONE) return;
    if (!Array.isArray(partyState) || partyState.length === 0) return;

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

  // 전투 데이터가 준비되면 시작 시각 기록 (패배 체크 지연용)
  // ...전투 시작 시각 기록 로직 제거...
};
