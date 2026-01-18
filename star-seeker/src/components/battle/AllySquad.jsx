import React from 'react';
import { GlassEffectStyle, NeonBorder, ColorPalette, FontStyles } from '../../constants/style';

const AllySquad = ({ units, activeUnitId, onUnitClick, interventionMode }) => {
    return (
        <div
            style={{
                ...GlassEffectStyle,
                ...NeonBorder,
                padding: '18px',
                minWidth: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative',
            }}
        >
            <div style={{
                ...FontStyles.heading,
                fontSize: '0.85rem',
                marginBottom: 6,
                letterSpacing: '0.18em',
                textAlign: 'left',
                opacity: 0.85,
            }}>ALLY SQUAD</div>
            {units.filter(u => u.type === 'ally').map(u => {
                const isActive = activeUnitId === u.id;
                return (
                    <div
                        key={u.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px',
                            borderRadius: '12px',
                            background: isActive ? 'rgba(20,40,60,0.7)' : 'rgba(10,16,38,0.7)',
                            border: isActive ? `2px solid ${ColorPalette.starYellow}` : `1.5px solid ${ColorPalette.glassWhite}`,
                            boxShadow: isActive ? `0 0 12px 2px ${ColorPalette.starYellow}` : 'none',
                            cursor: interventionMode ? 'pointer' : 'default',
                            opacity: u.hp <= 0 ? 0.5 : 1,
                            transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s',
                        }}
                        onClick={() => onUnitClick(u)}
                    >
                        <div style={{ fontSize: 28, filter: u.hp <= 0 ? 'grayscale(0.7)' : 'none' }}>{u.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: ColorPalette.white, opacity: 0.92 }}>
                                <span style={{ fontWeight: 600, textShadow: `0 0 4px ${ColorPalette.neonCyan}33` }}>{u.name}</span>
                                <span style={{ fontWeight: 400, color: ColorPalette.neonCyan }}>{u.hp}/{u.maxHp}</span>
                            </div>
                            {/* HP Bar */}
                            <div style={{
                                width: '100%',
                                height: 8,
                                background: 'rgba(20,30,50,0.7)',
                                marginTop: 6,
                                borderRadius: 8,
                                overflow: 'hidden',
                                boxShadow: `0 0 6px 0 ${ColorPalette.neonCyan}22`,
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `${(u.hp/u.maxHp)*100}%`,
                                    background: `linear-gradient(90deg, #00fff7 0%, #00bfff 60%, #ffe066 100%)`,
                                    boxShadow: `0 0 8px 2px ${ColorPalette.neonCyan}99`,
                                    transition: 'width 0.3s cubic-bezier(.4,2,.6,1)',
                                }} />
                            </div>
                            {/* EP Bar */}
                            <div style={{
                                width: '100%',
                                height: 5,
                                background: 'rgba(40,40,60,0.6)',
                                marginTop: 3,
                                borderRadius: 6,
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `${(u.ep/u.maxEp)*100}%`,
                                    background: `linear-gradient(90deg, #e040fb 0%, #00fff7 100%)`,
                                    boxShadow: `0 0 6px 1px ${ColorPalette.magenta}66`,
                                    transition: 'width 0.3s cubic-bezier(.4,2,.6,1)',
                                }} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default AllySquad;
