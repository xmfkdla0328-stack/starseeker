import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { SYNERGY_RECIPES, CLASS_ROLES } from '../../data/tacticsData';
import { ModalHeader } from './TacticalGuideModal/ModalHeader';
import { TabButton } from './TacticalGuideModal/TabButton';
import { SynergyContent } from './TacticalGuideModal/SynergyContent';
import { RolesContent } from './TacticalGuideModal/RolesContent';
import { ModalFooter } from './TacticalGuideModal/ModalFooter';
import { SynergyCard } from './TacticalGuideModal/SynergyCard';
import { RoleCard } from './TacticalGuideModal/RoleCard';

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
        <ModalHeader onClose={onClose} />

        {/* 탭 헤더 */}
        <div className="flex border-b border-slate-700/50 bg-slate-950/50">
          <TabButton
            icon={Zap}
            label="인과 연산 공식"
            isActive={activeTab === 'synergy'}
            onClick={() => setActiveTab('synergy')}
          />
          <TabButton
            icon={Zap}
            label="직업 분류"
            isActive={activeTab === 'roles'}
            onClick={() => setActiveTab('roles')}
          />
        </div>

        {/* 탭 컨텐츠 */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {activeTab === 'synergy' ? (
            <SynergyContent recipes={SYNERGY_RECIPES} SynergyCard={SynergyCard} />
          ) : (
            <RolesContent roles={CLASS_ROLES} RoleCard={RoleCard} />
          )}
        </div>

        {/* 푸터 */}
        <ModalFooter />
      </div>
    </div>
  );
};
