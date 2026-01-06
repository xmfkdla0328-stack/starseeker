import React from 'react';
import { ELEMENTS } from '../../constants/index';

const getImagePath = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const publicUrl = process.env.PUBLIC_URL || '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${publicUrl}/${cleanPath}`;
};

/**
 * 메인 캐릭터 원형 디스플레이
 * @param {object} character - 캐릭터 데이터
 * @param {function} onCycle - 캐릭터 순환 핸들러
 */
export const CharacterCircle = ({ character, onCycle }) => {
  if (!character) return null;

  const element = ELEMENTS[character.element];

  return (
    <div onClick={onCycle} className="relative z-10 cursor-pointer group flex-shrink-0">
      {/* 성운 배경 효과 */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-radial from-${element.color.replace('text-', '')}-500/20 via-transparent to-transparent blur-3xl scale-150 animate-pulse-slow`}
      ></div>

      {/* 회전하는 궤도 링 */}
      <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin-slow scale-110"></div>
      <div
        className="absolute inset-0 rounded-full border border-purple-400/10 animate-spin-slow scale-125"
        style={{ animationDirection: 'reverse', animationDuration: '40s' }}
      ></div>

      {/* 캐릭터 원형 컨테이너 */}
      <div
        className={`w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full border-2 ${element.border} ${element.bg} flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_80px_rgba(34,211,238,0.6)] relative overflow-hidden backdrop-blur-md`}
      >
        {/* 홀로그램 스캔 라인 */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-scan"></div>

        {/* 캐릭터 초상화 또는 이니셜 */}
        {character.portrait ? (
          (() => {
            const imgSrc = getImagePath(character.portrait);
            return (
              <img
                src={imgSrc}
                alt={character.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { console.error('프로필 이미지 로드 실패:', imgSrc); e.currentTarget.style.display = 'none'; }}
              />
            );
          })()
        ) : (
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] select-none relative z-10">
            {character.name[0]}
          </span>
        )}

        {/* 별 입자 효과 */}
        <div className="absolute inset-0 animate-spin-slow opacity-40">
          <div className="absolute top-10 left-1/2 w-1 h-1 bg-cyan-300 rounded-full blur-[1px] shadow-[0_0_4px_rgba(34,211,238,0.8)]"></div>
          <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-purple-300 rounded-full blur-[1px] shadow-[0_0_4px_rgba(168,85,247,0.8)]"></div>
          <div className="absolute top-1/2 right-10 w-0.5 h-0.5 bg-blue-200 rounded-full blur-[1px]"></div>
        </div>

        {/* 테두리 글로우 효과 */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-500"></div>
      </div>

      {/* 하단 캐릭터 정보 */}
      <div className="mt-3 md:mt-4 lg:mt-6 text-center relative z-20">
        {/* 캐릭터 이름 */}
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-200 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] flex items-center justify-center gap-2 flex-wrap">
          {character.name}
          <span
            className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded border ${element.border} ${element.color} bg-black/40 backdrop-blur-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]`}
          >
            {element.name}
          </span>
        </h1>
      </div>
    </div>
  );
};
