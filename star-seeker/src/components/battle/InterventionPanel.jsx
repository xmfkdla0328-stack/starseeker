import React, { useState, useRef, useEffect } from 'react';
import { Magnet, Hand, ArrowLeftRight, Circle } from 'lucide-react';

const SKILLS = [
    {
        key: 'pull',
        icon: <Magnet size={24} className="text-cyan-400" />,
        label: '중력 가속',
        cp: 250,
        borderColorClass: 'border-cyan-400',
        iconColorClass: 'text-cyan-400',
        shadowColor: 'shadow-cyan-400/30',
    },
    {
        key: 'push',
        icon: <Hand size={24} className="text-yellow-400" />,
        label: '궤도 이탈',
        cp: 250,
        borderColorClass: 'border-yellow-400',
        iconColorClass: 'text-yellow-400',
        shadowColor: 'shadow-yellow-400/30',
    },
    {
        key: 'swap',
        icon: <ArrowLeftRight size={24} className="text-fuchsia-400" />,
        label: '인과 교차',
        cp: 500,
        borderColorClass: 'border-fuchsia-400',
        iconColorClass: 'text-fuchsia-400',
        shadowColor: 'shadow-fuchsia-400/30',
    },
    {
        key: 'blackhole',
        icon: <Circle size={24} className="text-red-400" />,
        label: '블랙홀',
        cp: 1000,
        borderColorClass: 'border-red-400',
        iconColorClass: 'text-red-400',
        shadowColor: 'shadow-red-400/30',
    },
];

const RADIUS = 155; // px, 위성 버튼들 간 거리를 조금 더 넓힘
const ANGLE_START = 170; // 왼쪽(9시)에서 시작
const ANGLE_STEP = 25; // 각 버튼 간 각도, 아래로 퍼짐

const InterventionPanel = ({ cp, maxCp, mode, onSelectMode, onUseBlackhole }) => {
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null);

    // 외부 클릭 시 open 닫기
    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [open]);

    // 라디얼 버튼 위치 계산
    const getButtonStyle = (idx) => {
        // 각도 계산: 170, 145, 120, 95deg (왼쪽~아래)
        const angle = (ANGLE_START - ANGLE_STEP * idx) * (Math.PI / 180);
        // 중심을 우상단으로 더 이동 (x+40, y-20)
        const x = Math.cos(angle) * RADIUS + 40;
        const y = Math.sin(angle) * RADIUS - 20;
        return {
            transform: open
                ? `translate(${x}px, ${y}px) scale(1)`
                : 'translate(0,0) scale(0.5)',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
            transition: `all 0.45s cubic-bezier(.4,2,.3,1), opacity 0.2s`,
            transitionDelay: open ? `${idx * 60}ms` : '0ms',
            position: 'absolute',
            right: '2rem',
            bottom: '2rem',
            zIndex: 20 + idx,
        };
    };

    // CP 게이지 (원형)
    const cpPercent = Math.min(1, cp / maxCp);
    const cpStroke = 80 * Math.PI; // 대략적인 원 둘레
    const cpDash = cpStroke * cpPercent;

    return (
        <div ref={panelRef} className="absolute bottom-6 right-4 z-50 select-none" style={{ pointerEvents: 'auto' }}>
            {/* 라디얼 서브버튼 */}
            {SKILLS.map((skill, idx) => (
                <button
                    key={skill.key}
                    style={getButtonStyle(idx)}
                    className={`
                        absolute flex flex-col items-center justify-center rounded-full
                        w-16 h-16 bg-slate-900/80 backdrop-blur-md
                        border ${skill.borderColorClass} border-opacity-40 hover:border-opacity-100
                        shadow-[0_0_15px_rgba(0,0,0,0.5)] ${skill.shadowColor}
                        transition-all duration-300 group
                    `}
                    onClick={() => {
                        if (skill.key === 'blackhole') onUseBlackhole();
                        else onSelectMode(skill.key);
                    }}
                >
                    <span className={`mb-1 ${skill.iconColorClass}`}>{skill.icon}</span>
                    <span className="text-[10px] font-bold leading-none text-gray-400/80 drop-shadow-sm">{skill.label}</span>
                    <span className="text-[9px] opacity-60 text-gray-500">{skill.cp} CP</span>
                </button>
            ))}

            {/* 메인 트리거 버튼 */}
            <button
                onClick={() => setOpen(true)}
                className="relative group flex-shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden backdrop-blur-lg border border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.35)] transition-all duration-500"
                aria-label="인과 개입"
                style={{ zIndex: 100 }}
            >
                {/* 배경 효과 */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.3),transparent_40%),radial-gradient(circle_at_40%_70%,rgba(14,165,233,0.2),transparent_45%)] animate-pulse-slow" />
                <div className="absolute inset-0 border border-cyan-300/40 rounded-full animate-spin-slow" style={{ animationDuration: '12s' }}></div>
                <div className="absolute inset-3 rounded-full border border-white/10"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <span className="text-sm md:text-base font-serif text-white tracking-[0.2em] font-bold"><span>인과</span><br/><span>개입</span></span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* CP 원형 게이지 */}
                <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#334155" strokeWidth="7" fill="none" />
                    <circle
                        cx="50" cy="50" r="40"
                        stroke="#22d3ee"
                        strokeWidth="7"
                        fill="none"
                        strokeDasharray={cpStroke}
                        strokeDashoffset={cpStroke - cpDash}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(.4,2,.3,1)' }}
                    />
                </svg>
                {/* CP 값 */}
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-mono text-cyan-200/80 drop-shadow-sm">{cp}</span>
            </button>
        </div>
    );
};

export default InterventionPanel;