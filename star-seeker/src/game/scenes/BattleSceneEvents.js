/**
 * BattleScene 이벤트 핸들러
 */

import { showDamageText as showDamageTextEffect } from './BattleSceneEffects';
import { updateEnemyHpText as updateEnemyHpTextFunc } from './BattleSceneEnemy';

export const setupEventListeners = function() {
  // 스킬 선택 이벤트 리스너
  const skillSelectedHandler = (event) => {
    handleSkillSelected.call(this, event);
  };
  window.addEventListener('skill-selected', skillSelectedHandler);
  
  // 적 턴 시작 이벤트 리스너
  const enemyTurnStartHandler = (event) => {
    handleEnemyTurnStart.call(this, event);
  };
  window.addEventListener('enemy-turn-start', enemyTurnStartHandler);
  
  // 클린업을 위해 참조 저장
  this._skillSelectedHandler = skillSelectedHandler;
  this._enemyTurnStartHandler = enemyTurnStartHandler;
};

/**
 * 스킬 선택 핸들러
 * @param {Event} event - 스킬 선택 이벤트
 */
export const handleSkillSelected = function(event) {
  const { character, skillType } = event.detail || {};
  if (!character) return;
  
  console.log(`[BattleScene] 스킬 선택: ${character.name} - ${skillType}`);
  
  // 간단한 애니메이션 (예: 스킬 사용 훈과)
  this.time.delayedCall(500, () => {
    // 데미지 계산
    const damage = Math.floor(Math.random() * 30) + 10;
    
    // 적의 현재 HP에서 데미지 차감 (누적)
    this.enemyCurrentHp = Math.max(0, this.enemyCurrentHp - damage);
    
    // 적 HP 텍스트 업데이트
    updateEnemyHpTextFunc.call(this);
    
    // 적 위치에 데미지 표시
    showDamageTextEffect.call(this, this.scale.width * 0.5, 150, `-${damage}`, '#ff4444');
    
    // 공격 결과 생성 (테스트용)
    const attackResult = {
      damage: damage,
      gaugeAdded: Math.floor(Math.random() * 20) + 10,
      reactionType: ['FUSION', 'OVERLOAD', 'null'][Math.floor(Math.random() * 3)],
      isCritical: Math.random() > 0.7,
      enemyHpRemaining: this.enemyCurrentHp,
      attackerIndex: character.actorIndex || 0,
      skillType: skillType,
    };
    
    console.log('[BattleScene] 공격 완료:', { damage, enemyHpAfter: this.enemyCurrentHp, attackResult });
    
    // React로 결과 전달
    this.game.events.emit('attack-complete', attackResult);
  });
};

export const handleEnemyTurnStart = function() {
  console.log('[BattleScene] 적 턴 시작');
  
  // 적 공격 애니메이션
  this.time.delayedCall(800, () => {
    const targetIndex = Math.floor(Math.random() * (this.initData?.partyData?.length || 4));
    const enemyDamage = Math.floor(Math.random() * 20) + 5;
    
    // 피격 캐릭터의 HP 업데이트 및 데미지 표시
    if (this.characters && this.characters[targetIndex]) {
      const targetChar = this.characters[targetIndex];
      const newHp = Math.max(0, targetChar.currentHp - enemyDamage);
      this.updateCharacterHp(targetIndex, newHp, targetChar.data?.maxHp || 100);
    }
    
    const enemyAttackResult = {
      targetIndex,
      damage: enemyDamage,
      partyStatus: (this.initData?.partyData || []).map((char, idx) => ({
        index: idx,
        hp: Math.max(0, (char.hp || 100) - (idx === targetIndex ? enemyDamage : 0)),
      })),
      partyAliveCount: (this.initData?.partyData || []).length,
    };
    
    console.log('[BattleScene] 적 공격 완료, 이벤트 발행:', enemyAttackResult);
    
    // React로 결과 전달
    this.game.events.emit('enemy-attack-complete', enemyAttackResult);
  });
};
