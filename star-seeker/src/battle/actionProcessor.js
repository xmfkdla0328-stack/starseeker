// Star Seeker 행동/스킬/개입 실행 및 자원 소모/쿨타임 처리 로직
import { ACTION_TYPE } from '../data/actionTypes';

export class ActionProcessor {
  // 행동 실행: 유닛, 행동(Action), 타임라인, 유저 CP 등 전달
  static execute(unit, action, timeline, userCp = 0) {
    // 자원 소모 체크
    if (unit.currentEp < action.epCost) return { success: false, reason: 'EP 부족' };
    if (userCp < action.cpCost) return { success: false, reason: 'CP 부족' };
    if (action.cooldown && unit.cooldowns?.[action.name] > 0) return { success: false, reason: '쿨타임 중' };

    // 자원 소모 처리
    unit.currentEp -= action.epCost;
    if (action.cpCost > 0) userCp -= action.cpCost;
    if (action.cooldown) {
      if (!unit.cooldowns) unit.cooldowns = {};
      unit.cooldowns[action.name] = action.cooldown;
    }

    // 효과 실행 (effect가 함수일 경우)
    if (typeof action.effect === 'function') {
      action.effect(unit, timeline);
    }

    return { success: true, userCp, unit };
  }

  // 턴마다 쿨타임 감소
  static reduceCooldowns(unit) {
    if (!unit.cooldowns) return;
    Object.keys(unit.cooldowns).forEach(name => {
      unit.cooldowns[name] = Math.max(0, unit.cooldowns[name] - 1);
    });
  }
}

// 사용 예시:
// import { ActionProcessor } from './actionProcessor';
// const result = ActionProcessor.execute(unit, action, timeline, userCp);
