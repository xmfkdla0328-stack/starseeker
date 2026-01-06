# 코드 리팩토링 완료 보고서

## 📋 작업 개요
프로젝트의 확장성과 유지보수성을 높이기 위해 코드 구조를 개선했습니다.
**핵심 원칙**: 데이터, 로직, UI의 명확한 분리

---

## ✅ 완료된 작업

### 1. 상수 및 데이터 관리 중앙화

#### 📁 `/src/constants/battleConstants.js` (신규 생성)
**목적**: 전투 시스템의 모든 하드코딩된 값을 한 곳에서 관리

**포함 내용**:
- `SP_CONFIG`: SP 시스템 관련 수치 (최대값, 획득량, 비용)
- `COOLDOWN_CONFIG`: 쿨타임 시스템 설정
- `DAMAGE_CONFIG`: 데미지 계산 계수 (크리티컬, 배율 등)
- `GAUGE_CONFIG`: 미션 게이지 관련 수치
- `BATTLE_RESULT`: 전투 결과 타입 (VICTORY, DEFEAT, NONE)
- `TURN_TYPE`: 턴 타입 (party, enemy)
- `SKILL_TYPE`: 스킬 타입 (normal, skill, ultimate)
- `ELEMENT_NAMES`: 속성 한글 이름 매핑
- `ELEMENT_COLORS`: 속성 색상 코드
- `BATTLE_MESSAGES`: 전투 UI 텍스트 메시지
- `PARTY_CONFIG`: 파티 구성 설정
- `ENEMY_AI_CONFIG`: 적 AI 설정

**사용 예시**:
```javascript
import { SP_CONFIG, BATTLE_RESULT } from '../constants/battleConstants';

// 하드코딩 대신 상수 사용
const maxSp = SP_CONFIG.MAX_SP; // 100
const isVictory = result === BATTLE_RESULT.VICTORY;
```

---

#### 📁 `/src/data/tacticsData.js` (신규 생성)
**목적**: 전술 가이드 데이터를 컴포넌트에서 분리

**포함 내용**:
- `SYNERGY_RECIPES`: 속성 조합 공식 6개 (핵융합, 열충격, 플라즈마 등)
- `CLASS_ROLES`: 직업 분류 6개 (패스파인더, 엑시큐터, 키퍼 등)
- `findSynergyRecipe()`: 속성 조합 검색 헬퍼 함수
- `findClassRole()`: 직업 정보 검색 헬퍼 함수

**변경 사항**:
- `TacticalGuideModal.jsx`에서 하드코딩된 데이터 제거
- 데이터를 import하여 사용하도록 수정

**Before**:
```javascript
const synergyRecipes = [ /* 60줄의 하드코딩된 데이터 */ ];
const classRoles = [ /* 50줄의 하드코딩된 데이터 */ ];
```

**After**:
```javascript
import { SYNERGY_RECIPES, CLASS_ROLES } from '../../data/tacticsData';

// 컴포넌트는 단순히 데이터를 렌더링하는 역할만 수행
{SYNERGY_RECIPES.map(recipe => ...)}
```

---

### 2. 전투 로직 분리 (순수 함수화)

#### 📁 `/src/utils/battleLogic.js` (신규 생성)
**목적**: React/Phaser 의존성 없이 순수 계산만 수행하는 함수 모음

**포함 함수들**:

##### SP 시스템
- `calculateSpGain(skillType)`: 스킬 타입별 SP 획득량 계산
- `updateCharacterSp(currentSp, gain, maxSp)`: SP 업데이트 및 상한 제한
- `canUseUltimate(currentSp, cost)`: 필살기 사용 가능 여부

##### 쿨타임 시스템
- `reduceCooldown(currentCooldown, reduction)`: 턴당 쿨타임 감소
- `canUseSkill(currentCooldown)`: 스킬 사용 가능 여부
- `resetCooldown(maxCooldown)`: 스킬 사용 후 쿨타임 초기화

##### 데미지 계산
- `calculateBaseDamage(baseAtk, skillType, isCritical)`: 기본 데미지 계산
- `rollCritical(critRate)`: 크리티컬 발생 여부 랜덤 판정

##### 미션 게이지
- `calculateGaugeGain(hasReaction)`: 게이지 증가량 계산
- `updateGauge(currentGauge, gain, maxGauge)`: 게이지 업데이트
- `isGaugeVictory(currentGauge, threshold)`: 게이지 승리 조건 확인

##### 턴 순서 관리
- `generateTurnQueue(party, enemy)`: 속도 기반 턴 큐 생성
- `getNextTurn(turnQueue)`: 다음 턴 가져오기
- `advanceTurn(turnQueue)`: 턴 진행 (큐 회전)

##### HP 관리
- `updateHp(currentHp, change, maxHp)`: HP 업데이트
- `isAlive(currentHp)`: 생존 여부 확인
- `isPartyAlive(party)`: 파티 전멸 여부 확인
- `countAliveParty(party)`: 생존 캐릭터 수 계산

**장점**:
- ✅ 테스트 가능 (순수 함수)
- ✅ 재사용 가능 (어디서든 import)
- ✅ 로직과 UI 분리
- ✅ 버그 추적 용이

**사용 예시**:
```javascript
import { calculateSpGain, updateCharacterSp } from '../utils/battleLogic';

// Before: 하드코딩된 로직
const newSp = Math.min(character.sp + 20, 100);

// After: 명확한 함수 사용
const gain = calculateSpGain('normal'); // 20
const newSp = updateCharacterSp(character.sp, gain, character.maxSp);
```

---

### 3. UI 컴포넌트 분할

#### 📁 `/src/components/battle/fragments/` (신규 폴더)

##### `BattleEndOverlay.jsx` (신규)
**목적**: 전투 종료 시 표시되는 승리/패배 모달

**Before**: BattleScreen.jsx 내부에 50줄의 JSX
**After**: 독립된 컴포넌트로 분리

**Props**:
- `result`: 전투 결과 ('VICTORY' | 'DEFEAT' | 'NONE')
- `onRestart`: 재시작 버튼 핸들러
- `onBack`: 돌아가기 버튼 핸들러

**특징**:
- `BATTLE_RESULT`, `BATTLE_MESSAGES` 상수 사용
- 재사용 가능한 독립 컴포넌트
- 명확한 책임: 결과 표시만 담당

---

##### `TurnOrderBar.jsx` (신규)
**목적**: 좌측 상단에 표시되는 현재 턴 정보

**Before**: BattleScreen.jsx 내부에 직접 작성
**After**: 독립된 컴포넌트로 분리

**Props**:
- `activeTurn`: 현재 턴 객체 ({ type, name, ... })

**특징**:
- 단순하고 집중된 책임
- 조건부 렌더링 내장
- 파티/적 턴 구분 시각화

---

### 4. 커스텀 훅 도입

#### 📁 `/src/hooks/useTurnSystem.js` (신규)
**목적**: 턴 시스템의 모든 로직을 캡슐화

**반환값**:
```javascript
{
  turnQueue,              // 현재 턴 큐 배열
  currentTurn,            // 현재 턴 객체
  lastResolvedTurnId,     // 마지막 완료된 턴 ID
  proceedToNextTurn,      // 다음 턴으로 진행
  decrementCooldown,      // 쿨타임 감소 처리
}
```

**장점**:
- BattleScreen에서 100줄 이상의 로직 제거
- 턴 관련 로직이 한 곳에 모임
- 재사용 가능 (다른 전투 화면에서도 사용 가능)

---

#### 📁 `/src/hooks/useSkillSystem.js` (신규)
**목적**: 스킬 시스템(SP, 쿨타임) 로직 관리

**반환값**:
```javascript
{
  chargeSpAfterSkill,        // 스킬 사용 후 SP 충전
  startSkillCooldown,        // 스킬 쿨타임 시작
  consumeSpForUltimate,      // 필살기 SP 소모
  checkSkillAvailability,    // 스킬 사용 가능 여부 확인
}
```

**특징**:
- `battleLogic.js`의 순수 함수를 활용
- React 상태 관리와 로직 분리
- 명확한 책임 분리

---

## 📊 개선 효과

### Before (리팩토링 전)
```
BattleScreen.jsx: 600+ 줄
  ├─ 하드코딩된 상수들
  ├─ 복잡한 계산 로직
  ├─ 턴 시스템 로직
  ├─ 스킬 시스템 로직
  └─ UI 렌더링

TacticalGuideModal.jsx: 269 줄
  └─ 110줄의 하드코딩된 데이터
```

### After (리팩토링 후)
```
📁 constants/
  └─ battleConstants.js (전투 상수)

📁 data/
  └─ tacticsData.js (전술 데이터)

📁 utils/
  └─ battleLogic.js (순수 계산 함수)

📁 components/battle/fragments/
  ├─ BattleEndOverlay.jsx (승리/패배 모달)
  └─ TurnOrderBar.jsx (턴 표시 바)

📁 hooks/
  ├─ useTurnSystem.js (턴 시스템 훅)
  └─ useSkillSystem.js (스킬 시스템 훅)

BattleScreen.jsx: ~400 줄 (뷰 역할에 집중)
TacticalGuideModal.jsx: ~150 줄 (데이터 제거)
```

---

## 🎯 달성한 목표

### 1. 파일 크기 감소
- ✅ BattleScreen.jsx: 600+ → ~400 줄 (33% 감소)
- ✅ TacticalGuideModal.jsx: 269 → ~150 줄 (44% 감소)

### 2. 명확한 책임 분리
- ✅ **데이터**: `constants/`, `data/` 폴더
- ✅ **로직**: `utils/battleLogic.js`, `hooks/`
- ✅ **화면**: `components/` (뷰 역할만)

### 3. 재사용성 향상
- ✅ 순수 함수들은 어디서든 import 가능
- ✅ 커스텀 훅은 다른 전투 화면에서 재사용 가능
- ✅ 컴포넌트는 독립적으로 사용 가능

### 4. 유지보수성 향상
- ✅ 수치 변경 시 한 곳만 수정 (battleConstants.js)
- ✅ 로직 버그 수정 시 battleLogic.js만 수정
- ✅ UI 수정 시 컴포넌트만 수정

### 5. 테스트 용이성
- ✅ 순수 함수는 단위 테스트 가능
- ✅ 커스텀 훅은 React Testing Library로 테스트 가능
- ✅ UI 컴포넌트는 Storybook 등으로 독립 테스트 가능

---

## 📝 사용 가이드

### 상수 추가 시
```javascript
// src/constants/battleConstants.js에 추가
export const NEW_CONFIG = {
  SOME_VALUE: 100,
};
```

### 새로운 전투 로직 추가 시
```javascript
// src/utils/battleLogic.js에 순수 함수로 추가
export const calculateNewMechanic = (input) => {
  // 계산 로직
  return result;
};
```

### UI 컴포넌트 추가 시
```javascript
// src/components/battle/fragments/에 추가
export const NewComponent = ({ props }) => {
  return <div>...</div>;
};
```

---

## 🔄 마이그레이션 가이드

기존 코드를 새 구조로 전환하는 방법:

### 1. 하드코딩된 값 찾기
```javascript
// Bad
const maxSp = 100;
const spGain = 20;

// Good
import { SP_CONFIG } from '../constants/battleConstants';
const maxSp = SP_CONFIG.MAX_SP;
const spGain = SP_CONFIG.GAIN_PER_NORMAL_ATTACK;
```

### 2. 계산 로직 추출
```javascript
// Bad (컴포넌트 내부)
const newSp = Math.min(character.sp + 20, 100);

// Good (순수 함수 사용)
import { calculateSpGain, updateCharacterSp } from '../utils/battleLogic';
const gain = calculateSpGain('normal');
const newSp = updateCharacterSp(character.sp, gain, character.maxSp);
```

### 3. 복잡한 로직을 커스텀 훅으로
```javascript
// Bad (useEffect 남발)
useEffect(() => { /* 턴 로직 */ }, [turnQueue]);
useEffect(() => { /* 쿨타임 로직 */ }, [cooldown]);
useEffect(() => { /* SP 로직 */ }, [sp]);

// Good (커스텀 훅)
const { turnQueue, proceedToNextTurn } = useTurnSystem(party, enemy);
const { chargeSpAfterSkill } = useSkillSystem(partyState, setPartyState);
```

---

## ✨ 다음 단계 권장사항

1. **테스트 코드 작성**
   - `battleLogic.js`의 순수 함수들에 대한 단위 테스트
   - Jest로 각 함수의 예외 케이스 검증

2. **타입스크립트 도입 고려**
   - 현재 구조는 TS로 전환하기 좋은 상태
   - 타입 안정성 확보

3. **추가 컴포넌트 분할**
   - `ControlDeck.jsx` 내부 스킬 버튼 로직 분리
   - `ObservationScreen.jsx` 등 다른 큰 컴포넌트도 동일하게 리팩토링

4. **상태 관리 라이브러리 검토**
   - 전투 상태가 더 복잡해지면 Zustand/Redux 고려
   - 현재 구조는 전역 상태 관리로 쉽게 전환 가능

---

## 🎉 결론

이번 리팩토링으로 코드베이스의 **확장성**, **유지보수성**, **가독성**이 크게 향상되었습니다.
새로운 기능 추가나 기존 기능 수정 시 훨씬 수월하게 작업할 수 있습니다.

**핵심 원칙**: "데이터, 로직, UI를 분리하라" ✅
