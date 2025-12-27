import React from 'react';

/**
 * 배경 별 컴포넌트
 * 크기, 색상, 위치, 애니메이션을 설정할 수 있는 재사용 가능한 별
 * 
 * @param {string} size - 별의 크기 ('small', 'medium', 'large')
 * @param {string} color - 별의 색상 ('white', 'blue-100', 'yellow-50' 등)
 * @param {string} position - 위치 스타일 (top, right, bottom, left)
 * @param {string} animationDelay - 애니메이션 지연 시간
 * @param {boolean} withShadow - 그로우 효과 포함 여부
 */
export const BackgroundStar = ({ 
  size = 'small', 
  color = 'white', 
  position = '', 
  animationDelay = '0s',
  withShadow = false 
}) => {
  const sizeClasses = {
    small: 'w-0.5 h-0.5',
    medium: 'w-1 h-1',
    large: 'w-1.5 h-1.5',
  };

  // 각 색상별 클래스 및 그로우 효과 매핑
  const colorMap = {
    white: { classes: 'bg-white', glow: 'shadow-[0_0_8px_rgba(255,255,255,0.8)]' },
    'blue-100': { classes: 'bg-blue-100', glow: '' },
    'yellow-50': { classes: 'bg-yellow-50', glow: '' },
    'purple-100': { classes: 'bg-purple-100', glow: '' },
    'cyan-100': { classes: 'bg-cyan-100', glow: '' },
    'blue-200': { classes: 'bg-blue-200', glow: '' },
    'yellow-100': { classes: 'bg-yellow-100', glow: '' },
    'purple-200': { classes: 'bg-purple-200', glow: '' },
    'cyan-200': { classes: 'bg-cyan-200', glow: 'shadow-[0_0_8px_rgba(165,243,252,0.6)]' },
    'yellow-200': { classes: 'bg-yellow-200', glow: 'shadow-[0_0_10px_rgba(254,240,138,0.7)]' },
  };

  const colorStyle = colorMap[color] || colorMap['white'];

  return (
    <div 
      className={`absolute rounded-full animate-twinkle ${sizeClasses[size]} ${colorStyle.classes} ${withShadow ? colorStyle.glow : ''} ${position}`}
      style={{ animationDelay }}
    />
  );
};

/**
 * 떠다니는 별 입자 컴포넌트
 * 더 섬세한 움직임을 가진 작은 별
 */
export const FloatingStar = ({ position = '', animationDelay = '0s', color = 'white/60' }) => {
  const colorMap = {
    'white/60': 'bg-white/60',
    'blue-200/50': 'bg-blue-200/50',
    'purple-200/50': 'bg-purple-200/50',
  };

  const bgClass = colorMap[color] || 'bg-white/60';

  return (
    <div 
      className={`absolute ${position} w-px h-px rounded-full animate-float ${bgClass}`}
      style={{ animationDelay }}
    />
  );
};
