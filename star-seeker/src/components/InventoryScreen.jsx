import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { ItemCard } from './inventory/ItemCard';
import { ItemDetailModal } from './inventory/ItemDetailModal';
import { InventoryEmptyState } from './inventory/InventoryEmptyState';
import { BackButton } from './common/BackButton';
import { ITEM_DEFINITIONS, applyItemEffect } from '../data/itemDefinitions';

const InventoryScreen = ({ items = {}, setItems, setPlayerInfo, showToast, setScreen }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // 아이템 사용 핸들러
  const handleUseItem = (itemId) => {
    const item = ITEM_DEFINITIONS[itemId];
    
    if (!item || !item.usable) {
      showToast?.('사용할 수 없는 아이템입니다.');
      return;
    }
    
    const currentCount = items[itemId] || 0;
    if (currentCount <= 0) {
      showToast?.('보유한 아이템이 없습니다.');
      return;
    }
    
    // 아이템 효과 적용
    const success = applyItemEffect(itemId, item, { setPlayerInfo, showToast });
    
    if (success) {
      // 아이템 개수 감소
      setItems?.(prev => ({
        ...prev,
        [itemId]: currentCount - 1,
      }));
      setSelectedItem(null);
    }
  };

  // 보유한 아이템만 필터링
  const ownedItems = Object.keys(ITEM_DEFINITIONS)
    .map(key => ({
      ...ITEM_DEFINITIONS[key],
      count: items[key] || 0,
    }))
    .filter(item => item.count > 0);

  return (
    <div className="flex flex-col min-h-full p-4 md:p-6 gap-4">
      {/* 뒤로가기 버튼 */}
      <BackButton onClick={() => setScreen('HOME')} />

      {/* 헤더 */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-100 mb-2 font-serif flex items-center gap-3">
          <Package size={28} className="text-cyan-400" />
          창고
        </h1>
        <p className="text-xs md:text-sm text-slate-400">보유한 아이템을 확인하고 관리하세요</p>
      </div>

      {/* 아이템 그리드 */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        {ownedItems.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
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
      <ItemDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)}
        onUse={handleUseItem}
      />
    </div>
  );
};

export default InventoryScreen;
