/**
 * 자동 전투 모드 Hook
 * 자동 전투 on/off 및 인터벌 관리
 */

import { useState, useCallback, useEffect, useRef } from 'react';

export const useBattleAutoMode = (battleState, processTurn) => {
  const [isAuto, setIsAuto] = useState(false);
  const battleInterval = useRef(null);

  const toggleAuto = useCallback(() => {
    setIsAuto((prev) => !prev);
  }, []);

  useEffect(() => {
    // 자동 모드일 때만 인터벌 작동
    if (battleState === 'FIGHTING' && isAuto) {
      battleInterval.current = setInterval(() => processTurn(false), 100); 
    } else {
      if (battleInterval.current) clearInterval(battleInterval.current);
    }
    return () => { 
      if (battleInterval.current) clearInterval(battleInterval.current); 
    };
  }, [battleState, isAuto, processTurn]);

  return {
    isAuto,
    setIsAuto,
    toggleAuto,
  };
};
