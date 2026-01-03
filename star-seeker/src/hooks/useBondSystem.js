import { useEffect, useCallback } from 'react';

// 인연도 관련 상수
export const BOND_CONSTANTS = {
  MAX_LEVEL: 5,
  MIN_LEVEL: 0,
  BATTLE_INCREASE: 1,      // 전투 승리 시 증가값
  GARDEN_INCREASE: 0.02,   // 정원 초당 증가값 (1초에 0.02)
  GARDEN_CHECK_INTERVAL: 1000, // 정원에서 인연도 체크 간격 (ms)
};

/**
 * 인연도 시스템 관리 훅
 * @param {Array} inventory - 캐릭터 인벤토리
 * @param {Function} setInventory - 인벤토리 상태 변경 함수
 * @param {Object} party - 현재 파티 정보
 * @param {string} screen - 현재 화면
 * @returns {Object} 인연도 관련 함수
 */
export const useBondSystem = (inventory, setInventory, party, screen) => {
  // 인연도 증가 함수 (전투 승리 시)
  const increaseBondFromBattle = useCallback(() => {
    setInventory(prev =>
      prev.map(char => {
        const inParty = party.members.some(p => p && p.id === char.id);
        return inParty
          ? {
              ...char,
              bondLevel: Math.min(
                BOND_CONSTANTS.MAX_LEVEL,
                (char.bondLevel || BOND_CONSTANTS.MIN_LEVEL) + BOND_CONSTANTS.BATTLE_INCREASE
              ),
            }
          : char;
      })
    );
  }, [party, setInventory]);

  // 인연도 증가 함수 (정원 배치 시 - 초당 증가)
  const increaseBondFromGarden = useCallback(() => {
    setInventory(prev =>
      prev.map(char => {
        const inGarden = prev.slice(0, 5).some(c => c.id === char.id);
        return inGarden
          ? {
              ...char,
              bondLevel: Math.min(
                BOND_CONSTANTS.MAX_LEVEL,
                (char.bondLevel || BOND_CONSTANTS.MIN_LEVEL) + BOND_CONSTANTS.GARDEN_INCREASE
              ),
            }
          : char;
      })
    );
  }, [setInventory]);

  // 정원 시간 경과에 따른 인연도 증가
  useEffect(() => {
    if (screen === 'GARDEN') {
      const interval = setInterval(() => {
        increaseBondFromGarden();
      }, BOND_CONSTANTS.GARDEN_CHECK_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [screen, increaseBondFromGarden]);

  return {
    increaseBondFromBattle,
  };
};
