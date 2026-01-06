import React from 'react';
import { ELEMENTS } from '../../constants/index';
import { getRarityClasses, getRoleLabel } from '../../utils/styleHelpers/index';

export const GachaCharacterCard = ({ char, idx, isSingle }) => {
  const rarityClasses = getRarityClasses(char.rarity);
  const is5Star = char.rarity >= 5;
  
  return (
    <div
      className={`animate-fade-in ${isSingle ? 'w-80' : ''}`}
      style={{ '--animation-delay': `${idx * 0.2}s` }}
    >
      {/* 캐릭터 카드 */}
      <div className={`p-2 rounded-xl border backdrop-blur-sm transition-all relative z-10 ${
        is5Star 
          ? `${rarityClasses.cardBg} ${rarityClasses.cardBorder} shadow-[0_0_30px_rgba(250,204,21,0.4)] ring-2 ring-yellow-400/50`
          : `${rarityClasses.cardBg} ${rarityClasses.cardBorder} ${rarityClasses.cardGlow}`
      }`}>
        <div className="flex flex-col items-center text-center gap-1.5">
          {/* 아바타 */}
          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-base relative ${rarityClasses.avatar.border} ${rarityClasses.avatar.bg} ${rarityClasses.avatar.text}`}>
            {is5Star && (
              <>
                <div className="absolute inset-0 rounded-full animate-spin opacity-40" style={{ animationDuration: '3s' }}>
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-yellow-300 rounded-full blur-[1px]"></div>
                  <div className="absolute top-1/2 right-0 w-1 h-1 bg-amber-300 rounded-full blur-[1px]"></div>
                  <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-yellow-300 rounded-full blur-[1px]"></div>
                  <div className="absolute top-1/2 left-0 w-1 h-1 bg-amber-300 rounded-full blur-[1px]"></div>
                </div>
              </>
            )}
            <span className="relative z-10">{char.name[0]}</span>
          </div>

          {/* 정보 */}
          <div className="w-full">
            {/* 이름과 레어도 배지 */}
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <h3 className={`text-xs font-serif font-bold ${is5Star ? 'text-yellow-200' : 'text-white'} truncate`}>
                {char.name}
                {is5Star && <span className="ml-0.5 animate-pulse text-[10px]">✨</span>}
              </h3>
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap border ${rarityClasses.badge.bg} ${rarityClasses.badge.text} ${rarityClasses.badge.border}`}>
                ★{char.rarity}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${ELEMENTS[char.element].border} ${ELEMENTS[char.element].color} bg-black/30`}>
                {ELEMENTS[char.element].name}
              </span>
            </div>

            {/* 역할 */}
            <div className="text-[10px] text-slate-400">
              {getRoleLabel(char.role)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
