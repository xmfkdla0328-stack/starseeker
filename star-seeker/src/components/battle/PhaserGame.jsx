import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Phaser from 'phaser';
import Preloader from '../../game/scenes/Preloader';
import BattleScene from '../../game/scenes/BattleScene';
import SoundManager from '../../utils/audio/SoundManager';

/**
 * PhaserGame 컴포넌트
 * 부모 컨테이너 크기에 반응형으로 맞춰지는 Phaser 게임 인스턴스를 관리합니다.
 * @param {{
 *   partyData: Object,
 *   enemyData: Object,
 *   missionType?: string,
 *   battleTurn?: string,
 *   activeTurn?: string | { id?: string, type?: string, index?: number, name?: string },
 *   isPaused?: boolean,
 *   handleAttackResult?: Function,
 *   handleEnemyAttackResult?: Function,
 * }} props - 전투 데이터 및 콜백
 */
const PhaserGame = ({
  partyData,
  enemyData,
  missionType = 'CHAOS',
  battleTurn = 'PLAYER',
  activeTurn = null,
  isPaused = false,
  handleAttackResult,
  handleEnemyAttackResult,
  resumeTurn,
}) => {
  const gameRef = useRef(null);
  const containerRef = useRef(null);
  const handlerRef = useRef(handleAttackResult);
  const enemyHandlerRef = useRef(handleEnemyAttackResult);
  const resumeTurnRef = useRef(resumeTurn);

  // 최신 콜백을 유지
  useEffect(() => {
    handlerRef.current = handleAttackResult;
    enemyHandlerRef.current = handleEnemyAttackResult;
    resumeTurnRef.current = resumeTurn;
  }, [handleAttackResult, handleEnemyAttackResult, resumeTurn]);

  useEffect(() => {
    // 게임 인스턴스가 이미 생성되었으면 정리
    if (gameRef.current) {
      gameRef.current.destroy(true);
    }

    const container = containerRef.current;
    if (!container) return;

    // 컨테이너 크기 가져오기
    const width = container.clientWidth;
    const height = container.clientHeight;

    // missionType이 유효한지 확인 (undefined 방지)
    const resolvedMissionType = typeof missionType === 'string' && missionType.length > 0
      ? missionType
      : 'CHAOS';
    if (!missionType) {
      console.warn('[PhaserGame] missionType이 정의되지 않아 기본값 CHAOS를 사용합니다.');
    }

    // Phaser 설정
    const config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      parent: 'phaser-container',
      transparent: true, // 배경색 투명
      render: {
        pixelArt: false,
        antialias: true,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'phaser-container',
        width: '100%',
        height: '100%',
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [Preloader, BattleScene],
    };

    // Phaser Game 인스턴스 생성 (데이터와 함께)
    const game = new Phaser.Game(config);

    // BattleScene 시작 시 데이터 전달
    game.scene.start('Preloader', {
      partyData,
      enemyData,
      missionType: resolvedMissionType,
      activeTurn,
      handleAttackResult: (data) => {
        if (handlerRef.current) {
          handlerRef.current(data);
        }
      },
      handleEnemyAttackResult: (data) => {
        if (enemyHandlerRef.current) {
          enemyHandlerRef.current(data);
        }
      },
      resumeTurn: () => {
        if (resumeTurnRef.current) {
          resumeTurnRef.current();
        }
      },
    });

    // 공격 완료 이벤트 리스너 등록 (기존 리스너 제거 + cleanup)
    const onAttackComplete = (data) => {
      if (handlerRef.current) {
        handlerRef.current(data);
      }
      // 애니메이션 완료 후 턴 진행 (짧은 딜레이 추가)
      setTimeout(() => {
        if (resumeTurnRef.current) {
          resumeTurnRef.current();
        }
      }, 300);
    };
    const onEnemyAttackComplete = (data) => {
      if (enemyHandlerRef.current) {
        enemyHandlerRef.current(data);
      }
      // 애니메이션 완료 후 턴 진행 (짧은 딜레이 추가)
      setTimeout(() => {
        if (resumeTurnRef.current) {
          resumeTurnRef.current();
        }
      }, 300);
    };
    
    // 1. 기존 리스너 제거 (안전장치: 중복 방지)
    game.events.removeAllListeners('attack-complete');
    game.events.removeAllListeners('enemy-attack-complete');

    // 2. 리스너 등록
    game.events.on('attack-complete', onAttackComplete);
    game.events.on('enemy-attack-complete', onEnemyAttackComplete);

    gameRef.current = game;

    // 윈도우 리사이즈 핸들러
    const handleResize = () => {
      if (gameRef.current && container) {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        gameRef.current.scale.resize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // 정리 함수
    return () => {
      // 3. 클린업 (컴포넌트 언마운트 시 리스너 제거)
      if (gameRef.current) {
        gameRef.current.events?.off('attack-complete', onAttackComplete);
        gameRef.current.events?.off('enemy-attack-complete', onEnemyAttackComplete);
      }
      window.removeEventListener('resize', handleResize);
      if (gameRef.current) {
        SoundManager.stopAll();
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열로 변경하여 한 번만 마운트

  // 턴 상태 전달 및 적 턴 트리거
  useEffect(() => {
    const game = gameRef.current;
    if (!game) return undefined;
    const scene = game.scene.keys?.BattleScene;
    if (!scene) return undefined;

    // 플레이어 입력 가능 여부 설정
    const isPlayer = battleTurn === 'PLAYER';
    scene.setPlayerTurn?.(isPlayer);

    // 플레이어 턴이 새로 시작되면 행동 초기화
    if (isPlayer) {
      scene.resetRoundActions?.();
    }

    if (battleTurn === 'ENEMY') {
      const timer = setTimeout(() => {
        scene.startEnemyTurn?.();
      }, 800); // 살짝 딜레이 후 적 행동

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [battleTurn]);

  // 액티브 턴 정보를 씬에 전달 (하이라이트/카메라용)
  useEffect(() => {
    const game = gameRef.current;
    if (!game || !activeTurn) return undefined;
    const scene = game.scene.keys?.BattleScene;
    if (!scene || typeof scene.setActiveTurn !== 'function') return undefined;

    scene.setActiveTurn(activeTurn);
    return undefined;
  }, [activeTurn]);

  // 일시정지 상태에 따라 Phaser 씬 제어
  useEffect(() => {
    const game = gameRef.current;
    if (!game) return undefined;
    const manager = game.scene;
    const sceneInstance = manager?.keys?.BattleScene;
    if (!manager || typeof manager.isPaused !== 'function' || typeof manager.pause !== 'function' || typeof manager.resume !== 'function') {
      return undefined;
    }
    const targetKey = 'BattleScene';
    const scenePaused = manager.isPaused(targetKey);

    if (isPaused) {
      if (sceneInstance?.pauseBattle) {
        sceneInstance.pauseBattle();
      } else if (!scenePaused) {
        manager.pause(targetKey);
      }
    } else if (scenePaused) {
      if (sceneInstance?.resumeBattle) {
        sceneInstance.resumeBattle();
      } else {
        manager.resume(targetKey);
      }
    }

    return undefined;
  }, [isPaused]);

  return (
    <div
      ref={containerRef}
      id="phaser-container"
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    />
  );
};

PhaserGame.propTypes = {
  partyData: PropTypes.array.isRequired,
  enemyData: PropTypes.object.isRequired,
  missionType: PropTypes.string,
  battleTurn: PropTypes.string,
  // 문자열 ID 또는 턴 큐 객체를 모두 지원해 하위 호환 유지
  activeTurn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      index: PropTypes.number,
      name: PropTypes.string,
      data: PropTypes.object,
    }),
  ]),
  isPaused: PropTypes.bool,
  handleAttackResult: PropTypes.func,
  handleEnemyAttackResult: PropTypes.func,
  resumeTurn: PropTypes.func,
};

export default PhaserGame;
