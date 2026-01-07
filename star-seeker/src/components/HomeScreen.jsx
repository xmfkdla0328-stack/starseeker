import React from 'react';
import { FloatingParticles } from './home/FloatingParticles';
import { User, Book, Package, Sprout, Sparkles, Users } from 'lucide-react';

const HomeScreen = ({ setScreen, onProfileClick }) => {
  const NavButton = ({ icon: Icon, label, target, onClick }) => (
    <button
      onClick={onClick || (() => setScreen(target))}
      className="group relative flex flex-col items-center gap-1 px-3 py-2 rounded-full text-slate-200 hover:text-cyan-200 transition-all"
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.08)] group-hover:border-cyan-400/40 group-hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]">
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-semibold tracking-wide uppercase opacity-70 group-hover:opacity-100">{label}</span>
    </button>
  );

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in">
      {/* 배경 효과 */}
      <FloatingParticles />

      {/* 상단 타이틀 - 우아한 천문대 느낌 */}
      <div className="fixed top-6 md:top-10 left-6 md:left-10 text-left space-y-1 pointer-events-auto z-30">
        <h1 className="text-4xl md:text-5xl font-serif text-white/90 tracking-[0.45em] drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
          STAR SEEKER
        </h1>
        <p className="text-[11px] md:text-xs text-cyan-200/60 font-mono tracking-[0.35em]">
          COORDINATE: N03L-72
        </p>
      </div>

      {/* 메인 관측 렌즈 버튼 */}
      <button
        onClick={() => setScreen('OBSERVATION')}
        className="relative group flex-shrink-0 w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden backdrop-blur-lg border border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.35)] transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.3),transparent_40%),radial-gradient(circle_at_40%_70%,rgba(14,165,233,0.2),transparent_45%)] animate-pulse-slow" />
        <div className="absolute inset-0 border border-cyan-300/40 rounded-full animate-spin-slow" style={{ animationDuration: '12s' }}></div>
        <div className="absolute inset-3 rounded-full border border-white/10"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <span className="text-xl md:text-2xl font-serif text-white tracking-[0.3em]">OBSERVE</span>
          <span className="text-[10px] md:text-xs text-white/50 font-mono mt-1 tracking-[0.28em]">ACCESS N03L</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </button>

      {/* 하단 글래스 도크 네비게이션 */}
      <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-5 py-3 shadow-[0_0_18px_rgba(0,0,0,0.35)] pointer-events-auto z-50">
        <NavButton icon={User} label="정보" onClick={onProfileClick} />
        <NavButton icon={Users} label="편성" target="PARTY" />
        <NavButton icon={Book} label="관리" target="CODEX" />
        <NavButton icon={Package} label="창고" target="INVENTORY" />
        <NavButton icon={Sprout} label="정원" target="GARDEN" />
        <NavButton icon={Sparkles} label="소집" target="GACHA" />
      </div>
    </div>
  );
};

export default HomeScreen;