/**
 * 돌파 시스템 통합 export
 */

// 돌파 단계 및 레벨 관련
export {
  BREAKTHROUGH_STAGES,
  getMaxLevelByBreakthrough,
  getNextBreakthroughRequiredLevel,
} from './breakthroughStages';

// 돌파 아이템 (별의 조각) 관련
export {
  BREAKTHROUGH_ITEMS,
  BREAKTHROUGH_ITEM_DATA,
  getRequiredFragmentId,
} from './breakthroughFragments';

// 돌파 로직
export {
  checkBreakthroughRequired,
  performBreakthrough,
} from './breakthroughLogic';
