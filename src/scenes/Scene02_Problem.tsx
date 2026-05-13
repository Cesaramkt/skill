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
import { springs, fadeIn, slideUp } from "../lib/animations";

export const Scene02_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 15, 10);
  const titleY = slideUp(frame, fps, 10, 30);

  const clientX = interpolate(frame, [30, 100], [-200, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const clientExitX = interpolate(frame, [230, 310], [400, 1100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showExit = frame >= 230;
  const currentX = showExit ? clientExitX : clientX;

  const bubbleScale = spring({
    frame: Math.max(0, frame - 105),
    fps,
    config: springs.bouncy,
  });
  const badgeScale = spring({
    frame: Math.max(0, frame - 160),
    fps,
    config: springs.bouncy,
  });
  const shakeX =
    frame >= 160 && frame < 200 ? Math.sin((frame - 160) * 1.5) * 8 : 0;

  const lostOpacity = fadeIn(frame, 15, 320);
  const lostY = slideUp(frame, fps, 320, 20);
  const phoneOpacity = fadeIn(frame, 15, 390);
  const mlOpacity = fadeIn(frame, 15, 440);
  const alertOpacity = fadeIn(frame, 15, 480);
  const alertScale = spring({
    frame: Math.max(0, frame - 480),
    fps,
    config: springs.snappy,
  });

  const globalOpacity = interpolate(frame, [545, 570], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg.secondary,
        overflow: "hidden",
        opacity: globalOpacity,
      }}
    >
      {/* Título */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.h3,
          fontWeight: typography.weights.semibold,
          color: colors.text.secondary,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        O problema do varejo físico
      </div>

      {/* Loja 1 */}
      <div
        style={{
          position: "absolute",
          left: 700,
          top: 380,
          transform: `translateX(${shakeX}px)`,
        }}
      >
        <div
          style={{
            width: 180,
            height: 160,
            borderRadius: 16,
            backgroundColor: colors.bg.primary,
            border: `2px solid ${colors.border}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <span style={{ fontSize: 48 }}>🏪</span>
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 16,
              fontWeight: 600,
              color: colors.text.secondary,
              marginTop: 8,
            }}
          >
            Loja 1
          </span>
        </div>

        {frame >= 160 && (
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 44,
              height: 44,
              borderRadius: 999,
              backgroundColor: colors.error,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${badgeScale})`,
              boxShadow: "0 4px 16px rgba(239,68,68,0.4)",
            }}
          >
            <span style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>
              ✕
            </span>
          </div>
        )}
      </div>

      {/* Cliente */}
      <div style={{ position: "absolute", left: currentX, top: 440 }}>
        <span style={{ fontSize: 56 }}>🚶</span>

        {frame >= 105 && frame < 230 && (
          <div
            style={{
              position: "absolute",
              bottom: 70,
              left: 30,
              backgroundColor: colors.bg.primary,
              borderRadius: 12,
              padding: "10px 16px",
              border: `1.5px solid ${colors.border}`,
              whiteSpace: "nowrap",
              transform: `scale(${bubbleScale})`,
              opacity: bubbleScale > 0 ? 1 : 0,
              transformOrigin: "bottom left",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: 15,
                color: colors.text.primary,
              }}
            >
              "Quero anel solitário 18"
            </span>
          </div>
        )}
      </div>

      {/* Venda perdida */}
      {frame >= 320 && (
        <div
          style={{
            position: "absolute",
            bottom: 220,
            left: 120,
            opacity: lostOpacity,
            transform: `translateY(${lostY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 20,
              fontWeight: 600,
              color: colors.error,
            }}
          >
            Venda perdida
          </span>
        </div>
      )}

      {/* Celular + Mercado Livre */}
      {frame >= 390 && (
        <div
          style={{
            position: "absolute",
            right: 180,
            top: "50%",
            transform: "translateY(-50%)",
            opacity: phoneOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 64 }}>📱</span>
          <div style={{ opacity: mlOpacity }}>
            <div
              style={{
                backgroundColor: "#FFF200",
                borderRadius: 8,
                padding: "8px 20px",
                fontFamily: typography.fontFamily,
                fontSize: 18,
                fontWeight: 700,
                color: "#1A1A1A",
              }}
            >
              mercadolivre
            </div>
          </div>
        </div>
      )}

      {/* Alerta final */}
      {frame >= 480 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: `translateX(-50%) scale(${alertScale})`,
            opacity: alertOpacity,
            backgroundColor: colors.error,
            borderRadius: 12,
            padding: "16px 40px",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            A rua inteira perdeu a venda
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
