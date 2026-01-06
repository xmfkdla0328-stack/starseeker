/**
 * @deprecated
 * 이 파일은 하위 호환성을 위해 유지됩니다.
 * 새로운 코드에서는 './skills' 폴더에서 직접 import 하세요.
 * 
 * 예시:
 * import { CHARACTER_SKILLS } from './data/characters/skills';
 * import { character1Skills } from './data/characters/skills/character1Skills';
 */

// 모든 캐릭터 스킬 데이터 재export
export { CHARACTER_SKILLS } from './skills';

// 개별 캐릭터 스킬도 재export
export {
  character1Skills,
  character2Skills,
  character3Skills,
  character4Skills,
  character5Skills,
  character6Skills,
  character7Skills,
  character8Skills,
} from './skills';
