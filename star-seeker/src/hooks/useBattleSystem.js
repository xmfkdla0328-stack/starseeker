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

  // 2. 전투 초기화 (데이터 로딩)
  useEffect(() => {
    if (partyData && partyData.length > 0 && stageData) {
      console.log("Battle Initializing...");
      
      // 아군 및 적군 데이터 초기화 (거리 10000 설정 등)
      const initAllies = initializeBattleAllies(
        partyData.filter(c => c.position === 'FRONT'), // 전열
        partyData.filter(c => c.position === 'BACK')   // 후열
      );
      const initBoss = initializeBoss(stageData);

      setAllies(initAllies);
      setEnemy(initBoss);
      
      // 데이터 준비가 끝나면 전투 시작 상태로 전환
      setTimeout(() => {
        setBattleState('BATTLE');
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
