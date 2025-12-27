import { useState, useCallback, useEffect, useRef } from 'react';
import { BOSS_DATA, getElementalMultiplier, getSynergyBonus, calculateBackRowSupport } from '../utils/battleUtils';

export const useBattleSystem = (party, activeSynergies) => {
  const [battleState, setBattleState] = useState('IDLE');
  const [logs, setLogs] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [allies, setAllies] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  
  // battleFlags를 통해 부활권 잔여 횟수를 관리
  const battleFlags = useRef({ johoReviveCount: 0 });
  const battleInterval = useRef(null);

  const addLog = useCallback((msg) => {
    setLogs(prev => [...prev.slice(-4), msg]);
  }, []);

  // --- 전투 시작 ---
  const startBattle = useCallback(() => {
    const { atkBonusPct, defBonusPct, johoRevive } = getSynergyBonus(activeSynergies);
    
    // [중요] 부활권 초기화 (시너지 조건 만족 시 1회 부여)
    battleFlags.current = { johoReviveCount: johoRevive ? 1 : 0 }; 

    // 1. 유효 파티원 추출
    const frontChars = party.front.filter(c => c !== null);
    const backChars = party.back.filter(c => c !== null);

    if (frontChars.length === 0) {
      addLog("전열에 배치된 캐릭터가 없습니다! 전투 불가능.");
      return;
    }

    // 2. 후열 지원 스탯 계산
    const { addedAtk, addedHp } = calculateBackRowSupport(backChars);
    
    // 3. 전투원 데이터 생성 (위치 정보 position: FRONT/BACK 주입)
    const battleAllies = [];

    // 전열
    frontChars.forEach(c => {
      const finalAtk = Math.floor(c.baseAtk * (1 + atkBonusPct / 100)) + addedAtk;
      const finalHp = c.baseHp + addedHp;
      
      battleAllies.push({
        ...c,
        position: 'FRONT',
        maxHp: finalHp,
        hp: finalHp,
        atk: finalAtk,
        defPct: defBonusPct,
        isDead: false
      });
    });

    // 후열
    backChars.forEach(c => {
      battleAllies.push({
        ...c,
        position: 'BACK',
        maxHp: c.baseHp,
        hp: c.baseHp,
        atk: c.baseAtk,
        defPct: 0,
        isDead: false
      });
    });

    setAllies(battleAllies);
    setEnemy({ ...BOSS_DATA, hp: BOSS_DATA.maxHp });
    setBattleState('FIGHTING');
    
    // 시작 로그
    const startLogs = ['> 전투 개시!'];
    if (addedAtk > 0) startLogs.push(`> [후열 지원] 전열 스탯 상승 (공+${addedAtk}, 체+${addedHp})`);
    if (atkBonusPct > 0) startLogs.push(`> [시너지] 공격력 +${atkBonusPct}%`);
    
    // 부활 준비 여부를 로그로 명확히 표시
    if (johoRevive) {
        startLogs.push(`> [시너지] '조호' 효과 활성화: 부활 1회 준비됨`);
    } else {
        startLogs.push(`> [시너지] '조호' 조건 미달: 부활 불가`);
    }
    
    startLogs.push(`> BOSS [${BOSS_DATA.name}] 등장!`);
    
    setLogs(startLogs);
    setTurnCount(0);
  }, [party, activeSynergies, addLog]);


  // --- 턴 진행 로직 ---
  const processTurn = useCallback(() => {
    if (battleState !== 'FIGHTING') return;

    setTurnCount(prev => prev + 1);
    
    // 상태 복사 (불변성 유지)
    let currentEnemy = { ...enemy };
    let currentAllies = [...allies];
    let turnLogs = [];

    // 1. 아군 턴
    currentAllies.forEach(ally => {
      if (ally.isDead) return;

      if (ally.position === 'FRONT') {
        const elemMod = getElementalMultiplier(ally.element, currentEnemy.element);
        const randMod = 0.9 + Math.random() * 0.2;
        const finalDmg = Math.floor(ally.atk * elemMod * randMod);

        currentEnemy.hp = Math.max(0, currentEnemy.hp - finalDmg);

        let logMsg = `[${ally.name}] 공격! ${finalDmg}`;
        if (elemMod > 1.0) logMsg += " (효과적!)";
        turnLogs.push(logMsg);
      } 
      else if (ally.position === 'BACK') {
        if (Math.random() > 0.8) turnLogs.push(`> [서포트] ${ally.name}: "집중하세요!"`);
      }
    });

    if (currentEnemy.hp <= 0) {
      setBattleState('VICTORY');
      turnLogs.push(`> [${currentEnemy.name}] 처치! 승리!`);
      setEnemy(currentEnemy);
      turnLogs.forEach(log => addLog(log));
      return; 
    }

    // 2. 적군 턴 (전열만 공격)
    const livingFrontAllies = currentAllies
      .map((a, i) => ({ ...a, idx: i }))
      .filter(a => !a.isDead && a.position === 'FRONT');

    if (livingFrontAllies.length > 0) {
      const targetData = livingFrontAllies[Math.floor(Math.random() * livingFrontAllies.length)];
      const targetIdx = targetData.idx;
      const target = currentAllies[targetIdx];

      const elemMod = getElementalMultiplier(currentEnemy.element, target.element);
      const defMod = 1 - (target.defPct || 0) / 100;
      const randMod = 0.9 + Math.random() * 0.2;
      const finalDmg = Math.floor(currentEnemy.atk * elemMod * defMod * randMod);

      let newHp = target.hp - finalDmg;
      turnLogs.push(`[${currentEnemy.name}] 공격! [${target.name}]에게 ${finalDmg}`);

      if (newHp <= 0) {
        // [부활 체크]
        // 1. 전열 캐릭터인가? (YES, 위에서 전열만 필터링함)
        // 2. '조호' 태그가 있는가?
        // 3. 부활권이 남아있는가?
        const hasJohoTag = target.tags && target.tags.includes('조호');
        const canResurrect = hasJohoTag && battleFlags.current.johoReviveCount > 0;

        if (canResurrect) {
            battleFlags.current.johoReviveCount--; // 부활권 차감
            newHp = Math.floor(target.maxHp * 0.2); // 체력 20%로 부활
            turnLogs.push(`> 🌟 [시너지] '조호' 발동! [${target.name}] 부활! (HP: ${newHp})`);
        } else {
            newHp = 0;
            target.isDead = true;
            turnLogs.push(`> [${target.name}] 쓰러짐...`);
        }
      }
      
      target.hp = newHp;
      currentAllies[targetIdx] = target;
    }

    // 3. 패배 조건 체크
    // "이번 턴 결과, 전열에 살아있는 사람이 0명이면 패배"
    const survivors = currentAllies.filter(a => !a.isDead && a.position === 'FRONT');
    
    if (survivors.length === 0) {
        setBattleState('DEFEAT');
        turnLogs.push(`> 전열 붕괴! 패배했습니다...`);
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