import React, { useEffect, useMemo, useState } from "react";
import styles from "./Artwork.module.scss";

type ArtworkSize = "xs" | "sm" | "md" | "lg";
type ArtworkRounded = "md" | "lg" | "xl" | "full";
type PatternType = "none" | "dots" | "grid" | "rings" | "diagonals";
type LayoutVariant = "initials" | "monogram" | "badge";

interface ArtworkProps {
  src?: string | null;
  title: string;
  subtitle?: string; // например, имя исполнителя для более богатой генерации
  seed?: string;
  size?: ArtworkSize;
  rounded?: ArtworkRounded;
  isPlaying?: boolean;
  className?: string;
}

export const GRADIENT_PALETTES: readonly [string, string, string][] = [
  ["#6d28d9", "#be185d", "#3b0764"],
  ["#0d9488", "#0369a1", "#134e4a"],
  ["#e11d48", "#be123c", "#4c0519"],
  ["#4338ca", "#6366f1", "#1e1b4b"],
  ["#d97706", "#c2410c", "#431407"],
  ["#059669", "#0f766e", "#022c22"],
  ["#7e22ce", "#4f46e5", "#2e1065"],
  ["#f97316", "#ec4899", "#500724"],
  ["#0284c7", "#38bdf8", "#082f49"],
  ["#65a30d", "#059669", "#1a2e05"],
  ["#a855f7", "#8b5cf6", "#2e1065"],
  ["#b45309", "#f59e0b", "#271406"],
  ["#14b8a6", "#0284c7", "#042f2e"],
  ["#db2777", "#9333ea", "#3b0764"],
  ["#2563eb", "#06b6d4", "#0f172a"],
  ["#dc2626", "#f59e0b", "#290606"],
];

const PATTERNS: readonly PatternType[] = [
  "none",
  "dots",
  "grid",
  "rings",
  "diagonals",
];

const LAYOUTS: readonly LayoutVariant[] = ["initials", "monogram", "badge"];

function hashString(input: string, salt = 0): number {
  let hash = 2166136261 ^ salt;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function getInitials(title: string): string {
  const cleaned = title.replace(/[^\p{L}\p{N}\s]/gu, "").trim();
  if (!cleaned) return "♪";

  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}

function renderPatternSvg(pattern: PatternType, patternId: string) {
  switch (pattern) {
    case "dots":
      return (
        <pattern
          id={patternId}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="1.4" fill="currentColor" />
        </pattern>
      );
    case "grid":
      return (
        <pattern
          id={patternId}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
          />
        </pattern>
      );
    case "rings":
      return (
        <pattern
          id={patternId}
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <circle
            cx="18"
            cy="18"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
          />
        </pattern>
      );
    case "diagonals":
      return (
        <pattern
          id={patternId}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </pattern>
      );
    case "none":
    default:
      return null;
  }
}

export const Artwork: React.FC<ArtworkProps> = ({
  src,
  title,
  subtitle = "",
  seed,
  size = "md",
  rounded = "lg",
  isPlaying = false,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const generated = useMemo(() => {
    const baseKey = (seed ?? `${title}::${subtitle}`)
      .toLowerCase()
      .trim() || "kai-music";

    const h1 = hashString(baseKey, 1);
    const h2 = hashString(baseKey, 2);
    const h3 = hashString(baseKey, 3);
    const h4 = hashString(baseKey, 4);

    const palette = GRADIENT_PALETTES[h1 % GRADIENT_PALETTES.length];
    const angle = 45 + (h2 % 270); // от 45° до 315°
    const pattern = PATTERNS[h3 % PATTERNS.length];
    const layout: LayoutVariant =
      rounded === "full" ? "initials" : LAYOUTS[h4 % LAYOUTS.length];

    // Позиции двух световых пятен (в %)
    const glow1X = 15 + (h2 % 70);
    const glow1Y = 15 + (h3 % 70);
    const glow2X = 15 + (h4 % 70);
    const glow2Y = 15 + ((h1 + h3) % 70);
    const patternRotate = (h2 % 4) * 15;

    return {
      fromColor: palette[0],
      viaColor: palette[1],
      toColor: palette[2],
      angle,
      pattern,
      layout,
      glow1X,
      glow1Y,
      glow2X,
      glow2Y,
      patternRotate,
      initials: getInitials(title),
      patternId: `art-pattern-${h1}-${h3}`,
    };
  }, [seed, title, subtitle, rounded]);

  const showImage = Boolean(src) && !imgError;

  const rootClassName = [
    styles.artwork,
    styles[`artwork--${size}`],
    styles[`artwork--rounded-${rounded}`],
    styles[`artwork--layout-${generated.layout}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const customStyle = showImage
    ? undefined
    : ({
        "--art-from": generated.fromColor,
        "--art-via": generated.viaColor,
        "--art-to": generated.toColor,
        "--art-angle": `${generated.angle}deg`,
        "--glow-1-x": `${generated.glow1X}%`,
        "--glow-1-y": `${generated.glow1Y}%`,
        "--glow-2-x": `${generated.glow2X}%`,
        "--glow-2-y": `${generated.glow2Y}%`,
      } as React.CSSProperties);

  return (
    <div className={rootClassName} style={customStyle} aria-label={title}>
      {showImage ? (
        <img
          src={src!}
          alt={title}
          onError={() => setImgError(true)}
          className={styles.image}
          loading="lazy"
        />
      ) : (
        <>
          <div className={styles.glowLayer} aria-hidden="true" />

          {generated.pattern !== "none" && (
            <svg
              className={styles.pattern}
              style={{ transform: `rotate(${generated.patternRotate}deg) scale(1.35)` }}
              aria-hidden="true"
            >
              <defs>{renderPatternSvg(generated.pattern, generated.patternId)}</defs>
              <rect width="100%" height="100%" fill={`url(#${generated.patternId})`} />
            </svg>
          )}

          <div className={styles.overlay} aria-hidden="true" />

          <span className={styles.initials}>{generated.initials}</span>
        </>
      )}

      {isPlaying && (
        <span className={styles.equalizer} aria-hidden="true">
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
      )}
    </div>
  );
};