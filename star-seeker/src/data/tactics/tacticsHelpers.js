import { SYNERGY_RECIPES } from './synergyRecipes';
import { CLASS_ROLES } from './classRoles';

/**
 * 전술 관련 헬퍼 함수들
 */

/**
 * 두 속성의 조합으로 시너지 레시피를 찾습니다
 * @param {string} element1 - 첫 번째 속성
 * @param {string} element2 - 두 번째 속성
 * @returns {object|null} - 매칭되는 시너지 레시피 또는 null
 */
export const findSynergyRecipe = (element1, element2) => {
  return SYNERGY_RECIPES.find(recipe => {
    const [e1, e2] = recipe.elements;
    return (e1 === element1 && e2 === element2) || (e1 === element2 && e2 === element1);
  }) || null;
};

/**
 * 영문 이름으로 직업 정보를 찾습니다
 * @param {string} roleNameEn - 영문 직업명 (예: 'PATHFINDER')
 * @returns {object|null} - 매칭되는 직업 정보 또는 null
 */
export const findClassRole = (roleNameEn) => {
  return CLASS_ROLES.find(role => role.nameEn === roleNameEn) || null;
};
