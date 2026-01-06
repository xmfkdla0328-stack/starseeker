/**
 * 자원 추출 화면 상수 및 유틸
 */
import { ArrowLeft, Brain, Gem, FlaskConical, Shield, Sword, Sparkles } from 'lucide-react';
import { DUNGEON_TYPES } from '../../data/dungeonData';

export const typeIcons = {
  [DUNGEON_TYPES.MEMORY]: Brain,
  [DUNGEON_TYPES.STARSTONE]: Gem,
  [DUNGEON_TYPES.STIGMA]: FlaskConical,
};

export const rewardLabel = {
  exp_chip: '기억 추출물',
  gold: '성석',
  star_fragment: '별의 파편',
};

/**
 * 파티 유효성 검사
 */
export const validateParty = (party) => {
  const partySize = party?.members?.filter((m) => m).length || 0;
  return partySize > 0;
};

/**
 * 추천 전투력 계산
 */
export const getRecommendedPower = (stagePower) => {
  return Math.round(stagePower * 0.9);
};
