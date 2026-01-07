import { useState, useRef, useEffect, useCallback } from 'react';
import { calculateNextState, resetUnitDistance } from '../utils/battle/turnLogic';

/**
 * 거리 기반 턴 컨트롤러 훅
 * allies: [{...}], enemy: [{...}]
 * executeBossAction: (enemyUnit) => Promise<void>
 *
 * 반환: {
 *   allies, setAllies, enemy, setEnemy,
 *   battleState, setBattleState,
 *   currentActor, setCurrentActor,
 *   stepTurn, processPlayerAction
 * }
 */
export function useBattleController({
  initialAllies = [],
  initialEnemy = [],
  executeBossAction,
}) {
  const [allies, setAllies] = useState(initialAllies);
  const [enemy, setEnemy] = useState(initialEnemy);
  const [battleState, setBattleState] = useState('INIT'); // INIT | WAITING | ENEMY_ACTING | ...
  const [currentActor, setCurrentActor] = useState(null);

  // 무한루프/재진입 방지
  const processingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // allies/enemy가 바뀌면 자동으로 턴 진행
  useEffect(() => {
    if (battleState === 'INIT' || battleState === 'AFTER_ACTION') {
      stepTurn();
    }
    // eslint-disable-next-line
  }, [battleState]);

  // 핵심: 거리 기반 턴 진행
  const stepTurn = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    try {
      // 1. 모든 유닛 합치기
      const allUnits = [
        ...allies.map(a => ({ ...a, _isAlly: true })),
        ...enemy.map(e => ({ ...e, _isAlly: false })),
      ];
      // 2. 거리 기반 다음 상태 계산
      const { nextActor, updatedUnits } = calculateNextState(allUnits);
      // 3. 상태 갱신 (타임라인 이동)
      const newAllies = updatedUnits.filter(u => u._isAlly).map(u => { const c = { ...u }; delete c._isAlly; return c; });
      const newEnemy = updatedUnits.filter(u => !u._isAlly).map(u => { const c = { ...u }; delete c._isAlly; return c; });
      if (mountedRef.current) {
        setAllies(newAllies);
        setEnemy(newEnemy);
      }
      // 4. nextActor가 없으면 종료
      if (!nextActor) {
        processingRef.current = false;
        return;
      }
      // 5. 아군이면 입력 대기
      if (nextActor._isAlly) {
        if (mountedRef.current) {
          setCurrentActor(nextActor);
          setBattleState('WAITING');
        }
        processingRef.current = false;
        return;
      }
      // 6. 적군이면 즉시 AI 실행
      if (mountedRef.current) setBattleState('ENEMY_ACTING');
      const targetEnemy = enemy.find(e => e.id === nextActor.id) || nextActor;
      await executeBossAction(targetEnemy);
      // distance 리셋
      const resetEnemy = resetUnitDistance(targetEnemy);
      const mergedUnits = [
        ...newAllies,
        ...newEnemy.map(u => (u.id === resetEnemy.id ? resetEnemy : u)),
      ];
      if (mountedRef.current) {
        setAllies(mergedUnits.filter(u => u._isAlly));
        setEnemy(mergedUnits.filter(u => !u._isAlly));
      }
      await new Promise(res => setTimeout(res, 50));
      processingRef.current = false;
      // 루프: 다시 진행
      if (mountedRef.current) setBattleState('AFTER_ACTION');
    } catch (e) {
      processingRef.current = false;
      throw e;
    }
  }, [allies, enemy, executeBossAction]);

  // 아군 행동 처리 후 호출: distance 리셋 후 턴 진행
  const processPlayerAction = useCallback((actor) => {
    const resetAlly = resetUnitDistance(actor);
    const newAllies = allies.map(a => (a.id === resetAlly.id ? resetAlly : a));
    setAllies(newAllies);
    setBattleState('AFTER_ACTION');
  }, [allies]);

  return {
    allies, setAllies, enemy, setEnemy,
    battleState, setBattleState,
    currentActor, setCurrentActor,
    stepTurn, processPlayerAction,
  };
}
