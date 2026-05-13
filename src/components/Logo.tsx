import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { colors } from "../lib/colors";
import { typography } from "../lib/typography";
import { springs } from "../lib/animations";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  delay?: number;
  variant?: "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  delay = 0,
  variant = "dark",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sizes = { sm: 32, md: 48, lg: 72 };
  const iconSize = sizes[size];

  const scale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: springs.bouncy,
  });

  const textColor =
    variant === "dark" ? colors.text.primary : colors.text.onDark;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        transform: `scale(${scale})`,
        transformOrigin: "center left",
      }}
    >
      {/* Ícone: dois quadrados sobrepostos — lojas conectadas */}
      <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
        <rect
          x="4"
          y="16"
          width="24"
          height="24"
          rx="6"
          fill={colors.purple.primary}
        />
        <rect
          x="20"
          y="8"
          width="24"
          height="24"
          rx="6"
          fill={colors.purple.dark}
          opacity="0.85"
        />
        <circle cx="24" cy="28" r="5" fill="#FFFFFF" />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: iconSize * 0.58,
          fontWeight: typography.weights.bold,
          color: textColor,
          letterSpacing: "-0.02em",
        }}
      >
        Shared
        <span style={{ color: colors.purple.primary }}>Sale</span>
      </span>
    </div>
  );
};
