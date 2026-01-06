/**
 * 전투 액션 관리 커스텀 훅
 * @module hooks/useBattleAction
 */

import { useCallback } from 'react';
import { checkBattleResult, BattleResult } from '../utils/battle/battleUtils';
import { calculateSPGain, updateSP, updateGauge } from '../utils/battle/calculator';
import { COOLDOWN_CONFIG } from '../constants/battleConstants';

/**
 * 전투 액션(공격, 스킬 사용 등)을 관리하는 커스텀 훅
 * @param {object} params
 * @param {Function} params.setPartyState - 파티 상태 업데이트 함수
 * @param {Function} params.setBattleStatus - 전투 상태 업데이트 함수
 * @param {Function} params.setTurnQueue - 턴 큐 업데이트 함수
 * @param {number} params.partyDataLength - 파티 멤버 수
 * @param {number} params.enemyMaxHp - 적 최대 HP
 * @returns {object} - 액션 핸들러 함수들
 */
export function useBattleAction({ 
  setPartyState, 
  setBattleStatus, 
  setTurnQueue, 
  partyDataLength,
  enemyMaxHp,
}) {
  
  /**
   * 플레이어 공격 완료 처리
   */
  const handleAttackComplete = useCallback((result) => {
    const attackerIndex = result?.attackerIndex;
    
    // SP 업데이트 및 스킬 쿨타임 설정
    if (typeof attackerIndex === 'number' && attackerIndex >= 0) {
      setPartyState((prev) => {
        const updated = [...prev];
        const attacker = updated[attackerIndex];
        
        if (attacker) {
          const skillType = result?.skillType || 'normal';
          
          // 쿨타임 체크: 스킬이 아직 쿨타임이면 무효 처리 (중복 사용 방지)
          if (skillType === 'skill' && (attacker.currentSkillCooldown || 0) > 0) {
            console.warn(`[useBattleAction] ${attacker.name} 스킬은 쿨타임 중 (${attacker.currentSkillCooldown}) → 결과 무시`);
            return prev;
          }
          
          // SP 계산
          const spGain = skillType === 'ultimate' 
            ? -attacker.maxSp 
            : calculateSPGain(skillType, {
                isCritical: result?.isCritical,
                hasReaction: result?.reactionType && result.reactionType !== 'null',
              });
          
          const newSp = updateSP(attacker.sp || 0, spGain, attacker.maxSp);
          
          // 스킬 쿨타임 설정
          let newCooldown = attacker.currentSkillCooldown || 0;
          if (skillType === 'skill') {
            const maxCd = attacker.skillMaxCooldown || COOLDOWN_CONFIG.SKILL_DEFAULT_COOLDOWN || 3;
            newCooldown = maxCd;
            console.log(`[useBattleAction] ${attacker.name} 스킬 사용 → 쿨타임 ${newCooldown}턴 시작`);
          }
          
          updated[attackerIndex] = {
            ...attacker,
            sp: newSp,
            currentSkillCooldown: newCooldown,
          };
          
          console.log(`[useBattleAction] ${attacker.name} SP: ${attacker.sp} → ${newSp} (${spGain >= 0 ? '+' : ''}${spGain})`);
        }
        
        return updated;
      });

      // 턴 큐 내 데이터도 동기화 (쿨타임/UI 반영)
      setTurnQueue((prevQueue) => {
        if (!Array.isArray(prevQueue)) return prevQueue;
        return prevQueue.map((t) => {
          if (t.type !== 'party' || t.index !== attackerIndex) return t;
          const skillType = result?.skillType || 'normal';
          let newCooldown = t.data?.currentSkillCooldown || 0;
          if (skillType === 'skill') {
            const maxCd = (t.data?.skillMaxCooldown) || COOLDOWN_CONFIG.SKILL_DEFAULT_COOLDOWN || 3;
            newCooldown = maxCd;
          }
          return { ...t, data: { ...t.data, currentSkillCooldown: newCooldown } };
        });
      });
    }
    
    // 전투 상태 업데이트 (강제 HP 갱신)
    setBattleStatus((prev) => {
      const prevHp = prev.enemyHp;
      const damageDealt = result?.damage || 0;
      const sceneHp = typeof result?.enemyHpRemaining === 'number' ? result.enemyHpRemaining : null;
      const newGauge = updateGauge(prev.missionGauge, result?.gaugeAdded || 0);

      // 씬에서 내려준 HP가 있으면 우선 사용, 없으면 직접 계산
      const enemyHpAfter = sceneHp !== null
        ? Math.max(0, sceneHp)
        : Math.max(0, prevHp - damageDealt);

      console.log(`[HP UPDATE] ${prevHp} -> ${enemyHpAfter} (Dmg: ${damageDealt}, SceneHP: ${sceneHp})`);

      const partyAlive = result?.partyAliveCount ?? partyDataLength;
      const battleResult = checkBattleResult({
        enemyHp: enemyHpAfter,
        missionGauge: newGauge,
        partyAliveCount: partyAlive,
      });
      
      return {
        ...prev,
        missionGauge: newGauge,
        enemyHp: enemyHpAfter,
        lastReaction: result?.reactionType || null,
        lastDamage: damageDealt,
        turn: battleResult === BattleResult.VICTORY ? 'ENDED' : prev.turn,
        result: battleResult,
        isEnemyAttacking: battleResult === BattleResult.VICTORY ? false : prev.isEnemyAttacking,
      };
    });
    
    console.log('[useBattleAction] 공격 결과 처리:', {
      damage: result?.damage,
      gaugeAdded: result?.gaugeAdded,
      reactionType: result?.reactionType,
    });
  }, [setPartyState, setBattleStatus, partyDataLength]);

  /**
   * 적 공격 완료 처리
   */
  const handleEnemyAttackResult = useCallback((data) => {
    const targetIndex = data?.targetIndex ?? 0;
    console.log('[useBattleAction] 적 공격 결과:', { targetIndex, partyStatusCount: data?.partyStatus?.length });
    
    // 피격 시 HP 및 SP 업데이트 (피격자만!)
    if (Array.isArray(data?.partyStatus)) {
      setPartyState((prev) => {
        const updated = prev.map((char, idx) => {
          const patch = data.partyStatus.find(p => p && p.index === idx);
          
          // 🎯 핵심: targetIndex와 현재 루프의 idx를 비교
          // 피격자만 SP 증가, 다른 캐릭터는 변화 없음
          if (patch && idx === targetIndex) {
            // 피격한 캐릭터의 SP 증가
            const spGain = calculateSPGain('hit', { isCritical: false, hasReaction: false });
            const newSp = updateSP(char.sp || 0, spGain, char.maxSp);
            
            console.log(`⚡ [SP 회복] ${char.name} 피격 -> SP ${char.sp} → ${newSp} (+${spGain})`);
            return { ...char, ...patch, sp: newSp };
          }
          
          // 피격하지 않은 캐릭터는 아무 변화 없음
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
    
    // 전투 상태 업데이트
    setBattleStatus((prev) => {
      const partyAlive = data?.partyAliveCount ?? partyDataLength;
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
  }, [setPartyState, setBattleStatus, setTurnQueue, partyDataLength]);

  /**
   * 스킬 선택 이벤트 발행
   */
  const triggerSkillSelection = useCallback((character, skillType, actorIndex) => {
    window.dispatchEvent(
      new CustomEvent('skill-selected', {
        detail: {
          character: { ...character, actorIndex },
          skillType,
        },
      })
    );
  }, []);

  return {
    handleAttackComplete,
    handleEnemyAttackResult,
    triggerSkillSelection,
  };
}

export default useBattleAction;
