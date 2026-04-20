"use client";

import { useEffect, useState } from "react";

interface SmithProps {
  chestType: "bronze" | "silver" | "epic" | "legendary";
  chestSize: "small" | "medium" | "large" | "mega";
  chestFrame: number;
  chestRow: number;
  isAttacking: boolean;
  onAttackComplete: () => void;
  onHammerImpact: () => void;
  chestShakeKey?: number;
  chestRef?: (el: HTMLDivElement | null) => void;
}

export default function Smith({
  chestSize,
  chestFrame,
  chestRow,
  isAttacking,
  onAttackComplete,
  onHammerImpact,
  chestShakeKey = 0,
  chestRef,
}: SmithProps) {
  const [smithFrame, setSmithFrame] = useState(0);

  const scaleMap = {
    small: 1.5,
    medium: 2.2,
    large: 3.0,
    mega: 3.8,
  } as const;
  const scale = scaleMap[chestSize];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAttacking) {
      let f = 0;
      interval = setInterval(() => {
        setSmithFrame(f);
        if (f === 2) onHammerImpact();
        f++;
        if (f >= 5) {
          clearInterval(interval);
          setSmithFrame(0);
          onAttackComplete();
        }
      }, 80);
    } else {
      let f = 0;
      interval = setInterval(() => {
        setSmithFrame(f);
        f = (f + 1) % 5;
      }, 180);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  const smithBgX = (smithFrame / 4) * 100;
  const chestBgX = (chestFrame / 4) * 100;
  const chestBgY = (chestRow / 7) * 100;

  return (
    <div
      style={{
        position: "relative",
        width: 128,
        height: 128,
        overflow: "visible",
        transform: `scale(${scale})`,
        transformOrigin: "center bottom",
        transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Smid sprite — mirrored to face right */}
      <div
        aria-hidden
        className="pixel"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 128,
          height: 128,
          backgroundImage:
            "url('/assets/npcs/other/spritesheet%20format/smith_no_anvil.png')",
          backgroundSize: "500% 100%",
          backgroundPosition: `${smithBgX}% 0%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          transform: "scaleX(-1)",
          transformOrigin: "center center",
        }}
      />

      {/* Kist placed exactly where the (mirrored) anvil is:
          anvil src x=0..16, y=17..29 → render 0..64, 68..116 on 128×128.
          Mirror flips left ↔ right, so we use right:0 instead of left:0. */}
      <div
        ref={chestRef}
        key={`tap-${chestShakeKey}`}
        className="pixel"
        style={{
          position: "absolute",
          top: 68,
          right: 0,
          width: 64,
          height: 48,
          backgroundImage:
            "url('/assets/chests/Animated%20Chests/Chests.png')",
          backgroundSize: "500% 800%",
          backgroundPosition: `${chestBgX}% ${chestBgY}%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          animation:
            chestShakeKey > 0 ? "tap-shake 200ms ease-in-out" : undefined,
        }}
      />
    </div>
  );
}
