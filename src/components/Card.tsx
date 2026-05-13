import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { colors } from "../lib/colors";
import { springs, fadeIn } from "../lib/animations";
import { radius, shadow } from "../lib/spacing";

interface CardProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  variant?: "default" | "purple" | "success";
}

export const Card: React.FC<CardProps> = ({
  children,
  delay = 0,
  style,
  variant = "default",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: springs.snappy,
  });
  const opacity = fadeIn(frame, 12, delay);

  const bgMap = {
    default: colors.bg.primary,
    purple: colors.purple.lightest,
    success: "#ECFDF5",
  };

  return (
    <div
      style={{
        backgroundColor: bgMap[variant],
        borderRadius: radius.lg,
        padding: "24px 32px",
        boxShadow: shadow.card,
        border: `1px solid ${colors.border}`,
        transform: `scale(${0.85 + scale * 0.15})`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
