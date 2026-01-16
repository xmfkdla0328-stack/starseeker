// Star Seeker SF 스타일 공통 디자인 상수
export const ColorPalette = {
  deepNavy: "#0a1026",
  navy: "#151a33",
  glassBlue: "rgba(30, 60, 90, 0.6)",
  neonCyan: "#00fff7",
  neonBlue: "#00bfff",
  starYellow: "#ffe066",
  magenta: "#e040fb",
  white: "#f8fafd",
  glassWhite: "rgba(255,255,255,0.08)",
  borderGlow: "rgba(0,255,247,0.6)",
  shadow: "rgba(0,0,0,0.7)",
};

export const GlassEffectStyle = {
  background: `linear-gradient(135deg, ${ColorPalette.glassBlue} 60%, ${ColorPalette.glassWhite} 100%)`,
  backdropFilter: "blur(16px) saturate(180%)",
  WebkitBackdropFilter: "blur(16px) saturate(180%)",
  border: `1.5px solid ${ColorPalette.glassWhite}`,
  boxShadow: `0 4px 32px 0 ${ColorPalette.shadow}`,
  borderRadius: "18px",
};

export const NeonBorder = {
  border: `2px solid ${ColorPalette.neonCyan}`,
  boxShadow: `0 0 12px 2px ${ColorPalette.neonCyan}, 0 0 32px 4px ${ColorPalette.borderGlow}`,
  borderRadius: "12px",
  transition: "box-shadow 0.2s, border-color 0.2s",
};

export const FontStyles = {
  heading: {
    fontFamily: "'Orbitron', 'Montserrat', 'Pretendard', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: ColorPalette.neonCyan,
    textShadow: `0 0 8px ${ColorPalette.neonCyan}`,
  },
  body: {
    fontFamily: "'Montserrat', 'Pretendard', sans-serif",
    fontWeight: 400,
    color: ColorPalette.white,
  },
  code: {
    fontFamily: "'Fira Mono', 'Consolas', monospace",
    color: ColorPalette.starYellow,
  },
};

export const StarfieldBackground = {
  background: `radial-gradient(ellipse at 60% 20%, #1a2a4f 0%, #0a1026 80%), \n    repeating-radial-gradient(circle at 80% 60%, #fff 1px, transparent 2px, transparent 100px)`,
  backgroundBlendMode: "screen",
};
