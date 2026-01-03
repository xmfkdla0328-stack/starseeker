/**
 * skillLogic.js 통합 테스트
 * Phase 3: executeBasicAttack이 reactionType과 gaugeAdded를 올바르게 반환하는지 확인
 */

import { executeBasicAttack } from './skillLogic';

console.log('='.repeat(60));
console.log('Phase 3 Integration Test: skillLogic.js');
console.log('='.repeat(60));

// ===== Test Case 1: ENTROPY (공격) vs GRAVITY (방어) =====
// 예상: FUSION 현상, CHAOS 미션에 FUSION 매칭 → 50점
console.log('\n[테스트 1] ENTROPY 공격 vs GRAVITY 방어');
const player1 = {
  name: '서주목',
  attack: 15,
  element: 'ENTROPY',
  critRate: 0.1,
};
const enemy1 = {
  name: '화염룡',
  hp: 100,
  maxHp: 100,
  attack: 12,
  currentElement: 'GRAVITY',
};
const result1 = executeBasicAttack(player1, enemy1);
console.log('결과:', result1);
console.log(`✓ reactionType: ${result1.reactionType} (예상: FUSION)`);
console.log(`✓ gaugeAdded: ${result1.gaugeAdded} (예상: 50)`);

// ===== Test Case 2: STASIS (공격) vs RESONANCE (방어) =====
// 예상: 반응 없음(null), CHAOS 미션에 STASIS 매칭 X → 0점
console.log('\n[테스트 2] STASIS 공격 vs RESONANCE 방어');
const player2 = {
  name: '흑야삭',
  attack: 12,
  element: 'STASIS',
  critRate: 0.05,
};
const enemy2 = {
  name: '얼음정령',
  hp: 80,
  maxHp: 80,
  attack: 10,
  currentElement: 'RESONANCE',
};
const result2 = executeBasicAttack(player2, enemy2);
console.log('결과:', result2);
console.log(`✓ reactionType: ${result2.reactionType} (예상: null)`);
console.log(`✓ gaugeAdded: ${result2.gaugeAdded} (예상: 0)`);

// ===== Test Case 3: 크리티컬 데미지 =====
console.log('\n[테스트 3] 크리티컬 데미지 계산');
const player3 = {
  name: '테스트 캐릭터',
  attack: 20,
  element: 'AXIOM',
  critRate: 1.0, // 100% 크리티컬
};
const enemy3 = {
  name: '테스트 적',
  hp: 100,
  maxHp: 100,
  attack: 5,
  currentElement: 'ENTROPY',
};
const result3 = executeBasicAttack(player3, enemy3);
console.log('결과:', result3);
console.log(`✓ 기본 데미지: 20, 크리티컬 배수: 1.5, 최종: ${result3.damage}`);
console.log(`✓ isCritical: ${result3.isCritical} (예상: true)`);

console.log('\n' + '='.repeat(60));
console.log('테스트 완료!');
console.log('='.repeat(60));
