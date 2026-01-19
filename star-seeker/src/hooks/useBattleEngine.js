// 전투 로직 분리: useBattleEngine
import { useState } from 'react';
import { BATTLE_CONSTANTS } from '../constants/battleConfig';
import { CHARACTER_SKILLS } from '../data/characters/skills';
import { applySkillEffect } from '../utils/battle/skillProcessor';

const useBattleEngine = (initialAllies, initialEnemies) => {
  const [units, setUnits] = useState([...initialAllies, ...initialEnemies]);
  const [cp, setCp] = useState(500);
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [gameStatus, setGameStatus] = useState('running');
  const [battleLog, setBattleLog] = useState(['전투 시스템 가동. 관측 개시...']);

  const addLog = (msg) => {
    setBattleLog(prev => [...prev.slice(-4), msg]);
  };

  const tickTimeline = () => {
    if (activeUnitId || gameStatus !== 'running') return;
    let minTime = Infinity;
    units.forEach(u => {
      if (u.hp <= 0) return;
      const timeToAct = u.distance / u.speed;
      if (timeToAct < minTime) minTime = timeToAct;
    });
    const nextUnits = units.map(u => {
      if (u.hp <= 0) return u;
      let newDist = u.distance - (u.speed * minTime);
      if (newDist < 0) newDist = 0;
      return { ...u, distance: newDist };
    });
    const readyUnit = nextUnits.find(u => u.distance <= 0.1 && u.hp > 0);
    setUnits(nextUnits);
    if (readyUnit) {
      setActiveUnitId(readyUnit.id);
      addLog(`[턴 획득] ${readyUnit.name}의 행동 차례입니다.`);
      if (readyUnit.type === 'enemy') {
        setTimeout(() => executeEnemyAi(readyUnit.id, nextUnits), 1000);
      }
    }
  };

  const executeEnemyAi = (unitId, currentUnits) => {
    setUnits(prevUnits => {
      const allies = prevUnits.filter(u => u.type === 'ally' && u.hp > 0);
      if (allies.length === 0) {
        setGameStatus('lose');
        addLog('모든 아군이 패배했습니다...');
        return prevUnits;
      }
      const target = allies[Math.floor(Math.random() * allies.length)];
      const dmg = Math.floor(Math.random() * 50) + 50;
      const nextUnitsAi = prevUnits.map(u => {
        if (u.id === target.id) {
          const newHp = u.hp - dmg;
          addLog(`>> ${target.name}에게 ${dmg} 피해!`);
          if (newHp <= 0) addLog(`!! ${target.name} 행동 불능!`);
          return { ...u, hp: Math.max(0, newHp) };
        }
        if (u.id === unitId) {
          return { ...u, distance: BATTLE_CONSTANTS.MAX_DISTANCE };
        }
        return u;
      });
      setTimeout(() => setActiveUnitId(null), 100);
      return nextUnitsAi;
    });
  };

  const handlePlayerAction = (type, targetId) => {
    const activeUnit = units.find(u => u.id === activeUnitId);
    if (!activeUnit) return;
    // 서주목(캐릭터 id 1)이 skill 커맨드를 사용할 때 실제 스킬 효과 적용
    if (type === 'skill' && activeUnit.id === 1) {
      // 아군 전체
      const allies = units.filter(u => u.type === 'ally' && u.hp > 0);
      // battleContext 임시 생성 (실제 battleLog 연동)
      const battleContext = {
        allies: allies.map(a => ({ ...a })), // 깊은 복사로 전달
        timeline: {
          startDistance: BATTLE_CONSTANTS.MAX_DISTANCE,
          goalDistance: 0,
        },
        addLog: addLog,
      };
      // 서주목 스킬 데이터
      const skillDetail = CHARACTER_SKILLS[1].skillDetails.skill;
      applySkillEffect({
        caster: activeUnit,
        targets: battleContext.allies,
        skillDetail,
        battleContext,
      });
      // buffs가 반영된 allies를 units에 반영 + EP 충전
      setUnits(prev => prev.map(u => {
        if (u.type === 'ally' && u.hp > 0) {
          const updated = battleContext.allies.find(a => a.id === u.id);
          let next = updated ? { ...u, ...updated } : u;
          if (u.id === activeUnitId) {
            next.distance = BATTLE_CONSTANTS.MAX_DISTANCE;
            // 기본 EP 충전 20 (장비/버프 미적용)
            let newEp = (next.ep ?? 0) + 20;
            next.ep = Math.min(Math.max(0, newEp), next.maxEp ?? 100);
          }
          return next;
        }
        return u;
      }));
      setActiveUnitId(null);
      return;
    }
    // 데이터 기반 일반 공격/스킬/필살기 처리
    let cpGain = 0;
    let epGain = 0;
    let dmg = 0;
    // 공격력 버프 적용
    let atkBuff = 0;
    if (activeUnit.buffs) {
      activeUnit.buffs.forEach(buff => {
        if (buff.type === 'ATK_UP') atkBuff += buff.value;
      });
    }
    // 스킬 데이터 참조
    const skillDetails = CHARACTER_SKILLS[activeUnit.id]?.skillDetails;
    const normalSkill = skillDetails?.normal;
    const skillSkill = skillDetails?.skill;
    const ultSkill = skillDetails?.ultimate;
    const finalAtk = activeUnit.atk ? activeUnit.atk * (1 + atkBuff / 100) : 100;
    switch (type) {
      case 'attack': {
        // 일반 공격: 데이터 damageFactor 적용
        const damageFactor = normalSkill?.damageFactor ?? 1.0;
        dmg = Math.round(finalAtk * damageFactor);
        cpGain = 50;
        epGain = 25;
        break;
      }
      case 'skill': {
        // 스킬 공격: 기존대로(추후 확장)
        dmg = Math.round(finalAtk * 1.5);
        cpGain = 80;
        epGain = 40;
        break;
      }
      case 'ult': {
        if (activeUnit.ep < 100) { addLog('EP 부족!'); return; }
        dmg = Math.round(finalAtk * 4.0);
        cpGain = 100;
        epGain = -100;
        break;
      }
      default: break;
    }
    setUnits(prev => prev.map(u => {
      // 피격 대상 처리
      if (u.id === targetId) {
        const newHp = u.hp - dmg;
        addLog(`[공격] ${u.name}에게 ${dmg} 데미지!`);
        if (newHp <= 0) {
          addLog(`!! ${u.name} 처치됨! (CP +100)`);
          cpGain += 100;
        }
        return { ...u, hp: Math.max(0, newHp) };
      }
      // 공격자(턴 소유자) 처리: EP, distance, 버프 지속시간 감소 (자신 턴에만 감소)
      if (u.id === activeUnitId) {
        let newEp = u.ep + epGain;
        // 자신의 턴에만 버프 지속시간 감소 및 만료 제거
        let newBuffs = u.buffs ? u.buffs.map(buff => ({ ...buff, duration: buff.duration !== undefined ? buff.duration - 1 : undefined })) : [];
        newBuffs = newBuffs.filter(buff => buff.duration === undefined || buff.duration > 0);
        return {
          ...u,
          distance: BATTLE_CONSTANTS.MAX_DISTANCE,
          ep: Math.min(Math.max(0, newEp), u.maxEp),
          buffs: newBuffs
        };
      }
      // 기타 유닛: 버프 지속시간은 감소시키지 않음 (상태만 유지)
      return u;
    }));
    setCp(prev => Math.min(prev + cpGain, BATTLE_CONSTANTS.MAX_CP));
    setActiveUnitId(null);
  };

  const handleIntervention = (type, targets) => {
    let cost = 0;
    if (type === 'pull') cost = 250;
    if (type === 'push') cost = 250;
    if (type === 'swap') cost = 500;
    if (type === 'blackhole') cost = 1000;
    if (cp < cost) {
      addLog(`CP 부족 (필요: ${cost})`);
      return false;
    }
    if (type === 'blackhole') {
      setUnits(prev => prev.map(u => {
        if (u.type === 'enemy' && u.hp > 0) {
          return { ...u, distance: Math.min(u.distance + 5000, BATTLE_CONSTANTS.MAX_DISTANCE) };
        }
        return u;
      }));
      addLog('>> [블랙홀] 적 전체 시간 왜곡!');
    } else if (type === 'pull' && targets.target) {
      setUnits(prev => prev.map(u => u.id === targets.target.id ? { ...u, distance: 1 } : u));
      addLog(`>> ${targets.target.name} 당기기 완료!`);
    } else if (type === 'push' && targets.target) {
      setUnits(prev => prev.map(u => u.id === targets.target.id ? { ...u, distance: Math.min(u.distance + 5000, BATTLE_CONSTANTS.MAX_DISTANCE) } : u));
      addLog(`>> ${targets.target.name} 밀어내기 완료!`);
    } else if (type === 'swap' && targets.source && targets.target) {
      const distA = targets.source.distance;
      const distB = targets.target.distance;
      setUnits(prev => prev.map(u => {
        if (u.id === targets.source.id) return { ...u, distance: distB };
        if (u.id === targets.target.id) return { ...u, distance: distA };
        return u;
      }));
      addLog(`>> ${targets.source.name} ↔ ${targets.target.name} 위치 교체!`);
    }
    setCp(prev => prev - cost);
    return true;
  };

  return {
    units, cp, activeUnitId, battleLog, gameStatus,
    tickTimeline, handlePlayerAction, handleIntervention
  };
};

export default useBattleEngine;
