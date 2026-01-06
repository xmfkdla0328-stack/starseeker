import React, { useState } from 'react';
import { ELEMENTS } from '../constants/index';         
import { CHAR_DB } from '../data/characters/index';
import { CharacterList } from './codex/CharacterList';
import { CharacterHeader } from './codex/CharacterHeader';
import { CharacterInfoTab } from './codex/CharacterInfoTab';
import { CharacterProfileTab } from './codex/CharacterProfileTab';
import { BondDisplay } from './common/BondDisplay';
import { performBreakthrough, getNextBreakthroughRequiredLevel } from '../data/breakthroughItems';

export const CodexScreen = ({ inventory, items, setItems, setInventory, handleLevelUp, expPerChip, showToast, setScreen }) => {
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
    <div className="flex h-full gap-6 p-6 overflow-hidden relative">
       {/* 닫기 버튼 */}
       <button
        onClick={() => setScreen('HOME')}
        className="absolute top-8 right-8 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 z-50"
        aria-label="닫기"
      >
        X
      </button>

       {/* 배경 타이틀 장식 */}
       <div className="absolute top-4 right-8 pointer-events-none text-right z-0">
        <h1 className="text-4xl font-serif text-white/5 tracking-widest font-black">ARCHIVE</h1>
        <p className="text-xs text-cyan-500/20 font-mono tracking-[0.5em]">PERSONNEL DATABASE</p>
      </div>

      {/* 왼쪽: 캐릭터 목록 (유리 패널 스타일) */}
      <CharacterList 
        charList={CHAR_DB} 
        selectedCharId={selectedCharId} 
        onSelectChar={setSelectedCharId} 
        inventory={inventory} 
      />

      {/* 오른쪽: 상세 정보 패널 (투명도 높임) */}
      <div className="flex-1 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.3)] z-10">
        
        {/* 상단 헤더 */}
        <CharacterHeader charData={charData} />

        {/* 탭 버튼 (네온 캡슐 스타일) */}
        <div className="flex px-8 mt-4 border-b border-white/5 gap-4 relative z-10 shrink-0 pb-4">
          {['INFO', 'PROFILE'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                tab === t 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                  : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {t === 'INFO' ? 'COMBAT DATA' : 'ARCHIVE & STORY'}
            </button>
          ))}
        </div>

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
            {tab === 'INFO' && (
              <CharacterInfoTab
                charData={charData}
                getSkillInfo={getSkillInfo}
                items={items}
                expPerChip={expPerChip}
                onLevelUp={isOwned ? handleLevelUp : null}
                onBreakthrough={isOwned ? handleBreakthrough : null}
              />
            )}
            {tab === 'PROFILE' && <CharacterProfileTab charData={charData} />}
          </div>
        </div>
      </div>
    </div>
  );
};