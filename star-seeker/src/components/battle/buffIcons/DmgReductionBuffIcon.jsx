import React from "react";
import PropTypes from "prop-types";

// 방패 아이콘 (받는 피해 감소 버프용)
const ShieldIcon = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    width={16}
    height={16}
    style={{ display: "block" }}
  >
    {/* 파란 네모 배경 */}
    <rect x="0" y="0" width="16" height="16" rx="3" fill="#2563eb" stroke="#60a5fa" strokeWidth="1" />
    {/* 방패 모양 */}
    <path d="M8 3.5C8.5 3.5 12 4.5 12 6.5C12 10 8 12.5 8 12.5C8 12.5 4 10 4 6.5C4 4.5 7.5 3.5 8 3.5Z" fill="#fff" stroke="#1e40af" strokeWidth="0.7" />
    <path d="M8 6.5V10" stroke="#2563eb" strokeWidth="0.7" strokeLinecap="round" />
  </svg>
);

ShieldIcon.propTypes = {
  className: PropTypes.string,
};

/**
 * 받는 피해 감소 버프 아이콘 - 파란 네모 + 방패
 * @param {object} props
 * @param {function} [props.onClick]
 * @param {string} [props.className]
 */
const DmgReductionBuffIcon = ({ onClick, className }) => (
  <button
    type="button"
    className={
      "w-4 h-4 flex items-center justify-center rounded border border-blue-400 bg-slate-800 hover:bg-blue-100/10 transition shadow cursor-pointer p-0 m-0 " +
      (className || "")
    }
    style={{ outline: "none", minWidth: "16px", minHeight: "16px" }}
    onClick={onClick}
    tabIndex={0}
    aria-label="받는 피해 감소 버프"
  >
    <ShieldIcon className="" />
  </button>
);

DmgReductionBuffIcon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default DmgReductionBuffIcon;
