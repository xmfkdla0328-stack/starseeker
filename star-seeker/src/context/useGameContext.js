import { useContext } from 'react';
import { PlayerContext, InventoryContext, UIContext } from './GameContext';

/**
 * 플레이어 Context를 소비하는 훅
 * playerInfo, addExp, handleSelectTitle 등 플레이어 관련 데이터/함수 제공
 */
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within GameContextProvider');
  }
  return context;
};

/**
 * 인벤토리 Context를 소비하는 훅
 * inventory, mainChar, handleGacha, party 등 제공
 */
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within GameContextProvider');
  }
  return context;
};

/**
 * UI Context를 소비하는 훅
 * screen, setScreen, showToast, toast 등 제공
 */
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within GameContextProvider');
  }
  return context;
};
