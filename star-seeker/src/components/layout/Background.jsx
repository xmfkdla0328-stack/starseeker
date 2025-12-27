import React from 'react';
import { BackgroundStar, FloatingStar } from './BackgroundStar';

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
    <BackgroundStar size="small" color="white" position="top-10 left-20" animationDelay="0s" />
    <BackgroundStar size="small" color="blue-100" position="top-32 right-40" animationDelay="0.5s" />
    <BackgroundStar size="small" color="yellow-50" position="top-56 left-1/3" animationDelay="1s" />
    <BackgroundStar size="small" color="purple-100" position="top-80 right-1/4" animationDelay="1.5s" />
    <BackgroundStar size="small" color="cyan-100" position="top-44 left-2/3" animationDelay="2s" />
    
    {/* 별들 레이어 2 (중간 별) */}
    <BackgroundStar size="medium" color="white" position="top-20 right-1/3" animationDelay="0.3s" withShadow={true} />
    <BackgroundStar size="medium" color="blue-200" position="bottom-32 left-1/4" animationDelay="1.2s" />
    <BackgroundStar size="medium" color="yellow-100" position="bottom-56 right-1/5" animationDelay="2.3s" />
    <BackgroundStar size="medium" color="purple-200" position="top-72 right-2/3" animationDelay="1.8s" />
    
    {/* 별들 레이어 3 (큰 별) */}
    <BackgroundStar size="large" color="white" position="top-40 left-1/4" animationDelay="0.8s" withShadow={true} />
    <BackgroundStar size="large" color="cyan-200" position="bottom-40 right-1/3" animationDelay="2.5s" withShadow={true} />
    <BackgroundStar size="large" color="yellow-200" position="top-1/2 left-1/2" animationDelay="1.5s" withShadow={true} />
    
    {/* 떠다니는 별 입자들 */}
    <FloatingStar position="top-1/4 right-1/6" animationDelay="0s" color="white/60" />
    <FloatingStar position="top-2/3 left-1/5" animationDelay="1s" color="blue-200/50" />
    <FloatingStar position="bottom-1/3 right-1/2" animationDelay="2s" color="purple-200/50" />
    
    {/* 은하수 효과 */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-500/5 to-transparent rotate-12 animate-pan-slow"></div>
    
    {/* 그라데이션 오버레이 */}
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-black/60 pointer-events-none"></div>
  </div>
);