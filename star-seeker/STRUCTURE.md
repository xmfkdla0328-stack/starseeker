# Star Seeker - 코드 구조 가이드

## 📁 프로젝트 구조

### `/src/data/` - 게임 데이터
데이터는 기능별로 모듈화되어 있습니다.

#### `/data/breakthrough/` - 돌파 시스템
캐릭터 레벨 돌파 관련 모든 로직을 포함합니다.

- `breakthroughStages.js` - 돌파 단계 정의 및 레벨 계산
  - `BREAKTHROUGH_STAGES` - 각 돌파 단계의 요구 사항
  - `getMaxLevelByBreakthrough()` - 최대 레벨 계산
  - `getNextBreakthroughRequiredLevel()` - 다음 돌파 요구 레벨

- `breakthroughFragments.js` - 별의 조각 (돌파 아이템) 정의
  - `BREAKTHROUGH_ITEMS` - 아이템 ID 상수
  - `BREAKTHROUGH_ITEM_DATA` - 아이템 상세 정보
  - `getRequiredFragmentId()` - 속성별 필요 아이템 조회

- `breakthroughLogic.js` - 돌파 로직
  - `checkBreakthroughRequired()` - 돌파 가능 여부 확인
  - `performBreakthrough()` - 돌파 실행

- `index.js` - 통합 export (레거시 호환성 유지)

**사용 예시:**
```javascript
import { 
  getMaxLevelByBreakthrough,
  performBreakthrough 
} from '@/data/breakthrough';
```

#### `/data/items/` - 아이템 시스템
게임 내 모든 아이템 정의와 효과를 관리합니다.

- `itemTypes.js` - 아이템 타입 정의
- `fragmentDefinitions.js` - 별의 조각 아이템 정의 생성기
- `itemEffects.js` - 아이템 사용 효과 처리

#### `/data/characters/` - 캐릭터 데이터
캐릭터 정보가 기능별로 분리되어 있습니다.

- `characterData.js` - 기본 스탯 및 정보
- `skillData.js` - 스킬 정보 및 효과
- `profileData.js` - 프로필 및 스토리
- `bondLevels.js` - 인연도 시스템
- `index.js` - 통합 `CHAR_DB` export

### `/src/components/` - UI 컴포넌트
화면별로 구조화되어 있습니다.

#### 메인 화면 컴포넌트
- `HomeScreen.jsx` - 홈 화면
- `GachaScreen.jsx` - 가챠 화면
- `PartyScreen.jsx` - 파티 편성
- `CodexScreen.jsx` - 캐릭터 도감
- `BattleScreen.jsx` - 전투 화면
- `InventoryScreen.jsx` - 인벤토리
- `GardenScreen.jsx` - 정원 (미구현)

#### `/components/codex/` - 도감 관련
캐릭터 상세 정보 컴포넌트들

- `CharacterList.jsx` - 캐릭터 목록
- `CharacterHeader.jsx` - 캐릭터 헤더
- `CharacterInfoTab.jsx` - 전투 정보 탭
- `CharacterProfileTab.jsx` - 프로필 탭
- `LevelCapDisplay.jsx` - 레벨 캡 및 돌파 UI
- `BreakthroughDisplay.jsx` - 필살기 돌파 표시

#### `/components/battle/` - 전투 관련
- `AllyCard.jsx` - 아군 카드
- `BossDisplay.jsx` - 보스 표시
- `BattleControls.jsx` - 전투 컨트롤
- `BattleLog.jsx` - 전투 로그

### `/src/hooks/` - 커스텀 훅
게임 로직이 훅으로 분리되어 있습니다.

#### 메인 훅
- `useGameLogic.js` - 전체 게임 상태 관리 (최상위)

#### 전투 시스템
- `useBattleSystem.js` - 전투 시스템 통합
- `useBattleState.js` - 전투 상태 관리
- `useBattleController.js` - 턴 진행 로직
- `useBattleAutoMode.js` - 자동 전투 모드

#### 게임 시스템
- `useGacha.js` - 가챠 로직
- `useSynergy.js` - 시너지 계산
- `useLevelSync.js` - 레벨 동기화
- `useBondSystem.js` - 인연도 시스템
- `usePartyAssignment.js` - 파티 자동 배치

### `/src/utils/` - 유틸리티 함수

#### `/utils/battle/` - 전투 유틸리티
- `turnLogic.js` - 턴 처리 로직
- `allyLogic.js` - 아군 행동 로직
- `bossLogic.js` - 보스 행동 로직
- `skillLogic.js` - 스킬 효과 처리
- `buffLogic.js` - 버프/디버프 관리
- `gaugeLogic.js` - 행동 게이지 계산

#### 일반 유틸리티
- `styleHelpers.js` - 스타일 헬퍼 함수
- `cardHelpers.js` - 카드 관련 헬퍼
- `elementHelpers.js` - 속성 관련 헬퍼
- `roleHelpers.js` - 역할 관련 헬퍼
- `dateHelpers.js` - 날짜 헬퍼

## 🔧 개발 가이드

### 새로운 기능 추가 시

1. **데이터 추가**: `/src/data/` 해당 폴더에 데이터 정의
2. **로직 추가**: `/src/hooks/` 또는 `/src/utils/`에 로직 구현
3. **UI 추가**: `/src/components/` 해당 화면 폴더에 컴포넌트 추가

### 코딩 컨벤션

- 파일명: `camelCase.js` (컴포넌트는 `PascalCase.jsx`)
- 컴포넌트: 함수형 컴포넌트 사용
- 주석: JSDoc 스타일로 함수 설명 추가
- Import: 절대 경로보다 상대 경로 선호

### 리팩토링 원칙

1. **단일 책임**: 각 파일/함수는 하나의 책임만
2. **모듈화**: 관련된 기능은 폴더로 그룹화
3. **재사용성**: 반복되는 로직은 유틸리티로 분리
4. **호환성**: 레거시 import는 re-export로 유지

## 📝 최근 리팩토링 내역

### 2024-12-29: 돌파 시스템 및 아이템 모듈화
- `breakthroughItems.js` → `/data/breakthrough/` 폴더로 분할
- `itemDefinitions.js` → `/data/items/` 폴더로 분할
- 별의 조각 정의를 헬퍼 함수로 자동 생성
- `styleHelpers.js`에 누락된 함수들 추가
- 레거시 호환성 유지를 위한 re-export 구조 적용
