import React, { useState } from 'react';
import { ELEMENTS } from '../constants/index';         
import { CHAR_DB } from '../data/characters/index';
import { CharacterList } from './codex/CharacterList';
import { CharacterHeader } from './codex/CharacterHeader';
import { CharacterInfoTab } from './codex/CharacterInfoTab';
import { CharacterProfileTab } from './codex/CharacterProfileTab';
import { BondDisplay } from './common/BondDisplay';
import { BackButton } from './common/BackButton';
import { performBreakthrough, getNextBreakthroughRequiredLevel } from '../data/breakthroughItems';

export const CodexScreen = ({ inventory, items, setItems, setInventory, showToast, setScreen }) => {
  const [selectedCharId, setSelectedCharId] = useState(CHAR_DB[0].id);
  const [tab, setTab] = useState('INFO'); 

  const selectedChar = CHAR_DB.find(c => c.id === selectedCharId);
  const isOwned = inventory.some(c => c.id === selectedCharId);
  
  // 보유 중이면 인벤토리 정보(성장 수치 등) 사용, 아니면 DB 기본 정보 사용
  // 같은 id를 가진 캐릭터 중 가장 높은 breakthrough와 level을 가진 것을 선택
  const charData = isOwned 
    ? (() => {
        const sameIdChars = inventory.filter(c => c.id === selectedCharId);
        const maxBreakthroughChar = sameIdChars.reduce((max, curr) => {
          const maxBt = max.breakthrough || 0;
          const currBt = curr.breakthrough || 0;
          if (currBt > maxBt) return curr;
          if (currBt === maxBt && curr.level > max.level) return curr;
          return max;
        }, sameIdChars[0]);
        return { ...selectedChar, ...maxBreakthroughChar };
      })()
    : { ...selectedChar, bondLevel: 0 };

  const getSkillInfo = (key, fallbackDesc) => ({
    desc: charData.skillDetails?.[key]?.desc || fallbackDesc,
    cooldown: charData.skillDetails?.[key]?.cooldown
  });

  // 돌파 핸들러
  const handleBreakthrough = (character) => {
    const result = performBreakthrough(character, items);
    
    if (result.success) {
      // 아이템 업데이트
      setItems(result.updatedItems);
      
      // 인벤토리 업데이트 (같은 id를 가진 모든 캐릭터의 breakthrough 업데이트)
      setInventory(prev => {
        const updated = prev.map(c => {
          // 같은 id를 가진 모든 캐릭터의 breakthrough를 업데이트
          if (c.id === character.id) {
            const newBreakthrough = result.updatedCharacter.breakthrough;
            const nextRequiredLevel = getNextBreakthroughRequiredLevel(newBreakthrough);
            
            return {
              ...c,
              breakthrough: newBreakthrough,
              // 돌파 후 현재 레벨을 다음 돌파 요구 레벨로 자동 상향
              level: Math.max(c.level, nextRequiredLevel)
            };
          }
          return c;
        });
        return updated;
      });
      
      showToast(result.message);
    } else {
      showToast(result.message);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 p-4 overflow-hidden relative">
      {/* 뒤로가기 버튼 */}
      <BackButton onClick={() => setScreen('HOME')} />

      {/* 컨텐츠 영역 */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* 왼쪽: 캐릭터 목록 */}
      <CharacterList charList={CHAR_DB} selectedCharId={selectedCharId} onSelectChar={setSelectedCharId} inventory={inventory} />

      {/* 오른쪽: 상세 정보 패널 */}
      <div className="flex-1 bg-slate-950/60 backdrop-blur-xl rounded-xl border border-white/10 flex flex-col overflow-y-auto relative shadow-2xl">
        {/* 상단 헤더 */}
        <div className="flex-shrink-0">
          <CharacterHeader charData={charData} />
        </div>

        {/* 탭 버튼 */}
        <div className="flex px-6 mt-6 border-b border-white/10 gap-6 relative z-10 flex-shrink-0">
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
        <div className="flex-1 p-6 relative flex-shrink-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${ELEMENTS[charData.element].bg.replace('/20', '/5')} to-transparent pointer-events-none`}></div>

          {/* 인연도 섹션 (보유 중일 때만) */}
          {isOwned && (
            <div className="mb-6 p-4 bg-white/5 border border-red-500/20 rounded-lg relative z-10">
              <h3 className="text-sm font-bold text-red-400 mb-3">인연도</h3>
              <BondDisplay bondLevel={charData.bondLevel || 0} detailed={true} />
            </div>
          )}

          {tab === 'INFO' && <CharacterInfoTab charData={charData} getSkillInfo={getSkillInfo} items={items} onBreakthrough={isOwned ? handleBreakthrough : null} />}
          {tab === 'PROFILE' && <CharacterProfileTab charData={charData} />}
        </div>
      </div>
      </div>
    </div>
  );
};