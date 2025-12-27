import React, { useState } from 'react';
import { ELEMENTS } from '../constants';         
import { CHAR_DB } from '../data/characters';
import { CharacterList } from './codex/CharacterList';
import { CharacterHeader } from './codex/CharacterHeader';
import { CharacterInfoTab } from './codex/CharacterInfoTab';
import { CharacterProfileTab } from './codex/CharacterProfileTab';
import { BondDisplay } from './common/BondDisplay';

export const CodexScreen = ({ inventory }) => {
  const [selectedCharId, setSelectedCharId] = useState(CHAR_DB[0].id);
  const [tab, setTab] = useState('INFO'); 

  const selectedChar = CHAR_DB.find(c => c.id === selectedCharId);
  const isOwned = inventory.some(c => c.id === selectedCharId);
  
  // 보유 중이면 인벤토리 정보(성장 수치 등) 사용, 아니면 DB 기본 정보 사용
  const charData = isOwned 
    ? { ...selectedChar, ...inventory.find(c => c.id === selectedCharId) } 
    : { ...selectedChar, bondLevel: 0 };

  const getSkillInfo = (key, fallbackDesc) => ({
    desc: charData.skillDetails?.[key]?.desc || fallbackDesc,
    cooldown: charData.skillDetails?.[key]?.cooldown
  });

  return (
    <div className="flex h-full gap-4 p-4 overflow-hidden relative">
      {/* 왼쪽: 캐릭터 목록 */}
      <CharacterList charList={CHAR_DB} selectedCharId={selectedCharId} onSelectChar={setSelectedCharId} />

      {/* 오른쪽: 상세 정보 패널 */}
      <div className="flex-1 bg-slate-950/60 backdrop-blur-xl rounded-xl border border-white/10 flex flex-col overflow-hidden relative shadow-2xl">
        {/* 상단 헤더 */}
        <CharacterHeader charData={charData} />

        {/* 탭 버튼 */}
        <div className="flex px-6 mt-6 border-b border-white/10 gap-6 relative z-10 shrink-0">
          <button
            onClick={() => setTab('INFO')}
            className={`pb-2 text-sm font-bold transition-colors relative ${
              tab === 'INFO' ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            전투 정보
            {tab === 'INFO' && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-yellow-400 rounded-t-full"></div>}
          </button>
          <button
            onClick={() => setTab('PROFILE')}
            className={`pb-2 text-sm font-bold transition-colors relative ${
              tab === 'PROFILE' ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            프로필 & 스토리
            {tab === 'PROFILE' && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-yellow-400 rounded-t-full"></div>}
          </button>
        </div>

        {/* 내용 영역 */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${ELEMENTS[charData.element].bg.replace('/20', '/5')} to-transparent pointer-events-none`}></div>

          {/* 인연도 섹션 (보유 중일 때만) */}
          {isOwned && (
            <div className="mb-6 p-4 bg-white/5 border border-red-500/20 rounded-lg relative z-10">
              <h3 className="text-sm font-bold text-red-400 mb-3">인연도</h3>
              <BondDisplay bondLevel={charData.bondLevel || 0} detailed={true} />
            </div>
          )}

          {tab === 'INFO' && <CharacterInfoTab charData={charData} getSkillInfo={getSkillInfo} />}
          {tab === 'PROFILE' && <CharacterProfileTab charData={charData} />}
        </div>
      </div>
    </div>
  );
};