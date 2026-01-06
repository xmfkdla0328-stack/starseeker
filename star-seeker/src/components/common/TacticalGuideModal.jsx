import React, { useState } from 'react';
import { BookOpen, Zap } from 'lucide-react';
import { SYNERGY_RECIPES, CLASS_ROLES } from '../../data/tacticsData';

/**
 * 전술 데이터베이스 모달
 * 속성 조합 공식과 직업 분류를 보여주는 가이드
 */
export const TacticalGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('synergy'); // 'synergy' | 'roles'

  if (!isOpen) return null;

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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 hover:text-white shadow-[0_0_12px_rgba(255,255,255,0.1)] backdrop-blur-md transition-all duration-300"
            aria-label="Close"
          >
            X
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
              {SYNERGY_RECIPES.map((recipe, idx) => (
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
              {CLASS_ROLES.map((role, idx) => (
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
