import { getLevelFromExp, LEVEL_EXP_TABLE, calculateStatsByLevel } from '../data/levelSystem';
import { getMaxLevelByBreakthrough } from '../data/breakthroughItems';

const EXP_PER_CHIP = 200; // 기억 추출물 1개당 제공 경험치

/**
 * 캐릭터 레벨업/성장 로직
 * 인벤토리, 파티, 아이템 상태를 동시에 갱신합니다.
 */
export const useLevelSystem = ({ inventory, setInventory, items, setItems, party, setParty, showToast }) => {
  const resolveExp = (character) => {
    if (typeof character?.exp === 'number') return character.exp;
    const lv = character?.level || 1;
    return LEVEL_EXP_TABLE[lv] || 0;
  };

  const handleLevelUp = (characterId, chipsToUse = 0) => {
    if (!characterId || chipsToUse <= 0) {
      showToast?.('사용할 기억 추출물 개수를 선택하세요.');
      return { success: false };
    }

    const availableChips = items?.exp_chip || 0;
    if (availableChips < chipsToUse) {
      showToast?.('기억 추출물이 부족합니다.');
      return { success: false };
    }

    let updatedCharacter = null;

    setInventory((prev) => {
      const updated = prev.map((c) => {
        if (!c || (c.uid ?? c.id) !== characterId) return c;

        const breakthrough = c.breakthrough || 0;
        const maxLevel = getMaxLevelByBreakthrough(breakthrough) || 60;
        const baseExp = resolveExp(c);
        const gainedExp = chipsToUse * EXP_PER_CHIP;
        const cappedExp = Math.min(baseExp + gainedExp, LEVEL_EXP_TABLE[maxLevel] || baseExp + gainedExp);
        const { level: newLevel, currentExp } = getLevelFromExp(cappedExp);
        const stats = calculateStatsByLevel(
          c.baseAtk || c.currentAtk || 100,
          c.baseHp || c.currentHp || 1000,
          newLevel,
          breakthrough,
          c.baseDef || c.currentDef || 30
        );

        updatedCharacter = {
          ...c,
          exp: currentExp,
          level: newLevel,
          currentAtk: stats.atk,
          currentHp: stats.hp,
          currentDef: stats.def,
        };
        return updatedCharacter;
      });
      return updated;
    });

    // 인벤토리 업데이트 후 파티 상태 동기화
    if (updatedCharacter) {
      setParty?.((prev) => {
        if (!prev?.members) return prev;
        const members = prev.members.map((m) => {
          if (!m) return m;
          if ((m.uid ?? m.id) === (updatedCharacter.uid ?? updatedCharacter.id)) {
            return { ...m, ...updatedCharacter };
          }
          return m;
        });
        return { ...prev, members };
      });

      setItems?.((prev) => ({
        ...prev,
        exp_chip: Math.max(0, (prev?.exp_chip || 0) - chipsToUse),
      }));

      showToast?.(`레벨업! Lv.${updatedCharacter.level} / ATK ${updatedCharacter.currentAtk}`);
      return { success: true, character: updatedCharacter };
    }

    showToast?.('대상 캐릭터를 찾을 수 없습니다.');
    return { success: false };
  };

  return { handleLevelUp, EXP_PER_CHIP };
};
