
import React, { useState } from 'react';
import { Magnet, Hand, ArrowLeftRight, Circle } from 'lucide-react';

const SKILLS = [
    {
        key: 'pull',
        icon: <Magnet size={24} />, label: '중력 가속', cp: 250,
        color: 'from-cyan-400 to-blue-500',
    },
    {
        key: 'push',
        icon: <Hand size={24} />, label: '궤도 이탈', cp: 250,
        color: 'from-orange-400 to-yellow-500',
    },
    {
        key: 'swap',
        icon: <ArrowLeftRight size={24} />, label: '인과 교차', cp: 500,
        color: 'from-purple-400 to-fuchsia-500',
    },
    {
        key: 'blackhole',
        icon: <Circle size={24} />, label: '블랙홀', cp: 1000,
        color: 'from-slate-400 to-red-500',
    },
];

const RADIUS = 110; // px, 거리
const ANGLE_START = 210; // 부채꼴 시작 각도 (북서)
const ANGLE_STEP = 30; // 각 버튼 간 각도

const InterventionPanel = ({ cp, maxCp, mode, onSelectMode, onUseBlackhole }) => {
    const [open, setOpen] = useState(false);

    // 라디얼 버튼 위치 계산
    const getButtonStyle = (idx) => {
        const angle = (ANGLE_START - ANGLE_STEP * idx) * (Math.PI / 180);
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;
        return {
            transform: open
                ? `translate(${x}px, ${y}px) scale(1)`
                : 'translate(0,0) scale(0.5)',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
            transition: 'all 0.45s cubic-bezier(.4,2,.3,1)',
            position: 'absolute',
            right: '0.5rem',
            bottom: '0.5rem',
            zIndex: 20 + idx,
        };
    };

    // CP 게이지 (원형)
    const cpPercent = Math.min(1, cp / maxCp);
    const cpStroke = 80 * Math.PI; // 대략적인 원 둘레
    const cpDash = cpStroke * cpPercent;

    return (
        <div className="absolute bottom-4 right-4 z-50 select-none" style={{pointerEvents: 'auto'}}>
            {/* 라디얼 서브버튼 */}
            {SKILLS.map((skill, idx) => (
                <button
                    key={skill.key}
                    style={getButtonStyle(idx)}
                    className={`w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-xl border-2 border-white/10 backdrop-blur-lg bg-gradient-to-br ${skill.color} text-white/90 hover:scale-110 active:scale-95 transition-all duration-300 group`}
                    onClick={() => {
                        setOpen(false);
                        if (skill.key === 'blackhole') onUseBlackhole();
                        else onSelectMode(skill.key);
                    }}
                >
                    <span className="mb-1">{skill.icon}</span>
                    <span className="text-[10px] font-bold leading-none drop-shadow">{skill.label}</span>
                    <span className="text-[9px] opacity-70">{skill.cp} CP</span>
                </button>
            ))}

            {/* 메인 트리거 버튼 */}
            <button
                onClick={() => setOpen(v => !v)}
                className="relative group flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden backdrop-blur-lg border border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.35)] transition-all duration-500"
                aria-label="인과 개입"
                style={{ zIndex: 100 }}
            >
                {/* 배경 효과 */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.3),transparent_40%),radial-gradient(circle_at_40%_70%,rgba(14,165,233,0.2),transparent_45%)] animate-pulse-slow" />
                <div className="absolute inset-0 border border-cyan-300/40 rounded-full animate-spin-slow" style={{ animationDuration: '12s' }}></div>
                <div className="absolute inset-3 rounded-full border border-white/10"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <span className="text-sm md:text-base font-serif text-white tracking-[0.2em] font-bold">인과 개입</span>
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
