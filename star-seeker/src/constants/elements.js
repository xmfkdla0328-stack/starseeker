/**
 * 속성(원소) 관련 상수
 * 각 속성의 이름, 색상, 배경, 테두리 스타일 정의
 */

export const ELEMENTS = {
  FIRE: { 
    name: '불', 
    color: 'text-red-400', 
    bg: 'bg-red-500/20', 
    border: 'border-red-500/50' 
  },
  WATER: { 
    name: '물', 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/20', 
    border: 'border-blue-500/50' 
  },
  EARTH: { 
    name: '대지', 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-500/20', 
    border: 'border-emerald-500/50' 
  },
  LIGHT: { 
    name: '빛', 
    color: 'text-yellow-300', 
    bg: 'bg-yellow-500/20', 
    border: 'border-yellow-500/50' 
  },
  DARK: { 
    name: '어둠', 
    color: 'text-purple-400', 
    bg: 'bg-purple-500/20', 
    border: 'border-purple-500/50' 
  },
};

// 요소 목록 (UI 반복에 사용)
export const ELEMENT_LIST = ['FIRE', 'WATER', 'EARTH', 'LIGHT', 'DARK'];
