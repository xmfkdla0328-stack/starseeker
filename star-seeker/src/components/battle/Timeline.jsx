import React from 'react';

export const Timeline = ({ allies, enemy, maxDistance = 10000 }) => {
  // 전체 유닛 리스트 합치기 (적 + 아군)
  const allUnits = [
    { ...enemy, isEnemy: true, id: 'boss' },
    ...allies.map(a => ({ ...a, isEnemy: false }))
  ].filter(u => !u.isDead);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50 rounded-lg p-4 border border-blue-500/30 relative overflow-hidden">
      {/* 트랙 배경 */}
      <div className="w-full h-2 bg-slate-700 rounded-full relative overflow-visible">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-0.5 bg-blue-500/50"></div>
        
        {/* 거리 마커 (0, 5000, 10000) */}
        <div className="absolute left-0 -top-6 text-xs text-blue-300 font-mono">ACT</div>
        <div className="absolute left-1/2 -top-6 text-xs text-slate-500 font-mono">5000</div>
        <div className="absolute right-0 -top-6 text-xs text-slate-500 font-mono">START</div>

        {/* 유닛 아이콘 배치 */}
        {allUnits.map((unit, idx) => {
          // 거리 비율 계산 (10000일 때 100%, 0일 때 0%)
          const percent = Math.min(100, Math.max(0, (unit.distance / maxDistance) * 100));
          
          return (
            <div 
              key={unit.uid || unit.id || idx}
              className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-linear z-10 flex flex-col items-center group`}
              style={{ left: `${percent}%` }}
            >
              {/* 아이콘 */}
              <div className={`
                w-8 h-8 rounded-full border-2 shadow-lg backdrop-blur-sm relative
                ${unit.isEnemy ? 'border-red-500 bg-red-900/80' : 'border-blue-400 bg-blue-900/80'}
                group-hover:scale-125 transition-transform
              `}>
                <img 
                  src={unit.face || unit.image} 
                  alt={unit.name} 
                  className="w-full h-full object-cover rounded-full opacity-90" 
                  onError={(e) => e.target.style.display = 'none'}
                />
                {/* 겹침 방지용 투명도 */}
                <div className="absolute inset-0 rounded-full bg-black/10"></div>
              </div>

              {/* 거리 텍스트 (호버 시 표시) */}
              <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 text-[10px] bg-black/80 px-1 rounded text-white whitespace-nowrap pointer-events-none">
                {Math.floor(unit.distance)}m
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="absolute bottom-2 right-4 text-xs text-slate-500">
        Time Dilation: 1.0x
      </div>
    </div>
  );
};
