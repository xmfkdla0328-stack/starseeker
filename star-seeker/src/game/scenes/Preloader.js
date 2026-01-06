import Phaser from 'phaser';
import SoundManager from '../../utils/audio/SoundManager';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
    this.startData = {};
  }

  init(data) {
    // Store data to forward after loading
    this.startData = data || {};
  }

  preload() {
    // Guard against load errors so missing files don't break flow
    this.load.on('loaderror', (file) => { 
      console.error('Asset Load Error:', file.key); 
      // 로드 실패 시 기본 이미지로 대체
      if (!this.textures.exists(file.key)) {
        console.warn(`[Preloader] ${file.key} 로드 실패 → seo_ju_mok으로 대체`);
      }
    });

    // 기본 캐릭터 이미지 로드 (모든 캐릭터의 기본값)
    this.load.image('seo_ju_mok', '/assets/images/characters/seo_ju_mok.png');
  }

  createPlaceholderTexture(key) {
    // 128x256 플레이스홀더 텍스처를 동적으로 생성
    if (this.textures.exists(key)) return;
    
    const width = 128;
    const height = 256;
    const canvas = this.textures.createCanvas(key, width, height);
    const ctx = canvas.getContext();
    
    // 배경색 (올리브 그린)
    ctx.fillStyle = '#6B8E23';
    ctx.fillRect(0, 0, width, height);
    
    // 텍스트
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Character', width / 2, height / 2);
    
    canvas.refresh();
  }

  create() {
    SoundManager.init(this);
    // Automatically transition to BattleScene when loading is complete
    this.scene.start('BattleScene', {
      ...this.startData,
    });
  }
}
