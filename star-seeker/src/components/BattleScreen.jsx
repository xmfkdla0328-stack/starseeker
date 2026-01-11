
import React from 'react';
import { enemyData } from '../data/enemyData';
import TimelineArea from './TimelineArea';
import { useBattleSystem } from '../hooks/useBattleSystem';
import { useBattleContext } from '../context/useBattleContext';

// 실제 데이터 기반 전투 화면
export const BattleScreen = ({ partyData, enemyData: enemyDataProp, missionType }) => {
  const actualEnemyData = enemyDataProp ?? enemyData;
  const [interventionMode, setInterventionMode] = React.useState(false);
  const handleTimelineClick = () => setInterventionMode((prev) => !prev);

  // 실제 데이터 세팅: useBattleSystem에 전달
  const battle = useBattleSystem(partyData, actualEnemyData);
  // useBattleContext로 실시간 상태 접근
  let battleEnemy = null, battleState = null;
  try {
    const ctx = useBattleContext();
    battleEnemy = ctx.battleEnemy;
    battleState = ctx.battleState;
  } catch (e) {
    // Provider 외부에서 호출 시 에러 방지
    battleEnemy = battle.enemy;
    battleState = battle.battleState;
  }

  return (
    <div className="h-full w-full flex flex-col bg-black text-white">
      {/* 적군 진영 (상단) */}
      <div className="w-full flex flex-col items-center justify-center py-6 bg-gray-900 border-b border-gray-700" style={{ minHeight: '220px' }}>
        {/* 적군 상태창/아이콘/예지 아이콘 (상단) */}
        <div className="w-full flex flex-row items-end justify-center mb-2">
          {/* 실제 enemy 데이터 기반 렌더링 */}
          {battleEnemy ? (
            <div className="mx-4 flex flex-col items-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border-4 ${battleEnemy.isDead ? 'border-gray-500 bg-gray-700 opacity-50' : 'border-red-500 bg-gray-700'}`}>
                {battleEnemy.portrait ? (
                  <img src={battleEnemy.portrait} alt={battleEnemy.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-base">{battleEnemy.name}</span>
                )}
                {battleEnemy.isDead && (
                  <span className="absolute text-xs text-gray-300 bg-black/70 px-2 py-1 rounded">사망</span>
                )}
              </div>
              <span className={`text-sm mt-2 font-semibold ${battleEnemy.isDead ? 'text-gray-400' : ''}`}>{battleEnemy.name}</span>
              {/* HP/상태이상/사망/부활 등 실시간 반영 */}
              <div className="w-20 h-4 bg-gray-800 rounded mt-2 flex items-center">
                <div
                  className="h-4 rounded bg-red-500"
                  style={{ width: `${(battleEnemy.hp / battleEnemy.maxHp) * 100}%` }}
                />
              </div>
              <span className="text-xs text-red-300">HP: {battleEnemy.hp} / {battleEnemy.maxHp}</span>
              {/* ...existing code... */}
              {/* 상태이상 표시 예시 */}
              {battleEnemy.statusEffects && battleEnemy.statusEffects.length > 0 && (
                <div className="flex flex-row gap-1 mt-1">
                  {battleEnemy.statusEffects.map((effect, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-yellow-800 text-yellow-100 text-xs">{effect}</span>
                  ))}
                </div>
              )}
              {/* 부활 처리 예시: isDead → false로 바뀌면 '부활!' 표시 */}
              {battleEnemy._justRevived && (
                <span className="text-xs text-green-400 font-bold mt-1">부활!</span>
              )}
            </div>
          ) : (
            <span className="text-gray-400">적군 데이터 없음</span>
          )}
        </div>
        {/* 적군 일러스트/초상화 공간 (하단) */}
        <div className="w-full flex flex-row items-center justify-center mt-2" style={{ minHeight: '100px' }}>
          {[1,2,3,4].map(i => {
            // 테스트용: 적군 일러스트(앞모습) 공간, 실제 이미지 경로/컴포넌트로 교체 가능
            return (
              <div key={i} className="mx-4 flex items-center justify-center">
                <div className="w-24 h-32 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-red-400 shadow-lg">
                  <span className="text-lg text-red-200">적군 일러스트</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 타임라인 영역 (중앙) */}
      <div className="w-full flex flex-col items-center justify-center py-6 bg-gradient-to-b from-gray-900 to-gray-800" style={{ minHeight: '220px' }}>
        <TimelineArea interventionMode={interventionMode} onToggleIntervention={handleTimelineClick} />
      </div>
      {/* 이후: 아군 진영 등 추가 */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-3xl font-bold">전투 화면 (BattleScreen)</h1>
      </div>
    </div>
  );
};

export default BattleScreen;