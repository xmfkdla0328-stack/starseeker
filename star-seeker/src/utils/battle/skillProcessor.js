/**
 * 스킬 효과 처리 전용 모듈
 * 각 캐릭터/스킬의 효과를 해석하고 실제로 적용하는 함수 집합
 * 예시: 공격력 증가, 게이지 증가, 방어력 감소, 보호막 부여 등
 */

// 주요 효과 타입별 처리 함수

/**
 * 스킬 효과 적용 (공격력 증가)
 * @param {Object} params - { caster, targets, skillDetail, battleContext }
 */

export function applySkillEffect({ caster, targets, skillDetail, battleContext }) {
  // 아다드(2) 스킬: 체력이 가장 낮은 아군을 공격력의 200%로 회복
  if (caster.id === 2 && skillDetail && skillDetail.targetType === 'ALLY_ONE') {
    // 회복량 계산: atk * 2.0
    const healAmount = Math.round((caster.atk || 100) * 2.0);
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
      battleContext.allies.forEach(target => {
        const hotValue = Math.round(finalAtk * 0.08);
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

      // 대상 결정 (예시: ALLY_ALL)
      let effectTargets = targets;
      if (targetType === 'ALLY_ALL' && battleContext?.allies) {
        effectTargets = battleContext.allies.filter(u => !u.isDead);
      }
      // 효과별 처리
      switch (type) {
        case 'ATK_UP':
          effectTargets.forEach(target => {
            if (!target.buffs) target.buffs = [];
            // 같은 type, 같은 source의 버프가 이미 있으면 갱신, 없으면 추가
            const existingIdx = target.buffs.findIndex(
              b => b.type === 'ATK_UP' && b.source === caster.id
            );
            if (existingIdx !== -1) {
              // 기존 버프 갱신 (duration, value)
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

        case 'DEF_DOWN':
          effectTargets.forEach(target => {
            if (!target.buffs) target.buffs = [];
            // 같은 type, 같은 source의 디버프가 이미 있으면 갱신, 없으면 추가
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
          // 타임라인 구조에서 행동 게이지 = distance 값
          if (battleContext && typeof value === 'number') {
            // 전체 아군 대상으로 적용
            effectTargets.forEach(target => {
              // distance를 %만큼 앞으로 당김
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
