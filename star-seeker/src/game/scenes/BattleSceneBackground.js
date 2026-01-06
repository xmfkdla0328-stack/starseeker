/**
 * BattleScene 배경 및 환경 효과 관리
 */

import Phaser from 'phaser';

export const createBackground = function() {
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
  createStarfield.call(this);
};

export const createStarfield = function() {
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
};

export const createGradientOverlay = function() {
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
};
