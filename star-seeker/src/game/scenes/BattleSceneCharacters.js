/**
 * BattleScene 플레이어 캐릭터 생성 및 관리
 */

import { showDamageText as showDamageTextEffect } from './BattleSceneEffects';

export const createPlayerCharacters = function() {
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
};

export const updateCharacterHp = function(characterIndex, newHp, maxHp) {
  if (!this.characters || !this.characters[characterIndex]) return;
  
  const char = this.characters[characterIndex];
  const damage = Math.max(0, char.currentHp - newHp);
  char.currentHp = newHp;
  
  if (char.hpText) {
    char.hpText.setText(`HP: ${Math.max(0, newHp)}/${maxHp || 100}`);
  }
  
  // 데미지 플로팅 텍스트 표시
  if (damage > 0) {
    showDamageTextEffect.call(this, char.sprite.x, char.sprite.y - 100, `-${damage}`, '#ff6666');
  }
};

export const handleResize = function() {
  // 반응형 뷰포트 & 스케일링
  if (!this.characters || this.characters.length === 0) return;

  // 모든 캐릭터를 반응형으로 스케일
  this.characters.forEach((char) => {
    const scaleFactor = Math.min(this.scale.height * 0.75 / char.sprite.height, 1);
    char.sprite.setScale(scaleFactor);
  });
};

export const attackComplete = function() {
  // 공격 애니메이션 완료 후 스케일 초기화
  handleResize.call(this);
};
