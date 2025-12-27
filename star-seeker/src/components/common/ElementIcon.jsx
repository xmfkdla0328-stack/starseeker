import React from 'react';
import { Flame, Droplets, Leaf, Sun, Moon } from 'lucide-react';

/**
 * 속성별 아이콘 컴포넌트
 * @param {string} element - 속성 키 (FIRE, WATER, EARTH, LIGHT, DARK)
 * @param {number} size - 아이콘 크기 (기본값: 16)
 * @param {string} className - 추가 클래스
 */
export const ElementIcon = ({ element, size = 16, className = '' }) => {
  const iconProps = {
    size,
    className: `${className}`,
    strokeWidth: 2.5,
  };

  const icons = {
    FIRE: <Flame {...iconProps} className={`text-red-400 ${className}`} />,
    WATER: <Droplets {...iconProps} className={`text-blue-400 ${className}`} />,
    EARTH: <Leaf {...iconProps} className={`text-emerald-400 ${className}`} />,
    LIGHT: <Sun {...iconProps} className={`text-yellow-300 ${className}`} />,
    DARK: <Moon {...iconProps} className={`text-purple-400 ${className}`} />,
  };

  return icons[element] || icons.FIRE;
};
