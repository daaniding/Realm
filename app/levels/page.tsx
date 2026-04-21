"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LEVEL_REWARDS,
  MAX_LEVEL,
  type LevelReward,
} from "@/lib/levels";
import { getKaart, RARITY_COLORS } from "@/lib/kaarten";
import { getOrCreateUserId } from "@/lib/userId";

const RESOURCE_EMOJI: Record<string, string> = {
  hout: "🪵",
  steen: "🪨",
  goud: "✨",
};
const COIN_EMOJI = "🪙";

export default function LevelsPage() {
  const router = useRouter();
  const [level, setLevel] = useState(1);
  const [xpInLevel, setXpInLevel] = useState(0);
  const [xpVoorVolg, setXpVoorVolg] = useState(50);
  const [progress, setProgress] = useState(0);
  const huidigRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = getOrCreateUserId();
    if (!id) return;
    fetch(`/api/xp?userId=${id}`)
      .then((r) => r.json())
      .then((j) => {
        setLevel(j.level ?? 1);
        setXpInLevel(j.xpInHuidigLevel ?? 0);
        setXpVoorVolg(j.xpVoorVolgendLevel ?? 50);
        setProgress(j.progress ?? 0);
      })
      .catch(() => {});
  }, []);

  // Scroll naar huidig level zodra geladen
  useEffect(() => {
    if (!huidigRef.current) return;
    const el = huidigRef.current;
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, [level]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100svh",
        maxWidth: 430,
        marginInline: "auto",
        background:
          "radial-gradient(ellipse at 50% 0%, #2d1a00 0%, var(--bg-mid) 35%, var(--bg-dark) 100%)",
      }}
    >
      {/* Top bar */}
      <div
        className="fixed left-1/2 -translate-x-1/2 flex items-center"
        style={{
          top: 0,
          height: 56,
          width: "100%",
          maxWidth: 430,
          padding: "0 16px",
          zIndex: 30,
          background: "var(--bg-dark)",
          borderBottom: "1px solid rgba(255, 179, 71, 0.2)",
        }}
      >
        <button
          type="button"
          onClick={() => router.push("/")}
          className="font-cinzel"
          style={{
            fontSize: 11,
            letterSpacing: "2px",
            color: "#C4A882",
            cursor: "pointer",
            width: 80,
            textAlign: "left",
          }}
        >
          ← TERUG
        </button>
        <span
          className="font-cinzel flex-1 text-center"
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "4px",
            color: "#FFD700",
          }}
        >
          LEVEL PAD
        </span>
        <div style={{ width: 80 }} />
      </div>

      {/* Huidig level header (sticky) */}
      <div
        style={{
          position: "sticky",
          top: 56,
          zIndex: 20,
          padding: "14px 16px 12px",
          background: "var(--bg-dark)",
          borderBottom: "1px solid rgba(255, 179, 71, 0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <span
            className="font-cinzel"
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#FFD700",
              letterSpacing: "2px",
            }}
          >
            LVL {level}
          </span>
          <span
            className="font-cinzel"
            style={{
              fontSize: 11,
              color: "#C4A882",
              letterSpacing: "1px",
            }}
          >
            {xpInLevel} / {xpVoorVolg} XP
          </span>
        </div>
        <div
          style={{
            marginTop: 8,
            height: 8,
            borderRadius: 4,
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,179,71,0.25)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.max(0, Math.min(100, progress * 100))}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, var(--gold-dark), var(--gold-bright))",
              boxShadow: "0 0 10px rgba(255,215,0,0.6)",
              transition: "width 400ms ease-out",
            }}
          />
        </div>
      </div>

      {/* Reward pad */}
      <div
        style={{
          padding: "16px 16px 90px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {Array.from({ length: MAX_LEVEL - 1 }).map((_, idx) => {
          const lvl = idx + 2; // levels 2..60 (level 1 heeft geen reward)
          const reward = LEVEL_REWARDS[lvl];
          const status: "behaald" | "huidig" | "vergrendeld" =
            level > lvl
              ? "behaald"
              : level === lvl
                ? "huidig"
                : "vergrendeld";
          return (
            <div
              key={lvl}
              ref={status === "huidig" ? huidigRef : null}
            >
              <LevelTegel lvl={lvl} reward={reward} status={status} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LevelTegel({
  lvl,
  reward,
  status,
}: {
  lvl: number;
  reward: LevelReward | undefined;
  status: "behaald" | "huidig" | "vergrendeld";
}) {
  const kaart = reward?.nieuweKaart ? getKaart(reward.nieuweKaart) : null;
  const kleuren = kaart ? RARITY_COLORS[kaart.rarity] : null;

  const borderKleur =
    status === "huidig"
      ? "#FFD700"
      : status === "behaald"
        ? "rgba(110,231,183,0.5)"
        : kleuren?.border ?? "rgba(255,255,255,0.08)";

  const opacity = status === "vergrendeld" ? 0.55 : 1;
  const isHero = !!kaart;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: 12,
        borderRadius: 14,
        background:
          status === "huidig"
            ? "linear-gradient(180deg, rgba(255,215,0,0.08), rgba(255,179,71,0.04))"
            : "rgba(255,255,255,0.03)",
        border: `1.5px solid ${borderKleur}`,
        boxShadow:
          status === "huidig"
            ? "0 0 18px rgba(255,215,0,0.35)"
            : isHero && kleuren
              ? `0 0 12px ${kleuren.border}33`
              : undefined,
        opacity,
        transition: "all 200ms",
        position: "relative",
      }}
    >
      {/* Level cirkel */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background:
            status === "behaald"
              ? "linear-gradient(135deg, #3BCB8A, #1F9E65)"
              : status === "huidig"
                ? "linear-gradient(135deg, #FFD700, #B8860B)"
                : "rgba(0,0,0,0.45)",
          border: `2px solid ${
            status === "behaald"
              ? "#3BCB8A"
              : status === "huidig"
                ? "#FFD700"
                : "rgba(255,255,255,0.15)"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <span
          className="font-cinzel"
          style={{
            fontSize: 16,
            fontWeight: 900,
            color: "#FFF5E4",
            textShadow: "0 1px 2px rgba(0,0,0,0.6)",
          }}
        >
          {lvl}
        </span>
        {status === "behaald" && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              fontSize: 14,
              background: "#1F9E65",
              borderRadius: "50%",
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid var(--bg-dark)",
            }}
          >
            ✓
          </span>
        )}
      </div>

      {/* Reward */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {kaart && kleuren ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              aria-hidden
              style={{
                width: 56,
                height: 56,
                backgroundImage: `url('${kaart.sprite}')`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                filter:
                  status === "vergrendeld"
                    ? "grayscale(0.6)"
                    : `drop-shadow(0 0 8px ${kleuren.border}AA)`,
                flexShrink: 0,
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                minWidth: 0,
              }}
            >
              <span
                className="font-cinzel"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  color: kleuren.accent,
                }}
              >
                {kleuren.label} HELD
              </span>
              <span
                className="font-cinzel"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#FFF5E4",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {kaart.naam}
              </span>
            </div>
          </div>
        ) : reward ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            {reward.coins !== undefined && (
              <RewardChip emoji={COIN_EMOJI} amount={reward.coins} kleur="#FFD700" />
            )}
            {reward.resource && reward.resourceAmount !== undefined && (
              <RewardChip
                emoji={RESOURCE_EMOJI[reward.resource]}
                amount={reward.resourceAmount}
                kleur="#FFF5E4"
              />
            )}
          </div>
        ) : (
          <span
            className="font-cinzel"
            style={{ fontSize: 12, color: "#666" }}
          >
            geen beloning
          </span>
        )}
      </div>

      {/* Status badge rechts */}
      {status === "huidig" && (
        <span
          className="font-cinzel"
          style={{
            position: "absolute",
            top: 8,
            right: 12,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: "#FFD700",
            background: "rgba(255,215,0,0.15)",
            padding: "2px 6px",
            borderRadius: 6,
          }}
        >
          HUIDIG
        </span>
      )}
    </div>
  );
}

function RewardChip({
  emoji,
  amount,
  kleur,
}: {
  emoji: string;
  amount: number;
  kleur: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span aria-hidden style={{ fontSize: 22, lineHeight: 1 }}>
        {emoji}
      </span>
      <span
        className="font-cinzel"
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: kleur,
          letterSpacing: "1px",
        }}
      >
        +{amount}
      </span>
    </div>
  );
}
