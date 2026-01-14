/**
 * 전투 상황(battle context) 관리 모듈
 * - 아군/적군 리스트, 턴 정보, 버프/디버프, 로그 등
 * - 스킬 효과 적용 시 상태를 업데이트하는 용도
 */

export class BattleContext {
  constructor({ allies = [], enemies = [], turn = 1, logs = [] } = {}) {
    this.allies = allies;
    this.enemies = enemies;
    this.turn = turn;
    this.logs = logs;
  }

  // 로그 추가
  addLog(message) {
    this.logs.push(message);
  }

  // 기타 상태 업데이트 함수 필요시 추가
}
