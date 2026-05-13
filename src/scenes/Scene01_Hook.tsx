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

export const Scene01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const circleScale = spring({ frame, fps, config: springs.slow });

  const percentage = interpolate(frame, [10, 75], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = fadeIn(frame, 15, 80);
  const subY = slideUp(frame, fps, 80, 30);

  const globalOpacity = interpolate(frame, [100, 120], [1, 0], {
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
          width: circleScale * 700,
          height: circleScale * 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.purple.lightest} 0%, transparent 70%)`,
        }}
      />

      {/* Percentual */}
      <div
        style={{
          fontFamily: typography.fontFamily,
          fontSize: 128,
          fontWeight: typography.weights.extrabold,
          color: colors.purple.primary,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          position: "relative",
          zIndex: 1,
        }}
      >
        {Math.round(percentage)}%
      </div>

      {/* Subtítulo */}
      <div
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.h4,
          fontWeight: typography.weights.regular,
          color: colors.text.secondary,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          marginTop: 16,
          letterSpacing: "-0.01em",
          position: "relative",
          zIndex: 1,
        }}
      >
        dos clientes saem da loja sem comprar
      </div>
    </AbsoluteFill>
  );
};
