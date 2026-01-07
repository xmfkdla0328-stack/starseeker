import React, { useState } from 'react';
import { CHAR_DB } from '../data/characters/index';
import { CharacterList } from './codex/CharacterList';
import { CharacterHeader } from './codex/CharacterHeader';
import { CodexBackgroundDecoration } from './codex/CodexBackgroundDecoration';
import { CloseButton } from './codex/CloseButton';
import { CodexTabNav } from './codex/CodexTabNav';
import { CodexContentPanel } from './codex/CodexContentPanel';
import { getCharacterData, getSkillInfo } from './codex/codexUtils';
import { performBreakthrough, getNextBreakthroughRequiredLevel } from '../data/breakthroughItems';

const CodexScreen = ({ inventory, items, setItems, setInventory, handleLevelUp, expPerChip, showToast, setScreen }) => {
  const [selectedCharId, setSelectedCharId] = useState(CHAR_DB[0].id);
  const [tab, setTab] = useState('INFO'); 

  const selectedChar = CHAR_DB.find(c => c.id === selectedCharId);
  const isOwned = inventory.some(c => c.id === selectedCharId);
  const charData = getCharacterData(selectedChar, inventory, selectedCharId);

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

  // 스킬 정보 조회 함수
  const getSkillInfoFunc = (key, fallbackDesc) => getSkillInfo(charData, key, fallbackDesc);

  return (
    <div className="flex h-full gap-6 p-6 overflow-hidden relative">
      {/* 닫기 버튼 */}
      <CloseButton onClick={() => setScreen('HOME')} />

      {/* 배경 타이틀 장식 */}
      <CodexBackgroundDecoration />

      {/* 왼쪽: 캐릭터 목록 (유리 패널 스타일) */}
      <CharacterList 
        charList={CHAR_DB} 
        selectedCharId={selectedCharId} 
        onSelectChar={setSelectedCharId} 
        inventory={inventory} 
      />

      {/* 오른쪽: 상세 정보 패널 (투명도 높임) */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* 상단 헤더 */}
        <CharacterHeader charData={charData} />

        {/* 탭 네비게이션 */}
        <CodexTabNav activeTab={tab} onTabChange={setTab} />

        {/* 콘텐츠 패널 */}
        <CodexContentPanel
          activeTab={tab}
          charData={charData}
          isOwned={isOwned}
          items={items}
          expPerChip={expPerChip}
          onLevelUp={handleLevelUp}
          onBreakthrough={handleBreakthrough}
          getSkillInfoFunc={getSkillInfoFunc}
        />
      </div>
    </div>
  );
};

export default CodexScreen;