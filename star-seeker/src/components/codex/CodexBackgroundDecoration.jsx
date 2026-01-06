import React from 'react';

/**
 * 코덱스 화면 배경 장식 (배경 타이틀)
 */
export const CodexBackgroundDecoration = () => {
  return (
    <div className="absolute top-4 right-8 pointer-events-none text-right z-0">
      <h1 className="text-4xl font-serif text-white/5 tracking-widest font-black">ARCHIVE</h1>
      <p className="text-xs text-cyan-500/20 font-mono tracking-[0.5em]">PERSONNEL DATABASE</p>
    </div>
  );
};
