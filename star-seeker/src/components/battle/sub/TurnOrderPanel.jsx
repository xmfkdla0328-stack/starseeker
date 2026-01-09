import React from 'react';

const TurnOrderPanel = ({ turnQueue = [] }) => {
  // 테스트용: turnQueue가 비어있으면 더미 데이터 표시
  const displayQueue = turnQueue.length > 0 ? turnQueue : [
    { id: 'char1', name: '서주목', type: 'party', speed: 126 },
    { id: 'char2', name: '슬라', type: 'party', speed: 122 },
    { id: 'char3', name: '막주', type: 'party', speed: 116 },
    { id: 'char4', name: '칼슴', type: 'party', speed: 110 },
    { id: 'enemy', name: '보스', type: 'enemy', speed: 100 },
  ];

  return null;
};

export default TurnOrderPanel;
};

export default TurnOrderPanel;
