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
import { springs, fadeIn, counter } from "../lib/animations";

const STORES = [
  { x: 320, y: 300 }, { x: 480, y: 300 }, { x: 640, y: 300 }, { x: 800, y: 300 },
  { x: 320, y: 460 }, { x: 480, y: 460 }, { x: 640, y: 460 }, { x: 800, y: 460 },
  { x: 320, y: 620 }, { x: 480, y: 620 }, { x: 640, y: 620 }, { x: 800, y: 620 },
];

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7],
  [0, 4], [1, 5], [2, 6], [3, 7], [4, 8], [5, 9],
];

export const Scene06_Map: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const storeCount = counter(frame, 0, 30, 400, 480);

  const globalOpacity = interpolate(frame, [575, 600], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.bg.primary, opacity: globalOpacity }}
    >
      {/* Título */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: fadeIn(frame, 15, 0),
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.h2,
            fontWeight: typography.weights.bold,
            color: colors.text.primary,
            letterSpacing: "-0.03em",
          }}
        >
          Funciona em qualquer polo comercial
        </div>
      </div>

      {/* Grid de ruas */}
      <svg
        style={{
          position: "absolute",
          left: 200,
          top: 200,
          opacity: fadeIn(frame, 25, 5),
        }}
        width={780}
        height={520}
      >
        {[0, 160, 320, 480].map((y, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={y + 80}
            x2={780}
            y2={y + 80}
            stroke={colors.border}
            strokeWidth="2"
          />
        ))}
        {[0, 160, 320, 480, 640].map((x, i) => (
          <line
            key={`v${i}`}
            x1={x + 80}
            y1="0"
            x2={x + 80}
            y2={520}
            stroke={colors.border}
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* Linhas de conexão */}
      {CONNECTIONS.map(([a, b], i) => {
        const sa = STORES[a];
        const sb = STORES[b];
        if (!sa || !sb) return null;
        return (
          <svg
            key={`c${i}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <line
              x1={sa.x + 200}
              y1={sa.y + 200}
              x2={sb.x + 200}
              y2={sb.y + 200}
              stroke={colors.purple.primary}
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity={fadeIn(frame, 15, 200 + i * 8)}
            />
          </svg>
        );
      })}

      {/* Pontos de loja */}
      {STORES.map((store, i) => {
        const s = spring({
          frame: Math.max(0, frame - 80 - i * 12),
          fps,
          config: springs.bouncy,
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: store.x + 184,
              top: store.y + 184,
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: colors.purple.primary,
              boxShadow: `0 0 20px ${colors.purple.primary}60`,
              transform: `scale(${s})`,
              opacity: fadeIn(frame, 12, 80 + i * 12),
            }}
          />
        );
      })}

      {/* Painel direito */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {[
          { label: "Polo de Semijoias", delay: 100 },
          { label: "Rua das Noivas", delay: 160 },
          { label: "25 de Março", delay: 220 },
          { label: "Centro Comercial", delay: 280 },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: fadeIn(frame, 15, item.delay),
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: colors.purple.primary,
              }}
            />
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: 18,
                color: colors.text.secondary,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}

        {frame >= 400 && (
          <div
            style={{ marginTop: 24, opacity: fadeIn(frame, 15, 400) }}
          >
            <div
              style={{
                fontFamily: typography.fontFamily,
                fontSize: 64,
                fontWeight: 800,
                color: colors.purple.primary,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {Math.round(storeCount)}+
            </div>
            <div
              style={{
                fontFamily: typography.fontFamily,
                fontSize: 16,
                color: colors.text.muted,
                marginTop: 4,
              }}
            >
              lojas conectadas
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
