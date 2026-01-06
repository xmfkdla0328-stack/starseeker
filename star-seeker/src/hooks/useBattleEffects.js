import { useEffect } from 'react';
import SoundManager, { AUDIO_KEYS } from '../utils/audio/SoundManager';
import { BattleResult } from '../utils/battle/battleUtils';

/**
 * 전투 관련 사이드 이펙트를 관리하는 커스텀 훅
 * @param {Object} params - 이펙트 파라미터
 * @param {Object} params.battleStatus - 전투 상태
 * @param {Object} params.missionCompleteShown - 미션 완료 표시 ref
 * @param {Function} params.setShowMissionComplete - 미션 완료 표시 함수
 * @param {Function} params.setIsPauseOpen - 일시정지 메뉴 열기/닫기
 * @param {Function} params.setShowRetreatConfirm - 후퇴 확인 모달 표시
 */
export const useBattleEffects = ({
  battleStatus,
  missionCompleteShown,
  setShowMissionComplete,
  setIsPauseOpen,
  setShowRetreatConfirm,
}) => {
  // BGM 정리
  useEffect(() => {
    return () => {
      SoundManager.stopBGM();
    };
  }, []);

  // 미션 달성 시각 효과
  useEffect(() => {
    if (
      battleStatus.missionGauge >= 100 &&
      !missionCompleteShown.current &&
      battleStatus.result === BattleResult.NONE
    ) {
      missionCompleteShown.current = true;
      setShowMissionComplete(true);
      SoundManager.playSFX(AUDIO_KEYS.SFX_WIN, { volume: 0.6 });

      setTimeout(() => {
        setShowMissionComplete(false);
      }, 2500);
    }
  }, [battleStatus.missionGauge, battleStatus.result, missionCompleteShown, setShowMissionComplete]);

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
  }, [battleStatus.result, setIsPauseOpen, setShowRetreatConfirm]);
};
