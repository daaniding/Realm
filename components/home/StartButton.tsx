"use client";

import { useRouter } from "next/navigation";

export default function StartButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() =>
        router.push(
          "/timer?duration=1800&name=Focus+%26+Conquer&reward=silver",
        )
      }
      className="btn-start font-cinzel select-none"
      style={{
        width: "calc(100% - 32px)",
        maxWidth: 380,
        height: 64,
        borderRadius: 16,
        border: "none",
        background:
          "linear-gradient(180deg, var(--amber) 0%, var(--red-action) 100%)",
        color: "#FFF5E4",
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: "3px",
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        cursor: "pointer",
      }}
    >
      START OPDRACHT
    </button>
  );
}
