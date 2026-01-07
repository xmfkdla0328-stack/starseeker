// 타임라인 진행 로직 유틸
// calculateNextState(allUnits)
// - alive(= !isDead) 유닛만 고려하여 각 유닛의 도달 시간(requiredTime = distance / spd)을 계산
// - 최소 시간(minTime)을 가진 유닛을 nextActor로 선택
// - 모든 유닛의 distance를 newDistance = oldDistance - spd * minTime 만큼 감소시키고,
//   nextActor의 distance는 확실히 0으로 설정
// - 원본 배열의 순서와 길이를 유지한 updatedUnits 배열과 nextActor 객체를 반환

// === 타임라인 엔진 ===
export const resetUnitDistance = (unit) => {
  unit.distance = 10000;
  return unit;
};

export const calculateNextState = (allUnits = []) => {
  // 1. 살아있는 유닛만 필터링
  const activeUnits = (allUnits || []).filter(u => !u.isDead);
  if (activeUnits.length === 0) return { nextActor: null, updatedUnits: allUnits };

  // 2. 각 유닛의 도착 예상 시간 계산 (거리 / 속도)
  const times = activeUnits.map(u => ({
    uid: u.uid || u.id,
    time: (typeof u.spd === 'number' && u.spd > 0) ? ( (typeof u.distance === 'number' ? u.distance : Infinity) / u.spd ) : 999999,
  }));

  // 3. 가장 빨리 도착하는 시간(Min Time) 찾기
  const minTime = Math.min(...times.map(t => t.time));

  // 4. 모든 유닛 전진 (남은 거리 - (속도 * 시간))
  const updatedUnits = (allUnits || []).map(u => {
    if (u.isDead) return u;
    const spd = typeof u.spd === 'number' ? u.spd : 0;
    const oldDist = typeof u.distance === 'number' ? u.distance : 0;
    const move = spd * minTime;
    let newDist = oldDist - move;
    if (newDist < 0) newDist = 0;
    return { ...u, distance: newDist };
  });

  // 5. 턴을 잡은 유닛 식별 (distance <= 0.1)
  const nextActor = updatedUnits.find(u => !u.isDead && (typeof u.distance === 'number' ? u.distance <= 0.1 : false)) || null;

  return { nextActor, updatedUnits, passedTime: minTime };
};

// 유닛의 거리를 초기값(10000)으로 리셋
// 기존와 호환되는 이름의 기본 리셋 함수
export function resetUnitDistance(unit) {
  if (!unit || typeof unit !== 'object') return unit;
  return { ...unit, distance: 10000 };
}
