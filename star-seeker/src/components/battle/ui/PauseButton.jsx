/**
 * 일시정지 버튼 컴포넌트
 * @module components/battle/ui/PauseButton
 */

import React from 'react';

/**
 * 전투 일시정지 버튼을 표시합니다
 * @param {object} props
 * @param {function} props.onClick - 클릭 핸들러
 * @returns {React.ReactElement}
 */
export const PauseButton = ({ onClick }) => {
  return (
    <button
      type="button"
      aria-label="일시정지"
      className="pause-toggle"
      onClick={() => onClick()}
      style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px', 
        zIndex: 25 
      }}
    >
      <span className="pause-toggle-icon">II</span>
    </button>
  );
};

export default PauseButton;
