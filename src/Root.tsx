import React from "react";
import { Composition } from "remotion";
import { SharedSale } from "./SharedSale";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="SharedSale"
    component={SharedSale}
    durationInFrames={4500}
    fps={30}
    width={1920}
    height={1080}
  />
);
