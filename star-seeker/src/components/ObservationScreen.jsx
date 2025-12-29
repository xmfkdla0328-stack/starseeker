import React, { useState } from 'react';
import { ChevronLeft, Star, Zap, Skull } from 'lucide-react';

/**
 * 망원경 관측 화면
 * 사용자가 망원경을 통해 각 관측 대상을 선택하는 인터랙티브 컨셉
 */
export const ObservationScreen = ({ setScreen }) => {
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [rotating, setRotating] = useState(false);

  const observations = [
    {
      id: 'PLANET',
      name: '행성 관측',
      description: '게임의 메인 스토리를 진행하는 컨텐츠입니다. 다양한 행성을 관측하며 이야기를 진행합니다.',
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'from-blue-400/50 to-cyan-400/50',
      textColor: 'text-blue-300',
      position: 0, // degree
    },
    {
      id: 'RUIN',
      name: '성흔 관측',
      description: '별의 조각과 별의 먼지를 획득할 수 있는 컨텐츠입니다. 캐릭터 강화에 필수적인 아이템들을 파밍합니다.',
      icon: Zap,
      color: 'from-yellow-500 to-amber-500',
      glowColor: 'from-yellow-400/50 to-amber-400/50',
      textColor: 'text-yellow-300',
      position: 120,
    },
    {
      id: 'CALAMITY',
      name: '재앙 관측',
      description: '높은 난이도의 컨텐츠로, 강력한 보상을 얻을 수 있습니다. 도전적인 전투를 원하는 플레이어를 위한 컨텐츠입니다.',
      icon: Skull,
      color: 'from-red-500 to-orange-500',
      glowColor: 'from-red-400/50 to-orange-400/50',
      textColor: 'text-red-300',
      position: 240,
    },
  ];

  const handleObservationSelect = (obs) => {
    setSelectedObservation(obs);
    setRotating(true);
    setTimeout(() => {
      // 확대 애니메이션 후 진입
      setScreen('BATTLE');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 p-6 flex flex-col overflow-hidden relative">
      {/* 별 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.3,
              animationDuration: Math.random() * 3 + 2 + 's',
            }}
          />
        ))}
      </div>

      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <button
          onClick={() => setScreen('HOME')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-300" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">우주 망원경</h1>
          <p className="text-sm text-slate-400 mt-1">관측할 천체를 선택하세요</p>
        </div>
      </div>

      {/* 망원경 뷰포트 */}
      <div className="flex-1 flex items-center justify-center relative z-20">
        <div className="relative w-96 h-96 max-w-full">
          {/* 망원경 바깥 테두리 */}
          <div className="absolute inset-0 rounded-full border-8 border-slate-600 shadow-2xl">
            {/* 광학 반사 효과 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
            
            {/* 망원경 포커싱 라인 */}
            <div className="absolute inset-0 rounded-full border-2 border-slate-500/30 animate-pulse"></div>
          </div>

          {/* 중앙 뷰포트 배경 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-sm flex items-center justify-center">
            {/* 내부 육각형 그리드 */}
            <div className="absolute inset-0 rounded-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" className="text-slate-400" strokeWidth="1" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" className="text-slate-400" strokeWidth="1" />
                <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" className="text-slate-400" strokeWidth="1" />
                <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" className="text-slate-400" strokeWidth="1" />
                <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" className="text-slate-400" strokeWidth="1" />
              </svg>
            </div>

            {/* 중앙 포커스 포인트 */}
            <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse"></div>
          </div>

          {/* 관측 대상들 (원형 배치) */}
          {observations.map((obs, index) => {
            const IconComponent = obs.icon;
            const angle = (obs.position * Math.PI) / 180;
            const radius = 130;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isSelected = selectedObservation?.id === obs.id;

            return (
              <div
                key={obs.id}
                className={`absolute w-24 h-24 transition-all duration-500 ${
                  rotating && isSelected ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
                }`}
                style={{
                  left: `calc(50% + ${x}px - 48px)`,
                  top: `calc(50% + ${y}px - 48px)`,
                }}
              >
                <button
                  onClick={() => handleObservationSelect(obs)}
                  disabled={rotating}
                  className={`relative w-full h-full rounded-full transition-all duration-300 group disabled:cursor-not-allowed`}
                >
                  {/* 글로우 효과 */}
                  <div
                    className={`absolute inset-0 rounded-full blur-xl bg-gradient-to-r ${obs.glowColor} opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-300`}
                  ></div>

                  {/* 행성/별 본체 */}
                  <div
                    className={`relative w-full h-full rounded-full bg-gradient-to-br ${obs.color} shadow-lg border-2 border-white/30 flex items-center justify-center overflow-hidden group-hover:border-white/60 group-disabled:opacity-75`}
                  >
                    {/* 회전 애니메이션 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-spin"></div>

                    {/* 아이콘 */}
                    <IconComponent className="w-10 h-10 text-white relative z-10" />
                  </div>

                  {/* 선택 인디케이터 */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                </button>

                {/* 라벨 */}
                <div className="mt-2 text-center pointer-events-none">
                  <p className={`text-xs font-bold ${obs.textColor}`}>{obs.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 정보 패널 */}
      <div className="relative z-10 mt-8">
        {selectedObservation ? (
          <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-white/5 to-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
            <h2 className={`text-2xl font-bold ${selectedObservation.textColor} mb-2`}>
              {selectedObservation.name}
            </h2>
            <p className="text-slate-300">{selectedObservation.description}</p>
            <div className="mt-4 text-sm text-slate-400">
              🔭 망원경 정조중... 진입 준비 중
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto p-6 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
            <p className="text-center text-slate-300">
              💡 <span className="font-semibold">망원경 조정:</span> 원 위의 천체를 선택하여 관측하세요. 
              각 천체는 서로 다른 보상과 난이도를 제공합니다.
            </p>
          </div>
        )}
      </div>

      {/* 망원경 조절기 (장식) */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 flex flex-col gap-4 z-10 hidden lg:flex">
        <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center text-xs text-slate-300">
          +
        </div>
        <div className="w-8 h-24 border-2 border-slate-500 rounded-full bg-slate-800/50"></div>
        <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center text-xs text-slate-300">
          −
        </div>
      </div>
    </div>
  );
};

