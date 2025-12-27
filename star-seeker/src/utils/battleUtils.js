// src/utils/battleUtils.js

export const BOSS_DATA = {
  name: '화염룡',
  maxHp: 10000,
  atk: 300,
  element: 'FIRE',
  img: 'BOSS'
};

// 속성 상성 계수 계산
export const getElementalMultiplier = (atkElem, defElem) => {
  if (!atkElem || !defElem) return 1.0;
  
  // 유리한 상성 (1.2배)
  if (
    (atkElem === 'WATER' && defElem === 'FIRE') ||
    (atkElem === 'FIRE' && defElem === 'EARTH') ||
    (atkElem === 'EARTH' && defElem === 'WATER') ||
    (atkElem === 'LIGHT' && defElem === 'DARK') ||
    (atkElem === 'DARK' && defElem === 'LIGHT')
  ) {
    return 1.2;
  }
  
  // 불리한 상성 (0.8배)
  if (
    (atkElem === 'FIRE' && defElem === 'WATER') ||
    (atkElem === 'EARTH' && defElem === 'FIRE') ||
    (atkElem === 'WATER' && defElem === 'EARTH')
  ) {
    return 0.8;
  }

  return 1.0;
};

// 시너지 효과 파싱
export const getSynergyBonus = (activeSynergies) => {
  let atkBonusPct = 0;
  let defBonusPct = 0; 
  let johoRevive = false;

  activeSynergies.forEach(syn => {
    if (syn.name === '조영') {
      if (syn.count >= 8) atkBonusPct += 50;
      else if (syn.count >= 6) atkBonusPct += 30;
      else if (syn.count >= 4) atkBonusPct += 20;
      else if (syn.count >= 2) atkBonusPct += 10;
    }
    if (syn.name === '신장의 의지') {
      if (syn.count >= 3) defBonusPct += 15;
      else if (syn.count >= 1) defBonusPct += 5;
    }
    if (syn.name === '조호' && syn.count >= 2) {
      johoRevive = true;
    }
  });

  return { atkBonusPct, defBonusPct, johoRevive };
};