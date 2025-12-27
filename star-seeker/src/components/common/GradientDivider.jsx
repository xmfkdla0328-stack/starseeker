import React from 'react';

/**
 * 그라데이션 구분선 컴포넌트
 * 반복적으로 사용되는 "h-px bg-gradient-to-r from-transparent via-X/20 to-transparent" 패턴 통합
 */
export const GradientDivider = ({ color = 'slate-500', className = '' }) => {
  const colorMap = {
    'slate': 'via-slate-500/20',
    'cyan': 'via-cyan-400/20',
    'white': 'via-white/20',
    'slate-500': 'via-slate-500/20',
    'cyan-400': 'via-cyan-400/20',
  };

  const viaColor = colorMap[color] || `via-${color}/20`;

  return (
    <div className={`h-px bg-gradient-to-r from-transparent ${viaColor} to-transparent ${className}`} />
  );
};
