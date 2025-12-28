import { useMemo } from 'react';
import { SYNERGIES } from '../constants/index';

export const useSynergy = (party) => {
  const activeSynergies = useMemo(() => {
    const counts = {};
    const activeChars = [...party.front, ...party.back].filter(c => c !== null);
    
    // 태그 개수 집계
    activeChars.forEach(char => {
      char.tags.forEach(tag => { counts[tag] = (counts[tag] || 0) + 1; });
    });

    // 시너지 레벨 확인
    const results = [];
    Object.entries(counts).forEach(([tag, count]) => {
      const synData = SYNERGIES[tag];
      if (!synData) return;
      const effects = synData.levels.filter(l => count >= l.count);
      if (effects.length > 0) {
        results.push({ name: tag, count, effect: effects[effects.length - 1].effect });
      }
    });
    return results;
  }, [party]);

  return activeSynergies;
};