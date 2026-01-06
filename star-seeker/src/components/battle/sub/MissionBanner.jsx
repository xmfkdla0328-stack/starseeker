import React from 'react';
import { MISSION_TYPES } from '../../../constants/battle';

const MissionBanner = ({ missionType, style = {} }) => {
  return (
    <div
      className={`mission-banner battle-mission-banner ${missionType === MISSION_TYPES.CHAOS ? 'mission-banner-chaos' : 'mission-banner-silence'}`}
      style={{
        position: 'absolute',
        textAlign: 'left',
        maxWidth: '240px',
        width: '240px',
        ...style,
      }}
    >
      <span className="mission-bracket">[</span>
      <span className="mission-text">목표: {missionType === MISSION_TYPES.CHAOS ? '혼돈' : '침묵'}</span>
      <span className="mission-bracket">]</span>
    </div>
  );
};

export default MissionBanner;
