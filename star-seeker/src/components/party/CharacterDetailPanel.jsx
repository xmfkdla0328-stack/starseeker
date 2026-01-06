import React from 'react';
import { Lock } from 'lucide-react';
import { ElementIcon } from '../common/ElementIcon';
import { ELEMENTS } from '../../constants/index';
import { getRoleLabel, getRoleColor } from '../../utils/roleHelpers';
import { CHARACTER_SKILLS } from '../../data/characters/characterSkills';
import { calculateStatsByLevel } from '../../utils/statCalculator';
import { getImagePath } from '../../utils/imageLoader';

/**
 * 캐릭터 상세 정보 패널 (우측)
 */
export const CharacterDetailPanel = ({ selectedCharacter }) => {
  if (!selectedCharacter) {
    return (
      <div className="col-span-3 flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="px-4 py-3 bg-cyan-950/30 border-b border-cyan-500/30">
          <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">상세 정보</h2>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center h-full text-center text-slate-500">
          <Lock size={48} className="opacity-30 mb-4" />
          <p className="text-sm">명단에서 캐릭터를 선택하여 상세 정보를 확인하세요</p>
        </div>
      </div>
    );
  }

  // 레벨에 따른 실제 스탯 계산
  const actualStats = calculateStatsByLevel(
    selectedCharacter.baseAtk || 0,
    selectedCharacter.baseHp || 0,
    selectedCharacter.level || 1,
    selectedCharacter.breakthrough || 0,
    selectedCharacter.baseDef || selectedCharacter.currentDef || 30
  );

  // 캐릭터 스킬 정보 가져오기
  const skillData = CHARACTER_SKILLS[selectedCharacter.id];
  const skillDetails = skillData?.skillDetails || {};
  const skillNames = skillData?.skills || {};

  return (
    <div className="col-span-3 flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl border border-cyan-500/20 overflow-hidden">
      <div className="px-4 py-3 bg-cyan-950/30 border-b border-cyan-500/30">
        <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">상세 정보</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0 flex flex-col">
          {/* 캐릭터 헤더 - Full Bleed Card 스타일 */}
          <div className="relative w-full aspect-[3/4] rounded-t-2xl overflow-hidden group bg-slate-900">
            {/* 캐릭터 이미지 */}
            {selectedCharacter.portrait ? (
              (() => {
                const imgSrc = getImagePath(selectedCharacter.portrait);
                console.log('이미지 경로 확인:', process.env.PUBLIC_URL, imgSrc);
                return (
                  <img
                    src={imgSrc}
                    alt={selectedCharacter.name}
                    className="portrait-image w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      console.error('초상화 로드 실패:', imgSrc);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                );
              })()
            ) : (
              <div className={`w-full h-full ${ELEMENTS[selectedCharacter.element].bg} flex items-center justify-center`}>
                <ElementIcon element={selectedCharacter.element} size={80} />
              </div>
            )}

            {/* 하단 그라데이션 오버레이 (텍스트 가독성) */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

            {/* 정보 오버레이 (이미지 위에 뜸) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white tracking-wide drop-shadow-lg">{selectedCharacter.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold drop-shadow-md ${getRoleColor(selectedCharacter.role)}`}>
                      {getRoleLabel(selectedCharacter.role)}
                    </span>
                    {selectedCharacter.element && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${ELEMENTS[selectedCharacter.element].bg} border ${ELEMENTS[selectedCharacter.element].border} text-xs font-bold drop-shadow-md`}>
                        <ElementIcon element={selectedCharacter.element} size={14} />
                        <span className={ELEMENTS[selectedCharacter.element].color}>{ELEMENTS[selectedCharacter.element].name}</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* 레벨 표시 */}
                <div className="text-2xl font-mono text-cyan-400 font-bold drop-shadow-lg">Lv. {selectedCharacter.level || 1}</div>
              </div>
            </div>
          </div>

          {/* 스탯 그리드 */}
          <div className="space-y-3 p-4">
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
          <div className="space-y-2 p-4 pt-0">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Skills</h4>
            <div className="space-y-2">
              {skillData ? (
                <>
                  {/* 일반 공격 */}
                  {skillNames.normal && (
                    <div className="bg-gradient-to-r from-slate-700/20 to-transparent rounded-lg p-3 border border-slate-600/20">
                      <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
                        {skillNames.normal}
                        {skillDetails.normal?.isAttributeAttack && selectedCharacter.element && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border" style={{
                            backgroundColor: ELEMENTS[selectedCharacter.element]?.bg?.replace('bg-', '').replace('/', 'rgba(') || 'rgba(251, 191, 36, 0.15)',
                            borderColor: ELEMENTS[selectedCharacter.element]?.border?.replace('border-', '').replace('/', 'rgba(') || 'rgba(251, 191, 36, 0.4)',
                          }}>
                            <ElementIcon element={selectedCharacter.element} size={12} />
                            <span className={ELEMENTS[selectedCharacter.element]?.color || 'text-amber-300'}>속성</span>
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
                        {skillDetails.skill?.isAttributeAttack && selectedCharacter.element && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border" style={{
                            backgroundColor: ELEMENTS[selectedCharacter.element]?.bg?.replace('bg-', '').replace('/', 'rgba(') || 'rgba(251, 191, 36, 0.15)',
                            borderColor: ELEMENTS[selectedCharacter.element]?.border?.replace('border-', '').replace('/', 'rgba(') || 'rgba(251, 191, 36, 0.4)',
                          }}>
                            <ElementIcon element={selectedCharacter.element} size={12} />
                            <span className={ELEMENTS[selectedCharacter.element]?.color || 'text-amber-300'}>속성</span>
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
                        {skillDetails.ultimate?.isAttributeAttack && selectedCharacter.element && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border" style={{
                            backgroundColor: ELEMENTS[selectedCharacter.element]?.bg?.replace('bg-', '').replace('/', 'rgba(') || 'rgba(251, 191, 36, 0.15)',
                            borderColor: ELEMENTS[selectedCharacter.element]?.border?.replace('border-', '').replace('/', 'rgba(') || 'rgba(251, 191, 36, 0.4)',
                          }}>
                            <ElementIcon element={selectedCharacter.element} size={12} />
                            <span className={ELEMENTS[selectedCharacter.element]?.color || 'text-amber-300'}>속성</span>
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
            <div className="space-y-2 p-4 pt-0">
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
      </div>
    </div>
  );
};
