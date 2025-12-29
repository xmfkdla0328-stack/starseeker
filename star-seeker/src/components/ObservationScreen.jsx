import React from 'react';
import { ChevronLeft, Star, Zap, Skull } from 'lucide-react';

/**
 * 관측 타입 선택 화면
 * 행성 관측, 성흔 관측, 재앙 관측 중 선택
 */
export const ObservationScreen = ({ setScreen }) => {
  const observations = [
    {
      id: 'PLANET',
      name: '행성 관측',
      description: '게임의 메인 스토리를 진행하는 컨텐츠입니다. 다양한 행성을 관측하며 이야기를 진행합니다.',
      icon: Star,
      color: 'from-blue-500/30 to-cyan-500/30',
      borderColor: 'border-blue-400/30',
      textColor: 'text-blue-300',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'RUIN',
      name: '성흔 관측',
      description: '별의 조각과 별의 먼지를 획득할 수 있는 컨텐츠입니다. 캐릭터 강화에 필수적인 아이템들을 파밍합니다.',
      icon: Zap,
      color: 'from-yellow-500/30 to-amber-500/30',
      borderColor: 'border-yellow-400/30',
      textColor: 'text-yellow-300',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
      id: 'CALAMITY',
      name: '재앙 관측',
      description: '높은 난이도의 컨텐츠로, 강력한 보상을 얻을 수 있습니다. 도전적인 전투를 원하는 플레이어를 위한 컨텐츠입니다.',
      icon: Skull,
      color: 'from-red-500/30 to-orange-500/30',
      borderColor: 'border-red-400/30',
      textColor: 'text-red-300',
      buttonColor: 'bg-red-500 hover:bg-red-600',
    },
  ];

  const handleObservationSelect = (observationId) => {
    // 나중에 각 관측 타입별 스크린으로 이동
    // 현재는 BattleScreen으로 이동 (스토리 진입)
    setScreen('BATTLE');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setScreen('HOME')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-300" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">관측 선택</h1>
          <p className="text-sm text-slate-400 mt-1">진행할 컨텐츠를 선택하세요</p>
        </div>
      </div>

      {/* 관측 타입 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {observations.map((obs) => {
          const IconComponent = obs.icon;
          return (
            <div
              key={obs.id}
              className={`relative group cursor-pointer h-full min-h-72`}
              onClick={() => handleObservationSelect(obs.id)}
            >
              {/* 배경 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${obs.color} rounded-2xl border ${obs.borderColor} transition-all group-hover:border-opacity-60 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]`}></div>

              {/* 컨텐츠 */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                {/* 아이콘 및 제목 */}
                <div>
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${obs.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-8 h-8 ${obs.textColor}`} />
                  </div>
                  <h2 className={`text-2xl font-bold ${obs.textColor} mb-3`}>{obs.name}</h2>
                </div>

                {/* 설명 */}
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {obs.description}
                  </p>

                  {/* 버튼 */}
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform group-hover:scale-105 ${obs.buttonColor}`}
                  >
                    진입하기
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 안내 텍스트 */}
      <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
        <p className="text-sm text-slate-400">
          💡 <span className="text-slate-300 font-semibold">팁:</span> 각 관측 타입은 서로 다른 보상과 난이도를 제공합니다. 
          자신의 파티 강도에 맞는 난이도를 선택하세요.
        </p>
      </div>
    </div>
  );
};
