import Phaser from 'phaser';
import {
  createBackground,
  createGradientOverlay,
} from './BattleSceneBackground';
import {
  createPlayerCharacters,
  updateCharacterHp,
  handleResize,
  attackComplete,
} from './BattleSceneCharacters';
import {
  createEnemyHpText,
  updateEnemyHpText,
} from './BattleSceneEnemy';
import {
  showDamageText,
  createRuntimePlaceholder,
} from './BattleSceneEffects';
import {
  setupEventListeners,
  handleSkillSelected as handleSkillSelectedLogic,
  handleEnemyTurnStart as handleEnemyTurnStartLogic,
} from './BattleSceneEvents';

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
    createBackground.call(this);
    createPlayerCharacters.call(this);
    createEnemyHpText.call(this); // 캐릭터 생성 후 적 HP 텍스트 생성
    this.createTurnIndicator();
    createGradientOverlay.call(this);
    setupEventListeners.call(this);

    // 반응형 뷰포트 처리
    this.scale.on('resize', () => {
      handleResize.call(this);
    });
    handleResize.call(this); // 초기 크기 조정
  }

  createTurnIndicator() {
    // Depth 5: 턴 활성화 표시 (기본 왼쪽 바 제거 - React 컴포넌트로 대체됨)
    // Phaser 기반 턴 인디케이터는 React TurnIndicator 컴포넌트로 대체되었으므로 비활성화
    // 필요시 React에서 통제되는 동적 효과로 구현
  }

  // 메서드 바인딩 (이벤트 핸들러에서 'this' 컨텍스트 유지)
  handleSkillSelected = (event) => {
    handleSkillSelectedLogic.call(this, event);
  }

  handleEnemyTurnStart = (event) => {
    handleEnemyTurnStartLogic.call(this, event);
  }

  // 공개 메서드 (외부에서 접근 가능)
  showDamageText(x, y, text, color) {
    showDamageText.call(this, x, y, text, color);
  }

  updateEnemyHpText() {
    updateEnemyHpText.call(this);
  }

  updateCharacterHp(characterIndex, newHp, maxHp) {
    updateCharacterHp.call(this, characterIndex, newHp, maxHp);
  }
}
