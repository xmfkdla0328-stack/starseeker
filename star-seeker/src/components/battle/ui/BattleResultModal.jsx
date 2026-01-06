/**
 * 전투 결과 모달 컴포넌트
 * @module components/battle/ui/BattleResultModal
 */

import React from 'react';
import { BattleResult } from '../../../utils/battle/battleUtils';
import { UI_TEXT } from '../../../constants/battleConstants';

/**
 * 전투 결과(승리/패배) 모달을 표시합니다
 * @param {object} props
 * @param {string} props.result - 전투 결과 ('VICTORY' | 'DEFEAT' | 'NONE')
 * @param {function} props.onBack - 돌아가기 핸들러
 * @param {function} props.onRestart - 재시작 핸들러
 * @returns {React.ReactElement|null}
 */
export const BattleResultModal = ({ result, onBack, onRestart }) => {
  if (!result || result === BattleResult.NONE) return null;
  
  const isVictory = result === BattleResult.VICTORY;
  const title = isVictory ? UI_TEXT.RESULT.VICTORY_TITLE : UI_TEXT.RESULT.DEFEAT_TITLE;
  const message = isVictory ? UI_TEXT.RESULT.VICTORY_MESSAGE : UI_TEXT.RESULT.DEFEAT_MESSAGE;
  
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
          {title}
        </div>
        <div className="text-sm text-slate-200/80 mb-5">
          {message}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onBack()}
            className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all bg-slate-800/80 text-slate-300 border-2 border-slate-600 hover:bg-slate-700/80 hover:border-slate-500"
          >
            {UI_TEXT.RESULT.BACK}
          </button>
          <button
            onClick={() => onRestart()}
            className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-2 border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            {UI_TEXT.RESULT.RESTART}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BattleResultModal;
