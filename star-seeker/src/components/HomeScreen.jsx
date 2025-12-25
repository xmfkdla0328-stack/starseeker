// src/components/HomeScreen.jsx
import React, { useState } from 'react';
import { Users, Feather, RefreshCw, X, Heart } from 'lucide-react';
import { ELEMENTS } from '../constants';

export const HomeScreen = ({ showToast, mainChar, setMainChar, inventory }) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // mainChar가 아직 로딩되지 않았을 때를 대비한 방어 코드
  const displayChar = mainChar || (inventory && inventory.length > 0 ? inventory[0] : null);

  // 로딩 중이거나 캐릭터가 아예 없을 경우
  if (!displayChar) return <div className="flex h-full items-center justify-center text-slate-500">캐릭터를 불러오는 중...</div>;

  // 캐릭터 속성에 따른 스타일 가져오기 (없으면 기본값)
  const elemStyle = ELEMENTS[displayChar.element] || { bg: 'bg-slate-500/20', border: 'border-slate-500', color: 'text-slate-300' };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative p-4">
      <div className="flex flex-col items-center z-10">
        <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-300 mb-2 tracking-widest drop-shadow-[0_0_25px_rgba(253,224,71,0.4)]">
          STAR SEEKER
        </h1>
        <p className="text-slate-300 text-sm md:text-lg mb-8 font-light italic opacity-80 flex items-center gap-2">
          <Feather size={14} className="text-slate-400"/> 별의 파편을 줍는 여정 <Feather size={14} className="text-slate-400 transform scale-x-[-1]"/>
        </p>
        
        {/* 메인 캐릭터 표시 영역 */}
        <div className="relative group cursor-pointer animate-float-slow">
          <div 
            onClick={() => showToast(`${displayChar.name}: "당신의 렌즈 너머엔 무엇이 보이나요?"`)}
            className={`w-36 h-36 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr ${elemStyle.bg.replace('/20', '/50')} to-slate-500/50 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] group-hover:scale-105 relative z-10`}
          >
             <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center overflow-hidden relative border border-white/20">
                <Users size={60} className={`opacity-70 group-hover:opacity-100 transition-colors ${elemStyle.color}`} />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent"></div>
                <span className={`absolute bottom-5 font-bold text-lg tracking-wider font-serif ${elemStyle.color} drop-shadow-md`}>{displayChar.name}</span>
             </div>
          </div>

          {/* 교체 버튼 (우측 상단) */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsSelectorOpen(true); }}
            className="absolute -top-1 -right-1 z-20 bg-slate-800/90 text-white p-2 rounded-full border border-white/20 hover:bg-slate-700 hover:scale-110 transition-all shadow-lg group-hover:opacity-100"
            title="메인 캐릭터 교체"
          >
            <RefreshCw size={14} className="text-yellow-400"/>
          </button>

          {/* 인연 레벨 (우측 하단) */}
          <div className="absolute -bottom-2 -right-2 z-20 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] px-2 py-1 rounded-full border border-white/30 flex items-center gap-1 shadow-lg">
            <Heart size={10} className="text-pink-200 fill-pink-200"/> 인연 Lv.{displayChar.bond || 0}
          </div>
        </div>
      </div>

      {/* 캐릭터 교체 모달 */}
      {isSelectorOpen && (
        <div className="absolute inset-0 z-[60] bg-slate-950/90 backdrop-blur-md flex flex-col p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-3 shrink-0">
            <h3 className="text-xl text-white font-bold font-serif flex items-center gap-2">
                <Users size={20} className="text-yellow-400"/> 메인 캐릭터 교체
            </h3>
            <button onClick={() => setIsSelectorOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X size={20} className="text-slate-300"/></button>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 overflow-y-auto no-scrollbar p-1">
            {inventory.map((char) => (
              <div key={char.uid} onClick={() => { setMainChar(char); setIsSelectorOpen(false); showToast(`${char.name}(으)로 교체되었습니다.`); }}
                className={`cursor-pointer bg-slate-900/60 p-3 rounded-xl border border-white/5 flex flex-col items-center gap-2 transition-all hover:scale-105 hover:bg-white/10 hover:border-yellow-400/30 group ${mainChar && mainChar.uid === char.uid ? 'ring-2 ring-yellow-400 bg-yellow-400/10' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full ${ELEMENTS[char.element].bg} border ${ELEMENTS[char.element].border} flex items-center justify-center shadow-lg relative`}>
                  <div className={`w-3 h-3 rounded-full ${ELEMENTS[char.element].bg.replace('/20','/80')}`}></div>
                </div>
                <span className="text-slate-200 text-xs font-bold group-hover:text-yellow-200">{char.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};