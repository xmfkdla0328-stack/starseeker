import { useState, useCallback, useEffect, useRef } from 'react';
// ★ 경로 변경: ../utils/battleUtils 가 아니라 각각의 파일에서 가져옵니다.
import { BOSS_DATA } from '../utils/battle/battleData';
import { getSynergyBonus, calculateBackRowSupport } from '../utils/battle/formulas';
import { handleAllyTurn, handleEnemyTurn } from '../utils/battle/turnLogic';

export const useBattleSystem = (party, activeSynergies) => {
  // ... (내용은 이전과 완전히 동일합니다. import 경로만 바뀌었습니다.)
  const [battleState, setBattleState] = useState('IDLE');
  const [logs, setLogs] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [allies, setAllies] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  
  const battleFlags = useRef({ johoReviveCount: 0 });
  const battleInterval = useRef(null);

  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev.slice(-4), msg]);
  }, []);

  const startBattle = useCallback(() => {
    const { atkBonusPct, defBonusPct, johoRevive } = getSynergyBonus(activeSynergies);
    battleFlags.current = { johoReviveCount: johoRevive ? 1 : 0 }; 

    const frontChars = party.front.filter(c => c !== null);
    const backChars = party.back.filter(c => c !== null);

    if (frontChars.length === 0) {
      addLog("전열에 배치된 캐릭터가 없습니다! 전투 불가능.");
      return;
    }

    const { addedAtk, addedHp } = calculateBackRowSupport(backChars);
    const battleAllies = [];

    frontChars.forEach(c => {
      const finalAtk = Math.floor(c.baseAtk * (1 + atkBonusPct / 100)) + addedAtk;
      const finalHp = c.baseHp + addedHp;
      battleAllies.push({ ...c, position: 'FRONT', maxHp: finalHp, hp: finalHp, atk: finalAtk, defPct: defBonusPct, isDead: false });
    });

    backChars.forEach(c => {
      battleAllies.push({ ...c, position: 'BACK', maxHp: c.baseHp, hp: c.baseHp, atk: c.baseAtk, defPct: 0, isDead: false });
    });

    setAllies(battleAllies);
    setEnemy({ ...BOSS_DATA, hp: BOSS_DATA.maxHp });
    setBattleState('FIGHTING');
    
    const startLogs = ['> 전투 개시!'];
    if (addedAtk > 0) startLogs.push(`> [후열 지원] 전열 스탯 상승 (공+${addedAtk}, 체+${addedHp})`);
    if (atkBonusPct > 0) startLogs.push(`> [시너지] 공격력 +${atkBonusPct}%`);
    if (johoRevive) startLogs.push(`> [시너지] '조호' 활성: 부활권 ${battleFlags.current.johoReviveCount}회 지급됨`);
    else startLogs.push(`> [시너지] '조호' 미발동: 부활권 없음`);
    
    startLogs.push(`> BOSS [${BOSS_DATA.name}] 등장!`);
    setLogs(startLogs);
    setTurnCount(0);
  }, [party, activeSynergies, addLog]);

  const processTurn = useCallback(() => {
    if (battleState !== 'FIGHTING') return;
    setTurnCount(prev => prev + 1);

    const allyResult = handleAllyTurn(allies, enemy);
    allyResult.logs.forEach(log => addLog(log));

    if (allyResult.isVictory) {
      setBattleState('VICTORY');
      setEnemy(allyResult.newEnemy);
      return;
    }

    const enemyResult = handleEnemyTurn(allies, allyResult.newEnemy, battleFlags.current.johoReviveCount);
    enemyResult.logs.forEach(log => addLog(log));
    battleFlags.current.johoReviveCount = enemyResult.newReviveCount;

    if (enemyResult.isDefeat) setBattleState('DEFEAT');

    setEnemy(allyResult.newEnemy); 
    setAllies(enemyResult.newAllies); 

  }, [battleState, enemy, allies, addLog]);

  useEffect(() => {
    if (battleState === 'FIGHTING' && isAuto) {
      battleInterval.current = setInterval(processTurn, 1000); 
    } else {
      if (battleInterval.current) clearInterval(battleInterval.current);
    }
    return () => { if (battleInterval.current) clearInterval(battleInterval.current); };
  }, [battleState, isAuto, processTurn]);

  return { battleState, logs, enemy, allies, startBattle, turnCount, processTurn, isAuto, setIsAuto };
};