import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getTitleById, getRarityStyles } from '../../data/playerStats';

export const ProfileHeader = ({ playerInfo, onClose }) => {
  const selectedTitleData = useMemo(() => getTitleById(playerInfo.selectedTitle), [playerInfo.selectedTitle]);
  
  return (
    <div className="relative bg-white/5 hover:bg-white/8 border-b border-white/10 backdrop-blur-md p-6 shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      
      <div className="relative flex items-center justify-between z-10 gap-4">
        {/* 프로필 이미지 */}
        <div className="w-20 h-20 rounded-full border-2 border-cyan-400 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center relative overflow-hidden flex-shrink-0 shadow-lg shadow-cyan-500/50">
          <div className="absolute inset-0 rounded-full border border-cyan-300/20 animate-pulse"></div>
          <span className="text-3xl font-serif font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] relative z-10">
            {playerInfo.nickname[0]}
          </span>
        </div>
          
        {/* 프로필 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {selectedTitleData && (
              (() => {
                const rarityStyles = getRarityStyles(selectedTitleData.rarity);
                return (
                  <span className={`text-xs px-3 py-1 rounded-full ${rarityStyles.bg} border ${rarityStyles.border} ${rarityStyles.text} font-bold tracking-widest flex-shrink-0 backdrop-blur-md`}>
                    ✦ {selectedTitleData.rarity.toUpperCase()}
                  </span>
                );
              })()
            )}
          </div>
          <p className="text-xs text-cyan-300/60 font-mono tracking-wider uppercase mb-1">
            {selectedTitleData?.name}
          </p>
          <h1 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] leading-tight">
            {playerInfo.nickname}
          </h1>
          <p className="text-xs text-cyan-300/70 tracking-wider uppercase mt-2 font-mono">Lv. {playerInfo.level} ✧ 총 {playerInfo.totalBattles}회 전투</p>
        </div>
        
        {/* 닫기 버튼 (옵션) */}
        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300 flex-shrink-0"
            aria-label="Close"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  playerInfo: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    selectedTitle: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    totalBattles: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func,
};

ProfileHeader.defaultProps = {
  onClose: null,
};
