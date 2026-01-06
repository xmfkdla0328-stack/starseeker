import React from 'react';
import { CodexTabButton } from './CodexTabButton';

/**
 * 코덱스 화면 탭 네비게이션
 */
export const CodexTabNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { name: 'INFO', display: 'COMBAT DATA' },
    { name: 'PROFILE', display: 'ARCHIVE & STORY' },
  ];

  return (
    <div className="flex px-8 mt-4 border-b border-white/5 gap-4 relative z-10 shrink-0 pb-4">
      {tabs.map((tab) => (
        <CodexTabButton
          key={tab.name}
          tabName={tab.name}
          displayName={tab.display}
          isActive={activeTab === tab.name}
          onClick={() => onTabChange(tab.name)}
        />
      ))}
    </div>
  );
};
