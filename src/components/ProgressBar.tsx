import React from "react";
import { useCurrentFrame } from "remotion";
import { colors } from "../lib/colors";
import { typography } from "../lib/typography";
import { counter } from "../lib/animations";

interface ProgressBarProps {
  targetPercent: number;
  startFrame: number;
  endFrame: number;
  label: string;
  value: string;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  targetPercent,
  startFrame,
  endFrame,
  label,
  value,
  color = colors.purple.primary,
}) => {
  const frame = useCurrentFrame();
  const width = counter(frame, 0, targetPercent, startFrame, endFrame);

  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: 18,
            color: colors.text.secondary,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: 18,
            fontWeight: 700,
            color: colors.text.primary,
          }}
        >
          {value}
        </span>
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 999,
          backgroundColor: colors.purple.lightest,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            borderRadius: 999,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};
