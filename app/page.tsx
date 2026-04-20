const TILESET = "/assets/farm/tilesets/farm_spring_summer.png";
const TILESET_W = 1200;
const TILESET_H = 720;

const HOUSES = [
  { left: "8%",  top: "6%"  },
  { left: "55%", top: "10%" },
  { left: "30%", top: "28%" },
  { left: "4%",  top: "44%" },
  { left: "60%", top: "46%" },
  { left: "18%", top: "68%" },
  { left: "56%", top: "74%" },
];

function TilesetCrop({
  sx, sy, sw, sh, displayW, displayH, filter,
}: {
  sx: number; sy: number; sw: number; sh: number;
  displayW: number; displayH: number;
  filter?: string;
}) {
  const scaleX = displayW / sw;
  const scaleY = displayH / sh;
  return (
    <div
      style={{
        width: displayW,
        height: displayH,
        overflow: "hidden",
        position: "relative",
        filter,
      }}
    >
      <img
        src={TILESET}
        alt=""
        aria-hidden
        className="pixel"
        style={{
          position: "absolute",
          left: -sx * scaleX,
          top: -sy * scaleY,
          width: TILESET_W * scaleX,
          height: TILESET_H * scaleY,
          maxWidth: "none",
        }}
      />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{
        background: "rgba(15, 27, 12, 0.78)",
        border: "2px solid #4a2e1a",
        boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.4), 0 2px 0 rgba(0,0,0,0.35)",
      }}
    >
      <span
        className="text-[10px] uppercase tracking-widest"
        style={{ color: "rgba(247, 243, 228, 0.55)" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-bold tabular-nums"
        style={{ color: accent ?? "var(--ink)" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center" style={{ background: "#0f1b0c" }}>
      <div
        className="relative flex w-full flex-col overflow-hidden"
        style={{
          maxWidth: 390,
          minHeight: "100svh",
          background: "#5d8b3a",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #6f9e45 0%, #5d8b3a 45%, #45702a 100%)",
          }}
        />

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <header className="relative z-10 flex items-center justify-between gap-2 px-4 pt-4">
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(15, 27, 12, 0.78)",
              border: "2px solid #4a2e1a",
              boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.4), 0 2px 0 rgba(0,0,0,0.35)",
            }}
          >
            <div
              className="h-6 w-6 rounded-full"
              style={{
                background: "linear-gradient(180deg, #d9b383 0%, #8a5a3b 100%)",
                border: "2px solid #2a1b10",
              }}
            />
            <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>DAAN</span>
          </div>
          <div className="flex items-center gap-2">
            <Stat label="Lv" value="1" />
            <Stat label="Coins" value="0" accent="var(--gold)" />
          </div>
        </header>

        <div className="relative z-10 flex-1">
          {HOUSES.map((h, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: h.left, top: h.top }}
            >
              <TilesetCrop
                sx={832}
                sy={512}
                sw={96}
                sh={96}
                displayW={88}
                displayH={88}
                filter="brightness(0.35) saturate(0.7)"
              />
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  bottom: -6,
                  width: 36,
                  height: 8,
                  background: "rgba(0,0,0,0.45)",
                  filter: "blur(3px)",
                }}
              />
            </div>
          ))}
        </div>

        <div className="relative z-20 px-4 pb-6 pt-3">
          <button
            type="button"
            className="w-full select-none rounded-2xl px-6 py-4 text-lg font-extrabold uppercase tracking-wide transition-transform active:translate-y-[2px]"
            style={{
              background: "linear-gradient(180deg, #f4c542 0%, #c8892a 100%)",
              color: "#2a1b10",
              border: "3px solid #2a1b10",
              boxShadow:
                "inset 0 -4px 0 rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.35), 0 6px 0 #2a1b10",
              letterSpacing: "0.08em",
            }}
          >
            Start opdracht
          </button>
          <p
            className="mt-2 text-center text-xs"
            style={{ color: "rgba(247, 243, 228, 0.55)" }}
          >
            15 min focus · timer pauzeert als je de app verlaat
          </p>
        </div>
      </div>
    </div>
  );
}
