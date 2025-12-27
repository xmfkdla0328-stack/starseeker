import React from 'react';
import { Package } from 'lucide-react';

/**
 * 인벤토리 빈 상태 컴포넌트
 * 아이템이 없을 때 표시되는 빈 상태 UI
 */
export const InventoryEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
      <Package size={64} className="mb-4 opacity-20" />
      <p className="text-lg font-bold">보유한 아이템이 없습니다</p>
      <p className="text-sm mt-2">게임을 진행하며 아이템을 획득하세요</p>
    </div>
  );
};
