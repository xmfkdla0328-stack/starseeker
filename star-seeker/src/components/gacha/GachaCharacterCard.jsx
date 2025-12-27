import React from 'react';
import { ELEMENTS } from '../../constants';
import { getRarityClasses, getRoleLabel } from '../../utils/styleHelpers';

export const GachaCharacterCard = ({ char, idx, isSingle }) => {
  const rarityClasses = getRarityClasses(char.rarity);
  
  return (
    <div
      className={`animate-fade-in ${isSingle ? 'w-80' : ''}`}
      style={{ animationDelay: `${idx * 0.2}s` }}
    >
      {/* 캐릭터 카드 */}
      <div className={`p-3 rounded-xl border backdrop-blur-sm transition-all h-full ${rarityClasses.cardBg} ${rarityClasses.cardBorder} ${rarityClasses.cardGlow}`}>
        <div className="flex flex-col items-center text-center gap-2">
          {/* 아바타 */}
          <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-lg ${rarityClasses.avatar.border} ${rarityClasses.avatar.bg} ${rarityClasses.avatar.text}`}>
            {char.name[0]}
          </div>

          {/* 정보 */}
          <div className="flex-1 w-full">
            {/* 이름과 레어도 배지 */}
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <h3 className="text-sm font-serif font-bold text-white truncate">
                {char.name}
              </h3>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap border ${rarityClasses.badge.bg} ${rarityClasses.badge.text} ${rarityClasses.badge.border}`}>
                ★{char.rarity}
              </span>
            </div>

            {/* 요소와 역할 */}
            <div className="flex flex-col items-center justify-center gap-1 text-xs text-slate-300 mb-2">
              <span className={`px-2 py-0.5 rounded border ${ELEMENTS[char.element].border} ${ELEMENTS[char.element].color} bg-black/30`}>
                {ELEMENTS[char.element].name}
              </span>
              <span className="text-slate-400">{getRoleLabel(char.role)}</span>
            </div>

            {/* 설명 */}
            <p className="text-xs text-slate-400 italic line-clamp-2">
              "{char.desc}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
