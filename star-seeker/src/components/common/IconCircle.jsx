import React from 'react';

/**
 * 아이콘 원형 배경 컴포넌트
 * 반복되는 "w-X h-X rounded-full border bg-gradient-to-br flex items-center justify-center" 패턴 통합
 */
export const IconCircle = ({ 
  icon: Icon, 
  size = 12, // Tailwind 크기 (e.g., 12, 16, 20, 24)
  bgGradient = 'from-cyan-500/20 to-blue-600/20',
  borderColor = 'border-cyan-300/40',
  iconColor = 'text-cyan-300',
  className = '',
  children,
}) => {
  const sizeMap = {
    8: 'w-8 h-8',
    12: 'w-12 h-12',
    16: 'w-16 h-16',
    20: 'w-20 h-20',
    24: 'w-24 h-24',
  };

  const sizeClass = sizeMap[size] || `w-${size} h-${size}`;
  const borderClass = `border-2 ${borderColor}`;

  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br ${bgGradient} ${borderClass} flex items-center justify-center flex-shrink-0 relative backdrop-blur-sm ${className}`}>
      {Icon ? <Icon size={size * 2} className={iconColor} /> : children}
    </div>
  );
};
