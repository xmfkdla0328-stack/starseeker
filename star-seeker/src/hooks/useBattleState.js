/**
 * 전투 상태 관리 Hook
 * 전투 상태, 로그, 적/아군 상태, 턴 카운트 등을 관리
 */

import { useState, useCallback, useRef } from 'react';
import { BOSS_DATA } from '../utils/battle/battleData';
import { getSynergyBonus, calculateBackRowSupport } from '../utils/battle/formulas';
import { initializeBattleAllies, initializeBoss } from '../utils/battle/battleInitializer';

export const useBattleState = (party, activeSynergies) => {
  const [battleState, setBattleState] = useState('IDLE');
  const [logs, setLogs] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [allies, setAllies] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  
  const battleFlags = useRef({ johoReviveCount: 0 });

  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev.slice(-4), msg]);
  }, []);

  const startBattle = useCallback(() => {
    const { atkBonusPct, defBonusPct, johoRevive } = getSynergyBonus(activeSynergies);
    battleFlags.current = { johoReviveCount: johoRevive ? 1 : 0 };

    const frontChars = party.front.filter((c) => c !== null);
    const backChars = party.back.filter((c) => c !== null);

    if (frontChars.length === 0) {
      addLog('전열에 배치된 캐릭터가 없습니다! 전투 불가능.');
      return;
    }

    const { addedAtk, addedHp } = calculateBackRowSupport(backChars);

    const battleAllies = initializeBattleAllies(
      frontChars,
      backChars,
      { atkBonusPct, defBonusPct },
      { addedAtk, addedHp }
    );

    setAllies(battleAllies);
    setEnemy(initializeBoss(BOSS_DATA));
    setBattleState('FIGHTING');

    const startLogs = ['> 전투 개시!', '> 속도에 따라 턴이 진행됩니다.'];
    if (johoRevive)
      startLogs.push(
        `> [시너지] '조호' 활성: 부활권 ${battleFlags.current.johoReviveCount}회 지급됨`
      );
    setLogs(startLogs);
    setTurnCount(0);
  }, [party, activeSynergies, addLog]);

  return {
    // 상태
    battleState,
    setBattleState,
    logs,
    enemy,
    setEnemy,
    allies,
    setAllies,
    turnCount,
    setTurnCount,
    battleFlags,
    
    // 메서드
    addLog,
    startBattle,
  };
};
