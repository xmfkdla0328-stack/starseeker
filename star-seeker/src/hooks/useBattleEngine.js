// 전투 로직 분리: useBattleEngine
import { useState } from 'react';
import { BATTLE_CONSTANTS } from '../constants/battleConfig';
import { CHARACTER_SKILLS } from '../data/characters/skills';
import { applySkillEffect } from '../utils/battle/skillProcessor';
import { calculateFinalCritStats, calculateFinalEpRecharge } from '../utils/StatCalculator';
import { playerPassiveUnlocks } from '../data/playerPassiveUnlocks';

const useBattleEngine = (initialAllies, initialEnemies) => {
  // 서주목(1) 또는 아다드(2)만 쿨다운 필드 추가 (최초 0)
  // 모든 캐릭터에 쿨다운 필드 부여 (기존: 1,2번만)
  const withCooldowns = (unit) => {
    return { ...unit, cooldowns: { skill: 0, ultimate: 0, ...(unit.cooldowns || {}) } };
  };
  // 서주목 패시브: 아군 전체 치명타 확률 +5% 적용
  const hasSeoJuMok = initialAllies.some(u => u.id === 1);
  let alliesWithPassive = initialAllies;
  // 서주목 패시브 적용 (해제된 경우만)
  if (hasSeoJuMok && playerPassiveUnlocks[1]?.passive1) {
    alliesWithPassive = alliesWithPassive.map(u => ({
      ...u,
      passives: [
        ...(u.passives || []),
        { critRate: 5 },
        { epRecharge: 5 },
      ],
    }));
  }
  // 아다드 패시브(자신만 공격력 +10%) 적용 (해제된 경우만)
  alliesWithPassive = alliesWithPassive.map(u =>
    u.id === 2 && playerPassiveUnlocks[2]?.passive1
      ? { ...u, passives: [ ...(u.passives || []), { atkUp: 10 } ] }
      : u
  );
  // passive1, passive2, 버프, 레벨, 돌파 등 모든 요소가 atk에 반영되도록 최종 스탯 계산
  alliesWithPassive = alliesWithPassive.map(u => {
    const finalStats = require('../utils/StatCalculator').calculateFinalStats(u);
    return { ...u, ...finalStats };
  });
  const [units, setUnits] = useState([
    ...alliesWithPassive.map(withCooldowns),
    ...initialEnemies.map(withCooldowns),
  ]);
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
    // 서주목(1) 또는 아다드(2)만 쿨다운 필드 추가 (최초 0)
    const withCooldowns = (unit) =>
      (unit.id === 1 || unit.id === 2)
        ? { ...unit, cooldowns: { skill: 0, ultimate: 0, ...(unit.cooldowns || {}) } }
        : unit;
    // 모든 캐릭터 스킬/필살기 쿨다운 적용
    if ((type === 'skill' || type === 'ult')) {
      if (activeUnit.cooldowns && activeUnit.cooldowns[type] > 0) {
        addLog(`스킬 쿨다운 중! (${activeUnit.cooldowns[type]}턴 남음)`);
        return;
      }
    }
    // 모든 캐릭터의 스킬/필살기 처리 (쿨다운/EP/버프 등)
    if ((type === 'skill' || type === 'ult')) {
      // 아군/적 전체
      const allies = units.filter(u => u.type === 'ally' && u.hp > 0);
      const enemies = units.filter(u => u.type === 'enemy' && u.hp > 0);
      // battleContext 임시 생성 (실제 battleLog 연동)
      const battleContext = {
        allies: allies.map(a => ({ ...a })), // 깊은 복사로 전달
        enemies: enemies.map(e => ({ ...e })),
        timeline: {
          startDistance: BATTLE_CONSTANTS.MAX_DISTANCE,
          goalDistance: 0,
        },
        addLog: addLog,
      };
      // 스킬 데이터
      const skillDetail = type === 'skill'
        ? CHARACTER_SKILLS[activeUnit.id].skillDetails.skill
        : CHARACTER_SKILLS[activeUnit.id].skillDetails.ultimate;
      // 대상 결정
      let targets = [];
      if (type === 'skill') {
        targets = skillDetail.targetType === 'ALLY_ONE' ? [battleContext.allies.reduce((min, a) => (a.hp/a.maxHp < min.hp/min.maxHp ? a : min), battleContext.allies[0])] : battleContext.allies;
      } else if (type === 'ult') {
        targets = skillDetail.targetType === 'ALLY_ALL' ? battleContext.allies : battleContext.enemies;
      }
      // EP 체크 (필살기)
      if (type === 'ult' && activeUnit.ep < 100) { addLog('EP 부족!'); return; }
      // 효과 적용
      applySkillEffect({
        caster: activeUnit,
        targets,
        skillDetail,
        battleContext,
      });
      // buffs/디버프/HP가 반영된 allies/enemies를 units에 반영 + EP/쿨다운 적용
      setUnits(prev => prev.map(u => {
        let updated;
        if (type === 'skill' && u.type === 'ally' && u.hp > 0) {
          updated = battleContext.allies.find(a => a.id === u.id);
        } else if (type === 'ult' && u.type === 'ally' && u.hp > 0) {
          updated = battleContext.allies.find(a => a.id === u.id);
        } else if (type === 'ult' && u.type === 'enemy' && u.hp > 0) {
          updated = battleContext.enemies.find(e => e.id === u.id);
        }
        let next = updated ? { ...u, ...updated } : u;
        if (u.id === activeUnitId) {
          next.distance = BATTLE_CONSTANTS.MAX_DISTANCE;
          // skill: 기본 EP 충전 20, ult: EP -100
          let newEp = type === 'skill'
            ? (next.ep ?? 0) + 20
            : (next.ep ?? 0) - 100;
          next.ep = Math.min(Math.max(0, newEp), next.maxEp ?? 100);
          // 쿨다운 적용
          next.cooldowns = { ...next.cooldowns, [type]: skillDetail.cooldown };
        }
        return next;
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
    // 치명타 스탯 계산 (장비/패시브/버프는 추후 확장)
    const critStats = calculateFinalCritStats(
      activeUnit,
      activeUnit.equipment || [],
      activeUnit.passives || [],
      activeUnit.buffs || []
    );
    // EP 충전 효율 계산
    const epRecharge = calculateFinalEpRecharge(
      activeUnit,
      activeUnit.equipment || [],
      activeUnit.passives || [],
      activeUnit.buffs || []
    );
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
        // 치명타 판정
        if (Math.random() * 100 < critStats.critRate) {
          dmg = Math.round(dmg * (1 + critStats.critDamage / 100));
          addLog(`[치명타!] ${activeUnit.name}의 치명타 발동!`);
        }
        cpGain = 50;
        epGain = Math.floor(10 * (1 + epRecharge / 100));
        break;
      }
      case 'skill': {
        // 스킬 공격: 기존대로(추후 확장)
        dmg = Math.round(finalAtk * 1.5);
        // 치명타 판정
        if (Math.random() * 100 < critStats.critRate) {
          dmg = Math.round(dmg * (1 + critStats.critDamage / 100));
          addLog(`[치명타!] ${activeUnit.name}의 치명타 발동!`);
        }
        cpGain = 80;
        epGain = Math.floor(20 * (1 + epRecharge / 100));
        break;
      }
      case 'ult': {
        if (activeUnit.ep < 100) { addLog('EP 부족!'); return; }
        dmg = Math.round(finalAtk * 4.0);
        // 치명타 판정
        if (Math.random() * 100 < critStats.critRate) {
          dmg = Math.round(dmg * (1 + critStats.critDamage / 100));
          addLog(`[치명타!] ${activeUnit.name}의 치명타 발동!`);
        }
        cpGain = 100;
        epGain = -100;
        break;
      }
      default: break;
    }
    setUnits(prev => prev.map(u => {
      // 피격 대상 처리 (피해 감소 버프 적용)
      if (u.id === targetId) {
        let finalDmg = dmg;
        // DMG_REDUCTION 버프가 있으면 value만큼 피해 감소
        if (u.buffs) {
          const dmgRed = u.buffs.filter(buff => buff.type === 'DMG_REDUCTION').reduce((acc, buff) => acc + (buff.value || 0), 0);
          if (dmgRed > 0) {
            finalDmg = Math.round(dmg * (1 - dmgRed / 100));
            addLog(`[피해 감소] ${u.name}이(가) 피해 감소 효과로 ${dmg} → ${finalDmg} 데미지!`);
          }
        }
        const newHp = u.hp - finalDmg;
        addLog(`[공격] ${u.name}에게 ${finalDmg} 데미지!`);
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
          // HOT 버프 효과 적용 (턴 시작 시)
          let hotHeal = 0;
          if (u.buffs) {
            u.buffs.forEach(buff => {
              if (buff.type === 'HOT') {
                hotHeal += buff.value;
              }
            });
          }
          let newHp = u.hp;
          if (hotHeal > 0 && u.hp > 0) {
            const beforeHp = newHp;
            newHp = Math.min(u.maxHp, newHp + hotHeal);
            addLog(`[HOT] ${u.name}이(가) HOT 효과로 ${hotHeal} 회복! (${beforeHp} → ${newHp})`);
          }
        // 쿨다운 감소(서주목만)
        let newCooldowns = u.cooldowns;
        if ((u.id === 1 || u.id === 2) && newCooldowns) {
          newCooldowns = { ...newCooldowns };
          Object.keys(newCooldowns).forEach(key => {
            newCooldowns[key] = Math.max(0, newCooldowns[key] - 1);
          });
        }
        return {
          ...u,
          distance: BATTLE_CONSTANTS.MAX_DISTANCE,
          ep: Math.min(Math.max(0, newEp), u.maxEp),
          buffs: newBuffs,
          hp: newHp,
          ...((u.id === 1 || u.id === 2) && newCooldowns ? { cooldowns: newCooldowns } : {}),
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
