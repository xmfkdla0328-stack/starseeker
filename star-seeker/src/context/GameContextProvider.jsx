import React from 'react';
import { PlayerContext, InventoryContext, UIContext } from './contexts';
import { useGameState } from './useGameState';
import { buildContextValues } from './buildContextValues';

/**
 * GameContextProvider
 * 게임의 모든 Context를 제공하는 최상위 Provider
 * 
 * - useGameState: 모든 게임 상태와 훅 초기화
 * - buildContextValues: Context별 값 객체 생성
 * - 3개의 Context를 중첩하여 제공 (UI, Player, Inventory)
 */
export const GameContextProvider = ({ children, partyData, enemyData }) => {
  // [디버깅] GameContextProvider에서 데이터 전달 확인
  console.log('[GameContextProvider][CHECK] partyData:', partyData);
  console.log('[GameContextProvider][CHECK] enemyData:', enemyData);
  const isValidParty = partyData && Array.isArray(partyData) && partyData.length > 0 && partyData.every(x => x);
  const isValidEnemy = enemyData && Array.isArray(enemyData) && enemyData.length > 0 && enemyData.every(x => x);
  if (!isValidParty) {
    console.warn('[GameContextProvider][WARN] partyData가 올바르지 않습니다:', partyData);
  }
  if (!isValidEnemy) {
    console.warn('[GameContextProvider][WARN] enemyData가 올바르지 않습니다:', enemyData);
  }

  // 데이터가 유효할 때만 useGameState 호출
  if (!isValidParty || !isValidEnemy) {
    // 로딩 중 또는 더미 데이터 fallback (children만 반환)
    return <div style={{color:'#f00',padding:'2rem'}}>전투 데이터 로딩 중 또는 데이터 오류</div>;
  }

  // 모든 게임 상태 초기화 (partyData, enemyData 전달)
  const gameState = useGameState(partyData, enemyData);

  // Context 값 객체 생성
  const {
    playerContextValue,
    inventoryContextValue,
    uiContextValue,
    battleContextValue,
  } = buildContextValues(gameState);

  // [디버깅] Provider에서 battleContextValue 내부 값 추적
  if (!battleContextValue || !battleContextValue.battleAllies || !battleContextValue.battleEnemy) {
    console.warn('[GameContextProvider][WARN] battleContextValue에 실제 데이터가 없습니다:', battleContextValue);
  } else {
    console.log('[GameContextProvider][FLOW] battleContextValue:', battleContextValue);
  }

  return (
    <UIContext.Provider value={uiContextValue}>
      <PlayerContext.Provider value={playerContextValue}>
        <InventoryContext.Provider value={inventoryContextValue}>
          <BattleContext.Provider value={battleContextValue}>
            {children}
          </BattleContext.Provider>
        </InventoryContext.Provider>
      </PlayerContext.Provider>
    </UIContext.Provider>
  );
};
