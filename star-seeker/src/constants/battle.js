/**
 * @typedef {'CHAOS' | 'SILENCE'} MissionType
 */

export const MISSION_TYPES = Object.freeze({
  CHAOS: 'CHAOS',
  SILENCE: 'SILENCE',
});

export const BATTLE_PHASE = Object.freeze({
  PLAYER: 'PLAYER',
  ENEMY: 'ENEMY',
  ENDED: 'ENDED',
});
