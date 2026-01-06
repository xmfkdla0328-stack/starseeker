import { useState, useCallback } from 'react';
import { DEFAULT_PLAYER_INFO, DEFAULT_PLAYER_STATS } from '../data/playerStats';

// 플레이어 정보, 스탯, 업적/타이틀을 관리하는 훅
export const usePlayerSystem = () => {
  const [playerInfo, setPlayerInfo] = useState(DEFAULT_PLAYER_INFO);
  const [playerStats, setPlayerStats] = useState(DEFAULT_PLAYER_STATS);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  const handleSelectTitle = useCallback((titleId) => {
    setPlayerInfo((prev) => ({
      ...prev,
      selectedTitle: titleId,
    }));
  }, []);

  const addExp = useCallback((expAmount) => {
    setPlayerInfo((prev) => ({
      ...prev,
      exp: prev.exp + expAmount,
    }));
  }, []);

  return {
    playerInfo,
    setPlayerInfo,
    playerStats,
    setPlayerStats,
    unlockedAchievements,
    setUnlockedAchievements,
    handleSelectTitle,
    addExp,
  };
};
