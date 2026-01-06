import React from 'react';

/**
 * 직업 역할 카드 컴포넌트
 */
export const RoleCard = ({ role }) => {
  return (
    <div className="bg-gradient-to-r from-slate-800/40 to-transparent rounded-xl p-5 border border-slate-700/30 hover:border-cyan-500/40 transition-all">
      <div className="flex items-start gap-4">
        {/* 아이콘 */}
        <div className="text-4xl shrink-0">{role.icon}</div>
        
        <div className="flex-1">
          {/* 직업명 */}
          <div className="flex items-center gap-3 mb-2">
            <span className={`font-bold text-lg ${role.color}`}>{role.name}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wider">{role.nameEn}</span>
          </div>
          
          {/* 설명 */}
          <div className="text-sm text-slate-300 mb-3">{role.description}</div>
          
          {/* 특성 태그들 */}
          <div className="flex flex-wrap gap-2">
            {role.traits.map((trait, tidx) => (
              <span
                key={tidx}
                className="px-2 py-1 rounded-md bg-slate-700/40 border border-slate-600/40 text-xs text-slate-300"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
