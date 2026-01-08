/**
 * 모달 배경 오버레이 컴포넌트
 * 우주 별 효과를 포함한 재사용 가능한 모달 배경
 */
export const ModalBackground = ({ onClick }) => {
  return (
    <div 
      className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-slate-950/80 to-black/90 backdrop-blur-md"
      onClick={onClick}
    >
      {/* 별 배경 효과 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"></div>
        <div className="absolute top-40 right-40 w-0.5 h-0.5 bg-blue-200 rounded-full animate-twinkle" style={{ '--animation-delay': '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-purple-200 rounded-full animate-twinkle" style={{ '--animation-delay': '2s' }}></div>
      </div>
    </div>
  );
};
