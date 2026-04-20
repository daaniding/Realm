import Image from "next/image";

export default function Witch() {
  return (
    <div
      aria-hidden
      className="pixel fixed pointer-events-none"
      style={{
        right: 16,
        bottom: 80,
        zIndex: 20,
        width: 128,
        height: 128,
        filter: "drop-shadow(0 0 8px rgba(255, 179, 71, 0.6))",
        animation: "float 3s ease-in-out infinite",
        imageRendering: "pixelated",
      }}
    >
      <Image
        src="/assets/npcs/other/witch_idle_on_a_broom.gif"
        alt=""
        width={128}
        height={128}
        unoptimized
        priority
        className="pixel"
        style={{ imageRendering: "pixelated", width: 128, height: 128 }}
      />
    </div>
  );
}
