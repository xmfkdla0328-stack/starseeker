import React from 'react';

export const Background = () => (
  <div className="absolute inset-0 z-0 bg-slate-900">
    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pan-slow"></div>
    <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
    <div className="absolute top-40 right-40 w-1.5 h-1.5 bg-blue-200 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-yellow-100 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/80 pointer-events-none"></div>
  </div>
);