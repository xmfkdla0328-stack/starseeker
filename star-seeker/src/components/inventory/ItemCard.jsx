import React from 'react';

/**
 * 인벤토리 아이템 카드 컴포넌트
 * 아이템 아이콘, 이름, 수량을 표시하고 클릭 시 상세 정보 표시
 */
export const ItemCard = ({ item, onClick }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${item.bgGradient} border ${item.borderColor} rounded-xl p-3 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative group`}
    >
      {/* 아이콘 */}
      <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${item.bgGradient} border ${item.borderColor} flex items-center justify-center shadow-md mb-2`}>
        <Icon size={20} className={item.color} />
      </div>
      
      {/* 이름 */}
      <p className={`text-xs font-bold ${item.color} text-center mb-1 truncate`}>{item.name}</p>
      
      {/* 수량 */}
      <div className="text-center">
        <p className="text-lg font-bold text-white">{item.count}</p>
      </div>

      {/* 호버 효과 */}
      <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </button>
  );
};
