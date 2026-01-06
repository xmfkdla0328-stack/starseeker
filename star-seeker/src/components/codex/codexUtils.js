/**
 * 코덱스 화면에서 사용할 상태 관리 로직
 */

/**
 * 보유 중이면 인벤토리 정보(성장 수치 등) 사용, 아니면 DB 기본 정보 사용
 * 같은 id를 가진 캐릭터 중 가장 높은 breakthrough와 level을 가진 것을 선택
 */
export const getCharacterData = (selectedChar, inventory, selectedCharId) => {
  const isOwned = inventory.some(c => c.id === selectedCharId);
  
  if (!isOwned) {
    return { ...selectedChar, bondLevel: 0 };
  }

  const sameIdChars = inventory.filter(c => c.id === selectedCharId);
  const maxBreakthroughChar = sameIdChars.reduce((max, curr) => {
    const maxBt = max.breakthrough || 0;
    const currBt = curr.breakthrough || 0;
    if (currBt > maxBt) return curr;
    if (currBt === maxBt && curr.level > max.level) return curr;
    return max;
  }, sameIdChars[0]);

  return { ...selectedChar, ...maxBreakthroughChar };
};

/**
 * 스킬 정보 추출
 */
export const getSkillInfo = (charData, key, fallbackDesc) => ({
  desc: charData.skillDetails?.[key]?.desc || fallbackDesc,
  cooldown: charData.skillDetails?.[key]?.cooldown
});
