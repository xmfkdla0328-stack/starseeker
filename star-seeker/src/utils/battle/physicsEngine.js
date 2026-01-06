/**
 * Physics Engine - 우주 원리에 따른 속성 반응 체계
 * 
 * 두 속성(Element)이 만났을 때 발생하는 현상(Phenomenon)을 계산합니다.
 * 이는 Character Class와 무관하게 항상 동일한 결과를 생성합니다.
 * 
 * GDD Reference: Universal Physics
 * - Type A Reactions: 특정 속성 쌍이 특정 현상을 생성
 * - Type B Reactions: 역 조합도 동일한 결과
 * - Override Rules: PARADOX(규칙 무시), AXIOM(질서 유지)
 */

// ============================================
// Element Enum (속성 목록)
// ============================================
export const Elements = {
  ENTROPY: 'ENTROPY',       // 엔트로피 (무질서)
  STASIS: 'STASIS',         // 정체 (정지)
  GRAVITY: 'GRAVITY',       // 중력 (인력)
  RESONANCE: 'RESONANCE',   // 공명 (공진)
  AXIOM: 'AXIOM',           // 공리 (기본 질서)
  PARADOX: 'PARADOX',       // 패러독스 (모든 규칙 무시)
};

// ============================================
// Phenomenon Enum (현상 결과)
// ============================================
export const Phenomena = {
  // Type A: 표준 반응
  FUSION: 'FUSION',                    // 핵융합 (ENTROPY + GRAVITY)
  THERMAL_SHOCK: 'THERMAL_SHOCK',      // 열충격 (ENTROPY + STASIS)
  PLASMA: 'PLASMA',                    // 플라즈마 (ENTROPY + RESONANCE)
  ABSOLUTE_ZERO: 'ABSOLUTE_ZERO',      // 절대영도 (STASIS + GRAVITY)
  OVERLOAD: 'OVERLOAD',                // 과부하 (STASIS + RESONANCE)
  BLACK_HOLE: 'BLACK_HOLE',            // 블랙홀 (GRAVITY + RESONANCE)

  // Override 반응
  PARADOX_TRIGGER: 'PARADOX_TRIGGER',  // 패러독스 발동 (모든 규칙 초월)
  AXIOM_TRIGGER: 'AXIOM_TRIGGER',      // 공리 안정화 (질서 유지)

  // 반응 없음
  NONE: null,
};

// ============================================
// Type A: 기본 반응 테이블
// 순서 무관 (양방향 동일)
// ============================================
const TYPE_A_REACTIONS = {
  // ENTROPY 조합
  [JSON.stringify([Elements.ENTROPY, Elements.GRAVITY])]: Phenomena.FUSION,
  [JSON.stringify([Elements.GRAVITY, Elements.ENTROPY])]: Phenomena.FUSION,

  [JSON.stringify([Elements.ENTROPY, Elements.STASIS])]: Phenomena.THERMAL_SHOCK,
  [JSON.stringify([Elements.STASIS, Elements.ENTROPY])]: Phenomena.THERMAL_SHOCK,

  [JSON.stringify([Elements.ENTROPY, Elements.RESONANCE])]: Phenomena.PLASMA,
  [JSON.stringify([Elements.RESONANCE, Elements.ENTROPY])]: Phenomena.PLASMA,

  // STASIS 조합
  [JSON.stringify([Elements.STASIS, Elements.GRAVITY])]: Phenomena.ABSOLUTE_ZERO,
  [JSON.stringify([Elements.GRAVITY, Elements.STASIS])]: Phenomena.ABSOLUTE_ZERO,

  [JSON.stringify([Elements.STASIS, Elements.RESONANCE])]: Phenomena.OVERLOAD,
  [JSON.stringify([Elements.RESONANCE, Elements.STASIS])]: Phenomena.OVERLOAD,

  // GRAVITY-RESONANCE 조합
  [JSON.stringify([Elements.GRAVITY, Elements.RESONANCE])]: Phenomena.BLACK_HOLE,
  [JSON.stringify([Elements.RESONANCE, Elements.GRAVITY])]: Phenomena.BLACK_HOLE,
};

// ============================================
// Override Rules (규칙 무시 & 질서 유지)
// ============================================

/**
 * PARADOX Override 규칙
 * PARADOX가 포함되면 모든 다른 규칙을 무시하고 PARADOX_TRIGGER 반환
 * 
 * @param {string} element1
 * @param {string} element2
 * @returns {string|null} PARADOX_TRIGGER 또는 null
 */
const checkParadoxOverride = (element1, element2) => {
  if (element1 === Elements.PARADOX || element2 === Elements.PARADOX) {
    return Phenomena.PARADOX_TRIGGER;
  }
  return null;
};

/**
 * AXIOM Override 규칙
 * AXIOM이 포함되면 모든 다른 반응을 질서화(AXIOM_TRIGGER)
 * 
 * @param {string} element1
 * @param {string} element2
 * @returns {string|null} AXIOM_TRIGGER 또는 null
 */
const checkAxiomOverride = (element1, element2) => {
  if (element1 === Elements.AXIOM || element2 === Elements.AXIOM) {
    return Phenomena.AXIOM_TRIGGER;
  }
  return null;
};

// ============================================
// Main Function: CheckReaction
// ============================================

/**
 * 두 속성의 반응을 검사하고 발생할 현상을 반환합니다.
 * 
 * 우선순위:
 * 1. 입력 검증: 유효한 속성인가?
 * 2. 같은 속성: 반응 없음
 * 3. PARADOX Override: 모든 규칙 초월
 * 4. AXIOM Override: 질서 유지
 * 5. Type A Reactions: 표준 반응 테이블
 * 
 * @param {string} attackerElement 공격자가 부착시킨 속성
 * @param {string} targetElement 타겟에 현재 부착된 속성
 * @returns {string|null} 발생한 현상(Phenomenon) 또는 null
 * @throws {Error} 유효하지 않은 속성이 입력되었을 때
 */
export const CheckReaction = (attackerElement, targetElement) => {
  // ============ 1. 입력 검증 ============
  if (!attackerElement || !targetElement) {
    return Phenomena.NONE;
  }

  // 유효한 Element인지 확인
  const validElements = Object.values(Elements);
  if (!validElements.includes(attackerElement)) {
    throw new Error(`Invalid attacker element: ${attackerElement}`);
  }
  if (!validElements.includes(targetElement)) {
    throw new Error(`Invalid target element: ${targetElement}`);
  }

  // ============ 2. 같은 속성 확인 ============
  // 같은 속성이면 반응 없음
  if (attackerElement === targetElement) {
    return Phenomena.NONE;
  }

  // ============ 3. PARADOX Override ============
  const paradoxResult = checkParadoxOverride(attackerElement, targetElement);
  if (paradoxResult) {
    return paradoxResult;
  }

  // ============ 4. AXIOM Override ============
  const axiomResult = checkAxiomOverride(attackerElement, targetElement);
  if (axiomResult) {
    return axiomResult;
  }

  // ============ 5. Type A Reactions (표준 테이블) ============
  const key = JSON.stringify([attackerElement, targetElement]);
  const phenomenon = TYPE_A_REACTIONS[key];
  
  return phenomenon || Phenomena.NONE;
};

// ============================================
// Utility Functions
// ============================================

/**
 * 현상이 실제로 발생했는지 확인
 * @param {string|null} phenomenon CheckReaction의 반환값
 * @returns {boolean}
 */
export const isReactionTriggered = (phenomenon) => {
  return phenomenon !== null && phenomenon !== Phenomena.NONE;
};

/**
 * 현상에 대한 설명 반환 (디버깅/로깅용)
 * @param {string} phenomenon
 * @returns {string}
 */
export const getPhenomenonDescription = (phenomenon) => {
  const descriptions = {
    [Phenomena.FUSION]: '핵융합 - 강렬한 에너지 방출',
    [Phenomena.THERMAL_SHOCK]: '열충격 - 극단적 온도 변화',
    [Phenomena.PLASMA]: '플라즈마 - 고에너지 이온화 상태',
    [Phenomena.ABSOLUTE_ZERO]: '절대영도 - 모든 운동 정지',
    [Phenomena.OVERLOAD]: '과부하 - 에너지 폭주',
    [Phenomena.BLACK_HOLE]: '블랙홀 - 무한 인력 집중',
    [Phenomena.PARADOX_TRIGGER]: '패러독스 발동 - 모든 규칙 무시',
    [Phenomena.AXIOM_TRIGGER]: '공리 안정화 - 우주 질서 유지',
    [Phenomena.NONE]: '반응 없음',
  };
  return descriptions[phenomenon] || '알 수 없는 현상';
};

/**
 * CHAOS 미션에 유리한 현상들
 * @returns {string[]}
 */
export const getChaosAdvantageousPhenomena = () => {
  return [
    Phenomena.FUSION,
    Phenomena.THERMAL_SHOCK,
    Phenomena.PLASMA,
  ];
};

/**
 * SILENCE 미션에 유리한 현상들
 * @returns {string[]}
 */
export const getSilenceAdvantageousPhenomena = () => {
  return [
    Phenomena.ABSOLUTE_ZERO,
    Phenomena.OVERLOAD,
    Phenomena.BLACK_HOLE,
  ];
};

/**
 * 특정 현상이 CHAOS 미션에 유리한가?
 * @param {string} phenomenon
 * @returns {boolean}
 */
export const isChaosAdvantage = (phenomenon) => {
  return getChaosAdvantageousPhenomena().includes(phenomenon);
};

/**
 * 특정 현상이 SILENCE 미션에 유리한가?
 * @param {string} phenomenon
 * @returns {boolean}
 */
export const isSilenceAdvantage = (phenomenon) => {
  return getSilenceAdvantageousPhenomena().includes(phenomenon);
};
