import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { colors } from "./lib/colors";
import { typography } from "./lib/typography";

import { Scene01_Hook } from "./scenes/Scene01_Hook";
import { Scene02_Problem } from "./scenes/Scene02_Problem";
import { Scene03_Solution } from "./scenes/Scene03_Solution";
import { Scene04_HowItWorks } from "./scenes/Scene04_HowItWorks";
import { Scene05_AppDemo } from "./scenes/Scene05_AppDemo";
import { Scene06_Map } from "./scenes/Scene06_Map";
import { Scene07_Revenue } from "./scenes/Scene07_Revenue";
import { Scene08_Outro } from "./scenes/Scene08_Outro";

// ─── Timeline Master ─────────────────────────────────────────────────
// Total: 4500 frames = 150 segundos @ 30fps
const SCENES = {
  hook:       { from:    0, dur:  120 }, //   0–4s
  problem:    { from:  120, dur:  570 }, //   4–23s
  solution:   { from:  690, dur:  420 }, //  23–37s
  howItWorks: { from: 1110, dur: 1200 }, //  37–77s
  appDemo:    { from: 2310, dur:  900 }, //  77–107s
  map:        { from: 3210, dur:  600 }, // 107–127s
  revenue:    { from: 3810, dur:  480 }, // 127–143s
  outro:      { from: 4290, dur:  210 }, // 143–150s
} as const;

export const SharedSale: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: colors.bg.primary,
      fontFamily: typography.fontFamily,
      overflow: "hidden",
    }}
  >
    <Sequence from={SCENES.hook.from} durationInFrames={SCENES.hook.dur}>
      <Scene01_Hook />
    </Sequence>

    <Sequence from={SCENES.problem.from} durationInFrames={SCENES.problem.dur}>
      <Scene02_Problem />
    </Sequence>

    <Sequence from={SCENES.solution.from} durationInFrames={SCENES.solution.dur}>
      <Scene03_Solution />
    </Sequence>

    <Sequence from={SCENES.howItWorks.from} durationInFrames={SCENES.howItWorks.dur}>
      <Scene04_HowItWorks />
    </Sequence>

    <Sequence from={SCENES.appDemo.from} durationInFrames={SCENES.appDemo.dur}>
      <Scene05_AppDemo />
    </Sequence>

    <Sequence from={SCENES.map.from} durationInFrames={SCENES.map.dur}>
      <Scene06_Map />
    </Sequence>

    <Sequence from={SCENES.revenue.from} durationInFrames={SCENES.revenue.dur}>
      <Scene07_Revenue />
    </Sequence>

    <Sequence from={SCENES.outro.from} durationInFrames={SCENES.outro.dur}>
      <Scene08_Outro />
    </Sequence>
  </AbsoluteFill>
);
