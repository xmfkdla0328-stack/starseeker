# Star Seeker 리팩토링 가이드

## 📋 개요
이 문서는 Star Seeker 게임의 리팩토링 내역과 권장 사항을 정리합니다.

## ✅ 완료된 리팩토링

### 1. 스타일 헬퍼 모듈화 (styleHelpers 분할)
**이전**: `utils/styleHelpers.js` 단일 파일 (179줄)

**이후**: 기능별로 분리
```
utils/styleHelpers/
  ├── index.js              # 통합 export
  ├── rarityStyles.js       # 레어도 관련 스타일
  ├── characterStyles.js    # 캐릭터 관련 스타일
  ├── battleStyles.js       # 전투 관련 스타일
  └── animationStyles.js    # 애니메이션 스타일
```

**효과**:
- 코드 가독성 향상
- 유지보수 용이성 증가
- 필요한 함수만 선택적 import 가능

**마이그레이션**:
```javascript
// 기존 코드는 그대로 작동 (하위 호환성)
import { getRarityClasses } from './utils/styleHelpers';

// 권장하는 새로운 방식
import { getRarityClasses } from './utils/styleHelpers/rarityStyles';
```

### 2. 환경 설정 모듈 추가
**파일**: `utils/environment.js`

**기능**:
- 개발/프로덕션 환경 자동 감지
- 환경별 로깅 헬퍼 (`devLog`, `devWarn`, `devError`)
- 환경별 설정값 관리

**사용 예시**:
```javascript
import { devLog, ENV_CONFIG } from './utils/environment';

// 개발 환경에서만 로그 출력
devLog('디버그 정보:', someData);

// 환경별 설정값 사용
const timeout = ENV_CONFIG.apiTimeout;
```

### 3. 로컬 스토리지 유틸리티 추가
**파일**: `utils/storage.js`

**기능**:
- 게임 데이터 저장/불러오기 중앙화
- 에러 처리 내장
- 일관된 키 관리

**사용 예시**:
```javascript
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from './utils/storage';

// 데이터 저장
saveToStorage(STORAGE_KEYS.INVENTORY, inventoryData);

// 데이터 불러오기
const inventory = loadFromStorage(STORAGE_KEYS.INVENTORY, []);
```

### 4. 프로덕션 환경 최적화
- console.warn 제거 (`utils/battle/skillEffects.js`)
- 불필요한 로그 출력 방지

## 📊 현재 프로젝트 구조 분석

### 파일 크기 Top 10
1. `utils/styleHelpers.js` - 179줄 ✅ 분할 완료
2. `data/characters/skillData.js` - 163줄 ✅ 이미 잘 구조화됨
3. `components/codex/LevelCapDisplay.jsx` - 132줄 ✅ 단일 컴포넌트, 적절
4. `components/CodexScreen.jsx` - 122줄 ✅ 적절한 크기
5. `data/characters/characterData.js` - 111줄 ✅ 데이터 파일, 적절
6. `hooks/useGameLogic.js` - 107줄 ✅ 이미 하위 훅으로 분리됨
7. `hooks/useBattleController.js` - 99줄 ✅ 적절한 크기

## 🎯 권장 사항 (향후 개선 가능 항목)

### 1. TypeScript 마이그레이션 (장기 목표)
**이점**:
- 타입 안정성 향상
- IDE 자동완성 개선
- 런타임 에러 사전 방지

**마이그레이션 순서**:
1. `constants/` 폴더 (간단한 타입 정의)
2. `utils/` 폴더 (순수 함수)
3. `hooks/` 폴더
4. `components/` 폴더

### 2. 상태 관리 라이브러리 도입 검토
**현재**: useState + Props drilling
**고려 사항**: 
- Zustand (가벼움, 학습 곡선 낮음) ⭐ 권장
- Redux Toolkit (복잡한 상태 로직)
- Jotai (atom 기반)

**도입 시점**: 
- 프로젝트가 더 커질 때
- 상태 관리가 복잡해질 때

### 3. 테스트 코드 확대
**현재**: 일부 유틸리티 함수에만 테스트 존재
**권장**:
- 전투 시스템 로직 테스트 추가
- 가챠 확률 테스트
- 돌파 시스템 테스트

### 4. 성능 최적화
**잠재적 개선점**:
- React.memo() 활용 (자주 리렌더링되는 컴포넌트)
- useMemo(), useCallback() 최적화
- 큰 리스트에 가상 스크롤 적용

## 🔧 코딩 컨벤션

### Import 순서
```javascript
// 1. React 관련
import React, { useState } from 'react';

// 2. 외부 라이브러리
import { Sparkles } from 'lucide-react';

// 3. 내부 모듈 (절대 경로 권장)
import { ELEMENTS } from '@/constants';
import { useGameLogic } from '@/hooks/useGameLogic';

// 4. 상대 경로 (같은 폴더)
import { CharacterList } from './codex/CharacterList';
```

### 파일명 컨벤션
- 컴포넌트: `PascalCase.jsx` (예: `CodexScreen.jsx`)
- 유틸리티/훅: `camelCase.js` (예: `useGameLogic.js`)
- 상수: `camelCase.js` (예: `gameConfig.js`)

### 주석 스타일
```javascript
/**
 * 함수 설명 (JSDoc 스타일)
 * @param {type} paramName - 매개변수 설명
 * @returns {type} 반환값 설명
 */
export const functionName = (paramName) => {
  // 구현
};
```

## 📁 디렉토리 구조 (현재)

```
src/
├── components/        # React 컴포넌트
│   ├── battle/       # 전투 관련 컴포넌트
│   ├── codex/        # 도감 관련 컴포넌트
│   ├── common/       # 공통 컴포넌트
│   └── ...
├── constants/        # 상수 정의
├── data/            # 게임 데이터
│   ├── characters/  # 캐릭터 데이터
│   ├── breakthrough/ # 돌파 시스템
│   └── items/       # 아이템 데이터
├── hooks/           # Custom React Hooks
├── utils/           # 유틸리티 함수
│   ├── battle/      # 전투 시스템 로직
│   └── styleHelpers/ # 스타일 헬퍼 ✅ 새로 추가
└── App.jsx          # 메인 앱 컴포넌트
```

## 🚀 다음 단계

1. ✅ 스타일 헬퍼 모듈화 완료
2. ✅ 환경 설정 시스템 구축 완료
3. ✅ 스토리지 유틸리티 추가 완료
4. ⏳ 실제 사용처에 적용 (점진적)
5. ⏳ 성능 최적화 검토
6. ⏳ 테스트 커버리지 확대

## 📝 참고 사항

- 기존 코드는 하위 호환성을 유지하므로 즉시 수정할 필요 없음
- 새로운 코드 작성 시 개선된 구조 사용 권장
- 점진적으로 마이그레이션하는 것이 안전함
