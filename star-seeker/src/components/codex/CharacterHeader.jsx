import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { ELEMENTS } from '../../constants/index';
import { getRoleLabel, getRoleBg, getRoleBorder, getRoleColor } from '../../utils/roleHelpers';

/**
 * 캐릭터 헤더 컴포넌트 - 홀로그램 스캔 스타일
 * 좌측: 작은 아이콘 영역 + 직업 텍스트 배경
 * 우측: 그라디언트 이름 + 속성/직업 뱃지 + 레벨/설명
 */
export const CharacterHeader = ({ charData }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // 이미지 경로 처리
  const getPortraitPath = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const publicUrl = process.env.PUBLIC_URL || '';
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${publicUrl}/${cleanPath}`;
  };

  return (
    <>
      <div className="px-8 pt-6 pb-4 flex gap-8 items-start border-b border-white/10 relative">
        {/* 좌측: 아이콘 영역 + 역할 배경 */}
        <div 
          className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 group cursor-pointer"
          onClick={() => charData.portrait && setIsImageModalOpen(true)}
        >
          {/* 배경 - 역할 글자 크게 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 text-7xl font-bold text-white pointer-events-none">
            {getRoleLabel(charData.role)[0]}
          </div>

          {charData.portrait ? (
            <>
              <img
                src={getPortraitPath(charData.portrait)}
                alt={charData.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  console.error('초상화 로드 실패:', getPortraitPath(charData.portrait));
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* 스캔라인 효과 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 via-transparent to-cyan-400/10 animate-scan"></div>
              </div>

              {/* 클릭 가능 표시 - 돋보기 아이콘 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                <ZoomIn size={36} className="text-white/80" />
              </div>
            </>
          ) : (
            <div className={`w-full h-full ${ELEMENTS[charData.element].bg} flex items-center justify-center relative z-10`}>
              <span className="text-5xl font-bold text-white opacity-60">{charData.name[0]}</span>
            </div>
          )}
        </div>

        {/* 우측: 캐릭터 정보 */}
        <div className="flex-1 relative z-10">
          {/* 이름 - 그라디언트 텍스트 */}
          <h1 className="text-4xl font-serif font-bold bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 text-transparent mb-3 tracking-wider">
            {charData.name}
          </h1>

          {/* 속성 및 직업 뱃지 */}
          <div className="flex gap-2 mb-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${ELEMENTS[charData.element].border} ${ELEMENTS[charData.element].bg} ${ELEMENTS[charData.element].color}`}>
              {ELEMENTS[charData.element].name}
            </span>
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getRoleBorder(charData.role)} ${getRoleBg(charData.role)} ${getRoleColor(charData.role)}`}>
              {getRoleLabel(charData.role)}
            </span>
          </div>

          {/* 레벨 및 설명 */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm text-cyan-200/80">
              <span className="text-slate-500">Level</span> <span className="text-lg font-bold">Lv. {charData.level || 1}</span>
            </div>
            <p className="text-slate-400 text-sm italic line-clamp-2">{charData.desc}</p>
          </div>
        </div>
      </div>

      {/* 풀스크린 이미지 모달 (Lightbox) */}
      {isImageModalOpen && charData.portrait && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsImageModalOpen(false)}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsImageModalOpen(false);
            }}
            className="absolute top-8 right-8 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300"
            aria-label="닫기"
          >
            X
          </button>

          {/* 이미지 */}
          <div
            className="relative max-w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getPortraitPath(charData.portrait)}
              alt={charData.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};
