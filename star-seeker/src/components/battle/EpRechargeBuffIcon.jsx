import React from 'react';

// EP 충전 효율 버프 아이콘: 파란색 네모 + 번개 + %
// (작은 네모, 파란색 배경, 번개⚡, 오른쪽 아래에 %)
const EpRechargeBuffIcon = ({ className }) => (
  <div
    title="EP 충전 효율 증가"
    className={"w-4 h-4 rounded bg-blue-400/80 border border-blue-300 flex items-center justify-center relative shadow-sm " + (className || "")}
    style={{ fontSize: 13, minWidth: 16, minHeight: 16 }}
  >
    <span className="text-white drop-shadow-sm" style={{fontSize: 13}}>⚡</span>
    <span
      className="absolute right-0.5 bottom-0.5 text-[10px] text-blue-100 font-bold"
      style={{ lineHeight: 1 }}
    >%</span>
  </div>
);

export default EpRechargeBuffIcon;
