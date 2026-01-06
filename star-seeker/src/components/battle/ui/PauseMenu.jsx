/**
 * 일시정지 메뉴 컴포넌트
 * @module components/battle/ui/PauseMenu
 */

import React from 'react';
import { UI_TEXT } from '../../../constants/battleConstants';

/**
 * 전투 일시정지 메뉴를 표시합니다
 * @param {object} props
 * @param {boolean} props.isOpen - 메뉴 열림 상태
 * @param {boolean} props.showRetreatConfirm - 후퇴 확인 모달 표시 여부
 * @param {function} props.onResume - 전투 재개 핸들러
 * @param {function} props.onRetreatPrompt - 후퇴 요청 핸들러
 * @param {function} props.onRetreatCancel - 후퇴 취소 핸들러
 * @param {function} props.onRetreatConfirm - 후퇴 확정 핸들러
 * @returns {React.ReactElement|null}
 */
export const PauseMenu = ({
  isOpen,
  showRetreatConfirm,
  onResume,
  onRetreatPrompt,
  onRetreatCancel,
  onRetreatConfirm,
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="pause-overlay">
      <div className="pause-modal">
        <div className="pause-chip">{UI_TEXT.PAUSE.CHIP}</div>
        {!showRetreatConfirm ? (
          <>
            <h2 className="pause-title">{UI_TEXT.PAUSE.TITLE}</h2>
            <p className="pause-subtitle">{UI_TEXT.PAUSE.SUBTITLE}</p>
            <div className="pause-menu">
              <button 
                type="button" 
                className="pause-action primary" 
                onClick={() => onResume()}
              >
                {UI_TEXT.PAUSE.RESUME}
              </button>
              <button 
                type="button" 
                className="pause-action warning" 
                onClick={() => onRetreatPrompt()}
              >
                {UI_TEXT.PAUSE.RETREAT}
              </button>
              <button 
                type="button" 
                className="pause-action secondary" 
                disabled
              >
                {UI_TEXT.PAUSE.SETTINGS}
              </button>
            </div>
          </>
        ) : (
          <div className="pause-confirm">
            <h2 className="pause-title">{UI_TEXT.RETREAT_CONFIRM.TITLE}</h2>
            <p className="pause-subtitle">{UI_TEXT.RETREAT_CONFIRM.SUBTITLE}</p>
            <div className="pause-confirm-actions">
              <button 
                type="button" 
                onClick={() => onRetreatCancel()} 
                className="pause-action secondary"
              >
                {UI_TEXT.RETREAT_CONFIRM.CONTINUE}
              </button>
              <button 
                type="button" 
                onClick={() => onRetreatConfirm()} 
                className="pause-action warning"
              >
                {UI_TEXT.RETREAT_CONFIRM.CONFIRM}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PauseMenu;
