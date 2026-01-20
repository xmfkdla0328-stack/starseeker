import React from "react";
import PropTypes from "prop-types";

// 치명타 확률 버프 아이콘 (작은 네모 + 번개)
const CritBuffIcon = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    width={16}
    height={16}
    style={{ display: "block" }}
  >
    {/* 노란 네모 배경 */}
    <rect x="0" y="0" width="16" height="16" rx="3" fill="#facc15" stroke="#fde047" strokeWidth="1" />
    {/* 번개 아이콘 */}
    <g>
      <polygon points="7,3 11,8 9,8 10,13 5,7.5 7,7.5" fill="#fff200" stroke="#f59e42" strokeWidth="0.7" />
    </g>
  </svg>
);

CritBuffIcon.propTypes = {
  className: PropTypes.string,
};

export default CritBuffIcon;
