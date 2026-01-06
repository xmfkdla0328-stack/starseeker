/**
 * BattleScene 효과 및 애니메이션 관리
 */

export const showDamageText = function(x, y, text, color) {
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
};

export const createRuntimePlaceholder = function(key) {
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
};
