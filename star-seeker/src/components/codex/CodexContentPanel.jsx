import React from 'react';
import { BondDisplay } from '../common/BondDisplay';
import { CharacterInfoTab } from './CharacterInfoTab';
import { CharacterProfileTab } from './CharacterProfileTab';
import { ELEMENTS } from '../../constants/index';

/**
 * 코덱스 상세 정보 패널 콘텐츠 영역
 */
export const CodexContentPanel = ({ 
  activeTab, 
  charData, 
  isOwned, 
  items, 
  expPerChip, 
  onLevelUp,
  onBreakthrough,
  getSkillInfoFunc,
}) => {
  return (
    <div className="flex-1 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.3)] z-10">
      {/* 내용 영역 */}
      <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
        {/* 배경 그라데이션 (속성별 색상 은은하게) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${ELEMENTS[charData.element].bg.replace('/20', '/5')} to-transparent pointer-events-none`}></div>

        {/* 인연도 섹션 */}
        {isOwned && (
          <div className="mb-8 p-0 relative z-10">
            <BondDisplay bondLevel={charData.bondLevel || 0} detailed={true} />
          </div>
        )}

        <div className="animate-fade-in-up">
          {activeTab === 'INFO' && (
            <CharacterInfoTab
              charData={charData}
              getSkillInfo={getSkillInfoFunc}
              items={items}
              expPerChip={expPerChip}
              onLevelUp={isOwned ? onLevelUp : null}
              onBreakthrough={isOwned ? onBreakthrough : null}
            />
          )}
          {activeTab === 'PROFILE' && <CharacterProfileTab charData={charData} />}
        </div>
      </div>
    </div>
  );
};
