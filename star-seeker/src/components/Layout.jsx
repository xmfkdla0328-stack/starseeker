// src/components/Layout.jsx
import React from 'react';
import { Home, Users, Sword, Cloud, Telescope, Sparkles, Star } from 'lucide-react';

// Sidebar 컴포넌트
export const Sidebar = React.memo(({ screen, setScreen }) => {
  const navItems = [
    { id: 'HOME', icon: Home, label: '홈' },
    { id: 'PARTY', icon: Users, label: '파티' },
    { id: 'BATTLE', icon: Sword, label: '전투' },
    { id: 'GARDEN', icon: Cloud, label: '정원' },
    { id: 'GACHA', icon: Telescope, label: '관측' },
  ];

  return (
    <nav className="h-full w-20 bg-slate-950/50 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-4 z-50 shrink-0 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-purple-500/10 opacity-50 pointer-events-none"></div>
      <div className="mb-4 text-yellow-300 animate-pulse">
        <Sparkles size={24} />
      </div>
      <div className="flex flex-col gap-4 flex-1 justify-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = screen === item.id;
          return (
            <button key={item.id} onClick={() => setScreen(item.id)}
              className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group/btn
                ${isActive ? 'text-yellow-300 bg-white/10 shadow-[0_0_15px_rgba(253,224,71,0.3)] scale-110' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Icon size={20} strokeWidth={1.5} className={`transition-transform duration-300 ${isActive ? 'rotate-0' : 'group-hover/btn:-rotate-12'}`}/>
              {isActive && <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-300/50 animate-ping once"></div>}
            </button>
          );
        })}
      </div>
    </nav>
  );
});

// StatusBar 컴포넌트
export const StatusBar = React.memo(({ gems }) => (
  <div className="absolute top-3 right-4 flex items-center gap-3 z-50 pointer-events-none">
    <div className="bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10 shadow-sm pointer-events-auto">
      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]"></div>
      <span className="text-xs text-slate-300 font-medium">Lv.12</span>
    </div>
    <div className="bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10 text-yellow-300 shadow-sm group cursor-pointer hover:border-yellow-300/50 transition-colors pointer-events-auto">
      <Star size={14} fill="currentColor" className="group-hover:animate-spin once" />
      <span className="font-bold text-sm">{gems.toLocaleString()}</span>
    </div>
  </div>
));

// Background 컴포넌트
export const Background = React.memo(() => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#0f172a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pan-slow"></div>
      {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white animate-twinkle" style={{
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`, opacity: Math.random() * 0.7
          }}></div>
      ))}
  </div>
));