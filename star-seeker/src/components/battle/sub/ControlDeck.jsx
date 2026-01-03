import React, { useEffect, useState, useRef } from 'react';
import SoundManager, { AUDIO_KEYS } from '../../../utils/audio/SoundManager';
import UltimateGauge from './UltimateGauge';
import { CHARACTER_SKILLS } from '../../../data/characters/skillData';

const ControlDeck = ({
  gaugePercent,
  missionGauge,
  lastReaction,
  activeTurn,
  activeCharacter,
  onNormal,
  onSkill,
  onUltimate,
}) => {
  // 현재 턴 캐릭터의 SP 상태
  const currentSp = activeCharacter?.sp || 0;
  const maxSp = activeCharacter?.maxSp || 100;
  const canUseUlt = currentSp >= maxSp;
  
  // 스킬 쿨타임 상태
  const skillCooldown = activeCharacter?.currentSkillCooldown || 0;
  const canUseSkill = skillCooldown === 0;
  
  // 현재 캐릭터의 스킬 정보 가져오기
  const characterSkillData = activeCharacter?.id ? CHARACTER_SKILLS[activeCharacter.id] : null;
  const skillDetails = characterSkillData?.skillDetails || {};
  const isNormalAttributeAttack = skillDetails.normal?.isAttributeAttack || false;
  const isSkillAttributeAttack = skillDetails.skill?.isAttributeAttack || false;
  const isUltimateAttributeAttack = skillDetails.ultimate?.isAttributeAttack || false;
  
  // 쿨타임 해제 플래시 효과
  const [justUnlocked, setJustUnlocked] = useState(false);
  const prevCooldownRef = useRef(skillCooldown);
  
  useEffect(() => {
    // 쿨타임이 1에서 0으로 변할 때 플래시 효과
    if (prevCooldownRef.current > 0 && skillCooldown === 0) {
      setJustUnlocked(true);
      SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK, { volume: 0.4 });
      
      // 0.4초 후 플래시 효과 제거
      setTimeout(() => setJustUnlocked(false), 400);
    }
    prevCooldownRef.current = skillCooldown;
  }, [skillCooldown]);
  const renderActions = () => {
    if (activeTurn?.type === 'party' && activeCharacter) {
      return (
        <div className="flex gap-4 mb-3 justify-center items-end">
          {/* 일반 공격 버튼 */}
          <button
            onClick={() => {
              SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
              onNormal?.();
            }}
            className="action-button"
          >
            <span className="action-icon">⚔️</span>
            <span className="action-label">
              일반 공격
              {isNormalAttributeAttack && (
                <span style={{
                  marginLeft: '4px',
                  fontSize: '9px',
                  padding: '1px 4px',
                  borderRadius: '3px',
                  backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  border: '1px solid rgba(251, 191, 36, 0.4)',
                  color: '#fbbf24',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  속성
                </span>
              )}
            </span>
          </button>
          
          {/* 스킬 버튼 (쿨타임 적용) */}
          <div className="relative">
            <button
              onClick={() => {
                if (canUseSkill) {
                  SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
                  onSkill?.();
                }
              }}
              disabled={!canUseSkill}
              className={`action-button action-button-skill relative transition-all duration-300 ${
                !canUseSkill ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              } ${justUnlocked ? 'cooldown-ready' : ''}`}
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* 쿨타임 오버레이 */}
              {!canUseSkill && (
                <>
                  {/* 빗금 패턴 */}
                  <div 
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: `repeating-linear-gradient(
                        45deg,
                        rgba(0, 0, 0, 0.5),
                        rgba(0, 0, 0, 0.5) 10px,
                        rgba(30, 30, 60, 0.6) 10px,
                        rgba(30, 30, 60, 0.6) 20px
                      )`,
                      mixBlendMode: 'multiply',
                    }}
                  />
                  
                  {/* 홀로그램 자물쇠 아이콘 */}
                  <div 
                    className="absolute top-2 right-2 z-20"
                    style={{
                      fontSize: '20px',
                      filter: 'drop-shadow(0 0 6px rgba(100, 150, 255, 0.8))',
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  >
                    🔒
                  </div>
                  
                  {/* 쿨타임 카운트 */}
                  <div 
                    className="absolute inset-0 z-20 flex items-center justify-center"
                    style={{
                      fontSize: '48px',
                      fontWeight: '900',
                      color: '#6dd5ff',
                      textShadow: `
                        0 0 10px rgba(109, 213, 255, 0.8),
                        0 0 20px rgba(109, 213, 255, 0.6),
                        0 0 30px rgba(109, 213, 255, 0.4)
                      `,
                      animation: 'glow-pulse 1s ease-in-out infinite',
                    }}
                  >
                    {skillCooldown}
                  </div>
                  
                  {/* 쿨타임 텍스트 */}
                  <div 
                    className="absolute bottom-2 left-0 right-0 z-20 text-center"
                    style={{
                      fontSize: '10px',
                      color: '#88ccff',
                      textShadow: '0 0 4px rgba(136, 204, 255, 0.6)',
                      letterSpacing: '1px',
                    }}
                  >
                    ⏳ COOLDOWN
                  </div>
                </>
              )}
              
              <span className="action-icon" style={{ position: 'relative', zIndex: 1 }}>✴️</span>
              <span className="action-label" style={{ position: 'relative', zIndex: 1 }}>
                스킬
                {isSkillAttributeAttack && (
                  <span style={{
                    marginLeft: '4px',
                    fontSize: '9px',
                    padding: '1px 4px',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    color: '#fbbf24',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    속성
                  </span>
                )}
              </span>
            </button>
          </div>
          
          {/* 필살기 버튼 (게이지 통합) */}
          <div className="relative">
            <button
              onClick={() => {
                if (canUseUlt) {
                  SoundManager.playSFX(AUDIO_KEYS.SFX_UI_CLICK);
                  onUltimate?.();
                }
              }}
              disabled={!canUseUlt}
              className={`action-button action-button-ultimate relative ${
                !canUseUlt ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              style={{
                minWidth: '140px',
                minHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* 필살기 게이지 - 버튼 뒤에 배치 */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                }}
              >
                <UltimateGauge 
                  sp={currentSp} 
                  maxSp={maxSp} 
                  isReady={canUseUlt}
                />
              </div>
              
              {/* 버튼 라벨 - 게이지 위에 배치 */}
              <div style={{ position: 'relative', zIndex: 2, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="action-label text-xs">필살기</span>
                {isUltimateAttributeAttack && (
                  <span style={{
                    fontSize: '9px',
                    padding: '1px 4px',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    color: '#fbbf24',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    속성
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (activeTurn?.type === 'enemy') {
      return (
        <div className="text-center text-sm text-slate-300/60 mb-3 tracking-wide">
          적이 행동 중입니다...
        </div>
      );
    }

    return (
      <div className="text-center text-sm text-slate-300/60 mb-3 tracking-wide">
        {activeTurn ? `${activeTurn.name}의 차례입니다` : '턴을 대기 중입니다'}
      </div>
    );
  };

  return (
    <div 
      className="control-deck" 
      style={{ 
        position: 'absolute', 
        bottom: '30px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 18, 
        width: '560px',
        maxWidth: '94vw',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="telescope-gauge mb-4">
        <div className="gauge-track">
          <div className="gauge-glow" style={{ width: `${gaugePercent}%` }} />
          <div className="gauge-stars">
            {[0, 20, 40, 60, 80, 100].map((p) => (
              <span key={p} style={{ left: `${p}%` }} className={gaugePercent >= p ? 'active' : ''} />
            ))}
          </div>
        </div>
        <div className="gauge-label">
          <span>인과율 게이지</span>
          <span className="badge">{missionGauge}/100</span>
        </div>
      </div>

      {lastReaction && (
        <div className="mb-3 px-3 py-2 rounded-lg border border-amber-300/40 bg-amber-200/5 text-amber-100 text-sm font-semibold">
          🔥 속성 반응: {lastReaction}
        </div>
      )}

      {renderActions()}
    </div>
  );
};

export default ControlDeck;
