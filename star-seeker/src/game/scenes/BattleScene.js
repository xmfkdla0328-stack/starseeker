import Phaser from 'phaser';
import { CHARACTER_SKILLS } from '../../data/characters/skillData';
import { PHENOMENA, SPECIAL_REACTIONS } from '../../constants/reactions';
import { calculatePlayerAttack, calculateEnemyTurn, normalizeReaction } from '../../utils/battle/battleCalculator';
import SoundManager, { AUDIO_KEYS } from '../../utils/audio/SoundManager';

/**
 * 전투 씬 (Phaser Scene)
 * 플레이어와 적이 대면하는 화면
 */
class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BattleScene' });
    this.playerSprite = null;
    this.enemySprite = null;
    this.partySprites = [];
    this.partyStatus = []; // { hp, maxHp, name, element }
    this.partyHpTexts = [];
    this.isPlayerTurn = true;
    this.actedThisRound = new Set();
    this.missionType = 'CHAOS';
    this.activeTurn = null;
    this.activeGlow = null;
    this.activeGlowTween = null;
    this.defaultCameraState = { x: 0, y: 0, zoom: 1 };
    this._lastAttackResult = null;
  }

  /**
   * 씬 초기화
   */
  init(data) {
    // 전달받은 원본 데이터를 안전하게 보관 (구조 분해 없이)
    const incoming = data && typeof data === 'object' ? data : {};
    this.initData = incoming;

    // props에서 전달받은 데이터 (방어적 할당)
    this.partyData = Array.isArray(incoming.partyData) ? incoming.partyData : [];
    const rawEnemyData = incoming.enemyData && typeof incoming.enemyData === 'object' ? incoming.enemyData : {};
    this.enemyData = {
      hp: 80,
      maxHp: 80,
      attack: 8,
      name: 'Enemy',
      element: 'ENTROPY',
      currentElement: null,
      ...rawEnemyData,
    };
    this.missionType = typeof incoming.missionType === 'string' ? incoming.missionType : 'CHAOS';
    this.activeTurn = incoming.activeTurn || null;
    // React 콜백 저장 (존재 여부 검사)
    this.handleAttackResult = typeof incoming.handleAttackResult === 'function' ? incoming.handleAttackResult : null;
    this.handleEnemyAttackResult = typeof incoming.handleEnemyAttackResult === 'function' ? incoming.handleEnemyAttackResult : null;

    // 디버그 로그
    console.log('[BattleScene] 데이터 수신:', {
      partySize: this.partyData.length,
      enemy: this.enemyData.name,
      enemyBaseElement: this.enemyData.element,
      enemyCurrentElement: this.enemyData.currentElement,
      missionType: this.missionType,
      hasAttackCb: !!this.handleAttackResult,
      hasEnemyAttackCb: !!this.handleEnemyAttackResult,
    });
  }

  /**
   * 씬 생성
   */
  create() {
    // Preloader → BattleScene 데이터 재수신 (방어적 반영, 구조 분해 없이)
    const rawSceneData = this.sys?.settings?.data;
    const sceneData = rawSceneData && typeof rawSceneData === 'object' ? rawSceneData : {};
    const sceneDataAny = /** @type {any} */ (sceneData);

    if (sceneDataAny) {
      if (Array.isArray(sceneDataAny.partyData)) {
        this.partyData = sceneDataAny.partyData;
      }
      if (sceneDataAny.enemyData && typeof sceneDataAny.enemyData === 'object') {
        this.enemyData = { ...this.enemyData, ...sceneDataAny.enemyData };
      }
      if (typeof sceneDataAny.missionType === 'string') {
        this.missionType = sceneDataAny.missionType;
      }
      if (typeof sceneDataAny.handleAttackResult === 'function') {
        this.handleAttackResult = sceneDataAny.handleAttackResult;
      }
      if (typeof sceneDataAny.handleEnemyAttackResult === 'function') {
        this.handleEnemyAttackResult = sceneDataAny.handleEnemyAttackResult;
      }
    }

    console.log('[BattleScene] create() 데이터 적용 상태', {
      partySize: this.partyData.length,
      enemy: this.enemyData.name,
      missionType: this.missionType,
      hasAttackCb: !!this.handleAttackResult,
      hasEnemyAttackCb: !!this.handleEnemyAttackResult,
    });

    const { width, height } = this.cameras.main;
    // 기본 시야: 전장을 넓게 보여주도록 약간 축소된 줌 사용
    this.defaultCameraState = { x: width / 2, y: height / 2, zoom: 0.9 };
    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.setZoom(this.defaultCameraState.zoom);
    this.cameras.main.setLerp(0.12, 0.12);

    // 파티클 텍스처 생성 (없으면 한 번만 생성)
    this.ensureParticleTexture();

    // 배경 이미지는 사용하지 않고 CSS 그라데이션이 보이도록 투명 배경 유지

    // 전투 BGM 시작 (중복 방지)
    SoundManager.playBGM(AUDIO_KEYS.BGM_BATTLE);

    // 파티 캐릭터들 배치 (최대 4명, 한 줄로 배치)
    this.partySprites = [];
    const partyCount = Math.min(this.partyData.length, 4); // 최대 4명까지 표시
    const partyStartX = width * 0.12;
    const partyGapX = width * 0.12;

    for (let i = 0; i < partyCount; i++) {
      const character = this.partyData[i];
      const xPos = partyStartX + i * partyGapX;
      const yPos = height * 0.6;

      // 캐릭터 플레이스홀더 (네온 + 유리질감)
      const sprite = this.add.rectangle(xPos, yPos, 90, 110, 0x0a1b2e, 0.22);
      sprite.setStrokeStyle(2, 0x6bdcff, 0.9);
      sprite.setFillStyle(0x0a1b2e, 0.22);
      sprite.setInteractive({ useHandCursor: true });
      sprite.on('pointerdown', () => this.onCharacterClicked(character, i));
      this.partySprites.push(sprite);

      const spriteHeight = sprite.height || 90;

      // 캐릭터 이름
      this.add.text(xPos, yPos + spriteHeight * 0.55, character.name, {
        font: '14px Arial',
            color: '#ffffff',
        align: 'center',
      }).setOrigin(0.5);

      // 캐릭터 HP
      const charHp = character.hp || character.maxHp || 100;
      const charMaxHp = character.maxHp || 100;
      const hpText = this.add.text(xPos, yPos - spriteHeight * 0.55, `HP: ${charHp}/${charMaxHp}`, {
        font: '12px Arial',
            color: '#00ff00',
        align: 'center',
      }).setOrigin(0.5);

      this.partyStatus[i] = {
        name: character.name,
        element: character.element,
        hp: charHp,
        maxHp: charMaxHp,
      };
      this.partyHpTexts[i] = hpText;
    }

    // 적 스프라이트
    const enemyX = width * 0.8;
    const enemyY = height * 0.4;

    this.enemySprite = this.add.rectangle(enemyX, enemyY, 150, 180, 0x140a0a, 0.18);
    this.enemySprite.setStrokeStyle(3, 0xff5f5f, 0.9);
    this.enemySprite.setFillStyle(0x140a0a, 0.18);

    const enemyHeight = this.enemySprite.height || 160;

    // 적 이름
    this.add.text(enemyX, enemyY + enemyHeight * 0.55, this.enemyData.name, {
      font: '16px Arial',
          color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    // 적 HP
    this.enemyHPText = this.add.text(
      enemyX,
      enemyY - enemyHeight * 0.55,
      `HP: ${this.enemyData.hp}/${this.enemyData.maxHp}`,
      {
        font: '14px Arial',
            color: '#ff0000',
        align: 'center',
      }
    ).setOrigin(0.5);

    // 적에 부착된 속성 표시 (초기값)
    this.enemyElementText = this.add.text(
      enemyX,
      enemyY - enemyHeight * 0.7,
      '',
      {
        font: 'bold 12px Arial',
        color: '#ffaa00',
        align: 'center',
        backgroundColor: '#00000088',
        padding: { x: 6, y: 3 },
      }
    ).setOrigin(0.5);
    this.updateEnemyElementDisplay();

    console.log('[BattleScene] 전투 시작', {
      partySize: this.partyData.length,
      enemy: this.enemyData.name,
    });
    
    // 적 턴 시작 이벤트 리스너 등록
    this.enemyTurnHandler = () => {
      console.log('[BattleScene] 적 턴 시작 (자동 공격)');
      this.executeEnemyTurnAuto();
    };
    window.addEventListener('enemy-turn-start', this.enemyTurnHandler);

    // React 제어 UI로부터 스킬 선택 이벤트 수신
    this.skillSelectedHandler = (e) => this.onSkillSelectedFromUI(e);
    window.addEventListener('skill-selected', this.skillSelectedHandler);

    // 초기 액티브 턴 반영 (React → Phaser)
    if (this.activeTurn) {
      this.setActiveTurn(this.activeTurn, true);
    }
  }

  /**
   * 씬 종료 시 정리
   */
  shutdown() {
    if (this.enemyTurnHandler) {
      window.removeEventListener('enemy-turn-start', this.enemyTurnHandler);
    }
    if (this.skillSelectedHandler) {
      window.removeEventListener('skill-selected', this.skillSelectedHandler);
    }
    this.clearActiveHighlight();
  }

  /**
   * 적의 현재 속성 표시 업데이트
   */
  updateEnemyElementDisplay() {
    if (!this.enemyElementText) return;
    
    const element = this.enemyData.currentElement;
    
    console.log('[BattleScene] 적 속성 UI 업데이트:', {
      currentElement: element,
      baseElement: this.enemyData.element,
      willShow: !!(element && element !== 'null')
    });
    
    if (element && element !== 'null') {
      const elementNames = {
        ENTROPY: '엔트로피',
        STASIS: '정체',
        GRAVITY: '중력',
        RESONANCE: '공명',
        AXIOM: '공리',
        VOID: '공허',
      };
      const elementColors = {
        ENTROPY: '#ff4444',
        STASIS: '#4444ff',
        GRAVITY: '#8844ff',
        RESONANCE: '#44ff44',
        AXIOM: '#ffff44',
        VOID: '#444444',
      };
      this.enemyElementText.setText(`속성: ${elementNames[element] || element}`);
      this.enemyElementText.setColor(elementColors[element] || '#ffaa00');
      this.enemyElementText.setVisible(true);
    } else {
      this.enemyElementText.setText('');
      this.enemyElementText.setVisible(false);
    }
  }

  /**
   * 플레이어 턴 활성/비활성
   * @param {boolean} isPlayerTurn
   */
  setPlayerTurn(isPlayerTurn = true) {
    this.isPlayerTurn = !!isPlayerTurn;
    if (!this.partySprites) return;
    this.partySprites.forEach((sprite) => {
      if (!sprite) return;
      if (this.isPlayerTurn) {
        sprite.setInteractive({ useHandCursor: true });
      } else {
        sprite.disableInteractive();
      }
    });

    // 스킬 UI가 열린 상태에서 턴이 넘어가면 닫기
    if (!this.isPlayerTurn && this.skillUI) {
      this.skillUI.destroy(true);
      this.skillUI = null;
    }
  }

  /**
   * React에서 전달된 현재 턴 정보를 Phaser 씬에 반영
   * @param {object|null} turn
   * @param {boolean} skipCameraEase 즉시 반영 여부
   */
  setActiveTurn(turn, skipCameraEase = false) {
    const isObjectTurn = turn && typeof turn === 'object';
    this.activeTurn = isObjectTurn ? turn : null;

    if (!isObjectTurn) {
      this.clearActiveHighlight();
      this.resetCameraFocus(skipCameraEase);
      return;
    }

    if (turn.type !== 'party' || typeof turn.index !== 'number') {
      this.clearActiveHighlight();
      this.resetCameraFocus(skipCameraEase);
      return;
    }

    this.updateActiveHighlight(turn.index);
    this.focusCameraOnParty(turn.index, skipCameraEase);
  }

  /**
   * 활성 캐릭터 하이라이트 및 연출
   * @param {number} index
   */
  updateActiveHighlight(index) {
    if (!Array.isArray(this.partySprites) || this.partySprites.length === 0) return;

    // 기존 연출 정리
    if (this.activeGlowTween) {
      this.activeGlowTween.stop();
      this.activeGlowTween = null;
    }
    if (this.activeGlow) {
      this.activeGlow.destroy();
      this.activeGlow = null;
    }

    // 전체 스프라이트 기본 상태 복원
    this.partySprites.forEach((sprite) => {
      if (!sprite) return;
      sprite.setAlpha(0.8);
      sprite.setStrokeStyle(2, 0x6bdcff, 0.7);
    });

    const sprite = this.partySprites[index];
    if (!sprite) return;

    sprite.setAlpha(1);
    sprite.setStrokeStyle(3, 0xffffff, 1);

    // 활성 캐릭터 네온 링
    const glowWidth = (sprite.width || 90) + 18;
    const glowHeight = (sprite.height || 110) + 18;
    this.activeGlow = this.add.rectangle(sprite.x, sprite.y, glowWidth, glowHeight, 0x6bdcff, 0.22);
    this.activeGlow.setStrokeStyle(2, 0x9de8ff, 0.95);
    this.activeGlow.setDepth((sprite.depth || 0) + 1);

    this.activeGlowTween = this.tweens.add({
      targets: this.activeGlow,
      scale: { from: 1.02, to: 1.09 },
      alpha: { from: 0.65, to: 0.25 },
      duration: 900,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  /**
   * 활성 연출 제거
   */
  clearActiveHighlight() {
    if (this.activeGlowTween) {
      this.activeGlowTween.stop();
      this.activeGlowTween = null;
    }
    if (this.activeGlow) {
      this.activeGlow.destroy();
      this.activeGlow = null;
    }
    if (Array.isArray(this.partySprites)) {
      this.partySprites.forEach((sprite) => {
        if (!sprite) return;
        sprite.setAlpha(1);
        sprite.setStrokeStyle(2, 0x6bdcff, 0.9);
      });
    }
  }

  /**
   * 카메라를 활성 캐릭터로 팬/줌
   */
  focusCameraOnParty(index, instant = false) {
    const cam = this.cameras?.main;
    const sprite = Array.isArray(this.partySprites) ? this.partySprites[index] : null;
    if (!cam || !sprite) return;

    const duration = instant ? 0 : 320;
    const enemy = this.enemySprite;

    // 듀얼 포커스: 활성 캐릭터와 적의 중간 지점을 바라본다
    const targetX = enemy ? (sprite.x + enemy.x) * 0.5 : sprite.x;
    const targetY = enemy ? (sprite.y + enemy.y) * 0.5 : sprite.y;
    const targetZoom = 0.88; // 적과 아군이 함께 보이도록 완화된 줌

    cam.pan(targetX, targetY, duration, 'Quad.easeOut', true);
    cam.zoomTo(targetZoom, duration);
  }

  /**
   * 카메라 기본 위치로 복귀
   */
  resetCameraFocus(instant = false) {
    const cam = this.cameras?.main;
    if (!cam || !this.defaultCameraState) return;
    const duration = instant ? 0 : 420;
    cam.pan(this.defaultCameraState.x, this.defaultCameraState.y, duration, 'Quad.easeOut', true);
    cam.zoomTo(this.defaultCameraState.zoom, duration);
  }

  /**
   * React 제어 UI에서 전달된 스킬 선택 이벤트 처리
   */
  onSkillSelectedFromUI(event) {
    const detail = event?.detail || {};
    const { character, skillType } = detail;
    const active = this.activeTurn;

    if (!active || active.type !== 'party') return;
    if (!this.isPlayerTurn) return;

    const actorIndex = typeof detail?.character?.actorIndex === 'number' ? detail.character.actorIndex : active.index;
    if (typeof actorIndex !== 'number') return;
    if (this.actedThisRound?.has(actorIndex)) return;

    const sprite = Array.isArray(this.partySprites) ? this.partySprites[actorIndex] : null;
    if (!sprite?.scene) return;
    const attacker = character || (Array.isArray(this.partyData) ? this.partyData[actorIndex] : null);
    if (!sprite || !attacker) return;

    this.performAttack(attacker, sprite, skillType || 'normal', actorIndex);
  }

  /**
   * 라운드 시작 시 행동 초기화
   */
  resetRoundActions() {
    this.actedThisRound.clear();
    // 캐릭터 스프라이트 시각 복구
    this.partySprites.forEach((sprite) => {
      if (!sprite) return;
      sprite.setAlpha(1.0);
      sprite.setInteractive({ useHandCursor: true });
    });
  }

  /**
   * 적 턴 자동 실행
   */
  executeEnemyTurnAuto() {
    if (this.isEnemyProcessing) {
      console.warn('[BattleScene] 적 턴 처리 중 재호출 방지');
      return;
    }

    this.isEnemyProcessing = true;
    // 적 턴 시작 시 플레이어 입력 비활성화 (중복 호출도 강제로 false 유지)
    this.isPlayerTurn = false;
    
    // 이전 안전 타이머가 남아 있으면 정리
    if (this.enemyTurnSafetyTimer) {
      clearTimeout(this.enemyTurnSafetyTimer);
      this.enemyTurnSafetyTimer = null;
    }

    // 안전 타이머: 3초 내에 적 행동이 끝나지 않으면 강제로 턴을 넘김
    this.enemyTurnSafetyTimer = setTimeout(() => {
      const partyAliveCount = this.partyStatus.filter((p) => p && p.hp > 0).length;
      console.warn('[BattleScene] 안전 타이머 발동: 적 행동 강제 종료');
      if (typeof this.handleEnemyAttackResult === 'function') {
        this.handleEnemyAttackResult({ partyAliveCount, forced: true, reason: 'timeout' });
      } else if (this.game?.events?.emit) {
        this.game.events.emit('enemy-attack-complete', {
          targetIndex: -1,
          damage: 0,
          isPartyWiped: partyAliveCount === 0,
          partyAliveCount,
          forced: true,
          reason: 'timeout',
        });
      }
      this.isPlayerTurn = true;
      this.isEnemyProcessing = false;
      console.warn('[BattleScene] 안전 타이머로 적 턴 종료 처리 완료');
      if (this.enemyTurnSafetyTimer) {
        clearTimeout(this.enemyTurnSafetyTimer);
        this.enemyTurnSafetyTimer = null;
      }
    }, 3000);
    
    // 적 공격 실행 (계산 모듈 활용)
    const result = calculateEnemyTurn(
      this.enemyData,
      this.partyStatus
    );

    if (!result) {
      console.warn('[BattleScene] 적 턴 결과 없음');
      this.isPlayerTurn = true;
      this.isEnemyProcessing = false;
      return;
    }

    // 파티 상태 업데이트 (안전장치: damage가 배열인지 확인)
    let damageArray = result.damage;
    if (!Array.isArray(damageArray)) {
      // 배열이 아니면 배열로 감싸기 (하위 호환성)
      console.warn('[BattleScene] damage가 배열이 아님, 변환 중:', damageArray);
      if (damageArray && typeof damageArray === 'object' && 'index' in damageArray) {
        damageArray = [damageArray];
      } else if (typeof result.targetIndex === 'number' && typeof damageArray === 'number') {
        // 구형식: { targetIndex, damage } 형식 대응
        damageArray = [{ index: result.targetIndex, damage: damageArray }];
      } else {
        damageArray = [];
      }
    }

    damageArray.forEach(({ index, damage }) => {
      const damageValue = Number(damage || 0);
      if (this.partyStatus[index]) {
        this.partyStatus[index].hp = Math.max(0, this.partyStatus[index].hp - damageValue);
        const hpTextValue = `HP: ${this.partyStatus[index].hp}/${this.partyStatus[index].maxHp}`;
        this.safeSetText(this.partyHpTexts[index], hpTextValue);
        console.log(`[BattleScene] 적이 ${this.partyStatus[index].name}에게 ${damageValue} 데미지`);
      }
    });

    const partyAliveCount = this.partyStatus.filter(p => p && p.hp > 0).length;
    const partySnapshot = this.partyStatus.map((p, idx) => p ? {
      index: idx,
      hp: p.hp,
      maxHp: p.maxHp,
      name: p.name,
      element: p.element,
    } : null);
    console.log('[BattleScene] handleEnemyAttackResult 호출 준비', {
      hasCallback: typeof this.handleEnemyAttackResult === 'function',
      partyAliveCount,
    });
    // 적 공격 결과 React로 전달 (안전장치: 콜백 함수 존재 여부 확인)
    if (typeof this.handleEnemyAttackResult === 'function') {
      this.handleEnemyAttackResult({
        partyAliveCount,
        partyStatus: partySnapshot,
      });
    } else {
      console.error('Critical: handleEnemyAttackResult is missing!');
      if (this.game?.events?.emit) {
        this.game.events.emit('enemy-attack-complete', {
          targetIndex: -1,
          damage: 0,
          isPartyWiped: partyAliveCount === 0,
          partyAliveCount,
          forced: true,
          partyStatus: partySnapshot,
        });
      }
    }

    // 플레이어 턴으로 복귀 (React에서 턴 큐가 관리)
    this.isPlayerTurn = true;
    this.isEnemyProcessing = false;

    if (this.enemyTurnSafetyTimer) {
      clearTimeout(this.enemyTurnSafetyTimer);
      this.enemyTurnSafetyTimer = null;
    }
  }

  /**
   * 캐릭터 클릭 이벤트
   * @param {Object} character - 클릭된 캐릭터
   * @param {number} index - 캐릭터 인덱스
   */
  onCharacterClicked(character, index) {
    if (!this.isPlayerTurn) return; // 적 턴에는 입력 불가
    if (this.actedThisRound?.has(index)) return; // 이미 행동한 캐릭터
    console.log('[BattleScene] 캐릭터 선택:', character.name, index);
    
    SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
    // 클릭은 하이라이트 보정 용도로만 사용 (행동은 React UI가 자동 트리거)
    if (this.activeTurn && this.activeTurn.type === 'party') {
      this.setActiveTurn({ ...this.activeTurn, index });
    }
  }

  /**
   * 스킬 선택 UI 표시 (더 이상 사용 안 함 - React로 이관)
   * @deprecated
   */
  showSkillSelection(character, sprite, actorIndex) {
    // 기존 스킬 UI가 있으면 제거
    if (this.skillUI) {
      this.skillUI.destroy(true);
    }

    const { width, height } = this.cameras.main;
    const skillData = CHARACTER_SKILLS[character.id];
    
    if (!skillData) {
      console.warn('[BattleScene] 스킬 데이터 없음:', character.id);
      this.performAttack(character, sprite, 'normal');
      return;
    }

    // 스킬 UI 컨테이너
    this.skillUI = this.add.container(width / 2, height - 100);

    // 배경
    const bg = this.add.rectangle(0, 0, 600, 120, 0x000000, 0.8);
    bg.setStrokeStyle(2, 0x00ff88);
    this.skillUI.add(bg);

    // 스킬 버튼들
    const getPotency = (type) => {
      const info = skillData?.skillDetails?.[type] || {};
      const defaultPotency = type === 'normal'
        ? (character.role === 'PATHFINDER' ? 1 : 0)
        : type === 'skill'
          ? 1
          : type === 'ultimate'
            ? 2
            : 0;
      return info.elementalPotency ?? defaultPotency;
    };

    const skills = [
      { type: 'normal', name: skillData.skills.normal || '일반 공격', x: -200, color: 0x888888 },
      { type: 'skill', name: skillData.skills.skill || '스킬', x: 0, color: 0x4488ff },
      { type: 'ultimate', name: skillData.skills.ultimate || '필살기', x: 200, color: 0xff4444 },
    ].map((s) => {
      const potency = getPotency(s.type);
      const icon = potency > 0 ? '✴️ ' : '⚔️ ';
      return { ...s, potency, label: `${icon}${s.name}` };
    });

    skills.forEach(({ type, name, label, x, color, potency }) => {
      const btn = this.add.rectangle(x, 0, 150, 80, color);
      btn.setStrokeStyle(2, 0xffffff);
      btn.setInteractive({ useHandCursor: true });
      
      const text = this.add.text(x, 0, label, {
        font: '14px Arial',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 140 }
      }).setOrigin(0.5);

      btn.on('pointerdown', () => {
        console.log(`[BattleScene] 스킬 선택: ${type} - ${name}`);
        SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
        this.skillUI.destroy(true);
        this.skillUI = null;
        this.performAttack(character, sprite, type, actorIndex);
      });

      btn.on('pointerover', () => {
        btn.setFillStyle(color, 1.0);
        btn.setScale(1.05);
      });

      btn.on('pointerout', () => {
        btn.setFillStyle(color, 1.0);
        btn.setScale(1.0);
      });

      this.skillUI.add([btn, text]);
    });

    // 취소 버튼
    const cancelBtn = this.add.text(0, 50, '취소', {
      font: '12px Arial',
      color: '#ff8888',
    }).setOrigin(0.5);
    cancelBtn.setInteractive({ useHandCursor: true });
    cancelBtn.on('pointerdown', () => {
      SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
      this.skillUI.destroy(true);
      this.skillUI = null;
    });
    this.skillUI.add(cancelBtn);
  }

  /**
   * 공격 연출 + 데미지 적용
   * @param {Object} attacker - 공격 캐릭터 데이터
   * @param {Phaser.GameObjects.Rectangle} sprite - 캐릭터 스프라이트
   * @param {string} skillType - 스킬 타입 ('normal', 'skill', 'ultimate')
   */
  performAttack(attacker, sprite, skillType = 'normal', actorIndex = -1) {
    if (!sprite || !sprite.scene) return;

    // 이미 행동한 캐릭터는 추가 행동 불가
    if (actorIndex === -1) {
      actorIndex = this.partySprites.indexOf(sprite);
    }
    if (this.actedThisRound?.has(actorIndex)) {
      console.log('[BattleScene] 이미 행동한 캐릭터입니다:', attacker.name);
      return;
    }

    console.log('[BattleScene] 공격 시작:', {
      attacker: attacker.name,
      attackerElement: attacker.element,
      targetCurrentElement: this.enemyData.currentElement,
      targetBaseElement: this.enemyData.element
    });

    // 입력 잠시 비활성화하여 연타 방지 (씬이 사라진 경우 방어)
    this.safeDisableInteractive(sprite);
    SoundManager.playSFX(AUDIO_KEYS.SFX_ATTACK);

    // 공격자 제자리 번쩍임 효과 (이동 애니메이션 제거)
    this.tweens.add({
      targets: sprite,
      scale: 1.15,
      alpha: 1.0,
      duration: 100,
      yoyo: true,
      repeat: 0,
      ease: 'Quad.Out',
    });

    // 공격 로직 실행 (즉시 실행, 200ms 후)
    this.time.delayedCall(200, () => {
      // ===== 단계 1: 공격 실행 및 반응 계산 =====
      const { result, updatedEnemy } = calculatePlayerAttack(attacker, this.enemyData, skillType, this.missionType);
      this._lastAttackResult = {
        result,
        isWin: (updatedEnemy?.hp ?? 0) <= 0,
      };
      
      // 행동한 캐릭터 표시 (동일 라운드 중복 방지)
      if (this.actedThisRound) {
        this.actedThisRound.add(actorIndex);
        sprite.setAlpha(0.55);
        sprite.setScale(1.0); // 스케일 원상복구
        this.safeDisableInteractive(sprite);
      }
      
      // ===== 단계 2: 적 데이터 업데이트 =====
      SoundManager.playSFX(AUDIO_KEYS.SFX_HIT);
      this.enemyData = { ...this.enemyData, ...updatedEnemy };
      this.enemyHPText.setText(
        `HP: ${this.enemyData.hp}/${this.enemyData.maxHp}`
      );
      
      // 적의 속성 표시 UI 업데이트
      this.updateEnemyElementDisplay();

      // ===== 단계 3: 시각 피드백 =====
      // 충돌 피드백 (적 깜빡임)
      this.tweens.add({
        targets: this.enemySprite,
        alpha: 0.5,
        duration: 100,
        repeat: 2,
        yoyo: true,
      });

      // 데미지 텍스트
      this.showDamageText(
        this.enemySprite.x,
        this.enemySprite.y - 80,
        result.damage,
        result.isCritical
      );

      // 속성 반응 플로팅 텍스트
      this.renderAttackFeedback(result);

      // 공격 완료 이벤트 발행 (300ms 후)
      this.time.delayedCall(300, () => {
        const payload = {
          targetId: this.enemyData.id || this.enemyData.name || 'enemy',
          damage: this._lastAttackResult?.result?.damage || 0,
          gaugeAdded: this._lastAttackResult?.result?.gaugeAdded || 0,
          reactionType: this._lastAttackResult?.result?.reactionType || null,
          isCritical: this._lastAttackResult?.result?.isCritical || false,
          skillType: skillType, // 스킬 타입 전달 (SP 계산용)
          isWin: this._lastAttackResult?.isWin || false,
          attackerIndex: actorIndex,
          partyAliveCount: this.partyStatus.filter((c) => c && c.hp > 0).length,
        };
        console.log('[BattleScene] attack-complete 이벤트 발행:', payload);
        this.game.events.emit('attack-complete', payload);
      });
    });
  }

  /**
   * 적 턴 시작: enemyAI 실행 후 공격 연출
   */
  startEnemyTurn() {
    // 이미 모든 아군이 쓰러졌으면 바로 종료
    const aliveIndexes = this.partyStatus
      .map((c, idx) => (c && c.hp > 0 ? idx : null))
      .filter((v) => v !== null);
    if (aliveIndexes.length === 0) {
      this.game.events.emit('enemy-attack-complete', {
        targetIndex: -1,
        damage: 0,
        isPartyWiped: true,
      });
      return;
    }

    // 플레이어 입력 비활성화
    this.setPlayerTurn(false);

    const { targetIndex, damage } = calculateEnemyTurn(this.enemyData, this.partyStatus);
    const targetSprite = this.partySprites[targetIndex];
    const targetStatus = this.partyStatus[targetIndex];
    const numericDamage = Number(damage || 0);
    if (!targetSprite || !targetStatus) return;

    // 단순 공격 연출: 적이 돌진 후 복귀
    const startX = this.enemySprite.x;
    const startY = this.enemySprite.y;
    const targetX = targetSprite.x - 60;
    const targetY = targetSprite.y;

    this.tweens.chain({
      targets: this.enemySprite,
      tweens: [
        { x: targetX, y: targetY, duration: 180, ease: 'Quad.Out' },
        {
          duration: 80,
          onComplete: () => {
            // 데미지 적용
            SoundManager.playSFX(AUDIO_KEYS.SFX_HIT);
            targetStatus.hp = Math.max(0, targetStatus.hp - numericDamage);
            this.updatePartyHpDisplay(targetIndex);

            // 피격 피드백
            this.tweens.add({
              targets: targetSprite,
              alpha: 0.5,
              duration: 100,
              repeat: 2,
              yoyo: true,
            });

            // 데미지 텍스트
            this.showDamageText(
              targetSprite.x,
              targetSprite.y - 80,
              numericDamage,
              false
            );
          },
        },
        { x: startX, y: startY, duration: 200, ease: 'Quad.InOut' },
      ],
      onComplete: () => {
        this.game.events.emit('enemy-attack-complete', {
          targetIndex,
          targetName: targetStatus.name,
          damage: numericDamage,
          isPartyWiped: this.partyStatus.every((c) => !c || c.hp <= 0),
          partyAliveCount: this.partyStatus.filter((c) => c && c.hp > 0).length,
        });

        // 적 턴 종료 후 플레이어 입력 가능
        this.setPlayerTurn(true);
      },
    });
  }

  /**
   * 아군 HP 표시 업데이트
   */
  updatePartyHpDisplay(index) {
    const status = this.partyStatus[index];
    const text = this.partyHpTexts[index];
    if (!status || !text) return;
    const value = `HP: ${status.hp}/${status.maxHp}`;
    this.safeSetText(text, value);
  }

  /**
   * 공통 플로팅 텍스트
   */
  showFloatingText(x, y, message, color = '#ffffff', fontSize = 32, duration = 900) {
    const text = this.add.text(x, y, message, {
      fontSize: `${fontSize}px`,
      fontFamily: 'Arial',
      color,
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: text,
      y: y - 40,
      alpha: 0,
      duration,
      ease: 'Power2.Out',
      onComplete: () => text.destroy(),
    });
  }

  /**
   * 데미지 텍스트 표시
   */
  showDamageText(x, y, damage, isCritical) {
    const color = isCritical ? '#ffdd00' : '#ff5555';
    const size = isCritical ? 36 : 32;
    const suffix = isCritical ? ' CRIT!' : '';
    this.showFloatingText(x, y, `-${damage}${suffix}`, color, size, 1000);
  }

  /**
   * 안전한 텍스트 업데이트 유틸
   */
  safeSetText(textObj, value) {
    const str = String(value ?? '');
    if (!textObj || textObj.active === false || typeof textObj.setText !== 'function') {
      console.warn('[BattleScene] setText 대상이 유효하지 않습니다. active:', textObj?.active);
      return;
    }
    try {
      textObj.setText(str);
    } catch (err) {
      console.error('[BattleScene] setText 실패:', err);
    }
  }

  /**
   * 안전한 인터랙션 비활성화 (씬/입력 시스템이 살아있을 때만)
   */
  safeDisableInteractive(sprite) {
    if (!sprite) return;
    const canDisable = typeof sprite.disableInteractive === 'function' && sprite.scene?.sys?.input;
    if (canDisable) {
      sprite.disableInteractive();
    } else if (sprite.input) {
      sprite.input.enabled = false;
    }
  }

  renderAttackFeedback(result) {
    const reaction = normalizeReaction(result?.reactionType);

    // 충돌 피드백 (적 깜빡임)
    this.tweens.add({
      targets: this.enemySprite,
      alpha: 0.5,
      duration: 100,
      repeat: 2,
      yoyo: true,
    });

    // 데미지 텍스트
    this.showDamageText(
      this.enemySprite.x,
      this.enemySprite.y - 80,
      result?.damage,
      result?.isCritical
    );

    if (reaction) {
      this.showFloatingText(
        this.enemySprite.x,
        this.enemySprite.y - 120,
        `${reaction}!`,
        '#ffd700',
        30,
        900
      );
    }

    if (result?.gaugeAdded && result.gaugeAdded > 0) {
      this.showFloatingText(
        this.enemySprite.x,
        this.enemySprite.y - 150,
        `+${result.gaugeAdded} Score`,
        '#00baff',
        26,
        900
      );
    }

    this.createExplosion(
      this.enemySprite.x,
      this.enemySprite.y - 20,
      reaction || 'null'
    );
  }

  /**
   * 외부(React)에서 호출되는 일시정지 제어자
   */
  pauseBattle() {
    const scenePlugin = this.scene;
    if (!scenePlugin || typeof scenePlugin.pause !== 'function') return;
    const key = this.sys?.settings?.key || 'BattleScene';
    if (typeof scenePlugin.isPaused === 'function' && scenePlugin.isPaused(key)) {
      return;
    }
    scenePlugin.pause(key);
  }

  resumeBattle() {
    const scenePlugin = this.scene;
    if (!scenePlugin || typeof scenePlugin.resume !== 'function') return;
    const key = this.sys?.settings?.key || 'BattleScene';
    if (typeof scenePlugin.isPaused === 'function' && !scenePlugin.isPaused(key)) {
      return;
    }
    scenePlugin.resume(key);
  }

  /**
   * 매 프레임 업데이트
   */
  update() {
    // 활성 링이 공격 이동 등을 따라다니도록 위치 동기화
    if (this.activeGlow && this.activeTurn?.type === 'party') {
      const sprite = Array.isArray(this.partySprites) ? this.partySprites[this.activeTurn.index] : null;
      if (sprite) {
        this.activeGlow.setPosition(sprite.x, sprite.y);
      }
    }
  }

  /**
   * 속성 반응 결정 (임시 로직)
   * 우선순위: attacker.reaction || attacker.element || 'basic'
   */
  getReaction(attacker) {
    return attacker?.reaction || attacker?.element || 'basic';
  }

  /**
   * 파티클 텍스처가 없으면 생성
   */
  ensureParticleTexture() {
    const key = 'hit-pixel';
    if (this.textures.exists(key)) return;
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0xffffff, 1);
    g.fillCircle(4, 4, 4);
    g.generateTexture(key, 8, 8);
    g.destroy();
  }

  /**
   * 속성 반응 이펙트 생성
   * Phase 3: 새로운 속성 반응 시스템 지원
   * @param {number} x - X 좌표
   * @param {number} y - Y 좌표
   * @param {string} type - 속성 반응 타입
   */
  createExplosion(x, y, type = 'basic') {
    const key = 'hit-pixel';
    if (!this.textures.exists(key)) this.ensureParticleTexture();

    let emitterConfig = {};

    // 반응 타입을 대문자로 변환하여 매칭
    const reactionType = (type || 'basic').toUpperCase();

    if (reactionType && reactionType !== 'NULL' && reactionType !== 'BASIC') {
      SoundManager.playSFX(AUDIO_KEYS.SFX_EXPLOSION);
    }

    switch (reactionType) {
      // ========== CHAOS 계열 (ENTROPY 관련) ==========
      case PHENOMENA.FUSION: // 융합 (ENTROPY + GRAVITY)
        emitterConfig = {
          x, y,
          speed: { min: 200, max: 500 },
          angle: { min: 0, max: 360 },
          scale: { start: 1.5, end: 0 },
          gravityY: 500,
          lifespan: { min: 300, max: 700 },
          tint: [0xff0000, 0xff8800, 0xffff00],
          quantity: 35,
        };
        this.cameras.main.shake(300, 0.015);
        break;

      case PHENOMENA.THERMAL_SHOCK: // 열충격 (ENTROPY + RESONANCE)
        emitterConfig = {
          x, y,
          speed: { min: 180, max: 450 },
          angle: { min: 0, max: 360 },
          scale: { start: 1.3, end: 0 },
          gravityY: 300,
          lifespan: { min: 250, max: 600 },
          tint: [0xff4400, 0xff00ff],
          quantity: 28,
        };
        this.cameras.main.flash(150, 255, 100, 50);
        this.cameras.main.shake(200, 0.006);
        break;

      case PHENOMENA.PLASMA: // 플라즈마 (ENTROPY + AXIOM)
        emitterConfig = {
          x, y,
          speed: { min: 250, max: 550 },
          angle: { min: 0, max: 360 },
          scale: { start: 1.4, end: 0 },
          gravityY: 200,
          lifespan: { min: 350, max: 650 },
          tint: [0x8800ff, 0xff00ff, 0xffffff],
          quantity: 32,
        };
        this.cameras.main.shake(250, 0.012);
        break;

      // ========== SILENCE 계열 (STASIS/GRAVITY 관련) ==========
      case PHENOMENA.ABSOLUTE_ZERO: // 절대영도 (STASIS + GRAVITY)
        emitterConfig = {
          x, y,
          speed: { min: 120, max: 300 },
          angle: { min: -30, max: 210 },
          scale: { start: 1.2, end: 0 },
          gravityY: -50,
          lifespan: { min: 500, max: 1000 },
          tint: [0x00ffff, 0x0088ff, 0xffffff],
          quantity: 25,
        };
        // 시간 느려지는 효과
        const prevScale = this.time.timeScale;
        this.time.timeScale = 0.5;
        this.time.delayedCall(300, () => {
          this.time.timeScale = prevScale;
        });
        this.cameras.main.shake(180, 0.004);
        break;

      case PHENOMENA.OVERLOAD: // 과부하 (STASIS + RESONANCE)
        emitterConfig = {
          x, y,
          speed: { min: 280, max: 580 },
          angle: { min: -70, max: 70 },
          scale: { start: 1.1, end: 0 },
          gravityY: 0,
          lifespan: { min: 200, max: 500 },
          tint: [0xffff00, 0xffaa00],
          quantity: 22,
          frequency: 8,
        };
        // 번개 효과
        this.cameras.main.flash(100, 255, 255, 100);
        this.cameras.main.shake(220, 0.01);
        break;

      case PHENOMENA.BLACK_HOLE: // 블랙홀 (STASIS + AXIOM)
        emitterConfig = {
          x, y,
          speed: { min: 150, max: 400 },
          angle: { min: 0, max: 360 },
          scale: { start: 1.5, end: 0.1 },
          gravityY: 0,
          lifespan: { min: 400, max: 800 },
          tint: [0x440088, 0x000044, 0x8800ff],
          quantity: 40,
        };
        // 화면이 휘어지는 듯한 효과
        this.cameras.main.shake(450, 0.015);
        this.cameras.main.zoomTo(0.98, 200);
        this.time.delayedCall(200, () => {
          this.cameras.main.zoomTo(1.0, 200);
        });
        break;

      // ========== 특수 반응 ==========
      case SPECIAL_REACTIONS.PARADOX_TRIGGER: // 패러독스 트리거 (+100점)
        emitterConfig = {
          x, y,
          speed: { min: 300, max: 700 },
          angle: { min: 0, max: 360 },
          scale: { start: 2.0, end: 0 },
          gravityY: 800,
          lifespan: { min: 400, max: 800 },
          tint: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff],
          quantity: 50,
        };
        // 강력한 화면 쉐이크 + 줌인 효과
        this.cameras.main.shake(520, 0.03);
        this.cameras.main.flash(250, 255, 255, 255);
        this.cameras.main.zoomTo(1.05, 150);
        this.time.delayedCall(150, () => {
          this.cameras.main.zoomTo(1.0, 300);
        });
        break;

      case SPECIAL_REACTIONS.AXIOM_TRIGGER: // 공리 트리거 (+30점)
        emitterConfig = {
          x, y,
          speed: { min: 200, max: 450 },
          angle: { min: 0, max: 360 },
          scale: { start: 1.3, end: 0 },
          gravityY: 100,
          lifespan: { min: 350, max: 700 },
          tint: [0xffffff, 0xffffaa, 0xaaffff],
          quantity: 30,
        };
        this.cameras.main.flash(200, 255, 255, 200);
        this.cameras.main.shake(180, 0.006);
        break;

      // ========== 기본/null ==========
      case 'NULL':
      case null:
      case undefined:
      default:
        emitterConfig = {
          x, y,
          speed: { min: 100, max: 220 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.8, end: 0 },
          gravityY: 250,
          lifespan: 400,
          tint: 0xaaaaaa,
          quantity: 10,
        };
        break;
    }

    // 파티클 생성
    const particles = this.add.particles(0, 0, key, emitterConfig);

    // 반응 타입 텍스트 표시
    if (reactionType && reactionType !== 'NULL' && reactionType !== 'BASIC') {
      const reactionText = this.add.text(x, y + 40, reactionType, {
        font: 'bold 18px Arial',
        color: '#ffff00',
        stroke: '#000000',
        strokeThickness: 4,
        align: 'center',
      }).setOrigin(0.5).setAlpha(0);

      // 텍스트 페이드인 -> 페이드아웃
      this.tweens.add({
        targets: reactionText,
        alpha: 1,
        y: y + 20,
        duration: 300,
        ease: 'Power2.Out',
        onComplete: () => {
          this.tweens.add({
            targets: reactionText,
            alpha: 0,
            y: y,
            duration: 400,
            delay: 200,
            ease: 'Power2.In',
            onComplete: () => {
              reactionText.destroy();
            },
          });
        },
      });
    }

    // 파티클 정리
    this.time.delayedCall(800, () => {
      particles.destroy();
    });
  }
}

export default BattleScene;
