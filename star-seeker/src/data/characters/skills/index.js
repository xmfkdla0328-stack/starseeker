/**
 * 캐릭터 스킬 데이터 통합 모듈
 * 각 캐릭터의 스킬 정보를 ID별로 매핑
 */
import { character1Skills } from './character1Skills';
import { character2Skills } from './character2Skills';
import { character3Skills } from './character3Skills';
import { character4Skills } from './character4Skills';
import { character5Skills } from './character5Skills';
import { character6Skills } from './character6Skills';
import { character7Skills } from './character7Skills';
import { character8Skills } from './character8Skills';

/**
 * 캐릭터 ID를 키로 하는 스킬 데이터 맵
 * 
 * 각 캐릭터는 다음 구조를 가집니다:
 * - skills: 스킬 이름 (normal, skill, ultimate, passive1, passive2)
 * - skillLevels: 스킬 레벨 (normal, skill, ultimate)
 * - skillDetails: 스킬 상세 정보 (desc, cooldown, damageFactor 등)
 */
export const CHARACTER_SKILLS = {
  1: character1Skills,  // 서주목
  2: character2Skills,  // 루나
  3: character3Skills,  // 이그니스
  4: character4Skills,  // 아쿠아
  5: character5Skills,  // 테라
  6: character6Skills,  // 솔라
  7: character7Skills,  // 녹스
  8: character8Skills,  // 박주옥
};

// 개별 캐릭터 스킬도 export (필요시 직접 import 가능)
export {
  character1Skills,
  character2Skills,
  character3Skills,
  character4Skills,
  character5Skills,
  character6Skills,
  character7Skills,
  character8Skills,
};
