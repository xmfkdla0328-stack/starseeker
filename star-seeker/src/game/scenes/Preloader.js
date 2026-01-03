import Phaser from 'phaser';
import SoundManager from '../../utils/audio/SoundManager';

class Preloader extends Phaser.Scene {
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
    this.load.on('loaderror', (fileObj) => {
      console.warn('[Preloader] Failed to load asset:', fileObj?.key || fileObj);
    });

    // No external assets loaded to avoid CORS; keep preloader lightweight
  }

  create() {
    SoundManager.init(this);
    this.scene.start('BattleScene', {
      ...this.startData,
    });
  }
}

export default Preloader;
