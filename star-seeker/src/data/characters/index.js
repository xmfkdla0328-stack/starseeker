/**
 * 캐릭터 데이터 통합 모듈
 * 분리된 데이터들을 합쳐서 기존 CHAR_DB 포맷으로 export
 */

import { CHARACTER_BASE_DATA } from './characterData';
import { CHARACTER_SKILLS } from './skillData';
import { CHARACTER_PROFILES } from './profileData';

/**
 * 캐릭터 기본 데이터 + 스킬 + 프로필을 병합하여 완전한 캐릭터 객체 생성
 */
export const CHAR_DB = CHARACTER_BASE_DATA.map(baseData => {
  const skills = CHARACTER_SKILLS[baseData.id];
  const profileData = CHARACTER_PROFILES[baseData.id];
  
  return {
    ...baseData,
    ...skills,
    ...profileData,
  };
});

// 인연도 정보 재 export
export { BOND_LEVELS } from './bondLevels';
