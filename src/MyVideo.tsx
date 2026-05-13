import { AbsoluteFill, useCurrentFrame } from "remotion";

export const MyVideo = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0f19",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white", fontSize: 64, fontFamily: "sans-serif" }}>
        Frame {frame}
      </h1>
    </AbsoluteFill>
  );
};
