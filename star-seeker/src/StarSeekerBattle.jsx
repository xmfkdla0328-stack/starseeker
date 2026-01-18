
import React, { useState, useEffect } from 'react';
import { BOSS_ENEMIES } from './data/enemy/bossEnemyData';
import useBattleEngine from './hooks/useBattleEngine';
import { BATTLE_CONSTANTS } from './constants/battleConfig';
import Timeline from './components/battle/Timeline';
import EnemyZone from './components/battle/EnemyZone';
import BattleLog from './components/battle/BattleLog';
import AllySquad from './components/battle/AllySquad';
import CommandPanel from './components/battle/CommandPanel';
import InterventionPanel from './components/battle/InterventionPanel';
import { withFinalStats } from './utils/withFinalStats';

const StarSeekerBattle = ({ party }) => {
    // 전투 진입 시 아군/적 모두 동일한 distance로 초기화
    const INIT_DISTANCE = 10000;
    const allies = withFinalStats(party).map(u => ({ ...u, distance: INIT_DISTANCE }));
    const enemies = [BOSS_ENEMIES[0]].map(u => ({ ...u, distance: INIT_DISTANCE }));
    const { 
        units, cp, activeUnitId, battleLog, gameStatus,
        tickTimeline, handlePlayerAction, handleIntervention 
    } = useBattleEngine(allies, enemies);
    const [interventionMode, setInterventionMode] = useState(null);
    const [swapSourceId, setSwapSourceId] = useState(null);
    useEffect(() => {
        let interval;
        if (!activeUnitId && gameStatus === 'running') {
            interval = setInterval(tickTimeline, BATTLE_CONSTANTS.TICK_RATE);
        }
        return () => clearInterval(interval);
    }, [activeUnitId, gameStatus, tickTimeline]);
    const onUnitClick = (targetUnit) => {
        if (!interventionMode) return;
        let success = false;
        if (interventionMode === 'swap') {
            if (!swapSourceId) {
                setSwapSourceId(targetUnit.id);
            } else {
                if (swapSourceId === targetUnit.id) {
                    setSwapSourceId(null); 
                    return;
                }
                const sourceUnit = units.find(u => u.id === swapSourceId);
                success = handleIntervention('swap', { source: sourceUnit, target: targetUnit });
                if (success) {
                    setInterventionMode(null);
                    setSwapSourceId(null);
                }
            }
        } else {
            success = handleIntervention(interventionMode, { target: targetUnit });
            if (success) setInterventionMode(null);
        }
    };
    const handleCommandClick = (type) => {
        const targets = units.filter(u => u.type === 'enemy' && u.hp > 0).sort((a,b) => a.distance - b.distance);
        if (targets.length > 0) {
            handlePlayerAction(type, targets[0].id);
        }
    };
    const toggleInterventionMode = (mode) => {
        if (interventionMode === mode) {
            setInterventionMode(null);
            setSwapSourceId(null);
        } else {
            setInterventionMode(mode);
            setSwapSourceId(null);
        }
    };
    return (
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
                {/* AllySquad: 좌측 (모바일/데스크탑 모두 첫 번째) */}
                <div className="flex-1 min-w-0 flex items-stretch">
                    <AllySquad 
                        units={units} 
                        activeUnitId={activeUnitId} 
                        onUnitClick={onUnitClick} 
                        interventionMode={interventionMode} 
                    />
                </div>
                {/* CommandPanel: 중앙 (모바일/데스크탑 모두 두 번째) */}
                {/* CommandPanel: AllyZone 우측 하단에 고정 */}
                <div className="absolute z-50 right-8 bottom-6">
                    <CommandPanel 
                        activeUnit={units.find(u => u.id === activeUnitId)} 
                        gameStatus={gameStatus} 
                        onCommand={handleCommandClick} 
                    />
                </div>
                {/* InterventionPanel: 우측 (모바일/데스크탑 모두 세 번째) */}
                {/* 인과개입 패널: AllyZone 내 우측 상단에 절대 위치 */}
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
};

export default StarSeekerBattle;

