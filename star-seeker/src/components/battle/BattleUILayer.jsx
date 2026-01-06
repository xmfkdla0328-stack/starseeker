import React from 'react';
import ControlDeck from './sub/ControlDeck';
import PauseMenu from './ui/PauseMenu';
import BattleResultModal from './ui/BattleResultModal';
import MissionCompleteEffect from './ui/MissionCompleteEffect';
import { BattleResult } from '../../utils/battle/battleUtils';
import { REACTION_NAMES } from '../../constants/battleConstants';

/**
 * 속성 반응 타입을 한글 이름으로 변환
 */
const getReactionName = (reactionType) => {
  return REACTION_NAMES[reactionType] || reactionType;
};

/**
 * 전투 UI 레이어 (모달, 메뉴, 컨트롤 등)
 */
export const BattleUILayer = ({ 
  battleStatus,
  activeTurn,
  activeCharacter,
  isPauseOpen,
  showRetreatConfirm,
  showMissionComplete,
  isWaitingAnimation,
  onNormalClick,
  onSkillClick,
  onUltimateClick,
  onPauseOpen,
  onResumeBattle,
  onRetreatClick,
  onRetreatCancel,
  onRetreatConfirm,
  onBattleResultBack,
  onBattleResultRestart,
}) => {
  const showHud = battleStatus.result === BattleResult.NONE;

  return (
    <>
      {/* 컨트롤 덱 */}
      {showHud && (
        <ControlDeck
          gaugePercent={battleStatus.missionGauge}
          missionGauge={battleStatus.missionGauge}
          lastReaction={battleStatus.lastReaction ? getReactionName(battleStatus.lastReaction) : null}
          activeTurn={activeTurn}
          activeCharacter={activeCharacter}
          onNormal={onNormalClick}
          onSkill={onSkillClick}
          onUltimate={onUltimateClick}
          isLocked={isWaitingAnimation || battleStatus.result !== BattleResult.NONE}
        />
      )}

      {/* 일시정지 메뉴 */}
      <PauseMenu
        isOpen={isPauseOpen}
        showRetreatConfirm={showRetreatConfirm}
        onResume={onResumeBattle}
        onRetreatPrompt={onRetreatClick}
        onRetreatCancel={onRetreatCancel}
        onRetreatConfirm={onRetreatConfirm}
      />

      {/* 전투 결과 모달 */}
      <BattleResultModal
        result={battleStatus.result}
        onBack={onBattleResultBack}
        onRestart={onBattleResultRestart}
      />

      {/* 미션 완료 시각 효과 */}
      <MissionCompleteEffect show={showMissionComplete} />
    </>
  );
};
