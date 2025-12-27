import { useState, useCallback, useEffect, useRef } from 'react';
// 분리한 유틸리티 함수들 가져오기
import { BOSS_DATA, getElementalMultiplier, getSynergyBonus } from '../utils/battleUtils';

export const useBattleSystem = (party, activeSynergies) => {
  const [battleState, setBattleState] = useState('IDLE');
  const [logs, setLogs] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [allies, setAllies] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  
  const battleFlags = useRef({ johoReviveUsed: false });
  const battleInterval = useRef(null);

  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev.slice(-4), msg]);
  }, []);

  // --- 전투 시작 ---
  const startBattle = useCallback(() => {
    const { atkBonusPct, defBonusPct, johoRevive } = getSynergyBonus(activeSynergies);
    
    battleFlags.current = { johoReviveUsed: !johoRevive }; 

    const tempAllies = [];
    party.front.forEach(c => { if (c) tempAllies.push({ ...c, position: 'FRONT' }); });
    party.back.forEach(c => { if (c) tempAllies.push({ ...c, position: 'BACK' }); });

    const battleAllies = tempAllies.map(c => {
        const finalAtk = Math.floor(c.baseAtk * (1 + atkBonusPct / 100));
        return {
          ...c,
          maxHp: c.baseHp,
          hp: c.baseHp,
          atk: finalAtk,
          defPct: defBonusPct,
          isDead: false
        };
      });

    if (battleAllies.length === 0) {
      addLog("출전할 캐릭터가 없습니다!");
      return;
    }

    setAllies(battleAllies);
    setEnemy({ ...BOSS_DATA, hp: BOSS_DATA.maxHp });
    setBattleState('FIGHTING');
    setLogs([
      '> 전투 개시!', 
      atkBonusPct > 0 ? `> [시너지] 공격력 +${atkBonusPct}%` : null,
      defBonusPct > 0 ? `> [시너지] 방어력 +${defBonusPct}%` : null,
      !battleFlags.current.johoReviveUsed ? `> [시너지] '조호' 부활 준비됨` : null,
      `> BOSS [${BOSS_DATA.name}] 등장!`
    ].filter(Boolean));
    setTurnCount(0);
  }, [party, activeSynergies, addLog]);

  // --- 턴 진행 로직 ---
  const processTurn = useCallback(() => {
    if (battleState !== 'FIGHTING') return;

    setTurnCount(prev => prev + 1);
    let currentEnemy = { ...enemy };
    let currentAllies = [...allies];
    let turnLogs = [];

    // 1. 아군 턴
    currentAllies.forEach(ally => {
      if (ally.isDead) return;

      const elemMod = getElementalMultiplier(ally.element, currentEnemy.element);
      const randMod = 0.9 + Math.random() * 0.2;
      const finalDmg = Math.floor(ally.atk * elemMod * randMod);

      currentEnemy.hp = Math.max(0, currentEnemy.hp - finalDmg);

      let logMsg = `[${ally.name}] 공격! ${finalDmg}`;
      if (elemMod > 1.0) logMsg += " (효과적!)";
      else if (elemMod < 1.0) logMsg += " (반감)";
      turnLogs.push(logMsg);

      if (currentEnemy.hp <= 0) {
        setBattleState('VICTORY');
        turnLogs.push(`> [${currentEnemy.name}] 처치! 승리!`);
      }
    });

    // 2. 적군 턴
    if (currentEnemy.hp > 0) {
      const livingAllies = currentAllies.map((a, i) => ({ ...a, originalIdx: i })).filter(a => !a.isDead);
      
      if (livingAllies.length > 0) {
        const targetRef = livingAllies[Math.floor(Math.random() * livingAllies.length)];
        const targetIdx = targetRef.originalIdx;
        const target = currentAllies[targetIdx];

        const elemMod = getElementalMultiplier(currentEnemy.element, target.element);
        const defMod = 1 - (target.defPct || 0) / 100;
        const randMod = 0.9 + Math.random() * 0.2;
        const finalDmg = Math.floor(currentEnemy.atk * elemMod * defMod * randMod);

        let newHp = target.hp - finalDmg;

        let logMsg = `[${currentEnemy.name}]의 반격! [${target.name}]에게 ${finalDmg}`;
        if (elemMod > 1.0) logMsg += " (아프다!)";
        turnLogs.push(logMsg);

        if (newHp <= 0) {
          // 캐릭터의 실제 위치(position)가 'FRONT'인 경우에만 부활 체크
          const isRealFrontJoho = target.position === 'FRONT' && target.tags.includes('조호');
          
          if (isRealFrontJoho && !battleFlags.current.johoReviveUsed) {
            battleFlags.current.johoReviveUsed = true;
            newHp = Math.floor(target.maxHp * 0.2);
            turnLogs.push(`> [시너지] '조호' 발동! [${target.name}] 부활!`);
          } else {
            newHp = 0;
            target.isDead = true;
            turnLogs.push(`> [${target.name}] 전투 불능...`);
          }
        }
        
        target.hp = newHp;
        currentAllies[targetIdx] = target;

      } else {
        setBattleState('DEFEAT');
        turnLogs.push(`> 아군 전멸... 패배했습니다.`);
      }
    }

    setEnemy(currentEnemy);
    setAllies(currentAllies);
    turnLogs.forEach(log => addLog(log));

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