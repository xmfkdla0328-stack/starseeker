import React from 'react';
import { formatDate, formatPlaytime } from '../../utils/dateHelpers';

export const AccountInfo = ({ playerInfo }) => {
  return (
    <div className="bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl p-4 space-y-3 text-sm shadow-lg shadow-cyan-500/10 backdrop-blur-md transition-all duration-300">
      {/* 가입일 */}
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">관측 시작일</span>
        <span className="text-cyan-100 font-mono text-xs font-bold">
          {formatDate(playerInfo.joinDate)}
        </span>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
      {/* 마지막 접속 */}
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">마지막 접속</span>
        <span className="text-cyan-100 font-mono text-xs font-bold">
          {formatDate(playerInfo.lastLoginDate)}
        </span>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
      {/* 플레이 시간 */}
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">총 관측 시간</span>
        <span className="text-cyan-100 font-mono text-xs font-bold">
          {formatPlaytime(playerInfo.playtime)}
        </span>
      </div>
    </div>
  );
};
