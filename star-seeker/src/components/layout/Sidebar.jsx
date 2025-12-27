import React from 'react';
import { Home, Users, Sparkles, Sprout, Book, Package } from 'lucide-react';

export const Sidebar = ({ screen, setScreen }) => {
  const NavItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setScreen(id)}
      className={`w-full p-3 rounded-lg flex flex-col items-center gap-1 transition-all duration-300 group relative overflow-hidden
        ${screen === id ? 'text-cyan-300' : 'text-slate-500 hover:text-cyan-400'}
      `}
    >
      {/* 홀로그램 배경 효과 */}
      {screen === id && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-blue-500/10 rounded-lg"></div>
          <div className="absolute inset-0 border border-cyan-400/40 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>
          <div className="absolute inset-0 bg-cyan-400/5 animate-pulse"></div>
          {/* 스캔 라인 효과 */}
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan"></div>
        </>
      )}
      
      {/* 아이콘 */}
      <div className="relative z-10">
        <Icon size={22} className={`transition-all duration-300 ${screen === id ? 'scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'group-hover:scale-105'}`} />
        {screen === id && (
          <Circle size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400/20 animate-ping" />
        )}
      </div>
      
      {/* 레이블 */}
      <span className={`text-[9px] font-bold tracking-wider uppercase relative z-10 transition-all ${
        screen === id ? 'text-cyan-200' : 'text-slate-500 group-hover:text-slate-400'
      }`}>{label}</span>
      
      {/* 하단 인디케이터 */}
      {screen === id && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
      )}
    </button>
  );

  return (
    <nav className="w-20 bg-black/40 backdrop-blur-md border-r border-cyan-500/10 flex flex-col items-center py-6 gap-3 z-50 shrink-0 relative">
      {/* 우주 테마 장식 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
      
      {/* 상단 장식 - 망원경 렌즈 느낌 */}
      <div className="w-12 h-12 mb-4 rounded-full border-2 border-cyan-500/30 flex items-center justify-center relative group">
        <div className="w-6 h-6 rounded-full border border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-blue-600/10"></div>
        <div className="absolute inset-0 rounded-full bg-cyan-400/5 animate-pulse"></div>
      </div>
      
      <NavItem id="HOME" icon={Home} label="홈" />
      <NavItem id="PARTY" icon={Users} label="편성" />
      <NavItem id="CODEX" icon={Book} label="관리" />
      <NavItem id="GARDEN" icon={Sprout} label="정원" />
      <NavItem id="GACHA" icon={Sparkles} label="모집" />
      <NavItem id="INVENTORY" icon={Package} label="창고" />
      
      {/* 하단 장식 */}
      <div className="mt-auto pt-4 flex flex-col gap-1 items-center">
        <div className="w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="w-1 h-1 bg-cyan-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </nav>
  );
};