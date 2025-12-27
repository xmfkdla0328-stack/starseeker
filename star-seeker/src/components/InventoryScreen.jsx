import React, { useState } from 'react';
import { Package, Sparkles, Star, X } from 'lucide-react';
import { GradientDivider } from './common/GradientDivider';
import { IconCircle } from './common/IconCircle';

// 아이템 정의 (컴포넌트 외부로 분리)
const ITEM_DEFINITIONS = {
  stardust: {
    id: 'stardust',
    name: '별의 먼지',
    icon: Sparkles,
    description: '캐릭터의 스킬 레벨을 올리는 데 사용되는 신비로운 가루. 스킬 1레벨 상승 당 10개가 필요합니다.',
    rarity: 'rare',
    color: 'text-yellow-300',
    bgGradient: 'from-yellow-500/20 to-amber-600/20',
    borderColor: 'border-yellow-400/30',
  },
  gems: {
    id: 'gems',
    name: '별의 조각',
    icon: Star,
    description: '성운을 관측하기 위해 필요한 신비로운 조각. 가챠를 돌릴 때 사용됩니다. 1회 모집에 100개, 10회 모집에 1000개가 필요합니다.',
    rarity: 'epic',
    color: 'text-blue-300',
    bgGradient: 'from-blue-500/20 to-indigo-600/20',
    borderColor: 'border-blue-400/30',
  }
};

export const InventoryScreen = ({ items = {} }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // 보유한 아이템만 필터링
  const ownedItems = Object.keys(ITEM_DEFINITIONS)
    .map(key => ({
      ...ITEM_DEFINITIONS[key],
      count: items[key] || 0,
    }))
    .filter(item => item.count > 0);

  return (
    <div className="flex flex-col h-full p-6 overflow-hidden">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cyan-100 mb-2 font-serif flex items-center gap-3">
          <Package size={32} className="text-cyan-400" />
          창고
        </h1>
        <p className="text-sm text-slate-400">보유한 아이템을 확인하고 관리하세요</p>
      </div>

      {/* 아이템 그리드 */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {ownedItems.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {ownedItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
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
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <Package size={64} className="mb-4 opacity-20" />
            <p className="text-lg font-bold">보유한 아이템이 없습니다</p>
            <p className="text-sm mt-2">게임을 진행하며 아이템을 획득하세요</p>
          </div>
        )}
      </div>

      {/* 아이템 상세 모달 */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* 배경 오버레이 */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedItem(null)}
          />
          
          {/* 모달 컨텐트 */}
          <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-cyan-400/20 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in backdrop-blur-xl">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all"
            >
              <X size={20} className="text-slate-400" />
            </button>

            {/* 아이템 정보 */}
            <div className="flex items-start gap-4 mb-6">
              <IconCircle
                icon={selectedItem.icon}
                size={20}
                bgGradient={selectedItem.bgGradient}
                borderColor={selectedItem.borderColor}
                iconColor={selectedItem.color}
                className="border-2"
              />
              <div className="flex-1">
                <h2 className={`text-2xl font-bold ${selectedItem.color} font-serif mb-1`}>{selectedItem.name}</h2>
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">{selectedItem.rarity}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">보유:</span>
                  <span className="text-2xl font-bold text-white">{selectedItem.count}</span>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <GradientDivider color="cyan-400" className="mb-4" />

            {/* 설명 */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-cyan-300 mb-2">설명</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedItem.description}</p>
            </div>

            {/* 사용 버튼 */}
            <button
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/30 hover:border-cyan-400/50 transition-all text-sm font-bold text-cyan-200 hover:text-cyan-100"
              disabled
            >
              사용 (준비 중)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
