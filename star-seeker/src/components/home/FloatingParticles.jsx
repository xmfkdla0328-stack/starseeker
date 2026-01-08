import React from 'react';
import PropTypes from 'prop-types';

/**
 * 떠다니는 우주 먼지 입자 효과
 */
export const FloatingParticles = ({ count = 3 }) => {
  const colors = ['cyan', 'purple', 'blue'];
  const delays = ['0s', '2s', '4s'];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-px h-px bg-${colors[i % colors.length]}-300/${40 - i * 10} rounded-full animate-float`}
          style={{
            top: `${25 + i * 8}%`,
            left: i === 0 ? '25%' : i === 1 ? 'auto' : '50%',
            right: i === 1 ? '33%' : 'auto',
            bottom: i === 2 ? '33%' : 'auto',
            '--animation-delay': delays[i % delays.length],
          }}
        />
      ))}
    </div>
  );
};

FloatingParticles.propTypes = {
  count: PropTypes.number,
};
