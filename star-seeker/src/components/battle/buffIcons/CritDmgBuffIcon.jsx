import React from "react";


// 치명타 피해 증가 버프 전용 아이콘 (BuffIcon과 동일한 네모칸+보라색 번개 심볼)
const CritDmgBuffIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    width={16}
    height={16}
    style={{ display: "block" }}
  >
    {/* 보라색 네모 배경 */}
    <rect x="0" y="0" width="16" height="16" rx="3" fill="#7c3aed" stroke="#e0aaff" strokeWidth="1" />
    {/* 번개 심볼 (치명타 피해 느낌) */}
    <polyline points="7,3 10,7 8.5,7 10,13 6,9 7.5,9 7,3" fill="#fff" stroke="#e0aaff" strokeWidth="0.7" strokeLinejoin="round" />
    {/* D 텍스트(작게) */}
    <text x="8" y="14.2" textAnchor="middle" fontSize="6" fill="#e0aaff" fontWeight="bold">D</text>
  </svg>
);

export default CritDmgBuffIcon;
