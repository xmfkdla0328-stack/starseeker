/**
 * 속도 기반 턴 큐 시스템
 * Speed가 높을수록 먼저 행동
 */

/**
 * 전투 참가자 목록을 속도 기준으로 정렬하여 턴 큐 생성
 * @param {Array} partyData - 아군 파티 데이터 배열
 * @param {Object} enemyData - 적 데이터
 * @returns {Array} 행동 순서 큐 (각 요소: { type: 'party' | 'enemy', data: {...}, index?: number, speed: number })
 */
export function createTurnQueue(partyData, enemyData) {
  const queue = [];

  // 아군 추가 (살아있는 캐릭터만)
  partyData.forEach((char, index) => {
    if (char && char.hp > 0) {
      queue.push({
        type: 'party',
        data: char,
        index: index, // 파티 배열 내 인덱스
        speed: char.baseSpd || char.speed || 100, // baseSpd 또는 speed 속성 사용
        name: char.name,
        id: char.id,
      });
    }
  });

  // 적 추가
  if (enemyData && enemyData.hp > 0) {
    queue.push({
      type: 'enemy',
      data: enemyData,
      speed: enemyData.speed || enemyData.baseSpd || 100,
      name: enemyData.name,
    });
  }

  // 속도 내림차순 정렬 (높은 속도가 먼저)
  queue.sort((a, b) => {
    if (b.speed !== a.speed) {
      return b.speed - a.speed;
    }
    // 속도가 같으면 타입 우선순위 (아군 우선)
    if (a.type === 'party' && b.type === 'enemy') return -1;
    if (a.type === 'enemy' && b.type === 'party') return 1;
    return 0;
  });

  return queue;
}

/**
 * 다음 턴으로 진행
 * @param {Array} turnQueue - 현재 턴 큐
 * @param {number} currentIndex - 현재 턴 인덱스
 * @returns {number} 다음 턴 인덱스
 */
export function getNextTurnIndex(turnQueue, currentIndex) {
  if (!turnQueue || turnQueue.length === 0) return -1;
  
  let nextIndex = currentIndex + 1;
  
  // 큐의 끝에 도달하면 처음으로 (라운드 순환)
  if (nextIndex >= turnQueue.length) {
    nextIndex = 0;
  }
  
  return nextIndex;
}

/**
 * 현재 턴 참가자가 살아있는지 확인 및 스킵
 * @param {Array} turnQueue - 턴 큐
 * @param {number} currentIndex - 현재 인덱스
 * @param {Array} partyData - 최신 파티 상태
 * @param {Object} enemyData - 최신 적 상태
 * @returns {number} 유효한 다음 턴 인덱스
 */
export function findNextValidTurn(turnQueue, currentIndex, partyData, enemyData) {
  if (!turnQueue || turnQueue.length === 0) return -1;
  
  let searchIndex = currentIndex;
  let attempts = 0;
  const maxAttempts = turnQueue.length + 1;
  
  while (attempts < maxAttempts) {
    const turn = turnQueue[searchIndex];
    
    if (!turn) {
      searchIndex = getNextTurnIndex(turnQueue, searchIndex);
      attempts++;
      continue;
    }
    
    // 아군인 경우 HP 확인
    if (turn.type === 'party') {
      const partyMember = partyData[turn.index];
      if (partyMember && partyMember.hp > 0) {
        return searchIndex;
      }
    }
    
    // 적인 경우 HP 확인
    if (turn.type === 'enemy') {
      if (enemyData && enemyData.hp > 0) {
        return searchIndex;
      }
    }
    
    // 현재 턴 참가자가 사망했으면 다음으로
    searchIndex = getNextTurnIndex(turnQueue, searchIndex);
    attempts++;
  }
  
  // 모든 시도 실패 (전투 종료 상황)
  return -1;
}

/**
 * 턴 큐에서 특정 타입의 참가자 수 카운트
 * @param {Array} turnQueue - 턴 큐
 * @param {string} type - 'party' 또는 'enemy'
 * @returns {number} 해당 타입의 참가자 수
 */
export function countByType(turnQueue, type) {
  return turnQueue.filter(t => t.type === type).length;
}
