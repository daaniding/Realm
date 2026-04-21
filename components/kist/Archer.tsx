"use client";

import { useEffect, useRef } from "react";

interface ArcherProps {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onArrowImpact: () => void;
}

const ATTACK_FRAMES = 16;
const ATTACK_FRAME_MS = 80;
const ATTACK_DURATION_MS = ATTACK_FRAMES * ATTACK_FRAME_MS;
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
  const impactTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Preload attack sheet once so the first frame is never blank.
  useEffect(() => {
    const img = new Image();
    img.src = SHEET_ATTACK;
  }, []);

  useEffect(() => {
    if (impactTimerRef.current) clearTimeout(impactTimerRef.current);
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    if (!isAttacking) return;
    impactTimerRef.current = setTimeout(
      onArrowImpact,
      ARROW_RELEASE_FRAME * ATTACK_FRAME_MS,
    );
    completeTimerRef.current = setTimeout(
      onAttackComplete,
      ATTACK_DURATION_MS,
    );
    return () => {
      if (impactTimerRef.current) clearTimeout(impactTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  return (
    <div
      aria-hidden
      className="pixel"
      style={{
        width: FRAME_PX,
        height: FRAME_PX,
        backgroundImage: `url('${isAttacking ? SHEET_ATTACK : SHEET_IDLE}')`,
        backgroundSize: isAttacking
          ? `${ATTACK_FRAMES * FRAME_PX}px ${FRAME_PX}px`
          : `${FRAME_PX}px ${FRAME_PX}px`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0px 0px",
        imageRendering: "pixelated",
        flexShrink: 0,
        alignSelf: "flex-end",
        animation: isAttacking
          ? `archer-attack ${ATTACK_DURATION_MS}ms steps(${ATTACK_FRAMES}) forwards`
          : "none",
        filter: isAttacking
          ? undefined
          : "drop-shadow(0 0 8px rgba(100,200,100,0.4))",
      }}
    />
  );
}
