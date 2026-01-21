import React from 'react';
import partyData from '../data/partyData';
import { Users, Zap, ChevronRight, HelpCircle } from 'lucide-react';
import { BackButton } from './common/BackButton';
import { TacticalGuideModal } from './party/tacticguide/TacticalGuideModal';
import { PartyRosterCard } from './party/PartyRosterCard';
import { PartySlotGrid } from './party/PartySlotGrid';
import { CharacterDetailPanel } from './party/CharacterDetailPanel';
import { useAutoParty } from '../hooks/useAutoParty';
import { usePartyAssignment } from '../hooks/usePartyAssignment';
import { usePartyState } from '../hooks/usePartyState';
import { usePartyHandlers } from '../hooks/usePartyHandlers';
// gaugeLogic 관련 코드 제거됨

const PartyScreen = (props) => {
  // party: 출전 멤버 배열(최대 4명, null 허용)
  // inventory: 전체 보유 캐릭터 배열(창고)
  // showEngageButton: 관측/전투 진입 버튼 노출 여부
  // onEngage: 관측 개시(전투 진입) 핸들러
  // battleType: 진입할 전투 컨텐츠 타입(예: 'calamity', 'resource')
  const { party, setParty, inventory, showToast, setScreen, showEngageButton = false, onEngage, battleType } = props;
  const normalizedParty = Array.isArray(party) ? [...party] : [];
  while (normalizedParty.length < 4) normalizedParty.push(null);
  const displayParty = normalizedParty.slice(0, 4);
  const displayInventory = Array.isArray(inventory) ? inventory : [];
  // 상태 관리
  const { selectedCharacter, setSelectedCharacter, showGuide, setShowGuide } = usePartyState();
  
  // 자동 파티 편성
  const handleAutoParty = useAutoParty(inventory, showToast, setParty);
  
  // 파티 할당/제거
  const { handleAssign, removeChar } = usePartyAssignment(party, setParty, showToast);

  // 이벤트 핸들러
  const { handleCharacterClick, handleSlotClick } = usePartyHandlers({
    party,
    selectedCharacter,
    setSelectedCharacter,
    handleAssign,
    removeChar,
  });

  const hasAnyMember = party.filter(Boolean).length > 0;

  return (
    <div className="flex flex-col h-full relative" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-cyan-500/30 bg-slate-950/80 backdrop-blur-sm">
        <BackButton onClick={() => setScreen('HOME')} />
        <h1 className="text-2xl font-bold text-cyan-100 tracking-wider uppercase flex items-center gap-2">
          <Users size={24} className="text-cyan-400" />
          동행 편성
        </h1>
        <div className="w-20"></div> {/* Spacer for layout balance */}
      </div>

      {/* 메인 3단 레이아웃 */}
      <div className="flex-1 grid grid-cols-12 gap-2 md:gap-4 p-2 md:p-4 md:overflow-y-auto min-h-0">
        {/* [좌측] 대기 명단 (Roster) */}
        <div className="col-span-3 flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl border border-cyan-500/20 overflow-hidden min-h-0 h-full">
          <div className="px-4 py-3 bg-cyan-950/30 border-b border-cyan-500/30 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">대기 명단</h2>
              <p className="text-xs text-slate-400 mt-1">{inventory.length} Available</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGuide(true)}
                className="p-1.5 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
                title="전술 데이터베이스"
              >
                <HelpCircle size={16} />
              </button>
              <button 
                onClick={handleAutoParty}
                className="px-3 py-1.5 rounded-md bg-cyan-600/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold hover:bg-cyan-500/30 transition-all uppercase tracking-wider"
                title="Auto-assign best characters"
              >
                Auto
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {displayInventory.filter(Boolean).map((char) => (
              <PartyRosterCard
                key={char.uid}
                char={char}
                isDeployed={displayParty.filter(Boolean).some(p => p.id === char.id)}
                isSelected={selectedCharacter?.id === char.id}
                onClick={() => handleCharacterClick(char)}
              />
            ))}
          </div>
        </div>

        {/* [중앙] 출격 슬롯 (Formation) */}
        <div className="col-span-6 flex flex-col items-center items-start gap-4 md:gap-8">
          <div className="text-center w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-100 uppercase tracking-widest mb-1 md:mb-2">작전 배치</h2>
            <p className="text-xs md:text-sm text-slate-400">4명의 대원을 선택하여 배치하세요</p>
          </div>

          {/* 4개 슬롯 + 연결선 */}
          <div className="w-full flex flex-col items-center mb-4 md:mb-8">
            <PartySlotGrid members={displayParty} onSlotClick={handleSlotClick} />
          </div>

          {/* 미션 타입 선택 영역 삭제됨 */}
        </div>

        {/* [우측] 상세 정보 (Analysis) */}
        <CharacterDetailPanel selectedCharacter={selectedCharacter} />
      </div>

      {/* [하단] 액션 바 */}
      {showEngageButton && (
        <div className="fixed left-0 right-0 bottom-0 p-4 bg-slate-950/90 backdrop-blur-sm border-t border-cyan-500/30 z-50">
          <button
            onClick={() => {
              if (!hasAnyMember) {
                window.alert('파티에 최소 1명 이상 배치해야 전투에 진입할 수 있습니다.');
                return;
              }
              if (onEngage) onEngage(battleType, props.stage);
            }}
            disabled={!hasAnyMember}
            className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
              hasAnyMember
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-[1.02] border-2 border-cyan-400 animate-pulse'
                : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border-2 border-slate-700'
            }`}
          >
            <Zap size={24} className={hasAnyMember ? 'text-yellow-300' : 'text-slate-600'} />
            {hasAnyMember ? '관측 개시' : '최소 1명 배치 필요'}
            {hasAnyMember && <ChevronRight size={24} />}
          </button>
        </div>
      )}

      {/* 전술 가이드 모달 */}
      <TacticalGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
};

export default PartyScreen;