import React from 'react';

export const Background = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* 깊은 우주 배경 */}
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-950 to-black"></div>
    
    {/* 성운 효과 (nebula) */}
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-purple-900/30 via-indigo-900/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-900/20 via-cyan-900/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    
    {/* 우주 먼지 텍스처 */}
    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pan-slow"></div>
    
    {/* 별들 레이어 1 (작은 별) */}
    <div className="absolute top-10 left-20 w-0.5 h-0.5 bg-white rounded-full animate-twinkle shadow-[0_0_2px_white]"></div>
    <div className="absolute top-32 right-40 w-0.5 h-0.5 bg-blue-100 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
    <div className="absolute top-56 left-1/3 w-0.5 h-0.5 bg-yellow-50 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-80 right-1/4 w-0.5 h-0.5 bg-purple-100 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
    <div className="absolute top-44 left-2/3 w-0.5 h-0.5 bg-cyan-100 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
    
    {/* 별들 레이어 2 (중간 별) */}
    <div className="absolute top-20 right-1/3 w-1 h-1 bg-white rounded-full animate-twinkle shadow-[0_0_4px_white]" style={{ animationDelay: '0.3s' }}></div>
    <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-blue-200 rounded-full animate-twinkle" style={{ animationDelay: '1.2s' }}></div>
    <div className="absolute bottom-56 right-1/5 w-1 h-1 bg-yellow-100 rounded-full animate-twinkle" style={{ animationDelay: '2.3s' }}></div>
    <div className="absolute top-72 right-2/3 w-1 h-1 bg-purple-200 rounded-full animate-twinkle" style={{ animationDelay: '1.8s' }}></div>
    
    {/* 별들 레이어 3 (큰 별) */}
    <div className="absolute top-40 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-twinkle shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ animationDelay: '0.8s' }}></div>
    <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-cyan-200 rounded-full animate-twinkle shadow-[0_0_8px_rgba(165,243,252,0.6)]" style={{ animationDelay: '2.5s' }}></div>
    <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-twinkle shadow-[0_0_10px_rgba(254,240,138,0.7)]" style={{ animationDelay: '1.5s' }}></div>
    
    {/* 떠다니는 별 입자들 */}
    <div className="absolute top-1/4 right-1/6 w-px h-px bg-white/60 rounded-full animate-float"></div>
    <div className="absolute top-2/3 left-1/5 w-px h-px bg-blue-200/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-1/3 right-1/2 w-px h-px bg-purple-200/50 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
    
    {/* 은하수 효과 */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-500/5 to-transparent rotate-12 animate-pan-slow"></div>
    
    {/* 그라데이션 오버레이 */}
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-black/60 pointer-events-none"></div>
  </div>
);