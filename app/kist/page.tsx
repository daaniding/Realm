import Link from "next/link";

export default function KistPage() {
  return (
    <div
      className="flex min-h-[100svh] w-full flex-col items-center justify-center gap-6 px-6"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #2d1a00 0%, var(--bg-mid) 35%, var(--bg-dark) 100%)",
      }}
    >
      <h1
        className="font-cinzel text-center"
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "3px",
          color: "#FFD700",
        }}
      >
        KIST WACHT
      </h1>
      <p
        className="font-nunito text-center"
        style={{ fontSize: 15, color: "#C4A882", maxWidth: 320 }}
      >
        De kist-opening komt in de volgende stap. Je voortgang is opgeslagen.
      </p>
      <Link
        href="/"
        className="font-cinzel rounded-xl px-6 py-3"
        style={{
          background:
            "linear-gradient(180deg, #FFB347 0%, #B8860B 100%)",
          color: "#2a1b10",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "2px",
          border: "1.5px solid #8a5a0a",
        }}
      >
        TERUG NAAR DORP
      </Link>
    </div>
  );
}
