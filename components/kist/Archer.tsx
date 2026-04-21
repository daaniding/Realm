"use client";

import { useEffect, useState } from "react";

interface ArcherProps {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onArrowImpact: () => void;
}

const ATTACK_FRAMES = 16;
const ATTACK_FRAME_MS = 80;
const ARROW_RELEASE_FRAME = 8;

const SHEET_ATTACK =
  "/assets/heroes/archer/Spritesheets/archer_attack_arrow_basic-Sheet.png";
const SHEET_IDLE = "/assets/heroes/archer/archer_idle.png";

export default function Archer({
  isAttacking,
  onAttackComplete,
  onArrowImpact,
}: ArcherProps) {
  const [attackFrame, setAttackFrame] = useState(0);

  useEffect(() => {
    if (!isAttacking) return;
    setAttackFrame(0);
    let f = 0;
    const interval = setInterval(() => {
      f += 1;
      if (f === ARROW_RELEASE_FRAME) onArrowImpact();
      if (f >= ATTACK_FRAMES) {
        clearInterval(interval);
        setAttackFrame(0);
        onAttackComplete();
        return;
      }
      setAttackFrame(f);
    }, ATTACK_FRAME_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  if (isAttacking) {
    const bgX = (attackFrame / (ATTACK_FRAMES - 1)) * 100;
    return (
      <div
        aria-hidden
        className="pixel"
        style={{
          width: 192,
          height: 192,
          backgroundImage: `url('${SHEET_ATTACK}')`,
          backgroundSize: `${ATTACK_FRAMES * 100}% 100%`,
          backgroundPosition: `${bgX}% 0%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          flexShrink: 0,
          alignSelf: "flex-end",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="pixel"
      style={{
        width: 192,
        height: 192,
        backgroundImage: `url('${SHEET_IDLE}')`,
        backgroundSize: "100% 100%",
        backgroundPosition: "0% 0%",
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        flexShrink: 0,
        alignSelf: "flex-end",
        filter: "drop-shadow(0 0 8px rgba(100,200,100,0.4))",
      }}
    />
  );
}
