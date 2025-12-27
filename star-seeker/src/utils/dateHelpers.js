/**
 * 날짜 및 시간 포맷팅 유틸리티
 */

/**
 * 날짜를 로컬 포맷으로 변환
 * @param {string|Date} date - 날짜 객체 또는 문자열
 * @returns {string} 포맷된 날짜
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

/**
 * 플레이타임(분)을 시간:분 형식으로 변환
 * @param {number} playtimeMinutes - 플레이타임(분 단위)
 * @returns {string} "Xh Ym" 형식
 */
export const formatPlaytime = (playtimeMinutes) => {
  const hours = Math.floor(playtimeMinutes / 60);
  const minutes = playtimeMinutes % 60;
  return `${hours}h ${minutes}m`;
};

/**
 * 플레이타임 상세 정보 객체 반환
 * @param {number} playtimeMinutes - 플레이타임(분 단위)
 * @returns {Object} { hours, minutes, formatted }
 */
export const getPlaytimeInfo = (playtimeMinutes) => {
  const hours = Math.floor(playtimeMinutes / 60);
  const minutes = playtimeMinutes % 60;
  return {
    hours,
    minutes,
    formatted: `${hours}h ${minutes}m`,
  };
};

/**
 * 경험치 진행률 계산 (레벨별)
 * 사용처: ExperienceSection, ProfileModal 등
 * @param {number} currentExp - 현재 경험치
 * @param {number} nextLevelExp - 다음 레벨 필요 경험치
 * @returns {number} 진행률 (0-100)
 */
export const getExpProgress = (currentExp, nextLevelExp) => {
  return Math.min(100, Math.round((currentExp / nextLevelExp) * 100));
};
