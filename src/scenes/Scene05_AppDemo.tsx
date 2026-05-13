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

const SEARCH_TEXT = "anel solitário 18";

const RESULTS = [
  { store: "Graça Joias", price: "R$129", distance: "80m", badge: "✓ EM ESTOQUE" },
  { store: "Belle Semijoias", price: "R$149", distance: "120m", badge: "✓ EM ESTOQUE" },
];

export const Scene05_AppDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSlide = spring({ frame, fps, config: springs.gentle });
  const phoneTranslate = (1 - phoneSlide) * 300;

  const charCount = Math.floor(
    interpolate(frame, [160, 290], [0, SEARCH_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayText = SEARCH_TEXT.slice(0, charCount);
  const cursorVisible = frame < 290 && Math.floor(frame / 15) % 2 === 0;

  const result1Opacity = fadeIn(frame, 15, 340);
  const result2Opacity = fadeIn(frame, 15, 400);

  const tapRipple =
    frame >= 480 && frame < 540
      ? spring({ frame: frame - 480, fps, config: springs.snappy })
      : 0;

  const qrOpacity = fadeIn(frame, 15, 565);
  const toastOpacity = fadeIn(frame, 12, 640);
  const toastY = interpolate(frame, [640, 660], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sideTextOpacity = fadeIn(frame, 15, 730);

  const globalOpacity = interpolate(frame, [870, 900], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg.subtle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: globalOpacity,
      }}
    >
      {/* Phone */}
      <div
        style={{ transform: `translateX(${phoneTranslate}px)`, position: "relative" }}
      >
        <div
          style={{
            width: 320,
            height: 640,
            borderRadius: 40,
            backgroundColor: "#111",
            padding: 12,
            boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 30,
              backgroundColor: colors.bg.primary,
              overflow: "hidden",
            }}
          >
            {/* App header */}
            <div
              style={{
                backgroundColor: colors.purple.primary,
                padding: "20px 20px 16px",
              }}
            >
              <div
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                SharedSale
              </div>
              <div
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.7)",
                  marginTop: 2,
                }}
              >
                Polo de Semijoias
              </div>
            </div>

            {/* Search bar */}
            <div
              style={{
                margin: "14px 12px",
                backgroundColor: colors.bg.subtle,
                borderRadius: 12,
                padding: "10px 14px",
                border: `1.5px solid ${
                  frame >= 100 ? colors.purple.primary : colors.border
                }`,
                minHeight: 40,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 13,
                  color: displayText ? colors.text.primary : colors.text.muted,
                }}
              >
                {displayText || "Buscar produto..."}
                {cursorVisible && (
                  <span style={{ color: colors.purple.primary }}>|</span>
                )}
              </span>
            </div>

            {/* Resultados */}
            {RESULTS.map((r, i) => {
              const opacity = i === 0 ? result1Opacity : result2Opacity;
              const isTapped = i === 0 && frame >= 480;
              return (
                <div
                  key={i}
                  style={{
                    margin: "0 12px 10px",
                    backgroundColor: isTapped
                      ? colors.purple.lightest
                      : colors.bg.primary,
                    borderRadius: 12,
                    padding: "10px 12px",
                    border: `1.5px solid ${
                      isTapped ? colors.purple.primary : colors.border
                    }`,
                    opacity,
                    transform: `scale(${1 + (i === 0 ? tapRipple * 0.03 : 0)})`,
                    boxShadow: isTapped
                      ? `0 4px 20px ${colors.purple.primary}30`
                      : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: typography.fontFamily,
                      fontSize: 13,
                      fontWeight: 700,
                      color: colors.text.primary,
                    }}
                  >
                    {r.store}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: colors.purple.primary,
                      }}
                    >
                      {r.price}
                    </span>
                    <span style={{ fontSize: 12, color: colors.text.muted }}>
                      {r.distance}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: colors.success,
                      marginTop: 4,
                    }}
                  >
                    {r.badge}
                  </div>
                </div>
              );
            })}

            {/* QR Code */}
            {frame >= 560 && (
              <div
                style={{
                  margin: "0 12px",
                  borderRadius: 12,
                  padding: 12,
                  backgroundColor: colors.bg.subtle,
                  border: `1.5px solid ${colors.border}`,
                  opacity: qrOpacity,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #333 0, #333 2px, transparent 0, transparent 8px)",
                    borderRadius: 4,
                    marginBottom: 6,
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: colors.text.muted,
                    fontFamily: typography.fontFamily,
                  }}
                >
                  Indicação · Cód. SS-8421
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast WhatsApp */}
      {frame >= 640 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: `translateX(-50%) translateY(${toastY}px)`,
            opacity: toastOpacity,
            backgroundColor: "#25D366",
            borderRadius: 12,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 8px 32px rgba(37,211,102,0.35)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: 20 }}>📲</span>
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Enviado para o cliente via WhatsApp
          </span>
        </div>
      )}

      {/* Texto lateral */}
      {frame >= 730 && (
        <div
          style={{
            position: "absolute",
            right: 200,
            top: "50%",
            transform: "translateY(-50%)",
            opacity: sideTextOpacity,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 72,
              fontWeight: 800,
              color: colors.purple.primary,
              letterSpacing: "-0.04em",
            }}
          >
            5s
          </div>
          <div
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 20,
              color: colors.text.secondary,
              marginTop: 8,
            }}
          >
            Venda salva.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
