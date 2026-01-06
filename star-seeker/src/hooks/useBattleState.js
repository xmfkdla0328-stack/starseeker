import { useState, useRef, useEffect } from 'react';
import { BattleResult } from '../utils/battle/battleUtils';

/**
 * 전투 상태를 관리하는 커스텀 훅
 * @param {Array} partyData - 파티 데이터
 * @param {Object} enemyData - 적 데이터
 * @returns {Object} 전투 상태와 상태 업데이트 함수들
 */
export const useBattleState = (partyData, enemyData) => {
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

  // 배틀 세션이 변경될 때마다 ref 초기화
  useEffect(() => {
    hasLoggedTurnInit.current = false;
    lastAdvancedTurnId.current = null;
    missionCompleteShown.current = false;
    battleStartTimeRef.current = null;
  }, [battleSession]);

  // 전투 재시작 함수
  const resetBattle = () => {
    setBattleSession((s) => s + 1);
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

  return {
    // 상태
    battleStatus,
    battleSession,
    isPauseOpen,
    showRetreatConfirm,
    showMissionComplete,
    
    // Refs
    hasLoggedTurnInit,
    lastAdvancedTurnId,
    missionCompleteShown,
    battleStartTimeRef,
    
    // 상태 업데이트 함수
    setBattleStatus,
    setBattleSession,
    setIsPauseOpen,
    setShowRetreatConfirm,
    setShowMissionComplete,
    resetBattle,
  };
};
