import { useState, useCallback, useEffect } from 'react';
import { executeAllyAction, executeBossAction, calculateNextState, resetUnitDistance } from '../utils/battle/turnLogic';

export const useBattleController = ({
  battleState,
  setBattleState,
  setLogs,
  enemy,
  setEnemy,
  allies,
  setAllies,
  turnCount,
  setTurnCount,
  onBattleEnd
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processTurn = useCallback(async () => {
    if (battleState !== 'BATTLE' || isProcessing) return;
    setIsProcessing(true);

    const currentAllies = [...allies];
    const currentEnemy = { ...enemy };
    const allUnits = [currentEnemy, ...currentAllies];
    const { nextActor, updatedUnits, passedTime } = calculateNextState(allUnits);

    if (!nextActor) {
      console.error('No actor found!');
      setIsProcessing(false);
      return;
    }

    const newEnemyState = updatedUnits.find(u => (u.uid && u.uid === currentEnemy.uid) || (u.id && u.id === currentEnemy.id));
    if (newEnemyState) setEnemy(prev => ({ ...prev, ...newEnemyState }));

    const newAlliesState = updatedUnits.filter(u => !u.isEnemy);
    setAllies(newAlliesState);

    await new Promise(r => setTimeout(r, 500));

    if (nextActor.isEnemy) {
      const res = executeBossAction(nextActor, newAlliesState, 0);

      setAllies(res.newAllies);
      setLogs(prev => [...prev, ...res.logs]);

      setEnemy(prev => resetUnitDistance({ ...prev }));
      setTurnCount(prev => prev + 1);

      if (res.isDefeat) {
         setBattleState('DEFEAT');
         if (typeof onBattleEnd === 'function') onBattleEnd(false);
      } else {
         setIsProcessing(false);
         setTimeout(() => processTurn(), 500);
      }

    } else {
      setLogs(prev => [...prev, `> [${nextActor.name}]의 차례입니다!`]);
      setIsProcessing(false);
    }

  }, [battleState, isProcessing, allies, enemy, setEnemy, setAllies, setLogs, setBattleState, setTurnCount, onBattleEnd]);

  const stepTurn = useCallback(async (actionType, targetId) => {
     const activeAllyIndex = allies.findIndex(a => (typeof a.distance === 'number' ? a.distance <= 0.1 : false) && !a.isDead);
     if (activeAllyIndex === -1) {
        processTurn();
        return;
     }

     const actor = allies[activeAllyIndex];
     const res = executeAllyAction(actor, allies, enemy);

     setEnemy(res.newEnemy);
     setAllies(res.newAllies);
     setLogs(prev => [...prev, ...res.logs]);

     if (res.isVictory) {
        setBattleState('VICTORY');
        if (typeof onBattleEnd === 'function') onBattleEnd(true);
     } else {
        const resetAllies = res.newAllies.map((a, i) => 
           i === activeAllyIndex ? resetUnitDistance(a) : a
        );
        setAllies(resetAllies);

        setTimeout(() => processTurn(), 300);
     }

  }, [allies, enemy, processTurn, setAllies, setEnemy, setLogs, setBattleState, onBattleEnd]);

  useEffect(() => {
    if (battleState === 'BATTLE' && !isProcessing) {
       const someoneReady = [...allies, enemy].some(u => (typeof u.distance === 'number' ? u.distance <= 0.1 : false));
       if (!someoneReady) {
          processTurn();
       }
    }
  }, [battleState, allies, enemy, isProcessing, processTurn]);

  return { processTurn, stepTurn };
};
