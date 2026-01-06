import Phaser from 'phaser';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BattleScene' });
    this.initData = null;
    this.enemyCurrentHp = null; // 적의 현재 HP 추적
  }

  init(data) {
    // 전투 데이터 저장
    this.initData = data || {};
    // 적의 현재 HP를 초기값으로 설정
    this.enemyCurrentHp = data?.enemyData?.maxHp || data?.enemyData?.hp || 100;
    console.log('[BattleScene] 초기화 데이터:', data);
    console.log('[BattleScene] 적의 초기 HP:', this.enemyCurrentHp);
  }

  create() {
    this.createBackground(); // 배경 생성
    this.createPlayerCharacters(); // 플레이어 캐릭터 생성
    this.createTurnIndicator(); // 턴 활성화 표시 생성
    this.createGradientOverlay(); // 하단 그라데이션 오버레이 생성
    this.createUI(); // UI 패널 및 인과율 게이지 생성
    this.setupEventListeners(); // 이벤트 리스너 설정

    // 반응형 뷰포트 처리
    this.scale.on('resize', this.handleResize.bind(this));
    this.handleResize(); // 초기 크기 조정
  }

  setupEventListeners() {
    // 스킬 선택 이벤트 리스너
    window.addEventListener('skill-selected', this.handleSkillSelected.bind(this));
    
    // 적 턴 시작 이벤트 리스너
    window.addEventListener('enemy-turn-start', this.handleEnemyTurnStart.bind(this));
  }

  handleSkillSelected(event) {
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
      this.updateEnemyHpText();
      
      // 적 위치에 데미지 표시
      this.showDamageText(this.scale.width * 0.5, 150, `-${damage}`, '#ff4444');
      
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
  }

  handleEnemyTurnStart() {
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
  }

  createBackground() {
    // Depth 0: 기본 우주 배경 그라데이션
    const colors = [0x0a0e27, 0x1a1f3a, 0x0d1b2a];
    const height = this.scale.height;
    const width = this.scale.width;
    const steps = 5;
    
    for (let i = 0; i < steps; i++) {
      const y = (i / steps) * height;
      const color = colors[Math.floor(i % colors.length)];
      const rect = this.add.rectangle(0, y, width, height / steps, color).setOrigin(0, 0);
      rect.setDepth(0);
    }
    
    // 별 배경 추가
    this.createStarfield();
  }
  
  createStarfield() {
    // 별들을 랜덤하게 배치
    const starCount = 80;
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * this.scale.width;
      const y = Math.random() * this.scale.height;
      const size = Math.random() * 1.5 + 0.5;
      const brightness = Math.random() * 0.6 + 0.4;
      
      const star = this.add.circle(x, y, size, 0xffffff, brightness);
      star.setDepth(1);
      
      // 깜빡이는 애니메이션
      if (Math.random() > 0.7) {
        this.tweens.add({
          targets: star,
          alpha: [brightness, brightness * 0.3, brightness],
          duration: 3000 + Math.random() * 2000,
          repeat: -1,
        });
      }
    }
    
    // 우주 가스 효과 (큰 원형 그라데이션)
    const nebula1 = this.add.circle(this.scale.width * 0.2, this.scale.height * 0.3, 200, 0x6a0572, 0.1);
    nebula1.setDepth(1);
    
    const nebula2 = this.add.circle(this.scale.width * 0.8, this.scale.height * 0.6, 250, 0x051a40, 0.08);
    nebula2.setDepth(1);
  }

  createPlayerCharacters() {
    // Depth 10: 파티의 모든 캐릭터 생성
    const partyData = this.initData?.partyData || [];
    
    console.log('[BattleScene] createPlayerCharacters 호출 - partyData:', partyData);
    console.log('[BattleScene] partyData.length:', partyData.length);
    
    if (!partyData || partyData.length === 0) {
      console.warn('[BattleScene] partyData가 비어있거나 없습니다!');
      return;
    }
    
    const characterCount = Math.min(partyData.length, 4); // 최대 4명
    
    // 4명의 캐릭터를 왼쪽부터 일렬로 배치 (밑바닥 근처)
    // 시작 위치: 왼쪽 10%, 간격: 균등하게 분산
    const startX = this.scale.width * 0.10;
    const spacing = this.scale.width * 0.20; // 20% 간격
    
    const positions = [];
    for (let i = 0; i < 4; i++) {
      positions.push({
        x: startX + (spacing * i),
        y: this.scale.height * 0.95,
      });
    }
    
    this.characters = [];
    
    for (let i = 0; i < characterCount; i++) {
      const character = partyData[i];
      const position = positions[i];
      
      // 캐릭터 이미지 결정 (없으면 seo_ju_mok 사용)
      let spriteKey = 'seo_ju_mok'; // 기본값
      
      // 만약 캐릭터별 이미지가 있다면 그것을 사용
      if (character?.characterId && this.textures.exists(`char_${character.characterId}`)) {
        spriteKey = `char_${character.characterId}`;
      } else if (character?.name && this.textures.exists(`char_${character.name}`)) {
        spriteKey = `char_${character.name}`;
      }
      
      // 스프라이트 생성
      const sprite = this.physics.add.sprite(position.x, position.y, spriteKey).setOrigin(0.5, 1);
      sprite.setDepth(10 + i);
      sprite.displayWidth = 90; // 4명이므로 크기를 조금 줄임
      sprite.scaleY = sprite.scaleX;
      
      // 캐릭터 이름 텍스트 (캐릭터 위쪽)
      const nameText = this.add.text(position.x, position.y - 220, character?.name || '캐릭터', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        fontStyle: 'bold',
        align: 'center',
      });
      nameText.setOrigin(0.5, 0.5);
      nameText.setDepth(11 + i);
      nameText.setStroke('#000000', 3); // 검은 테두리 추가
      
      // 캐릭터 HP 텍스트 (초록색, 더 크고 위쪽에)
      const currentHp = character?.currentHp ?? character?.hp ?? character?.maxHp ?? 100;
      const maxHp = character?.maxHp ?? 100;
      const hpText = this.add.text(position.x, position.y - 195, `HP: ${currentHp}/${maxHp}`, {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#00ff00',  // 초록색
        fontStyle: 'bold',
        align: 'center',
      });
      hpText.setOrigin(0.5, 0.5);
      hpText.setDepth(11 + i);
      hpText.setStroke('#000000', 3); // 검은 테두리 추가
      
      console.log(`[BattleScene] 캐릭터 ${i + 1}: ${character?.name} - HP: ${currentHp}/${maxHp}`, character);
      
      // 캐릭터 정보 저장
      this.characters.push({
        sprite,
        nameText,
        hpText,
        data: character,
        index: i,
        currentHp: character?.currentHp ?? character?.hp ?? character?.maxHp ?? 100,
      });
      
      console.log(`[BattleScene] 캐릭터 ${i + 1}: ${character?.name || '알 수 없음'} (${spriteKey})`);
    }
    
    // 첫 번째 캐릭터를 player로도 설정 (하위 호환성)
    this.player = this.characters[0]?.sprite || null;
    
    // 적 HP 텍스트 표시 추가
    this.createEnemyHpText();
  }
  
  // 적 HP 텍스트 생성
  createEnemyHpText() {
    const enemyData = this.initData?.enemyData;
    if (!enemyData) return;
    
    const centerX = this.scale.width * 0.5;
    const topY = 100;
    
    // 적 이름
    this.enemyNameText = this.add.text(centerX, topY, enemyData.name || '적', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ff6666',
      fontStyle: 'bold',
      align: 'center',
    });
    this.enemyNameText.setOrigin(0.5, 0.5);
    this.enemyNameText.setDepth(50);
    this.enemyNameText.setStroke('#000000', 4);
    
    // 적 HP
    const currentHp = this.enemyCurrentHp || enemyData.maxHp || enemyData.hp || 100;
    const maxHp = enemyData.maxHp || enemyData.hp || 100;
    this.enemyHpText = this.add.text(centerX, topY + 25, `HP: ${currentHp}/${maxHp}`, {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#ff4444',
      fontStyle: 'bold',
      align: 'center',
    });
    this.enemyHpText.setOrigin(0.5, 0.5);
    this.enemyHpText.setDepth(50);
    this.enemyHpText.setStroke('#000000', 4);
  }
  
  // 적 HP 업데이트
  updateEnemyHpText() {
    if (!this.enemyHpText) return;
    
    const enemyData = this.initData?.enemyData;
    const maxHp = enemyData?.maxHp || enemyData?.hp || 100;
    this.enemyHpText.setText(`HP: ${Math.max(0, this.enemyCurrentHp)}/${maxHp}`);
  }
  
  // 캐릭터 HP 업데이트
  updateCharacterHp(characterIndex, newHp, maxHp) {
    if (!this.characters || !this.characters[characterIndex]) return;
    
    const char = this.characters[characterIndex];
    const damage = Math.max(0, char.currentHp - newHp);
    char.currentHp = newHp;
    
    if (char.hpText) {
      char.hpText.setText(`HP: ${Math.max(0, newHp)}/${maxHp || 100}`);
    }
    
    // 데미지 플로팅 텍스트 표시
    if (damage > 0) {
      this.showDamageText(char.sprite.x, char.sprite.y - 100, `-${damage}`, '#ff6666');
    }
  }
  
  // 플로팅 데미지 텍스트 표시
  showDamageText(x, y, text, color) {
    const damageText = this.add.text(x, y, text, {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: color,
      fontStyle: 'bold',
      align: 'center',
    });
    damageText.setOrigin(0.5, 0.5);
    damageText.setDepth(50);
    
    // 위로 떠오르면서 사라지는 애니메이션
    this.tweens.add({
      targets: damageText,
      y: y - 50,
      alpha: 0,
      duration: 1500,
      ease: 'Power2.easeOut',
      onComplete: () => {
        damageText.destroy();
      },
    });
  }
  
  createRuntimePlaceholder(key) {
    // 런타임에 플레이스홀더 텍스처 생성
    const width = 128;
    const height = 256;
    const canvas = this.textures.createCanvas(key, width, height);
    const ctx = canvas.getContext();
    
    // 배경색 (올리브 그린)
    ctx.fillStyle = '#6B8E23';
    ctx.fillRect(0, 0, width, height);
    
    // 테두리
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, width - 4, height - 4);
    
    // 텍스트
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Character', width / 2, height / 2);
    
    canvas.refresh();
  }

  createTurnIndicator() {
    // Depth 5: 턴 활성화 표시 (기본 왼쪽 바 제거 - React 컴포넌트로 대체됨)
    // Phaser 기반 턴 인디케이터는 React TurnIndicator 컴포넌트로 대체되었으므로 비활성화
    // 필요시 React에서 통제되는 동적 효과로 구현
  }

  createGradientOverlay() {
    // Depth 20: 하단 그라데이션 오버레이 (Phaser Graphics 방식)
    const graphics = this.add.graphics();
    const height = this.scale.height * 0.3;
    const y = this.scale.height - height;
    
    // Phaser에서는 여러 개의 fillRect로 그라디언트 효과를 시뮬레이션
    const steps = 10;
    for (let i = 0; i < steps; i++) {
      const alpha = i / steps; // 0 -> 1
      const color = Phaser.Display.Color.GetColor(0, 0, 0);
      graphics.fillStyle(color, alpha);
      graphics.fillRect(0, y + (i * height / steps), this.scale.width, height / steps);
    }
    graphics.setDepth(20);
  }

  createUI() {
    // UI는 React 컴포넌트로 관리되므로 Phaser에서는 비활성화
    // 필요시 여기에 Phaser 전용 UI 추가 가능
  }

  handleResize() {
    // 반응형 뷰포트 & 스케일링
    if (!this.characters || this.characters.length === 0) return;

    // 모든 캐릭터를 반응형으로 스케일
    this.characters.forEach((char) => {
      const scaleFactor = Math.min(this.scale.height * 0.75 / char.sprite.height, 1);
      char.sprite.setScale(scaleFactor);
    });
  }

  attackComplete() {
    // 공격 애니메이션 완료 후 스케일 초기화
    this.handleResize();
  }
}
