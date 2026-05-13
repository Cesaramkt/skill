import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors } from "../lib/colors";
import { typography } from "../lib/typography";
import { springs, fadeIn } from "../lib/animations";

interface FlowNode {
  icon: string;
  label: string;
  sublabel: string;
  accentColor: string;
  appearAt: number;
}

const NODES: FlowNode[] = [
  {
    icon: "🚶",
    label: "Cliente",
    sublabel: "Entra na Loja 1",
    accentColor: "#64748B",
    appearAt: 60,
  },
  {
    icon: "🏪",
    label: "Loja 1",
    sublabel: "Produto indisponível",
    accentColor: "#EF4444",
    appearAt: 140,
  },
  {
    icon: "⚡",
    label: "SharedSale",
    sublabel: "Busca em tempo real",
    accentColor: "#6B4EFF",
    appearAt: 240,
  },
  {
    icon: "🏪",
    label: "Loja 7",
    sublabel: "✓ Produto encontrado",
    accentColor: "#10B981",
    appearAt: 360,
  },
  {
    icon: "💰",
    label: "Split Pix",
    sublabel: "Comissão automática",
    accentColor: "#10B981",
    appearAt: 520,
  },
];

export const Scene04_HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const NODE_W = 200;
  const NODE_SPACE = 280;
  const TOTAL_W = NODES.length * NODE_SPACE;
  const START_X = (1920 - TOTAL_W) / 2 + 60;
  const CENTER_Y = 520;

  const globalOpacity = interpolate(frame, [1170, 1200], [1, 0], {
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
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.h2,
          fontWeight: typography.weights.bold,
          color: colors.text.primary,
          letterSpacing: "-0.03em",
          opacity: fadeIn(frame, 15, 10),
          whiteSpace: "nowrap",
        }}
      >
        Como funciona
      </div>

      {/* Setas entre nós */}
      {NODES.slice(0, -1).map((_, i) => {
        const arrowAt = NODES[i + 1].appearAt - 20;
        const arrowX = START_X + i * NODE_SPACE + NODE_W;
        const arrowW = NODE_SPACE - NODE_W;
        return (
          <svg
            key={`arrow-${i}`}
            style={{
              position: "absolute",
              top: CENTER_Y - 10,
              left: arrowX,
              opacity: fadeIn(frame, 12, arrowAt),
            }}
            width={arrowW}
            height={20}
          >
            <line
              x1="0"
              y1="10"
              x2={arrowW - 12}
              y2="10"
              stroke={colors.purple.mid}
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <polygon
              points={`${arrowW - 12},4 ${arrowW},10 ${arrowW - 12},16`}
              fill={colors.purple.mid}
            />
          </svg>
        );
      })}

      {/* Nós */}
      {NODES.map((node, i) => {
        const nodeScale = spring({
          frame: Math.max(0, frame - node.appearAt),
          fps,
          config: springs.snappy,
        });
        const nodeOpacity = fadeIn(frame, 12, node.appearAt);
        const x = START_X + i * NODE_SPACE;
        const isPurple = node.accentColor === "#6B4EFF";
        const isSuccess = node.accentColor === "#10B981";
        const isError = node.accentColor === "#EF4444";

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: CENTER_Y - 90,
              width: NODE_W,
              transform: `scale(${0.8 + nodeScale * 0.2})`,
              opacity: nodeOpacity,
              transformOrigin: "center bottom",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: isPurple
                  ? colors.purple.primary
                  : isSuccess
                  ? "#ECFDF5"
                  : isError
                  ? "#FEF2F2"
                  : colors.bg.subtle,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                boxShadow: isPurple
                  ? `0 8px 32px ${colors.purple.primary}40`
                  : "none",
              }}
            >
              <span style={{ fontSize: 36 }}>{node.icon}</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 18,
                  fontWeight: 700,
                  color: isPurple ? colors.purple.primary : colors.text.primary,
                }}
              >
                {node.label}
              </div>
              <div
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 13,
                  color: colors.text.muted,
                  marginTop: 4,
                }}
              >
                {node.sublabel}
              </div>
            </div>
          </div>
        );
      })}

      {/* Mensagem final */}
      {frame >= 840 && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: fadeIn(frame, 20, 840),
            whiteSpace: "nowrap",
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.h3,
            fontWeight: typography.weights.bold,
            color: colors.text.primary,
            letterSpacing: "-0.02em",
          }}
        >
          Todos ganham.{" "}
          <span style={{ color: colors.purple.primary }}>
            Nenhuma venda fica pelo caminho.
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
