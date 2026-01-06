import React from 'react';
import { BATTLE_RESULT, BATTLE_MESSAGES } from '../../../constants/battleConstants';
import SoundManager, { AUDIO_KEYS } from '../../../utils/audio/SoundManager';

/**
 * 전투 종료 오버레이 컴포넌트
 * 승리 또는 패배 시 표시되는 모달
 */
export const BattleEndOverlay = ({ result, onRestart, onBack }) => {
  if (!result || result === BATTLE_RESULT.NONE) return null;

  const isVictory = result === BATTLE_RESULT.VICTORY;

  return (
    <div 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundColor: 'rgba(0,0,0,0.7)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 100 
      }}
    >
      <div className="astro-modal p-6 min-w-[320px] text-center">
        <div className="text-2xl font-cinzel glow-text mb-2">
          {isVictory ? BATTLE_MESSAGES.MISSION_SUCCESS : BATTLE_MESSAGES.MISSION_FAILED}
        </div>
        <div className="text-sm text-slate-200/80 mb-5">
          {isVictory ? BATTLE_MESSAGES.VICTORY : BATTLE_MESSAGES.DEFEAT}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
              onBack?.();
            }}
            className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all bg-slate-800/80 text-slate-300 border-2 border-slate-600 hover:bg-slate-700/80 hover:border-slate-500"
          >
            돌아가기
          </button>
          <button
            onClick={() => {
              SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
              onRestart?.();
            }}
            className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-2 border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            재시작
          </button>
        </div>
      </div>
    </div>
  );
};
