// Global sound manager with Phaser + HTMLAudio fallback
import Phaser from 'phaser';

export const AUDIO_KEYS = {
  BGM_BATTLE: 'bgm_battle',
  SFX_ATTACK: 'sfx_attack',
  SFX_HIT: 'sfx_hit',
  SFX_EXPLOSION: 'sfx_explosion',
  SFX_UI_CLICK: 'sfx_ui_click',
  SFX_WIN: 'sfx_win',
  SFX_LOSE: 'sfx_lose',
};

export const IMAGE_ASSETS = {
  bg_space: 'https://labs.phaser.io/assets/skies/space3.png',
  char_ally: 'https://labs.phaser.io/assets/sprites/phaser-dude.png',
  char_enemy: 'https://labs.phaser.io/assets/sprites/dragon.png',
};

// Remote, CORS-friendly placeholders from Phaser Labs
export const AUDIO_ASSETS = {
  [AUDIO_KEYS.BGM_BATTLE]: [],
  [AUDIO_KEYS.SFX_ATTACK]: [],
  [AUDIO_KEYS.SFX_HIT]: [],
  [AUDIO_KEYS.SFX_EXPLOSION]: [],
  [AUDIO_KEYS.SFX_UI_CLICK]: [],
  [AUDIO_KEYS.SFX_WIN]: [],
  [AUDIO_KEYS.SFX_LOSE]: [],
};

class SoundManager {
  constructor() {
    this.sound = null; // Phaser sound manager
    this.currentBgm = null;
    this.fallbackAudios = new Map();
  }

  init(scene) {
    // Attach Phaser sound manager if available
    if (scene?.sound instanceof Phaser.Sound.WebAudioSoundManager || scene?.sound instanceof Phaser.Sound.HTML5AudioSoundManager) {
      this.sound = scene.sound;
    } else if (scene?.sound) {
      this.sound = scene.sound;
    }
  }

  stopBGM() {
    try {
      if (this.currentBgm) {
        this.currentBgm.stop();
        this.currentBgm.destroy();
      }
    } catch (err) {
      console.warn('[SoundManager] stopBGM failed:', err);
    }
    this.currentBgm = null;

    // Stop fallback BGM if any
    const fallback = this.fallbackAudios.get('@@bgm');
    if (fallback) {
      try {
        fallback.pause();
        fallback.currentTime = 0;
      } catch (err) {
        console.warn('[SoundManager] stopBGM fallback failed:', err);
      }
      this.fallbackAudios.delete('@@bgm');
    }
  }

  playBGM(key, config = {}) {
    const volume = config.volume ?? 0.5;
    if (!this._hasAudio(key)) return;
    this.stopBGM();

    if (this.sound && this._hasAudio(key)) {
      try {
        this.currentBgm = this.sound.add(key, { loop: true, volume });
        this.currentBgm.play();
        return;
      } catch (err) {
        console.warn('[SoundManager] playBGM failed, falling back:', err);
      }
    }

    // Fallback: HTMLAudio (non-blocking)
    const url = this._resolveUrl(key);
    if (!url) return;
    try {
      const audio = new Audio(url);
      audio.loop = true;
      audio.volume = volume;
      audio.play().catch(() => {});
      this.fallbackAudios.set('@@bgm', audio);
    } catch (err) {
      console.warn('[SoundManager] playBGM fallback failed:', err);
    }
  }

  playSFX(key, config = {}) {
    const volume = config.volume ?? 1.0;
    const detune = config.detune ?? 0;

    if (!this._hasAudio(key)) return;

    if (this.sound && this._hasAudio(key)) {
      try {
        const sound = this.sound.add(key, { volume, detune });
        sound.once('complete', () => sound.destroy());
        sound.play();
        return;
      } catch (err) {
        console.warn('[SoundManager] playSFX failed, falling back:', err);
      }
    }

    // Fallback: spawn a one-shot HTMLAudio element
    const url = this._resolveUrl(key);
    if (!url) return;
    try {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.play().catch(() => {});
    } catch (err) {
      console.warn('[SoundManager] playSFX fallback failed:', err);
    }
  }

  stopAll() {
    try {
      this.sound?.stopAll();
    } catch (err) {
      console.warn('[SoundManager] stopAll failed:', err);
    }
    this.stopBGM();
  }

  _resolveUrl(key) {
    const urls = AUDIO_ASSETS[key];
    if (!urls || urls.length === 0) {
      console.warn('[SoundManager] No audio URL for key:', key);
      return null;
    }
    return urls[0];
  }

  _hasAudio(key) {
    // Phaser cache lookup with guard
    try {
      return this.sound?.game?.cache?.audio?.has(key) || this.sound?.cache?.audio?.has(key) || false;
    } catch (err) {
      return false;
    }
  }
}

const singleton = new SoundManager();
export default singleton;
