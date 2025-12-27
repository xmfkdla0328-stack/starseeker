import React from 'react';

export const AccountInfo = ({ playerInfo }) => {
  return (
    <div className="bg-gradient-to-br from-slate-700/20 to-slate-800/20 border border-slate-500/15 rounded-xl p-4 space-y-2.5 text-sm backdrop-blur-md">
      <div className="flex justify-between items-center text-slate-300">
        <span className="text-xs uppercase tracking-widest">Journey Started</span>
        <span className="text-cyan-300/60 font-mono text-xs">
          {new Date(playerInfo.joinDate).toLocaleDateString()}
        </span>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
      <div className="flex justify-between items-center text-slate-300">
        <span className="text-xs uppercase tracking-widest">Last Seen</span>
        <span className="text-cyan-300/60 font-mono text-xs">
          {new Date(playerInfo.lastLoginDate).toLocaleDateString()}
        </span>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
      <div className="flex justify-between items-center text-slate-300">
        <span className="text-xs uppercase tracking-widest">Hours Traveled</span>
        <span className="text-cyan-300/60 font-mono text-xs">
          {Math.floor(playerInfo.playtime / 60)}h {playerInfo.playtime % 60}m
        </span>
      </div>
    </div>
  );
};
