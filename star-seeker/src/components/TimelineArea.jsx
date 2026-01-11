import React, { useState } from 'react';
// 실제 전투 데이터 연동 준비: useBattleContext 안전하게 import
import { useBattleContext } from '../context/useBattleContext';
import { INTERVENTION_SKILLS } from '../constants/interventionSkills';
import { calculateTurnsPerCycle } from '../utils/battle/turnLogic';

/**
 * TimelineArea: 타임라인(별자리 궤도) 영역 컴포넌트
 * - interventionMode: 개입 모드 활성화 여부 (부모에서 상태 관리)
 * - onToggleIntervention: 타임라인 클릭 시 개입 모드 토글 함수
 */
export default function TimelineArea({ interventionMode, onToggleIntervention }) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  // 실제 전투 데이터 연동 준비: useBattleContext로 allies/enemy/battleState 받아오기
  let battleAllies = null, battleEnemy = null, battleState = null;
  try {
    const ctx = useBattleContext();
    battleAllies = ctx.battleAllies;
    battleEnemy = ctx.battleEnemy;
    battleState = ctx.battleState;
    // 실제 데이터가 정상적으로 들어오는지 콘솔로만 확인(렌더링 영향 X)
    // eslint-disable-next-line no-console
    console.log('[TimelineArea] battleAllies:', battleAllies, 'battleEnemy:', battleEnemy, 'battleState:', battleState);
  } catch (e) {
    // Provider 외부에서 호출 시 에러 방지(더미 데이터만 사용)
  }

  // [최상단] battleAllies 등 데이터 흐름 추적용 콘솔 로그
  console.log('[TimelineArea][FLOW] battleAllies:', battleAllies);
  console.log('[TimelineArea][FLOW] battleEnemy:', battleEnemy);
  console.log('[TimelineArea][FLOW] battleState:', battleState);

  // 타임라인 궤적 노드 위치(고정, 8개)
  const nodePositions = [
    { x: 20, y: 100 },
    { x: 100, y: 40 },
    { x: 180, y: 100 },
    { x: 260, y: 40 },
    { x: 340, y: 100 },
    { x: 420, y: 40 },
    { x: 500, y: 100 },
    { x: 580, y: 40 },
  ];

  // 실제 데이터 기반 유닛 위치 계산 (position: 0~10000 → 궤적상 x좌표로 매핑)
  function getUnitPositionOnTrack(position) {
    // position: 10000(미래) → 20, 0(현재) → 580, 선형 매핑
    const minX = 20, maxX = 580, minPos = 0, maxPos = 10000;
    const x = minX + ((maxX - minX) * (maxPos - position)) / (maxPos - minPos);
    // y는 x좌표에 따라 지그재그(짝수: 100, 홀수: 40)
    const idx = Math.round((x - minX) / ((maxX - minX) / 7));
    const y = idx % 2 === 0 ? 100 : 40;
    return { x, y };
  }

  // 실제 데이터 기반 렌더링: battleAllies가 있으면 실제 데이터, 없으면 기존 더미
  const renderUnits = () => {
    // 도착(턴 획득) 유닛: position <= 0
    const arrivedIds = (battleAllies && Array.isArray(battleAllies))
      ? battleAllies.filter(u => (u.position ?? 10000) <= 0).map(u => u.id)
      : [];
    if (battleAllies && Array.isArray(battleAllies) && battleAllies.length > 0) {
      // 다음 행동 유닛(예지): position이 0에 가장 가까운(가장 작은) 유닛
      const nextUnitIdx = battleAllies.reduce((minIdx, u, idx, arr) => {
        if (arr[minIdx] === undefined) return idx;
        const posA = arr[minIdx].position ?? 10000;
        const posB = u.position ?? 10000;
        return posB < posA ? idx : minIdx;
      }, 0);
      return battleAllies.map((unit, idx) => {
        const { x, y } = getUnitPositionOnTrack(unit.position ?? 10000);
        const color = unit.isAlly ? '#38bdf8' : '#f87171';
        const isArrived = (unit.position ?? 10000) <= 0;
        return (
          <g key={unit.id || idx}>
            {/* 잔상 효과: 이전 위치(예시) */}
            <circle cx={x - 30} cy={y} r="10" fill={color} opacity="0.2" />
            {/* 유닛 아이콘 */}
            <circle
              cx={x}
              cy={y}
              r="14"
              fill={color}
              stroke={interventionMode ? '#ffe066' : '#fff'}
              strokeWidth={interventionMode ? 5 : 3}
              filter={interventionMode ? 'url(#glow)' : undefined}
            />
            {/* 도착(턴 획득) 유닛 텍스트 강조 */}
            <text
              x={x}
              y={y+5}
              textAnchor="middle"
              fontSize="14"
              fill={isArrived ? '#fbbf24' : '#222'}
              fontWeight="bold"
            >
              {unit.name || `U${idx+1}`}{isArrived ? ' (턴!)' : ''}
            </text>
            {/* 예지 아이콘(다음 행동 예측) - 실제 다음 행동 유닛에만 표시 */}
            {idx === nextUnitIdx && (
              <g>
                <circle cx={x} cy={y-22} r="10" fill="#fff" stroke="#60a5fa" strokeWidth="2" />
                <text x={x} y={y-17} textAnchor="middle" fontSize="14" fill="#2563eb" fontWeight="bold">👁️</text>
              </g>
            )}
          </g>
        );
      });
    } else {
      // 기존 더미 데이터 fallback
      return [
        {x:100,y:40,color:'#38bdf8'},{x:260,y:40,color:'#f87171'},{x:420,y:40,color:'#a3e635'}
      ].map((u, idx) => (
        <g key={idx}>
          <circle cx={u.x-30} cy={u.y} r="10" fill={u.color} opacity="0.2" />
          <circle
            cx={u.x}
            cy={u.y}
            r="14"
            fill={u.color}
            stroke={interventionMode ? '#ffe066' : '#fff'}
            strokeWidth={interventionMode ? 5 : 3}
            filter={interventionMode ? 'url(#glow)' : undefined}
          />
          {idx === 0 && (
            <g>
              <circle cx={u.x} cy={u.y-22} r="10" fill="#fff" stroke="#60a5fa" strokeWidth="2" />
              <text x={u.x} y={u.y-17} textAnchor="middle" fontSize="14" fill="#2563eb" fontWeight="bold">👁️</text>
            </g>
          )}
          <text x={u.x} y={u.y+5} textAnchor="middle" fontSize="14" fill="#222" fontWeight="bold">U{idx+1}</text>
        </g>
      ));
    }
  };

  // [2-10-3-3] 싸이클 내 노드(꼭짓점) 동적 생성 로직
  // 실제 데이터가 있으면 싸이클 내 획득 턴 수 합만큼 노드 생성
  let dynamicNodePositions = nodePositions;
  if (battleAllies && Array.isArray(battleAllies) && battleAllies.length > 0) {
    // 싸이클 내 턴 획득 빈도 계산
    const turnsInfo = calculateTurnsPerCycle(battleAllies);
    const totalTurns = turnsInfo.reduce((sum, u) => sum + (u.turnsInCycle || 0), 0);
    // 노드 개수: 최소 8개, 실제 획득 턴 수가 더 많으면 그만큼 생성
    const nodeCount = Math.max(8, totalTurns);
    // 궤적 길이/분포에 따라 x/y 좌표 동적 생성
    dynamicNodePositions = Array.from({ length: nodeCount }).map((_, idx) => {
      const minX = 20, maxX = 580;
      const x = minX + ((maxX - minX) * idx) / (nodeCount - 1);
      const y = idx % 2 === 0 ? 100 : 40;
      return { x, y };
    });

    // [디버깅] 실제 데이터 기반 동적 노드 생성 정보 콘솔 출력
    console.log('[TimelineArea][DEBUG] battleAllies:', battleAllies);
    console.log('[TimelineArea][DEBUG] turnsInfo:', turnsInfo);
    console.log('[TimelineArea][DEBUG] totalTurns:', totalTurns);
    console.log('[TimelineArea][DEBUG] dynamicNodePositions.length:', Math.max(8, totalTurns));
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`w-4/5 h-40 rounded-2xl shadow-lg flex items-center justify-center border-4 relative overflow-hidden transition-all duration-300 cursor-pointer ${interventionMode ? 'border-yellow-400 bg-yellow-900/60' : 'border-blue-400 bg-gray-700'}`}
        onClick={onToggleIntervention}
        title="타임라인을 터치하면 개입 모드가 활성화/비활성화 됩니다."
      >
        {/* 별자리 궤적(지그재그) SVG */}
        <svg width="100%" height="100%" viewBox="0 0 600 120" style={{ position: 'absolute', left: 0, top: 0 }}>
          {/* 궤적 경로: 지그재그 선 */}
          <polyline points="20,100 100,40 180,100 260,40 340,100 420,40 500,100 580,40" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="8 6" />
          {/* 노드(별) 표시 */}
          {dynamicNodePositions.map((pos, idx) => (
            <circle
              key={idx}
              cx={pos.x}
              cy={pos.y}
              r="10"
              fill="#fbbf24"
              stroke={interventionMode ? '#ffe066' : '#fff'}
              strokeWidth={interventionMode ? 4 : 2}
              filter={interventionMode ? 'url(#glow)' : undefined}
            />
          ))}
          {/* Glow 효과 정의 */}
          {interventionMode && (
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          )}
          {/* 실제 데이터 기반 유닛 아이콘/잔상 렌더링 */}
          {renderUnits()}
        </svg>
        <span className={`text-lg z-10 font-bold ${interventionMode ? 'text-yellow-200' : 'text-blue-200'}`}>
          타임라인 영역 (별자리 궤도) {interventionMode ? ' - 개입 모드' : ''}
        </span>
        {/* CP 게이지 (우측 하단, 항상 표시) */}
        <div className="absolute bottom-3 right-4 flex flex-col items-end z-30">
          {/* CP 슬롯 게이지 */}
          <div className="flex flex-row items-end mb-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-7 mx-0.5 rounded-md border-2 ${i < 4 ? 'bg-yellow-300 border-yellow-500' : 'bg-gray-700 border-gray-500'}`}
                style={{ transition: 'background 0.2s' }}
                title={`CP ${(i+1)*10}`}
              />
            ))}
            <span className="ml-2 text-yellow-200 font-bold text-xs">CP</span>
            <span className="ml-1 text-yellow-100 text-xs font-mono">40 / 100</span>
          </div>
          {/* 개입 스킬 선택 UI (개입 모드일 때만) */}
          {interventionMode && (
            <div className="flex flex-row gap-2 bg-gray-900/80 rounded-xl p-2 shadow-lg border-2 border-yellow-400">
              {INTERVENTION_SKILLS.map(skill => (
                <button
                  key={skill.key}
                  className={`flex flex-col items-center px-2 py-1 rounded-lg transition-all duration-150 font-semibold text-xs focus:outline-none
                    ${selectedSkill === skill.key ? 'bg-yellow-400 text-gray-900 scale-110 shadow-xl border-2 border-yellow-600' : 'bg-gray-800 text-yellow-200 hover:bg-yellow-300 hover:text-gray-900'}`}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedSkill(skill.key);
                  }}
                  title={skill.name}
                  type="button"
                >
                  <span className="text-lg mb-1">{skill.icon}</span>
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-yellow-300 font-bold mt-0.5">CP {skill.cpCost}</span>
                </button>
              ))}
            </div>
          )}
          {interventionMode && (
            <span className="mt-1 text-xs text-yellow-200">개입 스킬 선택</span>
          )}
        </div>
      </div>
    </div>
  );
}
