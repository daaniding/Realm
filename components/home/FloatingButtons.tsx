import { ChestIcon, CrossedSwordsIcon, ShopIcon } from "@/components/ui/GameIcon";

type FabProps = {
  icon: React.ReactNode;
  badge?: string;
  label: string;
};

function Fab({ icon, badge, label }: FabProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative flex items-center justify-center"
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "var(--bg-light)",
        border: "1.5px solid var(--gold-dark)",
        boxShadow:
          "0 4px 0 rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 179, 71, 0.1), inset 0 1px 0 rgba(255, 179, 71, 0.15)",
        color: "#FFB347",
        cursor: "pointer",
      }}
    >
      {icon}
      {badge && (
        <span
          className="absolute flex items-center justify-center font-nunito"
          style={{
            top: -4,
            right: -4,
            minWidth: 20,
            height: 20,
            padding: "0 5px",
            borderRadius: 10,
            background: "var(--red-bright)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            border: "2px solid var(--bg-dark)",
            boxShadow: "0 0 6px rgba(231, 76, 60, 0.6)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export default function FloatingButtons() {
  return (
    <div
      className="fixed z-30 flex flex-col gap-3"
      style={{ right: 12, top: 120 }}
    >
      <Fab icon={<ChestIcon size={26} />} label="Kisten" badge="3" />
      <Fab icon={<CrossedSwordsIcon size={26} />} label="Aanvallen" />
      <Fab icon={<ShopIcon size={26} />} label="Shop" />
    </div>
  );
}
