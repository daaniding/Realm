"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  CastleIcon,
  HouseIcon,
  LaurelsIcon,
  SwordIcon,
} from "@/components/ui/GameIcon";

type Tab = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const TABS: Tab[] = [
  { icon: <HouseIcon size={24} />, label: "HOME", href: "/" },
  { icon: <CastleIcon size={24} />, label: "DORP", href: "/dorp" },
  { icon: <SwordIcon size={24} />, label: "KAARTEN", href: "/helden" },
  { icon: <LaurelsIcon size={24} />, label: "LEAGUE", href: "/league" },
];

export default function TabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      className="fixed left-1/2 bottom-0 z-30 flex w-full -translate-x-1/2 items-stretch"
      style={{
        maxWidth: 430,
        height: 70,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        background: "var(--bg-dark)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 179, 71, 0.3)",
      }}
    >
      {TABS.map((t) => {
        const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
        return (
          <button
            key={t.label}
            type="button"
            onClick={() => router.push(t.href)}
            className="flex flex-1 flex-col items-center justify-center gap-1"
            style={{
              color: active ? "#FFD700" : "#C4A882",
              transition: "color 200ms ease, opacity 200ms ease",
              opacity: active ? 1 : 0.85,
              cursor: "pointer",
            }}
          >
            {t.icon}
            <span
              className="font-cinzel"
              style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px" }}
            >
              {t.label}
            </span>
            {active && <span className="tab-dot" />}
          </button>
        );
      })}
    </nav>
  );
}
