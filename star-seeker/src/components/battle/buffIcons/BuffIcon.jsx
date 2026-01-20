import React from "react";
import PropTypes from "prop-types";


// 더 명확한 칼 아이콘 SVG (작고 선명하게)
// Heroicons 스타일의 직관적인 칼 SVG를 빨간 네모칸 안에 사선(45도)으로 배치
const SwordIcon = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    width={12}
    height={12}
    style={{ display: "block" }}
  >
    {/* 빨간 네모 배경 */}
    <rect x="0" y="0" width="16" height="16" rx="3" fill="#b91c1c" stroke="#f87171" strokeWidth="1" />
    {/* 사선 칼 아이콘 (Heroicons 스타일) */}
    <g transform="rotate(-35 8 8)">
      <rect x="7.2" y="3" width="1.6" height="7.5" rx="0.7" fill="#fff" />
      <rect x="7.2" y="10.5" width="1.6" height="2.2" rx="0.6" fill="#f87171" />
      <circle cx="8" cy="12.7" r="0.7" fill="#fff" />
    </g>
  </svg>
);

SwordIcon.propTypes = {
  className: PropTypes.string,
};

/**
 * 버프 아이콘(정사각형 + 칼) - 공격력 증가 버프용
 * @param {object} props
 * @param {function} [props.onClick]
 * @param {string} [props.className]
 */
const BuffIcon = ({ onClick, className }) => (
  <button
    type="button"
    className={
      "w-4 h-4 flex items-center justify-center rounded border border-yellow-400 bg-slate-800 hover:bg-yellow-100/10 transition shadow cursor-pointer p-0 m-0 " +
      (className || "")
    }
    style={{ outline: "none", minWidth: "16px", minHeight: "16px" }}
    onClick={onClick}
    tabIndex={0}
    aria-label="공격력 증가 버프"
  >
    <SwordIcon className="" />
  </button>
);

BuffIcon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default BuffIcon;
