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
    <div className="min-h-full relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12 p-4 md:p-8 animate-fade-in overflow-hidden">
      {/* 우주 먼지 떠다니는 효과 */}
      <FloatingParticles count={3} />

      {/* 왼쪽: 메인 캐릭터 일러스트 */}
      <div className="flex-shrink-0 z-10 order-2 md:order-1">
        <CharacterCircle character={mainChar} onCycle={cycleMainChar} />
      </div>

      {/* 오른쪽: 게임 타이틀 + 버튼 */}
      <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 lg:gap-8 z-20 order-1 md:order-2">
        {/* 게임 타이틀 */}
        <GameTitle />

        {/* 전투 진입 버튼 */}
        <div className="w-full flex justify-center md:justify-end">
          <MissionButton onClick={() => setScreen('OBSERVATION')} />
        </div>
      </div>
    </div>
  );
};