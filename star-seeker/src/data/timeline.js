// Star Seeker 타임라인(별자리 궤도) 데이터 구조
// 유닛들의 위치, 이동, 도착(턴 획득) 관리

export class Timeline {
  constructor(units = []) {
    // 타임라인에 배치된 유닛 인스턴스 배열
    this.units = units; // UnitInstance 객체 배열
    this.startDistance = 10000; // 미래(오른쪽 끝)
    this.goalDistance = 0; // 현재(왼쪽 끝)
  }

  // 유닛 이동: 매 틱마다 거리 차감
  tick() {
    this.units.forEach(unit => {
      if (!unit.isDead) {
        // 이동 공식: Pos_{Current} = Pos_{Prev} - Speed
        unit.position = Math.max(this.goalDistance, unit.position - unit.baseSpd);
      }
    });
  }

  // 도착(턴 획득) 유닛 반환
  getArrivedUnits() {
    return this.units.filter(unit => !unit.isDead && unit.position <= this.goalDistance);
  }

  // 거리 기반 유닛 정렬 (미래→현재 순)
  getSortedUnits() {
    return [...this.units].sort((a, b) => b.position - a.position);
  }

  // 유닛 추가/제거
  addUnit(unit) {
    this.units.push(unit);
  }

  removeUnit(unitId) {
    this.units = this.units.filter(u => u.id !== unitId);
  }

  // 유닛 위치 조작(개입 스킬 등)
  setUnitPosition(unitId, newPosition) {
    const unit = this.units.find(u => u.id === unitId);
    if (unit) unit.position = newPosition;
  }

  // 타임라인 내 모든 유닛 상태 반환
  getUnitStates() {
    return this.units.map(u => ({
      id: u.id,
      name: u.name,
      position: u.position,
      isDead: u.isDead,
      isAlly: u.isAlly,
    }));
  }
}

// 사용 예시:
// import { UnitInstance } from './unitInstance';
// const timeline = new Timeline([new UnitInstance(...), ...]);
// timeline.tick();
// const arrived = timeline.getArrivedUnits();
