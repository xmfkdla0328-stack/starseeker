import React, { useState, useCallback } from 'react';
import { Users, Zap, ChevronRight, Lock, CheckCircle, HelpCircle } from 'lucide-react';
import { BackButton } from './common/BackButton';
import { ElementIcon } from './common/ElementIcon';
import { TacticalGuideModal } from './common/TacticalGuideModal';
import { useAutoParty } from '../hooks/useAutoParty';
import { usePartyAssignment } from '../hooks/usePartyAssignment';
import { getRoleLabel, getRoleColor } from '../utils/roleHelpers';
import { ELEMENTS } from '../constants/index';
import { MISSION_TYPES } from '../utils/battle/gaugeLogic';
import { calculateStatsByLevel } from '../data/levelSystem';
import { CHARACTER_SKILLS } from '../data/characters/skillData';

export const PartyScreen = ({ party, setParty, inventory, showToast, setScreen, missionType, setMissionType }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  
  // 자동 파티 편성 hook
  const handleAutoParty = useAutoParty(inventory, showToast, setParty);
  
  // 파티 할당/제거 hook
  const { handleAssign, removeChar } = usePartyAssignment(party, setParty, showToast);

  // 캐릭터 클릭: 파티에 추가 또는 상세 정보 보기
  const handleCharacterClick = (char) => {
    const isDeployed = party.members.some(p => p && p.id === char.id);
    if (!isDeployed && party.members.filter(p => p).length < 4) {
      // 빈 슬롯에 추가
      const emptyIndex = party.members.findIndex(p => !p);
      handleAssign(char, false, true, { line: 'members', index: emptyIndex });
    }
    setSelectedCharacter(char);
  };

  // 슬롯 클릭: 캐릭터 제거
  const handleSlotClick = (idx, event) => {
    const char = party.members[idx];
    // 빈 슬롯이면 무시
    if (!char) return;
    
    // 클릭하면 바로 제거
    removeChar('members', idx);
    
    // 선택된 캐릭터였다면 선택 해제
    if (selectedCharacter?.id === char.id) {
      setSelectedCharacter(null);
    }
  };

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
        <button
          onClick={() => setShowGuide(true)}
          className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
          title="전술 데이터베이스"
        >
          <HelpCircle size={20} />
        </button>
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
            <button 
              onClick={handleAutoParty}
              className="px-3 py-1.5 rounded-md bg-cyan-600/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold hover:bg-cyan-500/30 transition-all uppercase tracking-wider"
              title="Auto-assign best characters"
            >
              Auto
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {inventory.map((char) => {
              const isDeployed = party.members.some(p => p && p.id === char.id);
              const isSelected = selectedCharacter?.id === char.id;
              return (
                <div
                  key={char.uid}
                  onClick={() => handleCharacterClick(char)}
                  className={`relative p-3 rounded-lg border transition-all cursor-pointer ${
                    isDeployed
                      ? 'bg-slate-800/40 border-slate-700/50 opacity-60'
                      : isSelected
                        ? 'bg-cyan-900/30 border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900/60 border-slate-700/40 hover:border-cyan-400/40 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${ELEMENTS[char.element].bg} border ${ELEMENTS[char.element].border} flex items-center justify-center shrink-0`}>
                      <ElementIcon element={char.element} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-100 truncate">{char.name}</div>
                      <div className={`text-xs font-semibold ${getRoleColor(char.role)}`}>
                        {getRoleLabel(char.role)}
                      </div>
                    </div>
                  </div>
                  {isDeployed && (
                    <div className="absolute top-2 right-2 bg-cyan-500/20 border border-cyan-400/40 rounded-full px-2 py-0.5 flex items-center gap-1">
                      <CheckCircle size={12} className="text-cyan-400" />
                      <span className="text-[10px] font-bold text-cyan-300 uppercase">배치됨</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* [중앙] 출격 슬롯 (Formation) */}
        <div className="col-span-6 flex flex-col items-center justify-center gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-cyan-100 uppercase tracking-widest mb-2">작전 배치</h2>
            <p className="text-sm text-slate-400">4명의 대원을 선택하여 배치하세요</p>
          </div>

          {/* 4개 슬롯 + 연결선 */}
          <div className="relative w-full max-w-3xl">
            {/* 별자리 연결선 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <line x1="12.5%" y1="50%" x2="37.5%" y2="50%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
              <line x1="37.5%" y1="50%" x2="62.5%" y2="50%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
              <line x1="62.5%" y1="50%" x2="87.5%" y2="50%" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
            </svg>

            <div className="relative grid grid-cols-4 gap-4" style={{ zIndex: 1 }}>
              {party.members.map((char, idx) => (
                <div
                  key={`slot-${idx}`}
                  onClick={(e) => handleSlotClick(idx, e)}
                  className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden ${
                    char
                      ? 'border-cyan-400/60 bg-gradient-to-br from-cyan-900/40 to-slate-900/60 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 cursor-pointer group'
                      : 'border-dashed border-slate-600/50 bg-slate-900/20 cursor-default'
                  }`}
                >
                  {char ? (
                    <>
                      {/* 캐릭터 배경 그라데이션 */}
                      <div className={`absolute inset-0 ${ELEMENTS[char.element].bg} opacity-10`}></div>
                      
                      {/* 속성 아이콘 */}
                      <div className="absolute top-2 left-2 p-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm">
                        <ElementIcon element={char.element} size={16} />
                      </div>

                      {/* 슬롯 번호 */}
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                        <span className="text-xs font-bold text-cyan-300">{idx + 1}</span>
                      </div>

                      {/* 캐릭터 정보 */}
                      <div className="text-center z-10 space-y-1">
                        <div className="text-lg font-bold text-cyan-100">{char.name}</div>
                        <div className={`text-xs font-semibold ${getRoleColor(char.role)}`}>
                          {getRoleLabel(char.role)}
                        </div>
                      </div>

                      {/* 호버 시 힌트 */}
                      <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-xs font-bold text-red-300 bg-red-900/80 px-3 py-1 rounded-full">Remove</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="text-4xl text-slate-500">+</div>
                      <span className="text-xs text-slate-500 uppercase">빈 슬롯</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 미션 타입 선택 */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 font-semibold">인과 연산:</span>
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
        <div className="col-span-3 flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl border border-cyan-500/20 overflow-hidden">
          <div className="px-4 py-3 bg-cyan-950/30 border-b border-cyan-500/30">
            <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">상세 정보</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {selectedCharacter ? (
              (() => {
                // 레벨에 따른 실제 스탯 계산
                const actualStats = calculateStatsByLevel(
                  selectedCharacter.baseAtk || 0,
                  selectedCharacter.baseHp || 0,
                  selectedCharacter.level || 1,
                  selectedCharacter.breakthrough || 0
                );
                
                // 캐릭터 스킬 정보 가져오기
                const skillData = CHARACTER_SKILLS[selectedCharacter.id];
                const skillDetails = skillData?.skillDetails || {};
                const skillNames = skillData?.skills || {};
                
                return (
                  <div className="space-y-6">
                    {/* 캐릭터 헤더 */}
                    <div className="text-center space-y-2">
                      <div className={`w-20 h-20 rounded-full ${ELEMENTS[selectedCharacter.element].bg} border-2 ${ELEMENTS[selectedCharacter.element].border} flex items-center justify-center mx-auto shadow-lg`}>
                        <ElementIcon element={selectedCharacter.element} size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-cyan-100">{selectedCharacter.name}</h3>
                      <div className={`text-sm font-semibold ${getRoleColor(selectedCharacter.role)}`}>
                        {getRoleLabel(selectedCharacter.role)}
                      </div>
                    </div>

                    {/* 스탯 그리드 */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Statistics</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                          <div className="text-xs text-slate-400">HP</div>
                          <div className="text-lg font-bold text-cyan-100">{actualStats.hp || '-'}</div>
                        </div>
                        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                          <div className="text-xs text-slate-400">ATK</div>
                          <div className="text-lg font-bold text-cyan-100">{actualStats.atk || '-'}</div>
                        </div>
                        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                          <div className="text-xs text-slate-400">DEF</div>
                          <div className="text-lg font-bold text-cyan-100">{actualStats.def || '-'}</div>
                        </div>
                        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                          <div className="text-xs text-slate-400">SPD</div>
                          <div className="text-lg font-bold text-cyan-100">{selectedCharacter.baseSpd || '-'}</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 italic mt-2">
                        Lv.{selectedCharacter.level || 1} | Breakthrough {selectedCharacter.breakthrough || 0}
                      </div>
                    </div>

                    {/* 스킬 정보 */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Skills</h4>
                      <div className="space-y-2">
                        {skillData ? (
                          <>
                            {/* 일반 공격 */}
                            {skillNames.normal && (
                              <div className="bg-gradient-to-r from-slate-700/20 to-transparent rounded-lg p-3 border border-slate-600/20">
                                <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                  {skillNames.normal}
                                  {skillDetails.normal?.isAttributeAttack && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-semibold uppercase">
                                      속성
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-slate-400 mt-1">{skillDetails.normal?.desc || '기본 공격'}</div>
                              </div>
                            )}
                            {/* 스킬 */}
                            {skillNames.skill && (
                              <div className="bg-gradient-to-r from-blue-900/20 to-transparent rounded-lg p-3 border border-blue-500/20">
                                <div className="text-sm font-bold text-blue-200 flex items-center gap-2">
                                  {skillNames.skill}
                                  {skillDetails.skill?.isAttributeAttack && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-semibold uppercase">
                                      속성
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-slate-400 mt-1">{skillDetails.skill?.desc || '스킬 설명 없음'}</div>
                              </div>
                            )}
                            {/* 필살기 */}
                            {skillNames.ultimate && (
                              <div className="bg-gradient-to-r from-cyan-900/20 to-transparent rounded-lg p-3 border border-cyan-500/20">
                                <div className="text-sm font-bold text-cyan-200 flex items-center gap-2">
                                  {skillNames.ultimate}
                                  {skillDetails.ultimate?.isAttributeAttack && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-semibold uppercase">
                                      속성
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-slate-400 mt-1">{skillDetails.ultimate?.desc || '필살기 설명 없음'}</div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-xs text-slate-500 italic">No skill data available</div>
                        )}
                      </div>
                    </div>

                    {/* 태그 */}
                    {selectedCharacter.tags && selectedCharacter.tags.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedCharacter.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                <Lock size={48} className="opacity-30 mb-4" />
                <p className="text-sm">명단에서 캐릭터를 선택하여 상세 정보를 확인하세요</p>
              </div>
            )}
          </div>
        </div>
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