
import React, { useState, useEffect } from 'react';
import { BOSS_ENEMIES } from './data/enemy/bossEnemyData';
import useBattleEngine from './hooks/useBattleEngine';
import { BATTLE_CONSTANTS } from './constants/battleConfig';
import { withFinalStats } from './utils/withFinalStats';
import BattleScreen from './components/battle/battleScreen';

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
        <BattleScreen
            units={units}
            cp={cp}
            activeUnitId={activeUnitId}
            battleLog={battleLog}
            gameStatus={gameStatus}
            interventionMode={interventionMode}
            swapSourceId={swapSourceId}
            onUnitClick={onUnitClick}
            handleCommandClick={handleCommandClick}
            toggleInterventionMode={toggleInterventionMode}
            handleIntervention={handleIntervention}
            BATTLE_CONSTANTS={BATTLE_CONSTANTS}
        />
    );
};

export default StarSeekerBattle;

