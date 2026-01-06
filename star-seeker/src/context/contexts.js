import { createContext } from 'react';

/**
 * 플레이어 정보 Context
 * - playerInfo: 레벨, 경험치 등
 * - playerStats: 플레이어 통계
 * - unlockedAchievements: 업적
 * - handleSelectTitle: 타이틀 선택
 * - addExp: 경험치 추가
 */
export const PlayerContext = createContext(null);

/**
 * 인벤토리/아이템/가챠 Context
 * - inventory: 캐릭터 목록
 * - items: 아이템 목록
 * - mainChar: 메인 캐릭터
 * - handleGacha: 가챠 실행
 * - party: 파티 구성
 * - increaseBondFromBattle: 전투 후 인연도 증가
 * - handleLevelUp: 레벨업 처리
 * - EXP_PER_CHIP: 경험치 칩 당 경험치
 */
export const InventoryContext = createContext(null);

/**
 * UI/화면 전환 Context
 * - screen: 현재 화면
 * - setScreen: 화면 전환
 * - toast: 토스트 메시지
 * - showToast: 토스트 표시
 */
export const UIContext = createContext(null);
