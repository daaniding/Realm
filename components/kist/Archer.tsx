"use client";

import { useEffect, useRef, useState } from "react";

interface ArcherProps {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onArrowImpact: () => void;
}

const ATTACK_FRAMES = 16;
const ATTACK_FRAME_MS = 80;
const ARROW_RELEASE_FRAME = 8;
const FRAME_PX = 192;

const SHEET_ATTACK =
  "/assets/heroes/archer/Spritesheets/archer_attack_arrow_basic-Sheet.png";
const SHEET_IDLE = "/assets/heroes/archer/archer_idle.png";

export default function Archer({
  isAttacking,
  onAttackComplete,
  onArrowImpact,
}: ArcherProps) {
  const [attackFrame, setAttackFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isAttacking) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      let f = 0;
      intervalRef.current = setInterval(() => {
        setAttackFrame(f);
        if (f === ARROW_RELEASE_FRAME) onArrowImpact();
        f++;
        if (f >= ATTACK_FRAMES) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setAttackFrame(0);
          onAttackComplete();
        }
      }, ATTACK_FRAME_MS);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setAttackFrame(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  const bgImage = isAttacking ? SHEET_ATTACK : SHEET_IDLE;
  const bgSize = isAttacking
    ? `${ATTACK_FRAMES * FRAME_PX}px ${FRAME_PX}px`
    : `${FRAME_PX}px ${FRAME_PX}px`;
  const bgPos = isAttacking ? `${-attackFrame * FRAME_PX}px 0px` : `0px 0px`;

  return (
    <>
      {/* preload attack sheet so the first frame is never blank */}
      <img
        src={SHEET_ATTACK}
        alt=""
        aria-hidden
        style={{ position: "absolute", width: 0, height: 0, opacity: 0 }}
      />
      <div
        aria-hidden
        className="pixel"
        style={{
          width: FRAME_PX,
          height: FRAME_PX,
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: bgSize,
          backgroundPosition: bgPos,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          flexShrink: 0,
          alignSelf: "flex-end",
          filter: isAttacking
            ? undefined
            : "drop-shadow(0 0 8px rgba(100,200,100,0.4))",
        }}
      />
    </>
  );
}
