import React, { useMemo, useState } from "react";
import styles from "./Artwork.module.scss";

type ArtworkSize = "xs" | "sm" | "md" | "lg";
type ArtworkRounded = "md" | "lg" | "xl" | "full";

interface ArtworkProps {
  src?: string | null;
  title: string;
  seed?: string;
  size?: ArtworkSize;
  rounded?: ArtworkRounded;
  isPlaying?: boolean;
  className?: string;
}

export const GRADIENT_PALETTES: readonly [string, string, string][] = [
  // Глубокий фиолет -> ягодный -> приглушенная слива
  ["#6d28d9", "#be185d", "#3b0764"],
  // Бирюза -> глубокий морской -> темный тил
  ["#0d9488", "#0369a1", "#134e4a"],
  // Теплый коралл -> малиновый -> винный
  ["#e11d48", "#be123c", "#4c0519"],
  // Мягкий индиго -> лавандовый синий -> темный сапфир
  ["#4338ca", "#6366f1", "#1e1b4b"],
  // Янтарь -> терракота -> глубокий коричневый
  ["#d97706", "#c2410c", "#431407"],
  // Изумруд -> шалфей/мята -> темный лес
  ["#059669", "#0f766e", "#022c22"],
  // Сливовый -> фиолетово-синий -> темный баклажан
  ["#7e22ce", "#4f46e5", "#2e1065"],
  // Персик-закат -> розово-коралловый -> темная бордо
  ["#f97316", "#ec4899", "#500724"],
  // Холодный лед -> голубой -> глубокий шторм
  ["#0284c7", "#38bdf8", "#082f49"],
  // Олива / лайм -> изумруд -> темный мох
  ["#65a30d", "#059669", "#1a2e05"],
  // Неоновый орхидейный -> сиреневый -> темный индиго
  ["#a855f7", "#8b5cf6", "#2e1065"],
  // Медный -> золотистый -> темный эспрессо
  ["#b45309", "#f59e0b", "#271406"],
  // Мятно-бирюзовый -> сине-зеленый -> глубокий океан
  ["#14b8a6", "#0284c7", "#042f2e"],
  // Пыльная роза / фуксия -> фиолетовый -> темный виноград
  ["#db2777", "#9333ea", "#3b0764"],
];

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function getInitials(title: string): string {
  const cleaned = title.trim();
  if (!cleaned) return "♪";

  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}

export const Artwork: React.FC<ArtworkProps> = ({
  src,
  title,
  seed,
  size = "md",
  rounded = "lg",
  isPlaying = false,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  const { fromColor, viaColor, toColor, angle, initials } = useMemo(() => {
    const key = (seed ?? title ?? "kai-music").toLowerCase().trim();
    const h = hashString(key);
    const palette = GRADIENT_PALETTES[h % GRADIENT_PALETTES.length];
    const deg = 120 + (h % 60);

    return {
      fromColor: palette[0],
      viaColor: palette[1],
      toColor: palette[2],
      angle: deg,
      initials: getInitials(title),
    };
  }, [seed, title]);

  const showImage = Boolean(src) && !imgError;

  const rootClassName = [
    styles.artwork,
    styles[`artwork--${size}`],
    styles[`artwork--rounded-${rounded}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClassName}
      style={
        showImage
          ? undefined
          : {
              backgroundImage: `linear-gradient(${angle}deg, ${fromColor}, ${viaColor} 55%, ${toColor})`,
            }
      }
      aria-label={title}
    >
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
          <div className={styles.overlay} />
          <span className={styles.initials}>{initials}</span>
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