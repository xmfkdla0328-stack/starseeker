import React from 'react';
import Timeline from './Timeline';
import EnemyZone from './EnemyZone';
import BattleLog from './BattleLog';
import AllySquad from './AllySquad';
import CommandPanel from './CommandPanel';
import InterventionPanel from './InterventionPanel';
import ActiveUnitBackView from './ActiveUnitBackView';

/**
 * 전투 화면의 순수 레이아웃/구성만 담당하는 컴포넌트
 * 모든 상태/핸들러는 props로 전달받음
 */
const BattleScreen = ({
  units,
  cp,
  activeUnitId,
  battleLog,
  gameStatus,
  interventionMode,
  swapSourceId,
  onUnitClick,
  handleCommandClick,
  toggleInterventionMode,
  handleIntervention,
  BATTLE_CONSTANTS
}) => (
  <div className="w-full h-screen bg-slate-900 text-white flex flex-col font-sans overflow-hidden select-none">
    {/* EnemyZone: 상단 32vh 고정 */}
    <div className="w-full relative flex-none" style={{height: '32vh', minHeight: 180, maxHeight: '40vh'}}>
      <div style={{flex: 1, minWidth: 0, display: 'flex', alignItems: 'stretch', position: 'relative', height: '100%'}}>
        <EnemyZone 
          units={units} 
          activeUnitId={activeUnitId} 
          onUnitClick={onUnitClick} 
          interventionMode={interventionMode} 
          style={{flex: 1, minWidth: 0}}
        />
        {/* BattleLog를 EnemyZone 우측 상단에만 배치 */}
        <div className="absolute right-4 top-4 z-50 pointer-events-auto">
          <BattleLog battleLog={battleLog} />
        </div>
      </div>
    </div>
    {/* Timeline: 중간 10rem(160px) 고정 */}
    <div className="w-full flex-none" style={{height: '10rem', minHeight: 120, maxHeight: 200}}>
      <Timeline 
        units={units} 
        activeUnitId={activeUnitId} 
        onUnitClick={onUnitClick} 
        interventionMode={interventionMode} 
      />
    </div>
    {/* AllyZone: 하단 남은 공간 전체 */}
    <div className="flex-1 min-h-[180px] bg-slate-900 p-4 flex flex-col md:flex-row gap-4 relative w-full min-w-0" style={{overflow: 'auto'}}>
      {/* AllySquad: 좌측 */}
      <div className="flex-1 min-w-0 flex items-stretch">
        <AllySquad 
          units={units} 
          activeUnitId={activeUnitId} 
          onUnitClick={onUnitClick} 
          interventionMode={interventionMode} 
        />
      </div>
      {/* ActiveUnitBackView: AllyZone 중앙 하단에 배치 */}
      <ActiveUnitBackView activeUnitId={activeUnitId} />
      {/* CommandPanel: AllyZone 우측 하단에 고정 */}
      <div className="absolute z-50 right-8 bottom-6">
        <CommandPanel 
          activeUnit={units.find(u => u.id === activeUnitId)} 
          gameStatus={gameStatus} 
          onCommand={handleCommandClick} 
        />
      </div>
      {/* InterventionPanel: AllyZone 내 우측 상단에 절대 위치 */}
      <div className="absolute right-0 z-50 p-2" style={{top: '9.1rem'}}>
        <InterventionPanel 
          cp={cp} 
          maxCp={BATTLE_CONSTANTS.MAX_CP} 
          mode={interventionMode} 
          onSelectMode={toggleInterventionMode} 
          onUseBlackhole={() => handleIntervention('blackhole')} 
        />
      </div>
    </div>
  </div>
);

export default BattleScreen;
