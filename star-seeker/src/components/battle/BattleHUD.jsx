import React from 'react';
import TurnOrderPanel from './sub/TurnOrderPanel';
import TurnIndicator from './ui/TurnIndicator';
import EnemyStatusBar from './sub/EnemyStatusBar';
import MissionBanner from './sub/MissionBanner';
import CausalityGauge from './ui/CausalityGauge';
import PauseButton from './ui/PauseButton';
import { BattleResult } from '../../utils/battle/battleUtils';

/**
 * 전투 HUD (헤드 업 디스플레이) 섹션
 * 턴 순서, 적 상태, 미션 정보 등을 표시
 */
export const BattleHUD = ({ 
  turnQueue, 
  activeTurn, 
  battleStatus, 
  enemyData, 
  missionType,
  onPauseClick,
}) => {
  const showHud = battleStatus.result === BattleResult.NONE;

  if (!showHud) return null;

  return (
    <>
      {/* 턴 순서 패널 */}
      {turnQueue.length > 0 && (
        <TurnOrderPanel turnQueue={turnQueue} />
      )}

      {/* 현재 턴 표시 */}
      <TurnIndicator activeTurn={activeTurn} />

      {/* 적 상태 바 */}
      <EnemyStatusBar 
        enemyHp={battleStatus.enemyHp} 
        enemyMaxHp={enemyData.maxHp || 100} 
      />

      {/* 미션 배너 */}
      <MissionBanner 
        missionType={missionType} 
        style={{ top: '100px', left: '20px', transform: 'translateY(0)', zIndex: 15 }} 
      />

      {/* 인과율 게이지 */}
      <CausalityGauge 
        gaugePercent={battleStatus.missionGauge}
        missionGauge={battleStatus.missionGauge}
      />

      {/* 일시정지 버튼 */}
      <PauseButton onClick={onPauseClick} />
    </>
  );
};
