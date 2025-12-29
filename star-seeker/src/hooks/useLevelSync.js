import { useEffect } from 'react';
import { getLevelFromExp } from '../data/playerStats';
import { getMaxLevelByBreakthrough } from '../data/breakthroughItems';

/**
 * 플레이어 경험치에 따라 플레이어 레벨과 모든 캐릭터 레벨을 동기화하는 hook
 * 돌파 시스템을 고려하여 레벨 캡 적용
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

      // 모든 캐릭터 레벨 동기화 (돌파 단계에 따른 최대 레벨 제한 적용)
      setInventory(prevInventory =>
        prevInventory.map(char => {
          const breakthrough = char.breakthrough || 0;
          const maxLevel = getMaxLevelByBreakthrough(breakthrough);
          const cappedLevel = Math.min(newLevel, maxLevel);
          
          return {
            ...char,
            level: cappedLevel,
          };
        })
      );

      // 파티 캐릭터도 동기화
      setParty(prevParty => ({
        front: prevParty.front.map(c => {
          if (!c) return null;
          const breakthrough = c.breakthrough || 0;
          const maxLevel = getMaxLevelByBreakthrough(breakthrough);
          const cappedLevel = Math.min(newLevel, maxLevel);
          return { ...c, level: cappedLevel };
        }),
        back: prevParty.back.map(c => {
          if (!c) return null;
          const breakthrough = c.breakthrough || 0;
          const maxLevel = getMaxLevelByBreakthrough(breakthrough);
          const cappedLevel = Math.min(newLevel, maxLevel);
          return { ...c, level: cappedLevel };
        }),
      }));

      // 메인 캐릭터도 동기화
      if (mainChar) {
        const breakthrough = mainChar.breakthrough || 0;
        const maxLevel = getMaxLevelByBreakthrough(breakthrough);
        const cappedLevel = Math.min(newLevel, maxLevel);
        
        setMainChar(prev => ({
          ...prev,
          level: cappedLevel,
        }));
      }

      showToast(`레벨 ${oldLevel} → ${newLevel} 달성! 모든 캐릭터도 함께 성장했습니다.`);
    }
  }, [playerInfo.exp, playerInfo.level, mainChar, showToast, setPlayerInfo, setInventory, setParty, setMainChar]);
};
