import React from 'react';
import { Users, Zap, ChevronRight, HelpCircle } from 'lucide-react';
import { BackButton } from './common/BackButton';
import { TacticalGuideModal } from './common/TacticalGuideModal';
import { PartyRosterCard } from './party/PartyRosterCard';
import { PartySlotGrid } from './party/PartySlotGrid';
import { CharacterDetailPanel } from './party/CharacterDetailPanel';
import { useAutoParty } from '../hooks/useAutoParty';
import { usePartyAssignment } from '../hooks/usePartyAssignment';
import { usePartyState } from '../hooks/usePartyState';
import { usePartyHandlers } from '../hooks/usePartyHandlers';
import { MISSION_TYPES } from '../utils/battle/gaugeLogic';

export const PartyScreen = ({ party, setParty, inventory, showToast, setScreen, missionType, setMissionType }) => {
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

  const isPartyFull = party.members.filter(p => p).length === 4;

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
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
        {/* [좌측] 대기 명단 (Roster) */}
        <div className="col-span-3 flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl border border-cyan-500/20 overflow-hidden">
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
            {inventory.map((char) => (
              <PartyRosterCard
                key={char.uid}
                char={char}
                isDeployed={party.members.some(p => p && p.id === char.id)}
                isSelected={selectedCharacter?.id === char.id}
                onClick={() => handleCharacterClick(char)}
              />
            ))}
          </div>
        </div>

        {/* [중앙] 출격 슬롯 (Formation) */}
        <div className="col-span-6 flex flex-col items-center justify-center gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-cyan-100 uppercase tracking-widest mb-2">작전 배치</h2>
            <p className="text-sm text-slate-400">4명의 대원을 선택하여 배치하세요</p>
          </div>

          {/* 4개 슬롯 + 연결선 */}
          <PartySlotGrid members={party.members} onSlotClick={handleSlotClick} />

          {/* 미션 타입 선택 */}
          <div className="flex items-center gap-4 flex-nowrap">
            <span className="text-sm text-slate-400 font-semibold whitespace-nowrap flex-shrink-0">인과 연산:</span>
            <div className="flex gap-2">
              {[MISSION_TYPES.CHAOS, MISSION_TYPES.SILENCE].map((type) => {
                const isActive = missionType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setMissionType(type)}
                    className={`px-6 py-2 rounded-lg font-bold text-sm border-2 transition-all ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100 shadow-lg shadow-cyan-500/30'
                        : 'border-slate-600 bg-slate-800/40 text-slate-300 hover:border-cyan-400/60'
                    }`}
                  >
                    {type === MISSION_TYPES.CHAOS ? '혼돈 (CHAOS)' : '침묵 (SILENCE)'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* [우측] 상세 정보 (Analysis) */}
        <CharacterDetailPanel selectedCharacter={selectedCharacter} />
      </div>

      {/* [하단] 액션 바 */}
      <div className="p-4 bg-slate-950/80 backdrop-blur-sm border-t border-cyan-500/30">
        <button
          onClick={() => setScreen('OBSERVATION')}
          disabled={!isPartyFull}
          className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
            isPartyFull
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-[1.02] border-2 border-cyan-400 animate-pulse'
              : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border-2 border-slate-700'
          }`}
        >
          <Zap size={24} className={isPartyFull ? 'text-yellow-300' : 'text-slate-600'} />
          {isPartyFull ? '관측 개시' : `${4 - party.members.filter(p => p).length}명 더 선택`}
          {isPartyFull && <ChevronRight size={24} />}
        </button>
      </div>

      {/* 전술 가이드 모달 */}
      <TacticalGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
};