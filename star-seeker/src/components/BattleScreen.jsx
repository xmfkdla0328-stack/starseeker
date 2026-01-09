
import React from 'react';

// 완전히 비워진 전투 화면 뼈대
export const BattleScreen = () => {
  const [interventionMode, setInterventionMode] = React.useState(false);
  const handleTimelineClick = () => setInterventionMode((prev) => !prev);
  return (
    <div className="h-full w-full flex flex-col bg-black text-white">
      {/* 적군 진영 (상단) */}
      <div className="w-full flex flex-col items-center justify-center py-6 bg-gray-900 border-b border-gray-700" style={{ minHeight: '220px' }}>
        {/* 적군 상태창/아이콘/예지 아이콘 (상단) */}
        <div className="w-full flex flex-row items-end justify-center mb-2">
        {/* 적 유닛 아이콘/초상화 표시 */}
        {[1,2,3,4].map(i => {
          const enemy = require('../data/characters/characterData').CHARACTER_BASE_DATA[i];
          const hp = enemy.baseHp;
          const maxHp = enemy.baseHp;
          return (
            <div key={enemy.id} className="mx-4 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-red-500">
                {enemy.portrait ? (
                  <img src={enemy.portrait} alt={enemy.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-base">{enemy.name}</span>
                )}
              </div>
              <span className="text-sm mt-2 font-semibold">{enemy.name}</span>
              {/* HP 바 및 수치 */}
              <div className="w-20 h-4 bg-gray-800 rounded mt-2 flex items-center">
                <div
                  className="h-4 rounded bg-red-500"
                  style={{ width: `${(hp / maxHp) * 100}%` }}
                />
              </div>
              <span className="text-xs text-red-300">HP: {hp} / {maxHp}</span>
            </div>
          );
        })}
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
        <div className="w-full flex items-center justify-center">
          <div
            className={`w-4/5 h-40 rounded-2xl shadow-lg flex items-center justify-center border-4 relative overflow-hidden transition-all duration-300 cursor-pointer ${interventionMode ? 'border-yellow-400 bg-yellow-900/60' : 'border-blue-400 bg-gray-700'}`}
            onClick={handleTimelineClick}
            title="타임라인을 터치하면 개입 모드가 활성화/비활성화 됩니다."
          >
            {/* 별자리 궤적(지그재그) SVG */}
            <svg width="100%" height="100%" viewBox="0 0 600 120" style={{ position: 'absolute', left: 0, top: 0 }}>
              {/* 궤적 경로: 지그재그 선 */}
              <polyline points="20,100 100,40 180,100 260,40 340,100 420,40 500,100 580,40" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="8 6" />
              {/* 노드(별) 표시 */}
              {[20,100,180,260,340,420,500,580].map((x, idx) => (
                <circle key={idx} cx={x} cy={idx%2===0?100:40} r="10" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
              ))}
              {/* 유닛 아이콘(테스트용) */}
              {/* 예시: 3명의 유닛이 궤적 위에 위치, 잔상 효과(투명 원) */}
              {[{x:100,y:40,color:'#38bdf8'},{x:260,y:40,color:'#f87171'},{x:420,y:40,color:'#a3e635'}].map((u, idx) => (
                <g key={idx}>
                  {/* 잔상 효과 */}
                  <circle cx={u.x-30} cy={u.y} r="10" fill={u.color} opacity="0.2" />
                  {/* 유닛 아이콘 */}
                  <circle cx={u.x} cy={u.y} r="14" fill={u.color} stroke="#fff" strokeWidth="3" />
                  <text x={u.x} y={u.y+5} textAnchor="middle" fontSize="14" fill="#222" fontWeight="bold">U{idx+1}</text>
                </g>
              ))}
            </svg>
            <span className={`text-lg z-10 font-bold ${interventionMode ? 'text-yellow-200' : 'text-blue-200'}`}>
              타임라인 영역 (별자리 궤도) {interventionMode ? ' - 개입 모드' : ''}
            </span>
          </div>
        </div>
      </div>
      {/* 이후: 아군 진영 등 추가 */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-3xl font-bold">전투 화면 (BattleScreen)</h1>
      </div>
    </div>
  );
};

export default BattleScreen;