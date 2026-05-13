import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "../lib/colors";
import { typography } from "../lib/typography";
import { springs, fadeIn, slideUp } from "../lib/animations";
import { Logo } from "../components/Logo";

export const Scene03_Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineWords = ["Indicação", "inteligente", "entre", "lojas", "vizinhas."];

  const chips = [
    { icon: "🏪", label: "Loja indicadora" },
    { icon: "📱", label: "Sistema SharedSale" },
    { icon: "💰", label: "Comissão automática" },
  ];

  const globalOpacity = interpolate(frame, [395, 420], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: globalOpacity,
      }}
    >
      {/* Glow roxo */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.purple.dark}44 0%, transparent 70%)`,
          opacity: bgOpacity,
        }}
      />

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: 32 }}>
        <Logo size="lg" delay={20} variant="light" />
      </div>

      {/* Tagline por palavra */}
      <div
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.h3,
          fontWeight: typography.weights.medium,
          color: colors.purple.mid,
          letterSpacing: "-0.01em",
          marginBottom: 48,
          display: "flex",
          gap: 10,
          position: "relative",
          zIndex: 1,
        }}
      >
        {taglineWords.map((word, i) => (
          <span
            key={i}
            style={{
              opacity: fadeIn(frame, 10, 120 + i * 10),
              transform: `translateY(${slideUp(frame, fps, 120 + i * 10, 20)}px)`,
              display: "inline-block",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Chips */}
      <div
        style={{
          display: "flex",
          gap: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        {chips.map((chip, i) => {
          const chipScale = spring({
            frame: Math.max(0, frame - 260 - i * 25),
            fps,
            config: springs.snappy,
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "rgba(107, 78, 255, 0.15)",
                border: `1px solid ${colors.purple.dark}`,
                borderRadius: 999,
                padding: "12px 24px",
                opacity: fadeIn(frame, 12, 260 + i * 25),
                transform: `scale(${0.85 + chipScale * 0.15})`,
              }}
            >
              <span style={{ fontSize: 20 }}>{chip.icon}</span>
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 15,
                  fontWeight: 500,
                  color: colors.text.onDark,
                }}
              >
                {chip.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Slogan */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.small,
          fontWeight: typography.weights.medium,
          color: colors.purple.mid,
          opacity: fadeIn(frame, 15, 340),
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        Solucionando necessidades.
      </div>
    </AbsoluteFill>
  );
};
