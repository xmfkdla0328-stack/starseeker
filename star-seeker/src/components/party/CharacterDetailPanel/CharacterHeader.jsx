import React from 'react';
import { ElementIcon } from '../../common/ElementIcon';
import { ELEMENTS } from '../../../constants/index';
import { getRoleLabel, getRoleColor } from '../../../utils/roleHelpers';

/**
 * 이미지 경로를 처리하는 헬퍼 함수
 */
const getImagePath = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const publicUrl = process.env.PUBLIC_URL || '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${publicUrl}/${cleanPath}`;
};

/**
 * 캐릭터 헤더 섹션 (초상화, 이름, 레벨, 역할, 속성)
 */
export const CharacterHeader = ({ selectedCharacter }) => {
  return (
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
  );
};
