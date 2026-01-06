/**
 * BattleScene 적 정보 및 HP 관리
 */

export const createEnemyHpText = function() {
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
};

export const updateEnemyHpText = function() {
  if (!this.enemyHpText) return;
  
  const enemyData = this.initData?.enemyData;
  const maxHp = enemyData?.maxHp || enemyData?.hp || 100;
  this.enemyHpText.setText(`HP: ${Math.max(0, this.enemyCurrentHp)}/${maxHp}`);
};
