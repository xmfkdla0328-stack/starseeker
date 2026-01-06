import { BattleResult } from '../utils/battle/battleUtils';

/**
 * Phaser 게임과의 통신을 위한 래퍼 함수들을 제공하는 커스텀 훅
 * @param {Object} params - 래퍼 파라미터
 * @param {Object} params.activeTurn - 현재 활성 턴
 * @param {Object} params.battleStatus - 전투 상태
 * @param {Object} params.lastAdvancedTurnId - 마지막 진행된 턴 ID ref
 * @param {Function} params.onAttackComplete - 공격 완료 핸들러
 * @param {Function} params.onEnemyAttackResult - 적 공격 결과 핸들러
 * @param {Function} params.setLastResolvedTurnId - 마지막 해결된 턴 ID 설정
 * @param {Function} params.resumeTurn - 턴 재개 함수
 * @param {Function} params.nextTurn - 다음 턴으로 진행
 * @param {Function} params.handleAttackResult - 상위 컴포넌트 공격 결과 콜백
 * @returns {Object} 래퍼 함수들
 */
export const useBattleWrappers = ({
  activeTurn,
  battleStatus,
  lastAdvancedTurnId,
  onAttackComplete,
  onEnemyAttackResult,
  setLastResolvedTurnId,
  resumeTurn,
  nextTurn,
  handleAttackResult,
}) => {
  // 플레이어 공격 완료 래퍼
  const handleAttackCompleteWrapper = (result) => {
    console.log('[BattleScreen] 플레이어 공격 완료 처리');
    onAttackComplete(result);
    setLastResolvedTurnId(activeTurn?.id || null);
    lastAdvancedTurnId.current = activeTurn?.id || null;

    if (handleAttackResult) {
      handleAttackResult(result);
    }
  };

  // 적 공격 완료 래퍼
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

  return {
    handleAttackCompleteWrapper,
    handleEnemyAttackResultWrapper,
    resumeTurnWithAdvance,
  };
};
