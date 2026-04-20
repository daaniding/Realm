"use client";

import { useEffect, useState } from "react";

type Props = {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onHammerImpact?: () => void;
  scale?: number;
};

const SHEET =
  "/assets/npcs/other/spritesheet%20format/smith_anvil-Sheet.png";
const FRAMES = 5; // 160×32, 5 × 32×32
const FRAME_W = 32;
const FRAME_H = 32;
const IMPACT_FRAME = 4; // hammer lands

export default function Smith({
  isAttacking,
  onAttackComplete,
  onHammerImpact,
  scale = 4,
}: Props) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isAttacking) {
      setFrame(0);
      return;
    }
    let i = 0;
    setFrame(0);
    const id = window.setInterval(() => {
      i++;
      if (i === IMPACT_FRAME) onHammerImpact?.();
      if (i >= FRAMES) {
        window.clearInterval(id);
        setFrame(0);
        onAttackComplete();
        return;
      }
      setFrame(i);
    }, 60);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  const bgX = (frame * 100) / (FRAMES - 1); // 0/25/50/75/100
  return (
    <div
      aria-hidden
      className="pixel"
      style={{
        width: FRAME_W * scale,
        height: FRAME_H * scale,
        backgroundImage: `url("${SHEET}")`,
        backgroundSize: `${FRAMES * 100}% 100%`,
        backgroundPosition: `${bgX}% 0`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        filter: "drop-shadow(0 0 6px rgba(255, 179, 71, 0.3))",
      }}
    />
  );
}
