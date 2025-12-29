/**
 * 아이템 효과 처리
 */

/**
 * 아이템 사용 효과 처리
 * @param {string} itemId 아이템 ID
 * @param {Object} item 아이템 정의
 * @param {Object} context 게임 컨텍스트 (setPlayerInfo, showToast 등)
 * @returns {boolean} 사용 성공 여부
 */
export const applyItemEffect = (itemId, item, context) => {
  if (!item || !item.usable) {
    context.showToast?.('사용할 수 없는 아이템입니다.');
    return false;
  }
  
  switch (item.effect) {
    case 'level_50':
      // 레벨 50에 필요한 경험치 설정
      const LEVEL_50_EXP = 63700;
      context.setPlayerInfo?.(prev => ({
        ...prev,
        exp: LEVEL_50_EXP,
      }));
      context.showToast?.('경계의 물약을 사용했습니다! 레벨 50으로 상승!');
      return true;
      
    default:
      context.showToast?.('알 수 없는 아이템 효과입니다.');
      return false;
  }
};
