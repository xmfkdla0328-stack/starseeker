# Physics Engine 마이그레이션 가이드

## 개요

`physicsEngine.js`가 도입됨에 따라, 기존 코드의 `elementalLogic.js`는 래퍼 역할을 합니다.

**현재 상태**:
- ✅ **완전 역호환성**: 기존 `checkReaction()` 호출은 그대로 작동
- ✅ **권장 이전**: 새로운 코드는 `CheckReaction()` (대문자)를 직접 사용
- ⚠️ **향후 폐기**: `elementalLogic.js`는 점진적으로 제거될 예정

---

## Before → After

### 1. skillLogic.js

```javascript
// ❌ Before: elementalLogic 래퍼 사용
import { checkReaction } from './elementalLogic';

const reactionType = checkReaction(attackerElement, targetElement);

// ✅ After: Physics Engine 직접 사용
import { CheckReaction, Elements } from './physicsEngine';

const reactionType = CheckReaction(attackerElement, targetElement);
```

### 2. gaugeLogic.js

```javascript
// ❌ Before: 소문자 함수 + 반응 확인 로직
import { checkReaction } from './elementalLogic';

const reaction = checkReaction(attackerElement, targetElement);
if (reaction) {
  // 반응 발생
  gaugeIncrease += GAUGE_CONFIG.GAIN_PER_REACTION;
}

// ✅ After: isReactionTriggered 유틸리티 사용
import { CheckReaction, isReactionTriggered } from './physicsEngine';

const reaction = CheckReaction(attackerElement, targetElement);
if (isReactionTriggered(reaction)) {
  gaugeIncrease += GAUGE_CONFIG.GAIN_PER_REACTION;
}
```

---

## 마이그레이션 체크리스트

### Phase 1: 정보 수집
- [ ] `grep checkReaction` 결과 확인
- [ ] 영향받는 파일 목록 작성
  - [ ] skillLogic.js
  - [ ] gaugeLogic.js
  - [ ] 다른 파일들?

### Phase 2: 점진적 마이그레이션
- [ ] skillLogic.js 업데이트 (CheckReaction + Elements import)
- [ ] gaugeLogic.js 업데이트 (isReactionTriggered 사용)
- [ ] 테스트 실행 (`npm test`)

### Phase 3: 검증
- [ ] 모든 단위 테스트 통과
- [ ] 게임 플레이 테스트
  - [ ] 반응 발생 확인
  - [ ] 게이지 증가 확인
  - [ ] 특수 속성(PARADOX, AXIOM) 테스트

### Phase 4: 폐기
- [ ] elementalLogic.js 호출 전체 제거
- [ ] elementalLogic.js 파일 삭제 (또는 보관)

---

## 영향받는 파일 상세 분석

### skillLogic.js
```javascript
// Line 6
- import { checkReaction } from './elementalLogic';
+ import { CheckReaction, Elements } from './physicsEngine';

// Line 56
- const reactionType = elementalPotency > 0 ? checkReaction(attackerElement, targetElement) : null;
+ const reactionType = elementalPotency > 0 ? CheckReaction(attackerElement, targetElement) : null;
```

**변경 영향**: 로직 변경 없음, import만 변경

### gaugeLogic.js
```javascript
// Line 8
- import { checkReaction } from './elementalLogic';
+ import { CheckReaction, isReactionTriggered } from './physicsEngine';

// Line 55
- const reaction = checkReaction(attackerElement, targetElement);
+ const reaction = CheckReaction(attackerElement, targetElement);

// Line 56-57 (if 체크 부분)
- if (reaction) {
+ if (isReactionTriggered(reaction)) {
```

**변경 영향**: 로직 변경 없음, 명확성 향상

---

## 새로운 API 소개

### 기본 함수

```javascript
import {
  CheckReaction,      // 메인 함수
  Elements,           // 속성 Enum
  Phenomena,          // 현상 Enum
} from './physicsEngine';

const result = CheckReaction(Elements.ENTROPY, Elements.GRAVITY);
console.log(result); // Phenomena.FUSION
```

### 유틸리티

```javascript
import {
  isReactionTriggered,
  getPhenomenonDescription,
  isChaosAdvantage,
  isSilenceAdvantage,
} from './physicsEngine';

// 반응 여부 확인
if (isReactionTriggered(phenomenon)) {
  console.log('반응 발생!');
}

// 설명 출력
console.log(getPhenomenonDescription(phenomenon));

// 미션별 유리 여부
if (isChaosAdvantage(phenomenon)) {
  console.log('CHAOS 미션에 유리');
}
```

---

## 트러블슈팅

### Q: 기존 코드가 잘 작동하는데 마이그레이션이 필요한가?

**A**: 네, 다음 이유로:
1. **코드 명확성**: `CheckReaction`은 Enum을 사용하므로 타입 안전성↑
2. **성능**: 직접 호출이 약간 더 빠름
3. **유지보수**: Physics Engine 발전에 더 빨리 대응 가능

### Q: elementalLogic.js는 언제 삭제되는가?

**A**: 모든 파일이 마이그레이션된 후 제거 예정
- 현재: 계속 유지 (역호환)
- 1개월 후: Deprecated 표시
- 2개월 후: 삭제 가능

### Q: 테스트도 업데이트해야 하는가?

**A**: 게임 로직 테스트는 그대로 유지 가능
```javascript
// 기존 테스트
const result = checkReaction(ENTROPY, GRAVITY);
expect(result).toBe(FUSION);

// 새 테스트 (권장)
const result = CheckReaction(Elements.ENTROPY, Elements.GRAVITY);
expect(result).toBe(Phenomena.FUSION);
```

---

## 동일성 검증

다음 코드로 두 방식이 동일한 결과를 생성하는지 검증:

```javascript
import { checkReaction } from './elementalLogic';
import { CheckReaction, Elements } from './physicsEngine';

const legacy = checkReaction('ENTROPY', 'GRAVITY');
const modern = CheckReaction(Elements.ENTROPY, Elements.GRAVITY);

console.log(legacy === modern); // true
```

---

## 스케줄 제안

### Week 1-2: 준비
- Physics Engine 코드 리뷰
- 마이그레이션 계획 수립
- 테스트 케이스 검증

### Week 3: 실행
- skillLogic.js 업데이트 & 테스트
- gaugeLogic.js 업데이트 & 테스트
- 통합 테스트 실행

### Week 4: 검증
- 게임 플레이 테스트
- QA 체크
- 문서 최종 업데이트

### Week 5: 폐기
- elementalLogic.js에서 checkReaction 제거 또는 파일 삭제
- 레거시 상수(reactions.js) 정리 검토

---

## 참고 자료

- **Physics Engine 구현**: `src/utils/battle/physicsEngine.js`
- **Physics Engine 문서**: `PHYSICS_ENGINE_GDD.md`
- **Physics Engine 테스트**: `src/utils/battle/physicsEngine.test.js`
- **현재 래퍼**: `src/utils/battle/elementalLogic.js`
