import React, { useMemo } from 'react';

export const Timeline = ({ allies = [], enemy, maxDistance = 10000 }) => {
  // 1. 유닛 리스트 통합 (생존자만)
  const allUnits = useMemo(() => {
    const list = [];
    if (enemy && !enemy.isDead) list.push({ ...enemy, isEnemy: true, id: 'boss' });
    if (allies) list.push(...allies.filter(a => !a.isDead).map(a => ({ ...a, isEnemy: false })));
    return list;
  }, [allies, enemy]);

  // 2. 별자리 경로 좌표 정의 (0% ~ 100%)
  // 지그재그 형태: (우측 Start -> 좌측 End)
  const pathPoints = [
    { x: 95, y: 50 }, // Start (10000)
    { x: 75, y: 20 },
    { x: 50, y: 80 },
    { x: 25, y: 30 },
    { x: 5, y: 50 }   // End (0)
  ];

  // 3. 거리(distance)를 좌표(x, y)로 변환하는 함수
  const getPositionOnPath = (dist) => {
    const totalSegments = pathPoints.length - 1;
    const normalizedDist = Math.max(0, Math.min(maxDistance, dist)); // 0 ~ 10000
    const progress = normalizedDist / maxDistance; // 1(Start) ~ 0(End)
    
    // progress 1 -> Index 0, progress 0 -> Index 4
    const pathProgress = (1 - progress) * totalSegments;
    
    const currentIndex = Math.floor(pathProgress);
    const nextIndex = Math.min(totalSegments, currentIndex + 1);
    const segmentRatio = pathProgress - currentIndex;

    const p1 = pathPoints[currentIndex] || pathPoints[totalSegments];
    const p2 = pathPoints[nextIndex] || pathPoints[totalSegments];

    // 선형 보간
    const x = p1.x + (p2.x - p1.x) * segmentRatio;
    const y = p1.y + (p2.y - p1.y) * segmentRatio;

    return { x, y };
  };

  return (
    <div className="w-full h-full relative bg-slate-900/40 rounded-xl overflow-hidden border border-blue-500/20">
      {/* 배경 장식 (Star Field) */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* SVG 별자리 선 그리기 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_5px_rgba(100,200,255,0.6)]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          points={pathPoints.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="rgba(100, 200, 255, 0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        {/* 주요 포인트(별) 표시 */}
        {pathPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={1.5} fill="#60a5fa" className="animate-pulse" />
        ))}
      </svg>

      {/* 유닛 아이콘 배치 */}
      {allUnits.map((unit) => {
        const { x, y } = getPositionOnPath(unit.distance);
        const isReady = unit.distance <= 0;
        
        return (
          <div 
            key={unit.uid || unit.id}
            className={`absolute flex flex-col items-center justify-center transition-all duration-500 ease-out will-change-transform z-10 hover:z-50 hover:scale-110`}
            style={{ 
              left: `${x}%`, 
              top: `${y}%`, 
              transform: 'translate(-50%, -50%)' 
            }}
          >
            {/* 아이콘 */}
            <div className={`
              w-10 h-10 md:w-12 md:h-12 rounded-full border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]
              ${unit.isEnemy ? 'border-red-500 shadow-red-500/30' : 'border-blue-400 shadow-blue-500/30'}
              ${isReady ? 'ring-4 ring-yellow-400 animate-bounce' : ''}
              bg-slate-900 relative
            `}>
               <img 
                  src={unit.face || unit.image} 
                  alt={unit.name} 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => e.target.style.display = 'none'} 
               />
            </div>

            {/* 거리 정보 (Hover시) */}
            <div className="absolute -bottom-6 bg-black/80 text-[10px] text-white px-2 py-0.5 rounded opacity-0 hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
               {Math.floor(unit.distance)}m
            </div>
          </div>
        );
      })}

      {/* 라벨 */}
      <div className="absolute top-2 right-4 text-xs font-mono text-slate-500">FUTURE (Start)</div>
      <div className="absolute bottom-2 left-4 text-xs font-mono text-blue-400">PRESENT (Act)</div>
    </div>
  );
};
