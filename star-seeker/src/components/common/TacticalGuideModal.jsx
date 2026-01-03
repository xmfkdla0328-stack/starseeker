import React, { useState } from 'react';
import { X, BookOpen, Zap } from 'lucide-react';

/**
 * 전술 데이터베이스 모달
 * 속성 조합 공식과 직업 분류를 보여주는 가이드
 */
export const TacticalGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('synergy'); // 'synergy' | 'roles'

  if (!isOpen) return null;

  // 인과 연산 공식 데이터
  const synergyRecipes = [
    {
      elements: ['엔트로피', '중력'],
      colors: ['text-red-400', 'text-purple-400'],
      emoji: '💥',
      name: '핵융합',
      nameEn: 'Nuclear Fusion',
      effect: '[광역 폭발] 타겟과 주변 적들에게 데미지 확산.',
      usage: '쫄몹 처리용',
    },
    {
      elements: ['엔트로피', '정체'],
      colors: ['text-red-400', 'text-blue-400'],
      emoji: '💔',
      name: '열충격',
      nameEn: 'Thermal Shock',
      effect: '[방어 파괴] 적의 방어력/보호막을 무시하고 데미지 적용.',
      usage: '보스전용',
    },
    {
      elements: ['엔트로피', '공명'],
      colors: ['text-red-400', 'text-yellow-400'],
      emoji: '🔥',
      name: '플라즈마',
      nameEn: 'Plasma',
      effect: '[지속 피해 전이] 타겟에게 걸린 화상/출혈 등의 DoT를 주변 적에게 복사.',
      usage: '지속딜 전략',
    },
    {
      elements: ['정체', '중력'],
      colors: ['text-blue-400', 'text-purple-400'],
      emoji: '❄️',
      name: '절대영도',
      nameEn: 'Absolute Zero',
      effect: '[빙결/정지] 적을 얼려 1턴간 행동 불가.',
      usage: '적 턴 스킵',
    },
    {
      elements: ['정체', '공명'],
      colors: ['text-blue-400', 'text-yellow-400'],
      emoji: '⚡',
      name: '과부하',
      nameEn: 'Overload',
      effect: '[마비] 적의 스킬 쿨타임을 1~2턴 증가.',
      usage: '스킬 봉인',
    },
    {
      elements: ['중력', '공명'],
      colors: ['text-purple-400', 'text-yellow-400'],
      emoji: '🌑',
      name: '사건의 지평선',
      nameEn: 'Event Horizon',
      effect: '[실명] 적의 명중률 50% 감소.',
      usage: '아군 생존용',
    },
  ];

  // 직업 분류 데이터
  const classRoles = [
    {
      icon: '⚔️',
      name: '패스파인더',
      nameEn: 'PATHFINDER',
      color: 'text-cyan-400',
      description: '선봉에서 적을 탐색하고 초기 전투를 주도하는 전투원. 기동력과 속성 부여 능력이 뛰어남.',
      traits: ['높은 속도', '속성 공격 특화', '선제 타격'],
    },
    {
      icon: '🗡️',
      name: '엑시큐터',
      nameEn: 'EXECUTOR',
      color: 'text-red-400',
      description: '적을 처치하는 데 특화된 공격수. 강력한 단일 타겟 화력으로 핵심 적을 제거.',
      traits: ['최고 화력', '치명타 특화', '단일 대상 집중'],
    },
    {
      icon: '🛡️',
      name: '키퍼',
      nameEn: 'KEEPER',
      color: 'text-blue-400',
      description: '아군을 보호하고 전선을 유지하는 방어형 역할. 높은 내구력과 도발 능력 보유.',
      traits: ['높은 HP/방어력', '도발/보호막', '생존 특화'],
    },
    {
      icon: '💚',
      name: '서스테이너',
      nameEn: 'SUSTAINER',
      color: 'text-green-400',
      description: '아군의 생명을 유지하고 회복시키는 지원형 역할. 치유와 버프 제공.',
      traits: ['회복 능력', '버프/디버프 관리', '팀 생존 보장'],
    },
    {
      icon: '⚡',
      name: '리액터',
      nameEn: 'REACTOR',
      color: 'text-purple-400',
      description: '속성 반응을 극대화하는 전문가. 조합 공격으로 강력한 시너지 효과를 발동.',
      traits: ['속성 반응 강화', '조합 딜러', '시너지 극대화'],
    },
    {
      icon: '🎯',
      name: '태틱션',
      nameEn: 'TACTICIAN',
      color: 'text-amber-400',
      description: '전술적 우위를 제공하는 지원형 역할. 적의 약점을 노출시키고 아군의 전략을 강화.',
      traits: ['디버프 특화', '적 약화', '전술 지원'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
      {/* 모달 컨테이너 */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900/95 backdrop-blur-xl rounded-2xl border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 overflow-hidden"
        style={{ fontFamily: 'Rajdhani, sans-serif' }}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-950/50 to-transparent">
          <div className="flex items-center gap-3">
            <BookOpen size={28} className="text-cyan-400" />
            <div>
              <h2 className="text-2xl font-bold text-cyan-100 tracking-wider">전술 데이터베이스</h2>
              <p className="text-xs text-slate-400 mt-1">TACTICAL DATABASE</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800/60 transition-all text-slate-400 hover:text-cyan-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* 탭 헤더 */}
        <div className="flex border-b border-slate-700/50 bg-slate-950/50">
          <button
            onClick={() => setActiveTab('synergy')}
            className={`flex-1 py-4 px-6 font-bold text-sm uppercase tracking-wider transition-all ${
              activeTab === 'synergy'
                ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Zap size={16} />
              인과 연산 공식
            </span>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex-1 py-4 px-6 font-bold text-sm uppercase tracking-wider transition-all ${
              activeTab === 'roles'
                ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <BookOpen size={16} />
              직업 분류
            </span>
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {activeTab === 'synergy' ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-400 mb-6 pb-4 border-b border-slate-700/50">
                두 가지 속성을 조합하여 강력한 인과 연산을 발동시킬 수 있습니다. 적에게 먼저 속성을 부여한 뒤, 다른 속성으로 공격하면 반응이 일어납니다.
              </p>
              {synergyRecipes.map((recipe, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-slate-800/40 to-transparent rounded-xl p-5 border border-slate-700/30 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* 이모지 아이콘 */}
                    <div className="text-4xl shrink-0">{recipe.emoji}</div>
                    
                    <div className="flex-1">
                      {/* 조합식 */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-bold ${recipe.colors[0]}`}>{recipe.elements[0]}</span>
                        <span className="text-slate-600">+</span>
                        <span className={`font-bold ${recipe.colors[1]}`}>{recipe.elements[1]}</span>
                        <span className="text-slate-600">=</span>
                        <span className="font-bold text-cyan-300">{recipe.name}</span>
                        <span className="text-xs text-slate-500 uppercase">({recipe.nameEn})</span>
                      </div>
                      
                      {/* 효과 */}
                      <div className="text-sm text-slate-300 mb-2">{recipe.effect}</div>
                      
                      {/* 용도 */}
                      <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
                        💡 {recipe.usage}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-slate-400 mb-6 pb-4 border-b border-slate-700/50">
                각 직업은 고유한 전투 역할과 특성을 가지고 있습니다. 팀 구성 시 역할의 균형을 고려하세요.
              </p>
              {classRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-slate-800/40 to-transparent rounded-xl p-5 border border-slate-700/30 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* 아이콘 */}
                    <div className="text-4xl shrink-0">{role.icon}</div>
                    
                    <div className="flex-1">
                      {/* 직업명 */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`font-bold text-lg ${role.color}`}>{role.name}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{role.nameEn}</span>
                      </div>
                      
                      {/* 설명 */}
                      <div className="text-sm text-slate-300 mb-3">{role.description}</div>
                      
                      {/* 특성 태그들 */}
                      <div className="flex flex-wrap gap-2">
                        {role.traits.map((trait, tidx) => (
                          <span
                            key={tidx}
                            className="px-2 py-1 rounded-md bg-slate-700/40 border border-slate-600/40 text-xs text-slate-300"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="p-4 border-t border-cyan-500/30 bg-slate-950/50 text-center">
          <p className="text-xs text-slate-500">
            💡 TIP: 속성 조합을 활용하여 전투의 흐름을 바꿔보세요!
          </p>
        </div>
      </div>
    </div>
  );
};
