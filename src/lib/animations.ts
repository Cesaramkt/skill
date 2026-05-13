import { interpolate, spring, SpringConfig } from "remotion";

export const springs = {
  gentle: { mass: 1, damping: 20, stiffness: 150 } as SpringConfig,
  snappy: { mass: 0.8, damping: 18, stiffness: 220 } as SpringConfig,
  bouncy: { mass: 1.2, damping: 12, stiffness: 180 } as SpringConfig,
  stiff: { mass: 0.8, damping: 28, stiffness: 320 } as SpringConfig,
  slow: { mass: 1.5, damping: 28, stiffness: 100 } as SpringConfig,
} as const;

export const timing = {
  fadeIn: 12,
  fadeOut: 10,
  slideIn: 18,
  sceneTransition: 20,
  stagger: 8,
  hold: 30,
} as const;

export const makeSpring = (
  frame: number,
  fps: number,
  config: SpringConfig,
  delay = 0
): number =>
  spring({ frame: Math.max(0, frame - delay), fps, config });

export const fadeIn = (frame: number, duration = 12, delay = 0): number => {
  const f = Math.max(0, frame - delay);
  return Math.min(1, f / duration);
};

export const fadeOut = (frame: number, start: number, duration = 10): number => {
  const f = Math.max(0, frame - start);
  return Math.max(0, 1 - f / duration);
};

export const slideUp = (
  frame: number,
  fps: number,
  delay = 0,
  distance = 40
): number => {
  const s = makeSpring(frame, fps, springs.snappy, delay);
  return (1 - s) * distance;
};

export const scaleIn = (
  frame: number,
  fps: number,
  delay = 0,
  from = 0.8
): number => {
  const s = makeSpring(frame, fps, springs.snappy, delay);
  return from + (1 - from) * s;
};

export const counter = (
  frame: number,
  from: number,
  to: number,
  startFrame: number,
  endFrame: number
): number =>
  interpolate(frame, [startFrame, endFrame], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
