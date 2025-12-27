import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { Sparkles, Star } from 'lucide-react';
import { ItemCard } from './inventory/ItemCard';
import { ItemDetailModal } from './inventory/ItemDetailModal';
import { InventoryEmptyState } from './inventory/InventoryEmptyState';

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
            {ownedItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          <InventoryEmptyState />
        )}
      </div>

      {/* 아이템 상세 모달 */}
      <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};
