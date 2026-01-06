# Physics Engine Documentation
## Universal Physics - 우주 원리에 따른 속성 반응 체계

---

## 개요

**Physics Engine**은 두 속성(Element)이 만났을 때 발생하는 현상(Phenomenon)을 결정합니다.

이 시스템의 핵심 특징:
- ✅ **Character Class와 무관**: 어떤 캐릭터든 같은 속성 조합이면 동일한 결과
- ✅ **Pure Function**: React State나 Hooks 의존 없음
- ✅ **GDD 기반**: 게임 설계서의 모든 규칙을 엄격하게 구현
- ✅ **확장성**: 새로운 속성/현상 추가 가능

---

## Architecture

```
physicsEngine.js
├── Elements (속성 Enum)
│   ├── ENTROPY (엔트로피)
│   ├── STASIS (정체)
│   ├── GRAVITY (중력)
│   ├── RESONANCE (공명)
│   ├── AXIOM (공리)
│   └── PARADOX (패러독스)
│
├── Phenomena (현상 Enum)
│   ├── Type A: FUSION, THERMAL_SHOCK, PLASMA, ABSOLUTE_ZERO, OVERLOAD, BLACK_HOLE
│   ├── Override: PARADOX_TRIGGER, AXIOM_TRIGGER
│   └── NONE (반응 없음)
│
├── CheckReaction() [Main Function]
│   ├── 1. 입력 검증
│   ├── 2. 같은 속성 체크
│   ├── 3. PARADOX Override
│   ├── 4. AXIOM Override
│   └── 5. Type A Reactions
│
└── Utility Functions
    ├── isReactionTriggered()
    ├── getPhenomenonDescription()
    ├── isChaosAdvantage()
    └── isSilenceAdvantage()
```

---

## Type A: 기본 반응 테이블

6가지 표준 반응이 정의됩니다. 속성 조합 순서는 무관합니다.

| 공격자 | 타겟 | 현상 | 설명 | CHAOS | SILENCE |
|--------|------|------|------|-------|---------|
| ENTROPY | GRAVITY | **FUSION** | 핵융합 - 강렬한 에너지 방출 | ✅ | ❌ |
| ENTROPY | STASIS | **THERMAL_SHOCK** | 열충격 - 극단적 온도 변화 | ✅ | ❌ |
| ENTROPY | RESONANCE | **PLASMA** | 플라즈마 - 고에너지 이온화 상태 | ✅ | ❌ |
| STASIS | GRAVITY | **ABSOLUTE_ZERO** | 절대영도 - 모든 운동 정지 | ❌ | ✅ |
| STASIS | RESONANCE | **OVERLOAD** | 과부하 - 에너지 폭주 | ❌ | ✅ |
| GRAVITY | RESONANCE | **BLACK_HOLE** | 블랙홀 - 무한 인력 집중 | ❌ | ✅ |

### 미션별 유리/불리

- **CHAOS 미션**: ENTROPY 기반 현상(FUSION, THERMAL_SHOCK, PLASMA)이 유리
- **SILENCE 미션**: STASIS/GRAVITY 기반 현상(ABSOLUTE_ZERO, OVERLOAD, BLACK_HOLE)이 유리

---

## Override Rules: 특수 속성

### 1. PARADOX (패러독스) - 모든 규칙 초월

PARADOX가 **어느 한쪽에든 포함**되면 모든 다른 규칙을 무시합니다.

```javascript
CheckReaction(PARADOX, ENTROPY)      // → PARADOX_TRIGGER
CheckReaction(GRAVITY, PARADOX)      // → PARADOX_TRIGGER
CheckReaction(PARADOX, PARADOX)      // → PARADOX_TRIGGER
```

**결과**: `PARADOX_TRIGGER` (기본값: +100점 미션 게이지)

**용도**: 제한된 조건에서만 획득 가능한 초강력 속성

### 2. AXIOM (공리) - 질서 유지

AXIOM이 **어느 한쪽에든 포함**되면 모든 반응을 질서화합니다.

```javascript
CheckReaction(AXIOM, ENTROPY)        // → AXIOM_TRIGGER
CheckReaction(STASIS, AXIOM)         // → AXIOM_TRIGGER
CheckReaction(AXIOM, AXIOM)          // → AXIOM_TRIGGER
```

**결과**: `AXIOM_TRIGGER` (기본값: +30점 미션 게이지)

**용도**: 안정적이고 신뢰할 수 있는 속성 효과

### 우선순위

규칙 체크 순서:
1. **입력 검증** (null/undefined 제외)
2. **같은 속성** (NONE 반환)
3. **PARADOX** (PARADOX_TRIGGER)
4. **AXIOM** (AXIOM_TRIGGER)
5. **Type A Reactions** (표준 테이블)

⚠️ **주의**: 만약 PARADOX와 AXIOM 둘 다 포함되면?
- 현재 구현: **PARADOX가 먼저 체크되므로 PARADOX_TRIGGER 반환**
- 게임 밸런스 조정 필요시 우선순위 변경 가능

---

## 사용 방법

### 기본 사용

```javascript
import { CheckReaction, Elements } from './utils/battle/physicsEngine';

const phenomenon = CheckReaction(Elements.ENTROPY, Elements.GRAVITY);
console.log(phenomenon); // 'FUSION'
```

### React 컴포넌트에서 사용

```javascript
import { usePlayer } from '../context/useGameContext';
import { CheckReaction, Elements, isReactionTriggered } from '../utils/battle/physicsEngine';

export const BattleScreen = () => {
  const { addExp } = usePlayer();

  const handleAttackReaction = (attackerElement, targetElement) => {
    const phenomenon = CheckReaction(attackerElement, targetElement);
    
    if (isReactionTriggered(phenomenon)) {
      console.log(`반응 발생: ${phenomenon}`);
      addExp(100);
    }
  };

  return <div>...</div>;
};
```

### 유틸리티 함수

```javascript
import {
  isChaosAdvantage,
  isSilenceAdvantage,
  getPhenomenonDescription,
} from './utils/battle/physicsEngine';

const phenomenon = CheckReaction(Elements.ENTROPY, Elements.GRAVITY);

// 미션 유리/불리 판정
if (isChaosAdvantage(phenomenon)) {
  console.log('CHAOS 미션에 유리한 현상!');
}

// 설명 출력
console.log(getPhenomenonDescription(phenomenon));
// 출력: "핵융합 - 강렬한 에너지 방출"
```

---

## 테스트

Jest를 사용한 단위 테스트:

```bash
npm test -- physicsEngine.test.js
```

테스트 커버리지:
- ✅ Type A 반응 12가지 (6개 현상 × 2 순서)
- ✅ PARADOX Override
- ✅ AXIOM Override
- ✅ 같은 속성
- ✅ 입력 검증
- ✅ 유틸리티 함수
- ✅ 우선순위 검증

---

## 데이터 구조

### Elements (속성)

```javascript
{
  ENTROPY: 'ENTROPY',       // 무질서, 혼란, 변화
  STASIS: 'STASIS',         // 정지, 고정, 안정
  GRAVITY: 'GRAVITY',       // 인력, 수렴, 압축
  RESONANCE: 'RESONANCE',   // 공진, 증폭, 조화
  AXIOM: 'AXIOM',           // 기본 질서, 우주 법칙
  PARADOX: 'PARADOX',       // 모순, 규칙 무시
}
```

### Phenomena (현상)

```javascript
{
  // Type A
  FUSION: 'FUSION',
  THERMAL_SHOCK: 'THERMAL_SHOCK',
  PLASMA: 'PLASMA',
  ABSOLUTE_ZERO: 'ABSOLUTE_ZERO',
  OVERLOAD: 'OVERLOAD',
  BLACK_HOLE: 'BLACK_HOLE',

  // Override
  PARADOX_TRIGGER: 'PARADOX_TRIGGER',
  AXIOM_TRIGGER: 'AXIOM_TRIGGER',

  // None
  NONE: null,
}
```

---

## 성능 고려사항

- **CheckReaction**: O(1) - 상수 시간 (테이블 조회)
- **메모리**: 고정 크기 (테이블 크기 고정)
- **GC 영향**: 없음 (새 객체 생성 안 함)

⚠️ **최적화 팁**: 여러 번 같은 조합을 검사한다면 결과를 캐싱하세요.

---

## 향후 확장

### 새로운 속성 추가

```javascript
// 1. Elements에 추가
export const Elements = {
  // ...기존...
  VOID: 'VOID',
};

// 2. Phenomena에 추가
export const Phenomena = {
  // ...기존...
  TEMPORAL_ANOMALY: 'TEMPORAL_ANOMALY',
};

// 3. TYPE_A_REACTIONS에 추가
const TYPE_A_REACTIONS = {
  // ...기존...
  [JSON.stringify([Elements.VOID, Elements.RESONANCE])]: Phenomena.TEMPORAL_ANOMALY,
  [JSON.stringify([Elements.RESONANCE, Elements.VOID])]: Phenomena.TEMPORAL_ANOMALY,
};
```

### 새로운 Override 규칙

```javascript
const checkCustomOverride = (element1, element2) => {
  if (element1 === 'CUSTOM_ELEMENT' || element2 === 'CUSTOM_ELEMENT') {
    return Phenomena.CUSTOM_PHENOMENON;
  }
  return null;
};

// CheckReaction에 추가
// ...
const customResult = checkCustomOverride(attackerElement, targetElement);
if (customResult) return customResult;
// ...
```

---

## FAQ

**Q: 왜 PARADOX와 AXIOM이 필요한가?**  
A: 게임 밸런스를 위해 특수한 상황에서 특수한 효과를 낼 수 있게 설계됨

**Q: 순서가 정말 중요하지 않은가?**  
A: CheckReaction의 설계상 완전히 순서 무관 (내부적으로 양쪽 다 체크)

**Q: React State 없는 이유는?**  
A: 순수 함수는 테스트, 유지보수, 재사용이 훨씬 쉬움

**Q: 세 가지 이상의 속성이 섞이면?**  
A: 현재 구현은 2개 속성만 지원. 필요시 CheckReaction3() 등으로 확장 가능

---

## 참고 파일

- 구현: `src/utils/battle/physicsEngine.js`
- 래퍼: `src/utils/battle/elementalLogic.js`
- 테스트: `src/utils/battle/physicsEngine.test.js`
- 상수: `src/constants/reactions.js` (레거시, 점진적으로 Physics Engine으로 마이그레이션)
