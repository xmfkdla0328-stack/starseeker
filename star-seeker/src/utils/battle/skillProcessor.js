/**
 * 스킬 효과 처리 전용 모듈
 * 각 캐릭터/스킬의 효과를 해석하고 실제로 적용하는 함수 집합
 * 예시: 공격력 증가, 게이지 증가, 방어력 감소, 보호막 부여 등
 */

import { playerPassiveUnlocks } from '../../data/playerPassiveUnlocks';

// 주요 효과 타입별 처리 함수

/**
 * 스킬 효과 적용 (공격력 증가)
 * @param {Object} params - { caster, targets, skillDetail, battleContext }
 */

export function applySkillEffect({ caster, targets, skillDetail, battleContext }) {
    // 아다드(2) 필살기: 전체 아군 회복 + 2턴간 받는 피해 15% 감소
    if (caster.id === 2 && skillDetail && skillDetail.targetType === 'ALLY_ALL') {
      // 아다드의 최종 공격력 계산 (버프 포함)
      let finalAtk = caster.atk || 100;
      if (caster.buffs) {
        let atkBuff = 0;
        caster.buffs.forEach(buff => {
          if (buff.type === 'ATK_UP') atkBuff += buff.value;
        });
        finalAtk = Math.floor(finalAtk * (1 + atkBuff / 100));
      }
      // passive2 치유량 +15% 적용
      let healMultiplier = 1.0;
      if (playerPassiveUnlocks[2]?.passive2) healMultiplier = 1.15;
      // 전체 아군 회복
      battleContext.allies.forEach(target => {
        const healAmount = Math.round(finalAtk * 1.6 * healMultiplier);
        const before = target.hp;
        target.hp = Math.min(target.hp + healAmount, target.maxHp);
        battleContext.addLog(`${target.name}이(가) ${healAmount}만큼 회복! (${before} → ${target.hp})`);
      });
      // 전체 아군에게 받는 피해 15% 감소 버프(2턴) 부여
      battleContext.allies.forEach(target => {
        const realUnit = battleContext.units?.find(u => u.id === target.id) || target;
        if (!realUnit.buffs) realUnit.buffs = [];
        realUnit.buffs.push({
          type: 'DMG_REDUCTION',
          value: 15,
          duration: 2,
          source: caster.id,
        });
        battleContext.addLog(`${realUnit.name}이(가) 2턴간 받는 피해 15% 감소 (피해 감소)`);
      });
      return;
    }
  // 아다드(2) 스킬: 체력이 가장 낮은 아군을 공격력의 200%로 회복
  if (caster.id === 2 && skillDetail && skillDetail.targetType === 'ALLY_ONE') {
    // passive2 치유량 +15% 적용
    let healMultiplier = 1.0;
    if (playerPassiveUnlocks[2]?.passive2) healMultiplier = 1.15;
    // 회복량 계산: atk * 2.0
    const healAmount = Math.round((caster.atk || 100) * 2.0 * healMultiplier);
    const target = targets[0];
    if (target && target.hp < target.maxHp) {
      const before = target.hp;
      target.hp = Math.min(target.hp + healAmount, target.maxHp);
      battleContext.addLog(`${target.name}이(가) ${healAmount}만큼 회복! (${before} → ${target.hp})`);
    }
    // 모든 아군에게 HOT(지속 회복) 버프 부여 (2턴, 아다드의 최종 atk의 8%)
    // 실제 units 배열에 직접 반영
    if (battleContext && battleContext.allies) {
      // 아다드의 최종 공격력 계산 (버프 포함)
      let finalAtk = caster.atk || 100;
      if (caster.buffs) {
        let atkBuff = 0;
        caster.buffs.forEach(buff => {
          if (buff.type === 'ATK_UP') atkBuff += buff.value;
        });
        finalAtk = Math.floor(finalAtk * (1 + atkBuff / 100));
      }
      // passive2 치유량 +15% 적용
      let healMultiplier = 1.0;
      if (playerPassiveUnlocks[2]?.passive2) healMultiplier = 1.15;
      battleContext.allies.forEach(target => {
        const hotValue = Math.round(finalAtk * 0.08 * healMultiplier);
        // 실제 units 배열의 해당 유닛 찾아서 버프 추가
        const realUnit = battleContext.units?.find(u => u.id === target.id) || target;
        if (!realUnit.buffs) realUnit.buffs = [];
        realUnit.buffs.push({
          type: 'HOT',
          value: hotValue,
          duration: 2,
          source: caster.id,
        });
        battleContext.addLog(`${realUnit.name}이(가) 2턴간 매 턴 ${hotValue} 회복 (지속 회복)`);
      });
    }
    return;
  }

  // 데이터 기반 효과 처리
  if (Array.isArray(skillDetail.effectType)) {
    skillDetail.effectType.forEach((type, idx) => {
      const value = skillDetail.effectValue?.[idx];
      const targetType = skillDetail.effectTarget?.[idx];
      const duration = skillDetail.duration?.[idx] ?? 0;

      // DAMAGE 타입: 적 전체에게 데미지 적용
      if (type === 'DAMAGE') {
        // 대상 결정 (ENEMY_ALL)
        let damageTargets = targets;
        if (skillDetail.targetType === 'ENEMY_ALL' && battleContext?.enemies) {
          damageTargets = battleContext.enemies.filter(u => !u.isDead);
        }
        // 공격력 및 버프 계산
        let finalAtk = caster.atk || 100;
        if (caster.buffs) {
          let atkBuff = 0;
          caster.buffs.forEach(buff => {
            if (buff.type === 'ATK_UP') atkBuff += buff.value;
          });
          finalAtk = Math.floor(finalAtk * (1 + atkBuff / 100));
        }
        // damageFactor 적용
        const damageFactor = value || skillDetail.damageFactor || 1.0;
        damageTargets.forEach(target => {
          const dmg = Math.round(finalAtk * damageFactor);
          const before = target.hp;
          target.hp = Math.max(0, target.hp - dmg);
          battleContext.addLog(`${target.name}이(가) ${dmg} 피해! (${before} → ${target.hp})`);
        });
        return;
      }

      // 대상 결정 (SELF, ALLY_ALL 등)
      let effectTargets = targets;
      if (targetType === 'SELF') {
        effectTargets = [caster];
      } else if (targetType === 'ALLY_ALL' && battleContext?.allies) {
        effectTargets = battleContext.allies.filter(u => !u.isDead);
      }
      // 효과별 처리
      switch (type) {
        case 'ATK_UP':
          effectTargets.forEach(target => {
            if (!target.buffs) target.buffs = [];
            const existingIdx = target.buffs.findIndex(
              b => b.type === 'ATK_UP' && b.source === caster.id
            );
            if (existingIdx !== -1) {
              target.buffs[existingIdx] = {
                ...target.buffs[existingIdx],
                value,
                duration,
              };
            } else {
              target.buffs.push({
                type: 'ATK_UP',
                value,
                duration,
                source: caster.id,
              });
            }
            battleContext.addLog(`${target.name}의 공격력이 ${value}% 증가 (지속 ${duration}턴)`);
          });
          break;

        case 'CRIT_RATE_UP':
          effectTargets.forEach(target => {
            if (!target.buffs) target.buffs = [];
            const existingIdx = target.buffs.findIndex(
              b => b.type === 'CRIT_RATE_UP' && b.source === caster.id
            );
            if (existingIdx !== -1) {
              target.buffs[existingIdx] = {
                ...target.buffs[existingIdx],
                value,
                duration,
              };
            } else {
              target.buffs.push({
                type: 'CRIT_RATE_UP',
                value,
                duration,
                source: caster.id,
              });
            }
            battleContext.addLog(`${target.name}의 치명타 확률이 ${value}% 증가 (지속 ${duration}턴)`);
          });
          break;

        case 'CRIT_DMG_UP':
          effectTargets.forEach(target => {
            if (!target.buffs) target.buffs = [];
            const existingIdx = target.buffs.findIndex(
              b => b.type === 'CRIT_DMG_UP' && b.source === caster.id
            );
            if (existingIdx !== -1) {
              target.buffs[existingIdx] = {
                ...target.buffs[existingIdx],
                value,
                duration,
              };
            } else {
              target.buffs.push({
                type: 'CRIT_DMG_UP',
                value,
                duration,
                source: caster.id,
              });
            }
            battleContext.addLog(`${target.name}의 치명타 피해가 ${value}% 증가 (지속 ${duration}턴)`);
          });
          break;

        case 'DEF_DOWN':
          effectTargets.forEach(target => {
            if (!target.buffs) target.buffs = [];
            const existingIdx = target.buffs.findIndex(
              b => b.type === 'DEF_DOWN' && b.source === caster.id
            );
            if (existingIdx !== -1) {
              target.buffs[existingIdx] = {
                ...target.buffs[existingIdx],
                value,
                duration,
              };
            } else {
              target.buffs.push({
                type: 'DEF_DOWN',
                value,
                duration,
                source: caster.id,
              });
            }
            battleContext.addLog(`${target.name}의 방어력이 ${value}% 감소 (지속 ${duration}턴)`);
          });
          break;

        case 'GAUGE_UP':
          if (battleContext && typeof value === 'number') {
            effectTargets.forEach(target => {
              const timeline = battleContext.timeline;
              if (timeline && typeof timeline.startDistance === 'number') {
                const moveAmount = timeline.startDistance * (value / 100);
                target.distance = Math.max(timeline.goalDistance, target.distance - moveAmount);
                battleContext.addLog(`${target.name}의 행동 게이지가 ${value}%만큼 증가하여 순서가 앞당겨짐`);
              }
            });
          }
          break;
        default:
          break;
      }
    });
  }
}

// 필요시, 각 효과별 세부 함수 분리 가능
