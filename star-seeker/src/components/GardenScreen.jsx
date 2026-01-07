import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { ELEMENTS } from '../constants/index';
import { BackButton } from './common/BackButton';

// 정원 설정 상수
const GARDEN_CONFIG = {
  MAX_CHARACTERS: 5,
  POSITION_RANGE_X: { min: 10, max: 90 },
  POSITION_RANGE_Y: { min: 20, max: 80 },
  UPDATE_INTERVAL: 2000,
  MOVEMENT_RANGE: 5,
  HOVER_SCALE: 1.1,
};

const BENCH_CONFIG = {
  width: 'w-32',
  height: 'h-20',
  left: 'left-16',
  bottom: 'bottom-8',
};

const GardenScreen = ({ inventory, showToast, setScreen }) => {
  const [gardenChars, setGardenChars] = useState([]);
  
  useEffect(() => {
    const placed = inventory.slice(0, GARDEN_CONFIG.MAX_CHARACTERS).map(c => ({
      ...c,
      x: Math.random() * (GARDEN_CONFIG.POSITION_RANGE_X.max - GARDEN_CONFIG.POSITION_RANGE_X.min) + GARDEN_CONFIG.POSITION_RANGE_X.min,
      y: Math.random() * (GARDEN_CONFIG.POSITION_RANGE_Y.max - GARDEN_CONFIG.POSITION_RANGE_Y.min) + GARDEN_CONFIG.POSITION_RANGE_Y.min,
      dir: Math.random() > 0.5 ? 1 : -1
    }));
    setGardenChars(placed);
    
    const interval = setInterval(() => {
      setGardenChars(prev => prev.map(c => ({
        ...c,
        x: Math.max(
          GARDEN_CONFIG.POSITION_RANGE_X.min,
          Math.min(
            GARDEN_CONFIG.POSITION_RANGE_X.max,
            c.x + (Math.random() - 0.5) * GARDEN_CONFIG.MOVEMENT_RANGE
          )
        ),
        dir: Math.random() > 0.5 ? 1 : -1
      })));
    }, GARDEN_CONFIG.UPDATE_INTERVAL);
    
    return () => clearInterval(interval);
  }, [inventory]);

  return (
    <div className="flex flex-col h-full gap-4 relative">
      {/* 뒤로가기 버튼 */}
      <BackButton onClick={() => setScreen('HOME')} />

      <div className="flex-1 relative overflow-hidden rounded-2xl mx-3 mb-3 border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 to-teal-950/50"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      {/* 벤치 */}
      <div className={`absolute ${BENCH_CONFIG.bottom} ${BENCH_CONFIG.left} ${BENCH_CONFIG.width} ${BENCH_CONFIG.height} bg-slate-800/50 rounded-lg transform skew-x-12 border border-white/10 backdrop-blur-sm flex items-end justify-center pb-2 shadow-lg`}>
        <span className="text-slate-500 text-[10px]">벤치</span>
      </div>
      
      {/* 정원의 캐릭터들 */}
      {gardenChars.map((char, idx) => (
        <div 
          key={idx}
          className="absolute transition-all duration-[2000ms] ease-in-out cursor-pointer group flex flex-col items-center z-20 hover:scale-110"
          style={{ left: `${char.x}%`, top: `${char.y}%` }}
          onClick={() => showToast(`${char.name}: "이곳의 공기는 맑군요."`)}
        >
          <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-white/90 text-slate-900 text-[10px] px-2 py-1 rounded-full whitespace-nowrap shadow-lg transition-all font-bold flex items-center gap-1">
            <Sparkles size={8} className="text-yellow-500" /> 휴식
          </div>
          <div className={`w-10 h-10 rounded-full border-2 ${ELEMENTS[char.element].border} shadow-lg flex items-center justify-center ${ELEMENTS[char.element].bg.replace('/20', '/80')} backdrop-blur-sm ${char.dir === 1 ? 'scale-x-100' : '-scale-x-100'} relative overflow-hidden`}>
            <span className="text-[10px] font-bold text-white select-none relative z-10">{char.name[0]}</span>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default GardenScreen;