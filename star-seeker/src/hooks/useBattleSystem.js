import { useState, useEffect } from 'react';
import { useBattleController } from './useBattleController';
import { initializeBattleAllies, initializeBoss } from '../utils/battle/battleInitializer';

export const useBattleSystem = (partyData, stageData) => {
  // 1. 상태 관리 (State Lifting)
  const [allies, setAllies] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [battleState, setBattleState] = useState('INIT'); // 'INIT', 'BATTLE', 'VICTORY', 'DEFEAT'
  const [turnCount, setTurnCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // [디버깅] 파라미터 및 상태 추적
  console.log('[useBattleSystem][PARAM] partyData:', partyData);
  console.log('[useBattleSystem][PARAM] stageData:', stageData);
  console.log('[useBattleSystem][STATE] allies:', allies);
  console.log('[useBattleSystem][STATE] enemy:', enemy);
  console.log('[useBattleSystem][STATE] battleState:', battleState);

  // 2. 전투 초기화 (데이터 로딩)
  useEffect(() => {
    if (partyData && partyData.length > 0 && stageData) {
      console.log('[useBattleSystem][INIT] Battle Initializing...');
      console.log('[useBattleSystem][INIT] partyData:', partyData);
      console.log('[useBattleSystem][INIT] stageData:', stageData);

      // 아군 및 적군 데이터 초기화 (거리 10000 설정 등)
      const initAllies = initializeBattleAllies(
        partyData.filter(c => c.position === 'FRONT'), // 전열
        partyData.filter(c => c.position === 'BACK')   // 후열
      );
      const initBoss = initializeBoss(stageData);

      console.log('[useBattleSystem][INIT] setAllies:', initAllies);
      console.log('[useBattleSystem][INIT] setEnemy:', initBoss);

      setAllies(initAllies);
      setEnemy(initBoss);

      // 데이터 준비가 끝나면 전투 시작 상태로 전환
      setTimeout(() => {
        setBattleState('BATTLE');
        console.log('[useBattleSystem][INIT] battleState set to BATTLE');
      }, 500);
    }
  }, [partyData, stageData]);

  // 3. 전투 엔진 연결 (Controller Hook)
  const controller = useBattleController({
    battleState,
    setBattleState,
    allies,
    setAllies,
    enemy,
    setEnemy,
    logs,
    setLogs,
    turnCount,
    setTurnCount
  });

  // 4. 외부로 내보낼 데이터 및 함수 (UI 컴포넌트가 사용할 것들)
  return {
    isReady: battleState !== 'INIT', // 로딩 완료 여부
    battleState,
    allies,
    enemy,
    logs,
    turnCount,
    // Controller에서 가져온 기능들 (processTurn, isAuto 등)
    ...controller
  };
};
