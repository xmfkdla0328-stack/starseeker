// src/components/CodexScreen.jsx
import React, { useState } from 'react';
import { CHAR_DB, ELEMENTS } from '../constants';
import { Sword, Shield, Lock, Scroll, User, Sparkles } from 'lucide-react';

export const CodexScreen = ({ inventory }) => {
  // 인벤토리에 없는 캐릭터도 도감에는 보여야 하므로 CHAR_DB 전체를 사용하되, 획득 여부 체크
  const [selectedCharId, setSelectedCharId] = useState(CHAR_DB[0].id);
  const [tab, setTab] = useState('INFO'); // 'INFO' (전투정보) or 'PROFILE' (프로필/스토리)

  const selectedChar = CHAR_DB.find(c => c.id === selectedCharId);
  // 인벤토리에 해당 캐릭터가 있는지 확인 (보유 중이면 활성화)
  const isOwned = inventory.some(c => c.id === selectedCharId);
  
  // 보유 중인 캐릭터라면 인벤토리 정보를 가져와서(인연도 등) 병합, 아니면 DB 기본값
  const charData = isOwned 
    ? { ...selectedChar, ...inventory.find(c => c.id === selectedCharId) } 
    : { ...selectedChar, bond: 0 };

  return (
    <div className="flex h-full gap-4 p-4 overflow-hidden relative">
      {/* 왼쪽: 캐릭터 목록 */}
      <div className="w-1/3 max-w-[200px] bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/10 flex flex-col overflow-hidden">
        <h2 className="p-3 text-sm font-bold text-slate-300 border-b border-white/10 bg-white/5 flex items-center gap-2">
           <Scroll size={14} className="text-yellow-400"/> 캐릭터 도감
        </h2>
        <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-2">
          {CHAR_DB.map(char => {
            const owned = inventory.some(c => c.id === char.id);
            return (
              <div key={char.id} onClick={() => setSelectedCharId(char.id)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all border ${
                  selectedCharId === char.id 
                    ? `bg-slate-700/60 border-yellow-400/50` 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center relative overflow-hidden shrink-0 ${
                    owned ? ELEMENTS[char.element].border : 'border-slate-700 bg-slate-800'
                }`}>
                  {owned ? (
                    <div className={`w-full h-full ${ELEMENTS[char.element].bg.replace('/20','/50')}`}></div>
                  ) : (
                    <Lock size={14} className="text-slate-500"/>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`text-xs font-bold truncate ${owned ? 'text-slate-200' : 'text-slate-500'}`}>{char.name}</span>
                  <span className="text-[10px] text-slate-500 truncate">{owned ? '보유중' : '미보유'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 오른쪽: 상세 정보 패널 */}
      <div className="flex-1 bg-slate-950/60 backdrop-blur-xl rounded-xl border border-white/10 flex flex-col overflow-hidden relative shadow-2xl">
         {/* 상단 헤더: 캐릭터 기본 정보 */}
         <div className="p-6 pb-0 flex gap-6 items-end relative z-10 shrink-0">
            <div className={`w-24 h-24 rounded-full border-2 ${ELEMENTS[charData.element].border} ${ELEMENTS[charData.element].bg.replace('/20','/80')} shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center shrink-0`}>
                <span className="text-2xl font-bold text-white shadow-sm">{charData.name[0]}</span>
            </div>
            <div className="mb-2">
               <div className="flex items-center gap-2 mb-1">
                 <span className={`px-2 py-0.5 rounded-full text-[10px] border ${ELEMENTS[charData.element].border} ${ELEMENTS[charData.element].color} bg-slate-950/50`}>
                   {ELEMENTS[charData.element].name} 속성
                 </span>
                 <span className="px-2 py-0.5 rounded-full text-[10px] border border-white/20 text-slate-300 bg-slate-950/50">
                   {charData.role === 'FRONT' ? '전열' : charData.role === 'BACK' ? '후열' : '만능'}
                 </span>
               </div>
               <h1 className="text-3xl font-serif font-bold text-white flex items-end gap-2">
                 {charData.name} <span className="text-sm font-normal text-slate-400 mb-1.5 opacity-80">Lv.{charData.id * 10 + 5}</span>
               </h1>
               <p className="text-slate-400 text-sm italic">"{charData.desc}"</p>
            </div>
         </div>

         {/* 탭 버튼 */}
         <div className="flex px-6 mt-6 border-b border-white/10 gap-6 relative z-10 shrink-0">
            <button onClick={() => setTab('INFO')} className={`pb-2 text-sm font-bold transition-colors relative ${tab === 'INFO' ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'}`}>
               전투 정보
               {tab === 'INFO' && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-yellow-400 rounded-t-full"></div>}
            </button>
            <button onClick={() => setTab('PROFILE')} className={`pb-2 text-sm font-bold transition-colors relative ${tab === 'PROFILE' ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'}`}>
               프로필 & 스토리
               {tab === 'PROFILE' && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-yellow-400 rounded-t-full"></div>}
            </button>
         </div>

         {/* 내용 영역 */}
         <div className="flex-1 overflow-y-auto p-6 relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${ELEMENTS[charData.element].bg.replace('/20','/5')} to-transparent pointer-events-none`}></div>

            {tab === 'INFO' && (
              <div className="space-y-6 relative z-10 animate-fade-in">
                 {/* 스탯 정보 */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                       <span className="text-xs text-slate-400 flex items-center gap-1 mb-1"><Sword size={12}/> 공격력</span>
                       <span className="text-xl font-bold text-slate-200">{charData.baseAtk}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                       <span className="text-xs text-slate-400 flex items-center gap-1 mb-1"><Shield size={12}/> 체력</span>
                       <span className="text-xl font-bold text-slate-200">{charData.baseHp}</span>
                    </div>
                 </div>
                 
                 {/* 스킬 정보 */}
                 <div>
                    <h3 className="text-yellow-100 font-bold mb-3 text-sm flex items-center gap-2"><Sparkles size={14}/> 스킬 정보</h3>
                    <div className="space-y-2">
                       <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 flex gap-3 items-center">
                          <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 shrink-0 border border-white/10">일반</div>
                          <div>
                             <div className="text-sm font-bold text-slate-300">{charData.skills?.normal || '기본 공격'}</div>
                             <div className="text-xs text-slate-500">적 1체에게 공격력의 100% 피해를 입힙니다.</div>
                          </div>
                       </div>
                       <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 flex gap-3 items-center">
                          <div className="w-8 h-8 rounded bg-blue-900/30 flex items-center justify-center text-[10px] text-blue-300 shrink-0 border border-blue-500/30">스킬</div>
                          <div>
                             <div className="text-sm font-bold text-blue-200">{charData.skills?.skill || '특수 기술'}</div>
                             <div className="text-xs text-slate-500">쿨타임 3턴. 강력한 효과를 발휘합니다.</div>
                          </div>
                       </div>
                       <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 flex gap-3 items-center">
                          <div className="w-8 h-8 rounded bg-red-900/30 flex items-center justify-center text-[10px] text-red-300 shrink-0 border border-red-500/30">필살</div>
                          <div>
                             <div className="text-sm font-bold text-red-200">{charData.skills?.ultimate || '필살기'}</div>
                             <div className="text-xs text-slate-500">SP 100 소모. 전황을 뒤집는 일격입니다.</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {tab === 'PROFILE' && (
              <div className="space-y-6 relative z-10 animate-fade-in">
                  {/* 프로필 데이터 */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                     <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2"><User size={14}/> 기본 프로필</h3>
                     <div className="grid grid-cols-2 gap-y-2 text-xs">
                        <div className="flex"><span className="w-16 text-slate-500">나이</span> <span className="text-slate-300">{charData.profile?.age || '불명'}</span></div>
                        <div className="flex"><span className="w-16 text-slate-500">신장</span> <span className="text-slate-300">{charData.profile?.height || '불명'}</span></div>
                        <div className="flex"><span className="w-16 text-slate-500">좋아함</span> <span className="text-slate-300">{charData.profile?.like || '-'}</span></div>
                        <div className="flex"><span className="w-16 text-slate-500">싫어함</span> <span className="text-slate-300">{charData.profile?.hate || '-'}</span></div>
                     </div>
                  </div>

                  {/* 스토리 목록 */}
                  <div>
                     <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2"><Scroll size={14}/> 인연 스토리</h3>
                     <div className="space-y-2">
                        {charData.stories?.map((story, idx) => {
                           const isUnlocked = (charData.bond || 0) >= story.unlockBond;
                           return (
                              <div key={idx} className={`p-3 rounded-lg border flex items-center justify-between ${isUnlocked ? 'bg-slate-800/50 border-white/10 cursor-pointer hover:bg-slate-700/50' : 'bg-slate-950/50 border-slate-800 opacity-60'}`}>
                                 <div className="flex flex-col">
                                    <span className={`text-sm font-bold ${isUnlocked ? 'text-slate-200' : 'text-slate-500'}`}>{story.title}</span>
                                    <span className="text-[10px] text-slate-500">인연 레벨 {story.unlockBond} 달성 시 해금</span>
                                 </div>
                                 {!isUnlocked && <Lock size={14} className="text-slate-600"/>}
                              </div>
                           )
                        })}
                        {(!charData.stories || charData.stories.length === 0) && (
                           <div className="text-center text-slate-500 text-xs py-4">등록된 스토리가 없습니다.</div>
                        )}
                     </div>
                  </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};