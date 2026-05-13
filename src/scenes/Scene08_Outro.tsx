import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../lib/colors";
import { typography } from "../lib/typography";
import { fadeIn } from "../lib/animations";
import { Logo } from "../components/Logo";

export const Scene08_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const globalOpacity = interpolate(frame, [180, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: globalOpacity,
      }}
    >
      {/* Glow de fundo */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.purple.lightest} 0%, transparent 70%)`,
        }}
      />

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: 28 }}>
        <Logo size="lg" delay={20} variant="dark" />
      </div>

      {/* Slogan */}
      <div
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.h3,
          fontWeight: typography.weights.regular,
          color: colors.text.secondary,
          opacity: fadeIn(frame, 20, 90),
          letterSpacing: "-0.01em",
          position: "relative",
          zIndex: 1,
        }}
      >
        Solucionando necessidades.
      </div>
    </AbsoluteFill>
  );
};
