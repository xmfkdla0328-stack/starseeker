import { BATTLE_CONST } from './constants';

/**
 * 후열 서포트 스킬 효과 적용 함수
 * @param {Object} actor 행동하는 캐릭터
 * @param {string} skillType 'SKILL' | 'ULT'
 * @param {Array} currentAllies 현재 아군 상태 배열
 * @returns {Object} { newAllies, logMsg }
 */
export const applySupportEffect = (actor, skillType, currentAllies) => {
  let newAllies = [...currentAllies];
  let logMsg = '';

  // 1. [박주옥] (방어 버프 / 재행동)
  if (actor.name === '박주옥') {
    if (skillType === 'SKILL') {
      // 일반: 전열 방어력 증가
      newAllies = newAllies.map(t => {
        if (t.position === 'FRONT' && !t.isDead) {
          return { ...t, buffs: [...t.buffs, { type: 'DEF_UP', val: BATTLE_CONST.DEF_BUFF_VAL, duration: BATTLE_CONST.DEFAULT_BUFF_DURATION }] };
        }
        return t;
      });
      logMsg = "(전열 방어력 +20%)";
    } else {
      // 필살: 전열 '조호' 재행동 (AG 즉시 충전)
      const johoTargets = newAllies.filter(t => t.position === 'FRONT' && !t.isDead && t.tags.includes('조호'));
      if (johoTargets.length > 0) {
        // 랜덤 타겟
        const target = johoTargets[Math.floor(Math.random() * johoTargets.length)];
        const targetIdx = newAllies.findIndex(t => t.uid === target.uid);
        
        if (targetIdx !== -1) {
          newAllies[targetIdx] = { 
            ...newAllies[targetIdx], 
            actionGauge: BATTLE_CONST.MAX_ACTION_GAUGE, // 즉시 턴 획득
            buffs: [...newAllies[targetIdx].buffs, { type: 'INSTANT_TURN', duration: 1 }] // (표시용 버프)
          };
          logMsg = `→ [${newAllies[targetIdx].name}] 행동 기회 추가!`;
        }
      } else {
        logMsg = "(대상 없음)";
      }
    }
  }
  
  // 2. [루나, 아쿠아] (힐러)
  else if (actor.name === '루나' || actor.name === '아쿠아') {
    const ratio = skillType === 'ULT' ? BATTLE_CONST.HEAL_ULT_RATIO : BATTLE_CONST.HEAL_NORMAL_RATIO;
    const healAmount = Math.floor(actor.atk * ratio);
    
    // 체력 비율 가장 낮은 아군 찾기
    let targetIdx = -1;
    let minHpPct = 101;
    newAllies.forEach((t, i) => {
      if (!t.isDead) {
        const pct = (t.hp / t.maxHp) * 100;
        if (pct < minHpPct) { minHpPct = pct; targetIdx = i; }
      }
    });

    if (targetIdx !== -1) {
      const t = newAllies[targetIdx];
      const newHp = Math.min(t.maxHp, t.hp + healAmount);
      newAllies[targetIdx] = { ...t, hp: newHp };
      logMsg = `→ [${t.name}] HP ${healAmount} 회복`;
    }
  }
  
  // 3. [그 외] (공격력 버퍼 - 솔라, 서주목 등)
  else {
    const val = skillType === 'ULT' ? BATTLE_CONST.ATK_BUFF_ULT : BATTLE_CONST.ATK_BUFF_NORMAL;
    newAllies = newAllies.map(t => {
      if (t.position === 'FRONT' && !t.isDead) {
        return { ...t, buffs: [...t.buffs, { type: 'ATK_UP', val: val, duration: BATTLE_CONST.DEFAULT_BUFF_DURATION }] };
      }
      return t;
    });
    logMsg = `(전열 공격력 +${val}%)`;
  }

  return { newAllies, logMsg };
};