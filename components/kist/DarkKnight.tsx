"use client";

import { useEffect, useState } from "react";

interface DarkKnightProps {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onHammerImpact: () => void;
}

const ATTACK_FRAMES = 7;
const ATTACK_FRAME_MS = 80;
const IMPACT_FRAME = 3;

export default function DarkKnight({
  isAttacking,
  onAttackComplete,
  onHammerImpact,
}: DarkKnightProps) {
  const [attackFrame, setAttackFrame] = useState(0);

  useEffect(() => {
    if (!isAttacking) return;
    setAttackFrame(0);
    let f = 0;
    const interval = setInterval(() => {
      f += 1;
      if (f === IMPACT_FRAME) onHammerImpact();
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
          width: 320,
          height: 128,
          backgroundImage:
            "url('/assets/heroes/knight/dark_knight_attack1-Sheet.png')",
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
        height: 128,
        backgroundImage: "url('/assets/heroes/knight/dark_knight_idle.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "0% 0%",
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        flexShrink: 0,
        alignSelf: "flex-end",
      }}
    />
  );
}
