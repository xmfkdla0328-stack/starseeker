import { useState, useEffect, useRef } from 'react';
import { CHARACTER_SKILLS } from '../data/characters/skillData';
import { reduceCooldown } from '../utils/battleLogic';
import { initializeBattleAllies, initializeBoss } from '../utils/battle/battleInitializer';

/**
 * 턴 시스템 관리 커스텀 훅
 * 턴 큐 생성, 턴 진행, 쿨타임 관리 등을 담당
 */
export function useTurnSystem(partyData, enemyData, battleSession) {
  const [turnQueue, setTurnQueue] = useState([]);
  const [partyState, setPartyState] = useState([]);
  const [lastResolvedTurnId, setLastResolvedTurnId] = useState(null);
    const [isWaitingAnimation, setIsWaitingAnimation] = useState(false);
  const isInitialized = useRef(false);
  const lastCooldownDecrementTurnId = useRef(null);

  // 전투 세션이 바뀌면 초기화 플래그를 리셋해 새 턴 큐 생성을 허용
  useEffect(() => {
    isInitialized.current = false;
      setIsWaitingAnimation(false);
  }, [battleSession]);

  // 전투 시작 시 턴 큐 생성 - 데이터 검증 강화
  useEffect(() => {
    // 이미 초기화가 끝났다면 더 이상 실행하지 않음
    if (isInitialized.current) return;

    // 데이터가 아직 안 왔으면 초기화하지 않음 (턴 큐에 적 1명만 들어가는 것을 방지)
    if (!partyData || !Array.isArray(partyData) || partyData.length === 0 || !enemyData) {
      console.log('[useTurnSystem] 턴 데이터 대기 중...');
      return;
    }

    console.log('🚀 BattleScreen: 전투 초기화 요청 (1회만 실행되어야 함)');
    console.log('🔒 턴 시스템 최초 1회 초기화 수행');
    console.log('[useTurnSystem] 턴 큐 생성 시작 - partyData:', partyData.length, 'enemyData:', enemyData.name);

    // 2단계: 파티 데이터 초기화 (거리 기반 초기값 및 CP 추가)
    const preInitializedParty = initializeBattleAllies(partyData || []);
      const initializedParty = (preInitializedParty || []).map(char => {
        const skillData = CHARACTER_SKILLS[char.id];
        const skillCooldown = skillData?.skillDetails?.skill?.cooldown || 3;
        const maxHp = char.maxHp ?? char.hp ?? 100;

        return {
          ...char,
          hp: maxHp, // 전투 시작 시 HP 풀로 리셋
          sp: 0, // 전투 시작 시 SP 초기화
          maxSp: char.maxSp ?? 100,
          currentSkillCooldown: 0,
          skillMaxCooldown: skillCooldown,
        };
      });

    setPartyState(initializedParty);

    // 3단계: 턴 큐 생성
    const participants = [];

    // 아군 추가
    initializedParty.forEach((char, index) => {
      if (char) {
        participants.push({
          type: 'party',
          data: char,
          index,
          speed: Number(char.baseSpd ?? char.speed ?? 100),
          name: char.name || `Ally-${index + 1}`,
          id: char.id || `party-${index}`,
        });
      }
    });

    // 적군 추가 (거리 초기화 적용)
    if (enemyData) {
      const initializedEnemy = initializeBoss(enemyData);
      participants.push({
        type: 'enemy',
        data: initializedEnemy,
        speed: Number(initializedEnemy.speed ?? initializedEnemy.baseSpd ?? 100),
        name: initializedEnemy.name || 'Enemy',
        id: initializedEnemy.id || 'enemy',
      });
    }

    // 속도 내림차순 정렬
    participants.sort((a, b) => {
      if (b.speed !== a.speed) return b.speed - a.speed;
      if (a.type === 'party' && b.type === 'enemy') return -1;
      if (a.type === 'enemy' && b.type === 'party') return 1;
      return 0;
    });

    const queue = participants;
    setTurnQueue(queue);
    lastCooldownDecrementTurnId.current = null;

    if (queue && queue.length > 0) {
      console.log('[useTurnSystem] 턴 큐 생성 완료:', queue.map(t => `${t.name}(${t.speed})`), '길이:', queue.length);
      isInitialized.current = true;
    } else {
      console.error('[useTurnSystem] 턴 큐가 비어있습니다!');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleSession]);


  // 현재 턴 가져오기
  const activeTurn = turnQueue[0] || null;
  const activeCharacter = activeTurn?.type === 'party' ? partyState?.[activeTurn.index] : null;
  const selectedCharacter = activeCharacter ? { ...activeCharacter, actorIndex: activeTurn.index, id: activeTurn.id } : null;

  // 턴 큐가 준비되면 첫 턴을 알림 (currentTurn이 null로 남지 않도록 보장)
  useEffect(() => {
    if (!turnQueue || turnQueue.length === 0) return;
    if (!activeTurn) return;
    // 초기 턴 시작 트리거
    window.dispatchEvent(new CustomEvent('turn-started', { detail: { activeTurn } }));
  }, [turnQueue, activeTurn]);

  // 플레이어 턴 시작 시 스킬 쿨타임 1 감소 (중복 방지)
  useEffect(() => {
    if (!activeTurn || activeTurn.type !== 'party') return;
    const turnId = activeTurn.id || `${activeTurn.type}-${activeTurn.index}`;
    if (lastCooldownDecrementTurnId.current === turnId) return;
    lastCooldownDecrementTurnId.current = turnId;

    setPartyState((prev) => {
      if (!Array.isArray(prev)) return prev;
      const updated = [...prev];
      const actor = updated[activeTurn.index];
      if (!actor) return prev;

      const reduced = reduceCooldown(actor.currentSkillCooldown || 0);
      if (reduced === (actor.currentSkillCooldown || 0)) return prev; // 변화 없으면 이전 상태 유지

      updated[activeTurn.index] = {
        ...actor,
        currentSkillCooldown: reduced,
      };

      return updated;
    });

    // 턴 큐 내 데이터도 동기화
    setTurnQueue((prevQueue) => {
      if (!Array.isArray(prevQueue)) return prevQueue;
      return prevQueue.map((t) => {
        if (t.type !== 'party' || t.index !== activeTurn.index) return t;
        const currentCooldown = t.data?.currentSkillCooldown || 0;
        const reduced = reduceCooldown(currentCooldown);
        if (reduced === currentCooldown) return t;
        return {
          ...t,
          data: { ...t.data, currentSkillCooldown: reduced },
        };
      });
    });
  }, [activeTurn, setPartyState, setTurnQueue]);

  // 턴 진행 (현재 턴을 뒤로 회전)
  const nextTurn = () => {
    lastCooldownDecrementTurnId.current = null; // 다음 턴 시작 시 쿨타임 감소를 다시 허용
    setTurnQueue((prevQueue) => {
      if (!prevQueue || prevQueue.length === 0) return prevQueue;

      // 1. 현재 턴 캐릭터 분리
      const [finishedChar, ...waitingChars] = prevQueue;

      // 2. 디버깅 로그 (누가 뒤로 가는지 확인)
      console.log(`🔄 턴 종료: ${finishedChar.name} -> 맨 뒤로 이동`);

      // 3. 단순 회전 (Round Robin)
      const nextQueue = [...waitingChars, finishedChar];

      if (nextQueue.length === 0) {
        console.log('[useTurnSystem] 더 이상 유효한 턴이 없음 (전투 종료)');
        return nextQueue;
      }

      console.log(`[useTurnSystem] 턴 진행: ${finishedChar?.name} -> ${nextQueue[0]?.name}`);
      return nextQueue;
    });
  };

  return {
    turnQueue,
    setTurnQueue,
    partyState,
    setPartyState,
    selectedCharacter,
    activeTurn,
    activeCharacter,
    nextTurn,
    lastResolvedTurnId,
    setLastResolvedTurnId,
      isWaitingAnimation,
      setIsWaitingAnimation,
      resumeTurn: () => {
        console.log('[useTurnSystem] resumeTurn: 애니메이션 완료, 턴 잠금 해제');
        setIsWaitingAnimation(false);
      },
    checkIsAlive: (turn, enemyHp) => {
      if (!turn) return false;
      if (turn.type === 'party') {
        const member = partyState?.[turn.index];
        return member ? member.hp > 0 : false;
      }
      return enemyHp > 0;
    },
  };
};
