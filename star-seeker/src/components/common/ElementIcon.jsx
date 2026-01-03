import React from 'react';
import PropTypes from 'prop-types';
import { Flame, PauseCircle, Weight, Waves, Infinity, Sparkles } from 'lucide-react';

/**
 * 속성별 아이콘 컴포넌트
 */
export const ElementIcon = ({ element, size = 16, className = '' }) => {
  const iconProps = {
    size,
    className: `${className}`,
    strokeWidth: 2.5,
  };

  const icons = {
    ENTROPY: <Flame {...iconProps} className={`text-red-300 ${className}`} />,
    STASIS: <PauseCircle {...iconProps} className={`text-sky-300 ${className}`} />,
    GRAVITY: <Weight {...iconProps} className={`text-purple-300 ${className}`} />,
    RESONANCE: <Waves {...iconProps} className={`text-amber-300 ${className}`} />,
    PARADOX: <Infinity {...iconProps} className={`text-slate-200 ${className}`} />,
    AXIOM: <Sparkles {...iconProps} className={`text-slate-100 ${className}`} />,
  };

  return icons[element] || icons.AXIOM;
};

ElementIcon.propTypes = {
  element: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

ElementIcon.defaultProps = {
  size: 16,
  className: '',
};
