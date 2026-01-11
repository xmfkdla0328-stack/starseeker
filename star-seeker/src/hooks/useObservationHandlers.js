/**
 * 관측 화면의 이벤트 핸들러를 관리하는 커스텀 훅
 * @param {Object} params - 핸들러 파라미터
 * @param {Object} params.selectedStage - 현재 선택된 스테이지
 * @param {boolean} params.isTransitioning - 전환 애니메이션 상태
 * @param {boolean} params.isDeploying - 배치 진행 상태
 * @param {Object} params.party - 파티 정보
 * @param {Function} params.setSelectedStage - 스테이지 선택 상태 설정
 * @param {Function} params.setIsTransitioning - 전환 상태 설정
 * @param {Function} params.setIsDeploying - 배치 상태 설정
 * @param {Function} params.setScreen - 화면 전환 함수
 * @param {Function} params.startBattle - 전투 시작 함수
 * @returns {Object} 이벤트 핸들러 함수들
 */
export const useObservationHandlers = ({
  selectedStage,
  isTransitioning,
  isDeploying,
  party,
  setSelectedStage,
  setIsTransitioning,
  setIsDeploying,
  setScreen,
  startBattle,
}) => {
  // 스테이지 선택 핸들러
  const handleStageSelect = (stage) => {
    if (selectedStage?.id === stage.id || isTransitioning) return;
    
    setIsTransitioning(true);
    setSelectedStage(stage);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // 관측 개시 핸들러
  const handleEngage = () => {
    if (!selectedStage || isDeploying) return;
    
    // 파티 체크 - 최소 1명 이상 필요
    const partyChars = Array.isArray(party) ? party.filter((c) => c !== null) : [];
    if (partyChars.length === 0) {
      alert('최소 1명의 캐릭터가 필요합니다.');
      return;
    }
    
    // 스테이지별 처리
    if (selectedStage.id === 'RUIN') {
      // 자원 관측 → 자원 추출 화면으로
      setIsDeploying(true);
      setTimeout(() => {
        setScreen('EXTRACTION');
      }, 800);
    } else if (selectedStage.id === 'CALAMITY') {
      setIsDeploying(true);
      startBattle();
      setTimeout(() => {
        setScreen('BATTLE');
      }, 1000);
    } else {
      setIsDeploying(true);
      setTimeout(() => {
        setScreen('PARTY');
      }, 1000);
    }
  };

  return {
    handleStageSelect,
    handleEngage,
  };
};
