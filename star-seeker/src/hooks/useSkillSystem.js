import { useState, useCallback } from 'react';
import { 
  calculateSpGain,
  updateCharacterSp,
  canUseSkill,
  canUseUltimate,
  resetCooldown 
} from '../utils/battleLogic';
import { CHARACTER_SKILLS } from '../data/characters/skillData';

/**
 * 스킬 시스템 관리 커스텀 훅
 * SP 충전, 쿨타임 관리, 스킬 사용 가능 여부 확인
 */
export const useSkillSystem = (partyState, setPartyState) => {
  
  /**
   * 스킬 사용 후 SP 충전
   */
  const chargeSpAfterSkill = useCallback((characterIndex, skillType) => {
    setPartyState(prev => {
      const updated = [...prev];
      const character = updated[characterIndex];
      
      if (!character) return prev;
      
      const spGain = calculateSpGain(skillType);
      const newSp = updateCharacterSp(character.sp || 0, spGain, character.maxSp || 100);
      
      updated[characterIndex] = {
        ...character,
        sp: newSp,
      };
      
      console.log(`[useSkillSystem] ${character.name} SP 충전: ${character.sp} → ${newSp} (+${spGain})`);
      
      return updated;
    });
  }, [setPartyState]);

  /**
   * 스킬 사용 후 쿨타임 초기화
   */
  const startSkillCooldown = useCallback((characterIndex) => {
    setPartyState(prev => {
      const updated = [...prev];
      const character = updated[characterIndex];
      
      if (!character) return prev;
      
      const maxCooldown = character.skillMaxCooldown || 3;
      
      updated[characterIndex] = {
        ...character,
        currentSkillCooldown: resetCooldown(maxCooldown),
      };
      
      console.log(`[useSkillSystem] ${character.name} 쿨타임 시작: ${maxCooldown}턴`);
      
      return updated;
    });
  }, [setPartyState]);

  /**
   * 필살기 사용 후 SP 소모
   */
  const consumeSpForUltimate = useCallback((characterIndex, cost = 100) => {
    setPartyState(prev => {
      const updated = [...prev];
      const character = updated[characterIndex];
      
      if (!character) return prev;
      
      updated[characterIndex] = {
        ...character,
        sp: Math.max(0, character.sp - cost),
      };
      
      console.log(`[useSkillSystem] ${character.name} SP 소모: ${character.sp} → ${character.sp - cost} (-${cost})`);
      
      return updated;
    });
  }, [setPartyState]);

  /**
   * 캐릭터의 스킬 사용 가능 여부 확인
   */
  const checkSkillAvailability = useCallback((character) => {
    if (!character) return { canSkill: false, canUltimate: false };
    
    return {
      canSkill: canUseSkill(character.currentSkillCooldown || 0),
      canUltimate: canUseUltimate(character.sp || 0, character.maxSp || 100),
    };
  }, []);

  return {
    chargeSpAfterSkill,
    startSkillCooldown,
    consumeSpForUltimate,
    checkSkillAvailability,
  };
};
