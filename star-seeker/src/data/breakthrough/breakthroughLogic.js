/**
 * 돌파 로직
 */

import { BREAKTHROUGH_STAGES } from './breakthroughStages';
import { BREAKTHROUGH_ITEM_DATA, getRequiredFragmentId } from './breakthroughFragments';

/**
 * 캐릭터가 돌파가 필요한지 확인
 * @param {Object} character 캐릭터 객체
 * @returns {Object|null} 돌파 정보 또는 null
 */
export const checkBreakthroughRequired = (character) => {
  const currentBreakthrough = character.breakthrough || 0;
  const nextStage = currentBreakthrough + 1;
  
  if (!BREAKTHROUGH_STAGES[nextStage]) {
    return null; // 더 이상 돌파할 단계가 없음
  }
  
  const stage = BREAKTHROUGH_STAGES[nextStage];
  if (character.level >= stage.level) {
    return {
      stage: nextStage,
      requiredLevel: stage.level,
      requiredFragments: stage.requiredFragments,
      statBonus: stage.statBonus,
    };
  }
  
  return null;
};

/**
 * 돌파 실행
 * @param {Object} character 캐릭터 객체
 * @param {Object} items 아이템 인벤토리
 * @returns {Object} { success: boolean, message: string, updatedCharacter: Object|null, updatedItems: Object|null }
 */
export const performBreakthrough = (character, items) => {
  const breakthroughInfo = checkBreakthroughRequired(character);
  
  if (!breakthroughInfo) {
    return {
      success: false,
      message: '돌파할 수 없습니다. 레벨이 충분하지 않거나 이미 최대 돌파 단계입니다.',
      updatedCharacter: null,
      updatedItems: null,
    };
  }
  
  const fragmentId = getRequiredFragmentId(character.element);
  const currentFragments = items[fragmentId] || 0;
  
  if (currentFragments < breakthroughInfo.requiredFragments) {
    return {
      success: false,
      message: `${BREAKTHROUGH_ITEM_DATA[fragmentId].name}이(가) 부족합니다. (${currentFragments}/${breakthroughInfo.requiredFragments})`,
      updatedCharacter: null,
      updatedItems: null,
    };
  }
  
  // 돌파 수행
  const updatedCharacter = {
    ...character,
    breakthrough: breakthroughInfo.stage,
  };
  
  const updatedItems = {
    ...items,
    [fragmentId]: currentFragments - breakthroughInfo.requiredFragments,
  };
  
  return {
    success: true,
    message: `${character.name}의 레벨 한계를 돌파했습니다!`,
    updatedCharacter,
    updatedItems,
  };
};
