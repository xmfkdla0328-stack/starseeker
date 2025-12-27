import React from 'react';
import { Package, Sparkles } from 'lucide-react';

export const InventoryScreen = ({ items = {} }) => {
  // 아이템 정의
  const itemDefinitions = {
    stardust: {
      id: 'stardust',
      name: '별의 먼지',
      icon: Sparkles,
      description: '캐릭터의 스킬 레벨을 올리는 데 사용되는 신비로운 가루',
      rarity: 'rare',
      color: 'text-yellow-300',
      bgGradient: 'from-yellow-500/20 to-amber-600/20',
      borderColor: 'border-yellow-400/30',
    }
  };

  const itemList = Object.keys(itemDefinitions).map(key => ({
    ...itemDefinitions[key],
    count: items[key] || 0,
  }));

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {itemList.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${item.bgGradient} border ${item.borderColor} rounded-xl p-4 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                {/* 아이템 헤더 */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.bgGradient} border ${item.borderColor} flex items-center justify-center shadow-md`}>
                      <Icon size={24} className={item.color} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${item.color} font-serif`}>{item.name}</h3>
                      <p className="text-xs text-slate-400 capitalize">{item.rarity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{item.count}</p>
                    <p className="text-xs text-slate-500">보유</p>
                  </div>
                </div>

                {/* 아이템 설명 */}
                <div className="border-t border-white/10 pt-3">
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>

                {/* 사용 버튼 (추후 구현) */}
                {item.count > 0 && (
                  <button
                    className="mt-3 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm text-slate-300 hover:text-white"
                    disabled
                  >
                    사용 (준비 중)
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* 빈 상태 */}
        {itemList.every(item => item.count === 0) && (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <Package size={64} className="mb-4 opacity-20" />
            <p className="text-lg font-bold">보유한 아이템이 없습니다</p>
            <p className="text-sm mt-2">게임을 진행하며 아이템을 획득하세요</p>
          </div>
        )}
      </div>
    </div>
  );
};
