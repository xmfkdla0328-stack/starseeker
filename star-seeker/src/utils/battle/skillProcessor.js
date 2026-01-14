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
            target.buffs.push({
              type: 'ATK_UP',
              value,
              duration,
              source: caster.id,
            });
            battleContext.addLog(`${target.name}의 공격력이 ${value}% 증가 (지속 ${duration}턴)`);
          });
          break;

        case 'GAUGE_UP':
          // 타임라인 구조에서 행동 게이지 = position 값
          if (battleContext && typeof value === 'number') {
            // 전체 아군 대상으로 적용
            effectTargets.forEach(target => {
              // position을 %만큼 앞으로 당김
              const timeline = battleContext.timeline;
              if (timeline && typeof timeline.startDistance === 'number') {
                const moveAmount = timeline.startDistance * (value / 100);
                target.position = Math.max(timeline.goalDistance, target.position - moveAmount);
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
