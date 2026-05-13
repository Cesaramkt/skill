import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";

interface AnimatedTextProps {
  children: string;
  style?: React.CSSProperties;
  delay?: number;
  mode?: "word" | "char" | "block";
  stagger?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  style,
  delay = 0,
  mode = "word",
  stagger = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (mode === "block") {
    const opacity = fadeIn(frame, 12, delay);
    const translateY = slideUp(frame, fps, delay);
    return (
      <span
        style={{
          ...style,
          opacity,
          transform: `translateY(${translateY}px)`,
          display: "inline-block",
        }}
      >
        {children}
      </span>
    );
  }

  const units = mode === "word" ? children.split(" ") : children.split("");

  return (
    <span
      style={{
        ...style,
        display: "inline-flex",
        flexWrap: "wrap",
        gap: mode === "word" ? "0.3em" : "0",
      }}
    >
      {units.map((unit, i) => {
        const unitDelay = delay + i * stagger;
        const opacity = fadeIn(frame, 10, unitDelay);
        const translateY = slideUp(frame, fps, unitDelay, 20);
        return (
          <span
            key={i}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              display: "inline-block",
            }}
          >
            {unit}
          </span>
        );
      })}
    </span>
  );
};
