import { useState } from 'react';
import { observations as observationDefs } from '../data/observations';

/**
 * 관측 화면의 상태를 관리하는 커스텀 훅
 * @returns {Object} 관측 상태와 상태 업데이트 함수들
 */
export const useObservationState = () => {
  const [selectedStage, setSelectedStage] = useState(observationDefs[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  const observations = observationDefs;

  return {
    selectedStage,
    setSelectedStage,
    isTransitioning,
    setIsTransitioning,
    isDeploying,
    setIsDeploying,
    observations,
  };
};
