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
      gradient: 'from-cyan-500/10 to-blue-600/10',
      border: 'border-cyan-300/15 hover:border-cyan-300/25 hover:bg-cyan-500/15',
      icon: 'text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]',
      value: 'text-cyan-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]',
      label: 'text-cyan-300/60',
      subtitle: 'text-cyan-300/40',
    },
    red: {
      gradient: 'from-red-500/10 to-orange-600/10',
      border: 'border-red-300/15 hover:border-red-300/25 hover:bg-red-500/15',
      icon: 'text-red-300 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]',
      value: 'text-red-100 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]',
      label: 'text-red-300/60',
      subtitle: 'text-red-300/40',
    },
    amber: {
      gradient: 'from-amber-500/10 to-yellow-600/10',
      border: 'border-amber-300/15 hover:border-amber-300/25 hover:bg-amber-500/15',
      icon: 'text-amber-300 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]',
      value: 'text-amber-100 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]',
      label: 'text-amber-300/60',
      subtitle: 'text-amber-300/40',
    },
  };

  const styles = colorClasses[color];

  return (
    <div className={`bg-gradient-to-br ${styles.gradient} border ${styles.border} rounded-xl p-4 backdrop-blur-md transition-all duration-300 group cursor-default`}>
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
