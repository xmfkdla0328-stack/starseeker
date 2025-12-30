import { useState, useCallback } from 'react';

/**
 * 관측 선택 및 애니메이션 로직
 * ObservationScreen에서 관측 선택, 경고 표시, 회전 애니메이션을 담당
 */
export const useObservationSelection = () => {
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [hoveredObservation, setHoveredObservation] = useState(null);
  const [rotating, setRotating] = useState(false);
  const [partyWarning, setPartyWarning] = useState(false);

  const clearPartyWarning = useCallback(() => {
    const timer = setTimeout(() => setPartyWarning(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return {
    selectedObservation,
    setSelectedObservation,
    hoveredObservation,
    setHoveredObservation,
    rotating,
    setRotating,
    partyWarning,
    setPartyWarning,
    clearPartyWarning,
  };
};
