import React from "react";
import PropTypes from "prop-types";

// 초록색 네모 + 십자가 아이콘 (지속 회복 HOT 버프용)
const HotIcon = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    width={16}
    height={16}
    style={{ display: "block" }}
  >
    {/* 초록 네모 배경 */}
    <rect x="0" y="0" width="16" height="16" rx="3" fill="#059669" stroke="#34d399" strokeWidth="1" />
    {/* 십자가 모양 (가로/세로) */}
    <rect x="7" y="3" width="2" height="10" rx="0.7" fill="#fff" />
    <rect x="3" y="7" width="10" height="2" rx="0.7" fill="#fff" />
  </svg>
);

HotIcon.propTypes = {
  className: PropTypes.string,
};

/**
 * HOT(지속 회복) 버프 아이콘 - 초록 네모 + 십자가
 * @param {object} props
 * @param {function} [props.onClick]
 * @param {string} [props.className]
 */
const HotBuffIcon = ({ onClick, className }) => (
  <button
    type="button"
    className={
      "w-4 h-4 flex items-center justify-center rounded border border-green-400 bg-slate-800 hover:bg-green-100/10 transition shadow cursor-pointer p-0 m-0 " +
      (className || "")
    }
    style={{ outline: "none", minWidth: "16px", minHeight: "16px" }}
    onClick={onClick}
    tabIndex={0}
    aria-label="지속 회복 버프"
  >
    <HotIcon className="" />
  </button>
);

HotBuffIcon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default HotBuffIcon;
