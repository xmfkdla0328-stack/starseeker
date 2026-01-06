import React from 'react';

/**
 * 역할 탭 콘텐츠 컴포넌트
 */
export const RolesContent = ({ roles, RoleCard }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400 mb-6 pb-4 border-b border-slate-700/50">
        각 직업은 고유한 전투 역할과 특성을 가지고 있습니다. 팀 구성 시 역할의 균형을 고려하세요.
      </p>
      {roles.map((role, idx) => (
        <RoleCard key={idx} role={role} />
      ))}
    </div>
  );
};
