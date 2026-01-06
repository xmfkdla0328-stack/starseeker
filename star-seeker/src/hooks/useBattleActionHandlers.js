/**
 * 전투 액션 핸들러를 관리하는 커스텀 훅
 * @param {Object} params - 핸들러 파라미터
 * @param {Object} params.activeTurn - 현재 활성 턴
 * @param {Object} params.activeCharacter - 현재 활성 캐릭터
 * @param {boolean} params.isWaitingAnimation - 애니메이션 대기 상태
 * @param {Function} params.setIsWaitingAnimation - 애니메이션 대기 상태 설정
 * @param {Function} params.setPartyState - 파티 상태 설정
 * @param {Function} params.setTurnQueue - 턴 큐 설정
 * @param {Function} params.triggerSkillSelection - 스킬 선택 트리거
 * @returns {Object} 액션 핸들러 함수들
 */
export const useBattleActionHandlers = ({
  activeTurn,
  activeCharacter,
  isWaitingAnimation,
  setIsWaitingAnimation,
  setPartyState,
  setTurnQueue,
  triggerSkillSelection,
}) => {
  // Phaser 씬 입력 잠금 이벤트
  const lockPlayerInput = () => {
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

  // 일반 공격 핸들러
  const handleNormalClick = () => {
    if (!activeTurn || activeTurn.type !== 'party') return;
    if (isWaitingAnimation) return; // 이미 대기 중이면 무시
    console.log('[BattleScreen] 일반 공격 트리거');
    setIsWaitingAnimation(true);
    lockPlayerInput();
    triggerSkillSelection(activeCharacter, 'normal', activeTurn.index);
  };

  // 스킬 공격 핸들러
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

  // 필살기 공격 핸들러
  const handleUltimateClick = () => {
    if (!activeTurn || activeTurn.type !== 'party') return;
    if (isWaitingAnimation) return; // 이미 대기 중이면 무시
    console.log('[BattleScreen] 필살기 트리거');
    setIsWaitingAnimation(true);
    lockPlayerInput();
    triggerSkillSelection(activeCharacter, 'ultimate', activeTurn.index);
  };

  return {
    handleNormalClick,
    handleSkillClick,
    handleUltimateClick,
  };
};
