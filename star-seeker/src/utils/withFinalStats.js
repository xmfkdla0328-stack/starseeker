// withFinalStats.js
// 파티 캐릭터 배열에 대해 StatCalculator를 적용해 전투 유닛용 최종 스탯 객체로 변환
import { calculateFinalStats } from './StatCalculator';

/**
 * @param {Array} party - 원본 파티 캐릭터 배열
 * @returns {Array} 전투 유닛용 최종 스탯이 포함된 객체 배열
 */
export function withFinalStats(party) {
  return (party || []).filter(Boolean).map((char, idx) => {
    // buffs 정보도 전달
    const stats = calculateFinalStats({ ...char, buffs: char.buffs });
    return {
      ...char,
      ...stats,
      id: char.id || `ally-${idx+1}`,
      type: 'ally',
      speed: char.baseSpd || char.speed || 100,
      // distance는 전투 진입 시 일괄 세팅
      color: char.color || 'bg-blue-500',
      icon: char.icon || '⚡',
      maxEp: char.maxEp || 100,
      ep: char.ep || 0,
      maxHp: stats.hp,
      hp: stats.hp,
      // atk, def 등도 stats에서 바로 할당
    };
  });
}
