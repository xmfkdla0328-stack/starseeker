import SoundManager, { AUDIO_KEYS } from '../utils/audio/SoundManager';

/**
 * 전투 관련 이벤트 핸들러를 관리하는 커스텀 훅
 * @param {Object} params - 핸들러 파라미터
 * @param {Function} params.setScreen - 화면 전환 함수
 * @param {Function} params.setIsPauseOpen - 일시정지 메뉴 열기/닫기
 * @param {Function} params.setShowRetreatConfirm - 후퇴 확인 모달 표시
 * @param {Function} params.resetBattle - 전투 재시작 함수
 * @param {Function} params.setLastResolvedTurnId - 마지막 해결된 턴 ID 설정
 * @param {Function} params.onVictory - 승리 시 콜백
 * @param {Array} params.extractionRewards - 추출 보상
 * @param {Object} params.battleStatus - 전투 상태
 * @param {Object} params.enemyData - 적 데이터
 * @returns {Object} 이벤트 핸들러 함수들
 */
export const useBattleHandlers = ({
  setScreen,
  setIsPauseOpen,
  setShowRetreatConfirm,
  resetBattle,
  setLastResolvedTurnId,
  onVictory,
  extractionRewards,
  battleStatus,
  enemyData,
}) => {
  // 일시정지 메뉴 열기
  const handlePauseOpen = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setIsPauseOpen(true);
    setShowRetreatConfirm(false);
  };

  // 전투 재개
  const handleResumeBattle = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setIsPauseOpen(false);
    setShowRetreatConfirm(false);
  };

  // 후퇴 버튼 클릭
  const handleRetreatClick = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setShowRetreatConfirm(true);
  };

  // 후퇴 취소
  const handleRetreatCancel = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setShowRetreatConfirm(false);
  };

  // 후퇴 확정
  const handleRetreatConfirm = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    SoundManager.stopBGM();
    setIsPauseOpen(false);
    setShowRetreatConfirm(false);
    setScreen('HOME');
  };

  // 관찰 화면으로 돌아가기
  const handleBackToObservation = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    if (extractionRewards && onVictory && battleStatus.result === 'VICTORY') {
      onVictory(extractionRewards);
    } else {
      setScreen('OBSERVATION');
    }
  };

  // 전투 재시작
  const handleBattleRestart = () => {
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    setLastResolvedTurnId(null);
    resetBattle();
  };

  return {
    handlePauseOpen,
    handleResumeBattle,
    handleRetreatClick,
    handleRetreatCancel,
    handleRetreatConfirm,
    handleBackToObservation,
    handleBattleRestart,
  };
};
