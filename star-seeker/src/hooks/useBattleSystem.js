import { useState, useCallback, useEffect, useRef } from 'react';
import { BOSS_DATA, getSynergyBonus, calculateBackRowSupport, handleAllyTurn, handleEnemyTurn } from '../utils/battleUtils';

export const useBattleSystem = (party, activeSynergies) => {
  const [battleState, setBattleState] = useState('IDLE');
  const [logs, setLogs] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [allies, setAllies] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  
  const battleFlags = useRef({ johoReviveCount: 0 });
  const battleInterval = useRef(null);

  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev.slice(-4), msg]);
  }, []);

  const startBattle = useCallback(() => {
    const { atkBonusPct, defBonusPct, johoRevive } = getSynergyBonus(activeSynergies);
    
    // 부활권 설정
    battleFlags.current = { johoReviveCount: johoRevive ? 1 : 0 }; 

    const frontChars = party.front.filter(c => c !== null);
    const backChars = party.back.filter(c => c !== null);

    if (frontChars.length === 0) {
      addLog("전열에 배치된 캐릭터가 없습니다! 전투 불가능.");
      return;
    }

    const { addedAtk, addedHp } = calculateBackRowSupport(backChars);
    const battleAllies = [];

    // 전열
    frontChars.forEach(c => {
      const finalAtk = Math.floor(c.baseAtk * (1 + atkBonusPct / 100)) + addedAtk;
      const finalHp = c.baseHp + addedHp;
      battleAllies.push({ ...c, position: 'FRONT', maxHp: finalHp, hp: finalHp, atk: finalAtk, defPct: defBonusPct, isDead: false });
    });

    // 후열
    backChars.forEach(c => {
      battleAllies.push({ ...c, position: 'BACK', maxHp: c.baseHp, hp: c.baseHp, atk: c.baseAtk, defPct: 0, isDead: false });
    });

    setAllies(battleAllies);
    setEnemy({ ...BOSS_DATA, hp: BOSS_DATA.maxHp });
    setBattleState('FIGHTING');
    
    const startLogs = ['> 전투 개시!'];
    if (addedAtk > 0) startLogs.push(`> [후열 지원] 전열 스탯 상승 (공+${addedAtk}, 체+${addedHp})`);
    if (atkBonusPct > 0) startLogs.push(`> [시너지] 공격력 +${atkBonusPct}%`);
    
    // [디버그용 로그] 실제 부활권 개수 표시
    if (johoRevive) {
        startLogs.push(`> [시너지] '조호' 활성: 부활권 ${battleFlags.current.johoReviveCount}회 지급됨`);
    } else {
        startLogs.push(`> [시너지] '조호' 미발동: 부활권 없음`);
    }
    
    startLogs.push(`> BOSS [${BOSS_DATA.name}] 등장!`);
    
    setLogs(startLogs);
    setTurnCount(0);
  }, [party, activeSynergies, addLog]);

  const processTurn = useCallback(() => {
    if (battleState !== 'FIGHTING') return;

    setTurnCount(prev => prev + 1);

    // 1. 아군 턴
    const allyResult = handleAllyTurn(allies, enemy);
    allyResult.logs.forEach(log => addLog(log));

    if (allyResult.isVictory) {
      setBattleState('VICTORY');
      setEnemy(allyResult.newEnemy);
      return;
    }

    // 2. 적군 턴
    const enemyResult = handleEnemyTurn(allies, allyResult.newEnemy, battleFlags.current.johoReviveCount);
    
    enemyResult.logs.forEach(log => addLog(log));
    
    // 부활권 차감 업데이트
    battleFlags.current.johoReviveCount = enemyResult.newReviveCount;

    // 패배 시 종료
    if (enemyResult.isDefeat) {
      setBattleState('DEFEAT');
    }

    setEnemy(allyResult.newEnemy); 
    setAllies(enemyResult.newAllies); 

  }, [battleState, enemy, allies, addLog]);

  useEffect(() => {
    if (battleState === 'FIGHTING') {
      battleInterval.current = setInterval(processTurn, 1000);
    } else {
      clearInterval(battleInterval.current);
    }
    return () => clearInterval(battleInterval.current);
  }, [battleState, processTurn]);

  return { battleState, logs, enemy, allies, startBattle, turnCount };
};