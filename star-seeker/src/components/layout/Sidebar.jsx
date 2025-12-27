import React from 'react';
import { Home, Users, Sparkles, Sprout, Book } from 'lucide-react';

export const Sidebar = ({ screen, setScreen }) => {
  const NavItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setScreen(id)}
      className={`w-full p-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 group relative
        ${screen === id ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}
      `}
    >
      <Icon size={20} className={`transition-transform duration-300 ${screen === id ? 'scale-110' : 'group-hover:scale-110'}`} />
      <span className="text-[10px] font-bold">{label}</span>
      {screen === id && (
        <div className="absolute inset-0 rounded-xl bg-indigo-400/20 animate-pulse"></div>
      )}
    </button>
  );

  return (
    <nav className="w-20 bg-slate-950 border-r border-white/10 flex flex-col items-center py-6 gap-4 z-50 shrink-0">
      <NavItem id="HOME" icon={Home} label="홈" />
      <NavItem id="PARTY" icon={Users} label="편성" />
      <NavItem id="GACHA" icon={Sparkles} label="모집" />
      <NavItem id="GARDEN" icon={Sprout} label="정원" />
      {/* <div className="flex-1"></div>  <-- 이 줄을 삭제하면 위로 붙습니다 */}
      <NavItem id="CODEX" icon={Book} label="도감" />
    </nav>
  );
};