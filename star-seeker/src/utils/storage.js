/**
 * 로컬 스토리지 관리 유틸리티
 * 게임 데이터 저장/불러오기 중앙화
 */

import { ENV_CONFIG } from './environment';

const STORAGE_KEYS = {
  GAME_STATE: `${ENV_CONFIG.storagePrefix}game_state`,
  PLAYER_INFO: `${ENV_CONFIG.storagePrefix}player_info`,
  INVENTORY: `${ENV_CONFIG.storagePrefix}inventory`,
  PARTY: `${ENV_CONFIG.storagePrefix}party`,
  SETTINGS: `${ENV_CONFIG.storagePrefix}settings`,
};

/**
 * 로컬 스토리지에서 데이터 읽기
 * @param {string} key 저장소 키
 * @param {*} defaultValue 기본값
 * @returns {*} 저장된 값 또는 기본값
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to load from storage: ${key}`, error);
    return defaultValue;
  }
};

/**
 * 로컬 스토리지에 데이터 저장
 * @param {string} key 저장소 키
 * @param {*} value 저장할 값
 * @returns {boolean} 성공 여부
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to save to storage: ${key}`, error);
    return false;
  }
};

/**
 * 로컬 스토리지에서 데이터 삭제
 * @param {string} key 저장소 키
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove from storage: ${key}`, error);
  }
};

/**
 * 모든 게임 데이터 초기화
 */
export const clearAllGameData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeFromStorage(key);
  });
};

export { STORAGE_KEYS };
