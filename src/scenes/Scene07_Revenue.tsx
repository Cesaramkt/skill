import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../lib/colors";
import { typography } from "../lib/typography";
import { fadeIn, slideUp } from "../lib/animations";
import { ProgressBar } from "../components/ProgressBar";

export const Scene07_Revenue: React.FC = () => {
  const frame = useCurrentFrame();

  const globalOpacity = interpolate(frame, [455, 480], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const streams = [
    {
      label: "Mensalidade por loja",
      value: "por loja/mês",
      percent: 65,
      delay: 30,
      color: colors.purple.primary,
    },
    {
      label: "Taxa por indicação",
      value: "por transação",
      percent: 40,
      delay: 120,
      color: colors.purple.dark,
    },
    {
      label: "Comissão loja indicadora",
      value: "sobre a venda",
      percent: 55,
      delay: 210,
      color: colors.success,
    },
  ];

  const splitItems = [
    { label: "Loja vendedora", pct: "~95%", barW: "95%", color: colors.success },
    { label: "Loja indicadora", pct: "3–5%", barW: "20%", color: colors.purple.primary },
    { label: "SharedSale", pct: "~2%", barW: "13%", color: colors.text.secondary },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg.primary,
        display: "flex",
        flexDirection: "row",
        opacity: globalOpacity,
      }}
    >
      {/* Coluna esquerda — Streams */}
      <div style={{ flex: 1, padding: "80px 80px 80px 120px" }}>
        <div
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.h2,
            fontWeight: typography.weights.bold,
            color: colors.text.primary,
            letterSpacing: "-0.03em",
            marginBottom: 48,
            opacity: fadeIn(frame, 15, 5),
          }}
        >
          Modelo de receita
        </div>

        {streams.map((s, i) => (
          <div key={i} style={{ opacity: fadeIn(frame, 15, s.delay - 10) }}>
            <ProgressBar
              label={s.label}
              value={s.value}
              targetPercent={s.percent}
              startFrame={s.delay}
              endFrame={s.delay + 60}
              color={s.color}
            />
          </div>
        ))}
      </div>

      {/* Divisor */}
      <div
        style={{ width: 1, backgroundColor: colors.border, margin: "60px 0" }}
      />

      {/* Coluna direita — Split */}
      <div style={{ flex: 1, padding: "80px 120px 80px 80px" }}>
        <div
          style={{
            fontFamily: typography.fontFamily,
            fontSize: 20,
            fontWeight: typography.weights.semibold,
            color: colors.text.secondary,
            marginBottom: 40,
            opacity: fadeIn(frame, 15, 280),
          }}
        >
          Como se distribui cada venda
        </div>

        {splitItems.map((item, i) => (
          <div
            key={i}
            style={{
              marginBottom: 28,
              opacity: fadeIn(frame, 15, 300 + i * 30),
              transform: `translateY(${slideUp(frame, 30, 300 + i * 30, 20)}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
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
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 22,
                  fontWeight: 700,
                  color: item.color,
                }}
              >
                {item.pct}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: item.color,
                  width: item.barW,
                }}
              />
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 14,
                  color: colors.text.muted,
                }}
              >
                {item.pct}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
