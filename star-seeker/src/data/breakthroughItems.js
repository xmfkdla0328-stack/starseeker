/**
 * 돌파 아이템 및 시스템 (레거시 호환성 유지)
 * 새로운 코드는 data/breakthrough/ 폴더의 모듈화된 파일들을 사용하세요
 */

// 새로운 모듈화된 파일에서 모든 것을 re-export
export {
  BREAKTHROUGH_STAGES,
  getMaxLevelByBreakthrough,
  getNextBreakthroughRequiredLevel,
  BREAKTHROUGH_ITEMS,
  BREAKTHROUGH_ITEM_DATA,
  getRequiredFragmentId,
  checkBreakthroughRequired,
  performBreakthrough,
} from './breakthrough/index';
