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
  // 전투 전체 CP 상태 (유저 전체 공유)
  // 임시: 초기값 100으로 세팅하여 CP 부족 피드백 테스트
  const [battleCp, setBattleCp] = useState(100);

  // [디버깅] useBattleSystem에서 데이터 전달 확인
  console.log('[useBattleSystem][CHECK] partyData:', partyData);
  console.log('[useBattleSystem][CHECK] stageData:', stageData);
  if (!partyData || !Array.isArray(partyData) || partyData.length === 0) {
    // 데이터가 준비되지 않았으면 초기값만 반환 (렌더링 보류)
    return {
      allies: [],
      enemy: null,
      battleState: 'INIT',
      turnCount: 0,
      logs: [],
      battleCp: 100,
      setBattleCp: () => {},
    };
  }
  if (!stageData || !Array.isArray(stageData) || stageData.length === 0) {
    return {
      allies: [],
      enemy: null,
      battleState: 'INIT',
      turnCount: 0,
      logs: [],
      battleCp: 100,
      setBattleCp: () => {},
    };
  }
  // 기존 상태 추적
  console.log('[useBattleSystem][STATE] allies:', allies);
  console.log('[useBattleSystem][STATE] enemy:', enemy);
  console.log('[useBattleSystem][STATE] battleState:', battleState);

  // 2. 전투 초기화 (데이터 로딩)
  useEffect(() => {
    if (partyData && partyData.length > 0 && stageData && stageData.length > 0) {
      console.log('[useBattleSystem][INIT] Battle Initializing...');
      console.log('[useBattleSystem][INIT] partyData:', partyData);
      console.log('[useBattleSystem][INIT] stageData:', stageData);

      // 아군 전체를 allies로 세팅 (position 구분 없이)
      const initAllies = partyData.map((c) => ({
        ...c,
        position: c.position || 'FRONT',
        hp: c.maxHp,
        distance: 10000,
        maxDistance: 10000,
        isAlly: true,
        isDead: false,
        buffs: [],
      }));

      // 적군: enemyData가 배열이면 첫 번째 적만 보스로 세팅
      let initEnemy = null;
      if (Array.isArray(stageData) && stageData.length > 0) {
        initEnemy = {
          ...stageData[0],
          hp: stageData[0].maxHp,
          distance: 10000,
          maxDistance: 10000,
          isAlly: false,
          isDead: false,
          buffs: [],
        };
      }

      console.log('[useBattleSystem][INIT] setAllies:', initAllies);
      console.log('[useBattleSystem][INIT] setEnemy:', initEnemy);

      setAllies(initAllies);
      setEnemy(initEnemy);

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
    battleCp,
    setBattleCp,
    // Controller에서 가져온 기능들 (processTurn, isAuto 등)
    ...controller
  };
};
