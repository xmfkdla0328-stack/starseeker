import { useContext } from 'react';
import { BattleContext } from './contexts';

/**
 * 전투 상태(BattleContext) 접근을 위한 커스텀 훅
 * - battleSystem, battleAllies, battleEnemy, battleState, battleTurnCount, battleLogs 등 제공
 */
export function useBattleContext() {
  const ctx = useContext(BattleContext);
  if (!ctx) {
    throw new Error('[useBattleContext][ERROR] BattleContext.Provider 하위에서만 호출되어야 합니다. Provider 구조를 점검하세요.');
  }

  // [디버깅] useBattleContext에서 battleAllies, battleEnemy, battleState 값 추적
  if (!ctx.battleAllies || !ctx.battleEnemy) {
    console.warn('[useBattleContext][WARN] battleAllies/battleEnemy 값이 비어 있습니다:', ctx);
  } else {
    console.log('[useBattleContext][FLOW] battleAllies:', ctx.battleAllies, 'battleEnemy:', ctx.battleEnemy, 'battleState:', ctx.battleState);
  }

  return ctx;
}
