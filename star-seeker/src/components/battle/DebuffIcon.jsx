import React from "react";
import PropTypes from "prop-types";

// 깨진 방패(디버프) 아이콘 SVG
const BrokenShieldIcon = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} width={14} height={14}>
    {/* 네모 배경 */}
    <rect x="0.5" y="0.5" width="19" height="19" rx="4" fill="#991b1b" stroke="#f87171" strokeWidth="1" />
    {/* 방패 본체 */}
    <path d="M10 4L16 6.5V10.5C16 14 12.5 16 10 17C7.5 16 4 14 4 10.5V6.5L10 4Z" fill="#f87171" stroke="#fff" strokeWidth="1.2" />
    {/* 깨진 금 */}
    <path d="M10 6V10L12 12L10 14" stroke="#991b1b" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M10 10L8 12L10 14" stroke="#991b1b" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

BrokenShieldIcon.propTypes = {
  className: PropTypes.string,
};

/**
 * 디버프 아이콘(정사각형 + 깨진 방패) - 방어력 감소 디버프용
 * @param {object} props
 * @param {function} [props.onClick]
 * @param {string} [props.className]
 */
const DebuffIcon = ({ onClick, className }) => (
  <button
    type="button"
    className={
      "w-4 h-4 flex items-center justify-center rounded border border-red-400 bg-slate-800 hover:bg-red-100/10 transition shadow cursor-pointer p-0 m-0 " +
      (className || "")
    }
    style={{ outline: "none", minWidth: "16px", minHeight: "16px" }}
    onClick={onClick}
    tabIndex={0}
    aria-label="방어력 감소 디버프"
  >
    <BrokenShieldIcon className="" />
  </button>
);

DebuffIcon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default DebuffIcon;
