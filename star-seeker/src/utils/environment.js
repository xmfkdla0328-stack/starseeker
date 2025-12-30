/**
 * 환경 설정 모듈
 * 개발/프로덕션 환경별로 다른 설정을 제공
 */

// 현재 환경 감지
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * 환경별 로깅 헬퍼
 * 개발 환경에서만 로그 출력
 */
export const devLog = (...args) => {
  if (isDevelopment) {
    console.log('[DEV]', ...args);
  }
};

export const devWarn = (...args) => {
  if (isDevelopment) {
    console.warn('[DEV]', ...args);
  }
};

export const devError = (...args) => {
  if (isDevelopment) {
    console.error('[DEV]', ...args);
  }
};

/**
 * 환경별 설정값
 */
export const ENV_CONFIG = {
  // API 관련 설정 (향후 확장 가능)
  apiTimeout: isDevelopment ? 10000 : 5000,
  
  // 디버그 모드
  enableDebugMode: isDevelopment,
  
  // 성능 모니터링
  enablePerformanceTracking: isProduction,
  
  // 로컬 스토리지 키 접두사
  storagePrefix: 'starseeker_',
};
