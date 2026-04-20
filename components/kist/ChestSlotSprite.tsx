"use client";

import { useEffect, useState } from "react";

type ChestType = "bronze" | "silver" | "epic" | "legendary";

const ROW: Record<ChestType, number> = {
  bronze: 0,
  silver: 2,
  epic: 4,
  legendary: 6,
};

type Props = {
  type: ChestType;
  scale?: number;
  animated?: boolean;
  isReady?: boolean;
};

export default function ChestSlotSprite({
  type,
  scale = 3,
  animated,
  isReady,
}: Props) {
  const [col, setCol] = useState(0);
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setCol((c) => (c + 1) % 5), 220);
    return () => clearInterval(id);
  }, [animated]);

  const bgX = col * 25;
  const bgY = (ROW[type] * 100) / 7;
  const w = 48 * scale;
  const h = 32 * scale;

  return (
    <div
      aria-hidden
      className="pixel"
      style={{
        width: w,
        height: h,
        backgroundImage:
          'url("/assets/chests/Animated%20Chests/Chests.png")',
        backgroundSize: "500% 800%",
        backgroundPosition: `${bgX}% ${bgY}%`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        animation: isReady ? "ready-glow 1.5s ease-in-out infinite" : undefined,
      }}
    />
  );
}
