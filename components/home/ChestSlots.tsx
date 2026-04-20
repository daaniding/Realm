import { ChestIcon, PadlockIcon } from "@/components/ui/GameIcon";

type SlotProps = { children: React.ReactNode; ready?: boolean; glow?: string };

function Slot({ children, ready, glow }: SlotProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center${ready ? " chest-ready" : ""}`}
      style={{
        width: "calc(25% - 6px)",
        height: 60,
        background: "rgba(45, 26, 0, 0.8)",
        border: "1.5px solid var(--gold-dark)",
        borderRadius: 10,
        boxShadow: glow,
        gap: 2,
      }}
    >
      {children}
    </div>
  );
}

export default function ChestSlots() {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 flex flex-col gap-1.5"
      style={{
        bottom: 155,
        width: "calc(100% - 24px)",
        maxWidth: 406,
        zIndex: 15,
      }}
    >
      <span
        className="font-cinzel"
        style={{
          fontSize: 10,
          fontWeight: 400,
          letterSpacing: "3px",
          color: "#C4A882",
          paddingLeft: 2,
        }}
      >
        SCHATKAMER
      </span>
      <div className="flex gap-2">
        {/* Slot 1: filled, timer running */}
        <Slot glow="0 0 8px rgba(255, 179, 71, 0.3)">
          <ChestIcon size={28} style={{ color: "#FFD700" }} />
          <span
            className="font-cinzel tabular-nums"
            style={{ fontSize: 13, fontWeight: 700, color: "#FFB347" }}
          >
            41:13
          </span>
        </Slot>

        {/* Slot 2: ready to open */}
        <Slot ready>
          <span className="chest-shimmer" style={{ color: "#FFD700", lineHeight: 0 }}>
            <ChestIcon size={28} />
          </span>
          <span
            className="font-cinzel"
            style={{
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "2px",
              color: "#E74C3C",
            }}
          >
            OPEN!
          </span>
        </Slot>

        {/* Slot 3: empty */}
        <Slot>
          <PadlockIcon size={20} style={{ color: "#C4A882", opacity: 0.5 }} />
        </Slot>

        {/* Slot 4: empty */}
        <Slot>
          <PadlockIcon size={20} style={{ color: "#C4A882", opacity: 0.5 }} />
        </Slot>
      </div>
    </div>
  );
}
