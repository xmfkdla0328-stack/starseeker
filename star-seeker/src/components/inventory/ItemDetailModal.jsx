import React from 'react';
import { GradientDivider } from '../common/GradientDivider';
import { IconCircle } from '../common/IconCircle';

/**
 * 아이템 상세 정보 모달 컴포넌트
 * 선택된 아이템의 상세 정보를 표시하고 사용 기능 제공
 */
export const ItemDetailModal = ({ item, onClose, onUse }) => {
  if (!item) return null;

  const handleUse = () => {
    if (onUse && item.usable && item.count > 0) {
      onUse(item.id);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* 모달 컨텐트 */}
      <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-cyan-400/20 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in backdrop-blur-xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300"
          aria-label="Close"
        >
          X
        </button>

        {/* 아이템 정보 */}
        <div className="flex items-start gap-4 mb-6">
          <IconCircle
            icon={item.icon}
            size={20}
            bgGradient={item.bgGradient}
            borderColor={item.borderColor}
            iconColor={item.color}
            className="border-2"
          />
          <div className="flex-1">
            <h2 className={`text-2xl font-bold ${item.color} font-serif mb-1`}>{item.name}</h2>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">{item.rarity}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">보유:</span>
              <span className="text-2xl font-bold text-white">{item.count}</span>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <GradientDivider color="cyan-400" className="mb-4" />

        {/* 설명 */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-cyan-300 mb-2">설명</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
        </div>

        {/* 사용 버튼 */}
        {item.usable ? (
          <button
            onClick={handleUse}
            disabled={item.count <= 0}
            className={`w-full py-3 rounded-lg border transition-all text-sm font-bold ${
              item.count > 0
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border-purple-400/30 hover:border-purple-400/50 text-purple-200 hover:text-purple-100'
                : 'bg-slate-800/50 border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {item.count > 0 ? '사용하기' : '보유한 아이템 없음'}
          </button>
        ) : (
          <button
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 transition-all text-sm font-bold text-slate-500 cursor-not-allowed"
            disabled
          >
            사용할 수 없는 아이템
          </button>
        )}
      </div>
    </div>
  );
};
