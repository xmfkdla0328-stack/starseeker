import React from 'react';
import { FloatingParticles } from './home/FloatingParticles';
import { GameTitle } from './home/GameTitle';
import { CharacterCircle } from './home/CharacterCircle';
import { MissionButton } from './home/MissionButton';

export const HomeScreen = ({ showToast, mainChar, setMainChar, inventory, setScreen }) => {
  const cycleMainChar = () => {
    if (inventory.length <= 1) return;
    const currentIndex = inventory.findIndex((c) => c.id === mainChar.id);
    const nextIndex = (currentIndex + 1) % inventory.length;
    setMainChar(inventory[nextIndex]);
    showToast(`${inventory[nextIndex].name}(으)로 변경되었습니다.`);
  };

  if (!mainChar) return null;

  return (
    <div className="h-full relative flex flex-col items-center justify-between p-4 md:p-6 py-8 md:py-6 animate-fade-in overflow-hidden">
      {/* 우주 먼지 떠다니는 효과 */}
      <FloatingParticles count={3} />

      {/* 게임 타이틀 */}
      <GameTitle />

      {/* 메인 캐릭터 일러스트 */}
      <CharacterCircle character={mainChar} onCycle={cycleMainChar} />

      {/* 전투 진입 버튼 */}
      <div className="w-full flex justify-center z-20 shrink-0">
        <MissionButton onClick={() => setScreen('BATTLE')} />
      </div>
    </div>
  );
};