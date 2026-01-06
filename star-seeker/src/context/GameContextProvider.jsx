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
export const GameContextProvider = ({ children }) => {
  // 모든 게임 상태 초기화
  const gameState = useGameState();

  // Context 값 객체 생성
  const { playerContextValue, inventoryContextValue, uiContextValue } =
    buildContextValues(gameState);

  return (
    <UIContext.Provider value={uiContextValue}>
      <PlayerContext.Provider value={playerContextValue}>
        <InventoryContext.Provider value={inventoryContextValue}>
          {children}
        </InventoryContext.Provider>
      </PlayerContext.Provider>
    </UIContext.Provider>
  );
};
