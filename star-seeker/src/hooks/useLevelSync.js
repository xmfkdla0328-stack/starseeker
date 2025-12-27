import { useEffect } from 'react';
import { getLevelFromExp } from '../data/playerStats';

/**
 * 플레이어 경험치에 따라 플레이어 레벨과 모든 캐릭터 레벨을 동기화하는 hook
 */
export const useLevelSync = (playerInfo, setPlayerInfo, inventory, setInventory, party, setParty, mainChar, setMainChar, showToast) => {
  useEffect(() => {
    const { level: newLevel } = getLevelFromExp(playerInfo.exp);
    const oldLevel = playerInfo.level;

    if (newLevel !== oldLevel) {
      // 플레이어 레벨 업데이트
      setPlayerInfo(prev => ({
        ...prev,
        level: newLevel,
      }));

      // 모든 캐릭터 레벨 동기화
      setInventory(prevInventory =>
        prevInventory.map(char => ({
          ...char,
          level: newLevel,
        }))
      );

      // 파티 캐릭터도 동기화
      setParty(prevParty => ({
        front: prevParty.front.map(c => c ? { ...c, level: newLevel } : null),
        back: prevParty.back.map(c => c ? { ...c, level: newLevel } : null),
      }));

      // 메인 캐릭터도 동기화
      if (mainChar) {
        setMainChar(prev => ({
          ...prev,
          level: newLevel,
        }));
      }

      showToast(`레벨 ${oldLevel} → ${newLevel} 달성! 모든 캐릭터도 함께 성장했습니다.`);
    }
  }, [playerInfo.exp, playerInfo.level, mainChar, showToast, setPlayerInfo, setInventory, setParty, setMainChar]);
};
