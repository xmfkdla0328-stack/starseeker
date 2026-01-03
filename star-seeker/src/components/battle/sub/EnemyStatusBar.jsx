import React from 'react';

const EnemyStatusBar = ({ enemyHp, enemyMaxHp }) => {
  const widthPercent = ((enemyHp / (enemyMaxHp || 1)) * 100).toFixed(2);
  return (
    <div 
      className="astro-panel rounded-xl p-3" 
      style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 15, 
        width: '420px',
        maxWidth: '90vw'
      }}
    >
      <div className="text-xs text-slate-200/70 mb-2 tracking-[0.08em]">적 HP</div>
      <div className="h-3 w-full rounded-full overflow-hidden bg-white/5 border border-red-400/40">
        <div className="h-full bg-gradient-to-r from-red-500 to-red-300 transition-all duration-300" style={{ width: `${widthPercent}%` }}></div>
      </div>
    </div>
  );
};

export default EnemyStatusBar;
