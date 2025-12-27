/**
 * 스킬 효과 타입 정의 및 실행 엔진
 * 캐릭터 데이터에서 정의된 효과를 실행하는 범용 시스템
 */

import { BATTLE_CONST } from './constants';

/**
 * 스킬 효과 타입 정의
 * 
 * BUFF_FRONT_ATK: 전열에게 공격력 버프
 * BUFF_FRONT_DEF: 전열에게 방어력 버프
 * HEAL_LOWEST: 체력이 가장 낮은 아군 힐
 * GRANT_TURN: 특정 태그를 가진 전열에게 즉시 턴 부여
 */
export const EFFECT_TYPES = {
  BUFF_FRONT_ATK: 'BUFF_FRONT_ATK',
  BUFF_FRONT_DEF: 'BUFF_FRONT_DEF',
  HEAL_LOWEST: 'HEAL_LOWEST',
  GRANT_TURN: 'GRANT_TURN',
};

/**
 * 스킬 효과 실행 함수들
 */
const effectExecutors = {
  // 전열 공격력 버프
  [EFFECT_TYPES.BUFF_FRONT_ATK]: (actor, params, allies) => {
    const value = params.value || BATTLE_CONST.ATK_BUFF_NORMAL;
    const duration = params.duration || BATTLE_CONST.DEFAULT_BUFF_DURATION;
    
    const newAllies = allies.map(t => {
      if (t.position === 'FRONT' && !t.isDead) {
        return { ...t, buffs: [...t.buffs, { type: 'ATK_UP', val: value, duration }] };
      }
      return t;
    });
    
    return {
      newAllies,
      logMsg: `(전열 공격력 +${value}%)`
    };
  },

  // 전열 방어력 버프
  [EFFECT_TYPES.BUFF_FRONT_DEF]: (actor, params, allies) => {
    const value = params.value || BATTLE_CONST.DEF_BUFF_VAL;
    const duration = params.duration || BATTLE_CONST.DEFAULT_BUFF_DURATION;
    
    const newAllies = allies.map(t => {
      if (t.position === 'FRONT' && !t.isDead) {
        return { ...t, buffs: [...t.buffs, { type: 'DEF_UP', val: value, duration }] };
      }
      return t;
    });
    
    return {
      newAllies,
      logMsg: `(전열 방어력 +${value}%)`
    };
  },

  // 체력 비율이 가장 낮은 아군 힐
  [EFFECT_TYPES.HEAL_LOWEST]: (actor, params, allies) => {
    const ratio = params.ratio || BATTLE_CONST.HEAL_NORMAL_RATIO;
    const healAmount = Math.floor(actor.atk * ratio);
    
    // 체력 비율 가장 낮은 아군 찾기
    let targetIdx = -1;
    let minHpPct = 101;
    allies.forEach((t, i) => {
      if (!t.isDead) {
        const pct = (t.hp / t.maxHp) * 100;
        if (pct < minHpPct) { 
          minHpPct = pct; 
          targetIdx = i; 
        }
      }
    });

    if (targetIdx !== -1) {
      const newAllies = [...allies];
      const target = newAllies[targetIdx];
      const newHp = Math.min(target.maxHp, target.hp + healAmount);
      newAllies[targetIdx] = { ...target, hp: newHp };
      
      return {
        newAllies,
        logMsg: `→ [${target.name}] HP ${healAmount} 회복`
      };
    }
    
    return {
      newAllies: allies,
      logMsg: '(대상 없음)'
    };
  },

  // 특정 태그를 가진 전열에게 즉시 턴 부여
  [EFFECT_TYPES.GRANT_TURN]: (actor, params, allies) => {
    const targetTag = params.targetTag;
    const newAllies = [...allies];
    
    if (!targetTag) {
      return { newAllies: allies, logMsg: '(대상 조건 없음)' };
    }
    
    // 대상 찾기
    const candidates = newAllies.filter(
      t => t.position === 'FRONT' && !t.isDead && t.tags.includes(targetTag)
    );
    
    if (candidates.length > 0) {
      // 랜덤 선택
      const target = candidates[Math.floor(Math.random() * candidates.length)];
      const targetIdx = newAllies.findIndex(t => t.uid === target.uid);
      
      if (targetIdx !== -1) {
        newAllies[targetIdx] = { 
          ...newAllies[targetIdx], 
          actionGauge: BATTLE_CONST.MAX_ACTION_GAUGE,
          buffs: [...newAllies[targetIdx].buffs, { type: 'INSTANT_TURN', duration: 1 }]
        };
        
        return {
          newAllies,
          logMsg: `→ [${newAllies[targetIdx].name}] 행동 기회 추가!`
        };
      }
    }
    
    return {
      newAllies: allies,
      logMsg: '(대상 없음)'
    };
  },
};

/**
 * 스킬 효과 실행 메인 함수
 * @param {Object} actor 행동하는 캐릭터
 * @param {Object} effect 효과 정의 객체 { type, params }
 * @param {Array} allies 현재 아군 배열
 * @returns {Object} { newAllies, logMsg }
 */
export const executeSkillEffect = (actor, effect, allies) => {
  const executor = effectExecutors[effect.type];
  
  if (!executor) {
    console.warn(`Unknown effect type: ${effect.type}`);
    return { newAllies: allies, logMsg: '(효과 없음)' };
  }
  
  return executor(actor, effect.params || {}, allies);
};
