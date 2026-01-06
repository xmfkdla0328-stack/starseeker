import React from 'react';

/**
 * 프로필 통계 카드 컴포넌트
 * 아이콘, 제목, 값, 부가 정보를 표시하는 재사용 가능한 카드
 */
export const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subtitle, 
  color = 'cyan' 
}) => {
  const colorClasses = {
    cyan: {
      gradient: '',
      border: 'border-white/10 hover:border-cyan-300/30 hover:bg-cyan-500/15',
      icon: 'text-cyan-300 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]',
      value: 'text-cyan-50 font-bold',
      label: 'text-slate-300',
      subtitle: 'text-slate-400/80 font-mono',
    },
    red: {
      gradient: '',
      border: 'border-white/10 hover:border-red-300/30 hover:bg-red-500/15',
      icon: 'text-red-300 group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]',
      value: 'text-red-50 font-bold',
      label: 'text-slate-300',
      subtitle: 'text-slate-400/80 font-mono',
    },
    amber: {
      gradient: '',
      border: 'border-white/10 hover:border-amber-300/30 hover:bg-amber-500/15',
      icon: 'text-amber-300 group-hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]',
      value: 'text-amber-50 font-bold',
      label: 'text-slate-300',
      subtitle: 'text-slate-400/80 font-mono',
    },
  };

  const styles = colorClasses[color];

  return (
    <div className={`bg-white/5 border ${styles.border} rounded-xl p-4 backdrop-blur-md transition-all duration-300 group cursor-default shadow-lg shadow-cyan-500/10`}>
      <div className="flex items-center justify-center mb-2">
        <Icon size={20} className={styles.icon} />
      </div>
      <p className={`text-xs ${styles.label} uppercase tracking-widest text-center`}>{label}</p>
      <p className={`text-2xl font-bold ${styles.value} text-center mt-1`}>
        {value}
      </p>
      <p className={`text-[10px] ${styles.subtitle} text-center mt-1`}>
        {subtitle}
      </p>
    </div>
  );
};
