import React from 'react';

export const StarField = ({ count = 50, variant = 'inside' }) => {
  const stars = Array.from({ length: count });
  const isInside = variant === 'inside';

  return (
    <div className="absolute inset-0">
      {stars.map((_, i) => {
        const size = isInside ? Math.random() * 3 + 1 : Math.random() * 2 + 0.3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const baseOpacity = isInside ? Math.random() * 0.8 + 0.2 : Math.random() * 0.3 + 0.1;
        const boxShadow = isInside
          ? `0 0 ${size * 2}px rgba(255,255,255,${Math.random() * 0.5 + 0.3})`
          : undefined;
        const animationDuration = isInside ? Math.random() * 4 + 2 : Math.random() * 5 + 3;
        const animationDelay = isInside ? `${Math.random() * 2}s` : undefined;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size + 'px',
              height: size + 'px',
              left: left + '%',
              top: top + '%',
              opacity: baseOpacity,
              animation: `twinkle ${animationDuration}s ease-in-out ${animationDelay || '0s'} infinite`,
              boxShadow,
            }}
          />
        );
      })}
    </div>
  );
};
