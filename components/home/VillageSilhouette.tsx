export default function VillageSilhouette() {
  const fill = "rgba(255, 179, 71, 0.06)";

  return (
    <>
      {/* Moon halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: 110,
          right: 38,
          width: 80,
          height: 80,
          zIndex: 1,
          background:
            "radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.12) 35%, rgba(255,215,0,0) 70%)",
        }}
      />
      {/* Moon disc (30px) */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          top: 135,
          right: 63,
          width: 30,
          height: 30,
          zIndex: 1,
          background: "rgba(255, 215, 0, 0.6)",
          boxShadow: "0 0 14px rgba(255, 215, 0, 0.3)",
        }}
      />

      {/* Village silhouette: shifted up 120px, scaled 1.2, sent behind UI */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0"
        style={{
          bottom: 190,
          height: 220,
          zIndex: 0,
          transform: "scale(1.2)",
          transformOrigin: "bottom center",
          WebkitMaskImage:
            "linear-gradient(to top, #000 30%, rgba(0,0,0,0.7) 60%, transparent 100%)",
          maskImage:
            "linear-gradient(to top, #000 30%, rgba(0,0,0,0.7) 60%, transparent 100%)",
        }}
      >
        <svg
          viewBox="0 0 430 220"
          preserveAspectRatio="xMidYMax meet"
          width="100%"
          height="100%"
          style={{ display: "block" }}
        >
        {/* Left tree cluster */}
        <g fill={fill}>
          <polygon points="10,220 10,150 32,120 54,150 54,220" />
          <polygon points="48,220 48,135 72,100 96,135 96,220" />
          <rect x="28" y="210" width="6" height="14" />
          <rect x="76" y="205" width="6" height="18" />
        </g>

        {/* Left houses */}
        <g fill={fill}>
          {/* small house */}
          <polygon points="100,220 100,160 128,138 156,160 156,220" />
          <rect x="118" y="178" width="10" height="22" fill="rgba(0,0,0,0)" />
          {/* medium house */}
          <polygon points="152,220 152,145 188,115 224,145 224,220" />
        </g>

        {/* Central tower */}
        <g fill={fill}>
          <polygon points="200,220 200,90 215,62 230,90 230,220" />
          <polygon points="195,100 215,58 235,100" />
          {/* flag */}
          <rect x="214" y="40" width="2" height="22" />
          <polygon points="216,42 228,46 216,50" />
        </g>

        {/* Right houses */}
        <g fill={fill}>
          <polygon points="230,220 230,150 262,120 294,150 294,220" />
          <polygon points="290,220 290,160 316,138 342,160 342,220" />
        </g>

        {/* Right tree cluster */}
        <g fill={fill}>
          <polygon points="346,220 346,138 370,105 394,138 394,220" />
          <polygon points="388,220 388,152 410,124 430,152 430,220" />
          <rect x="378" y="210" width="6" height="14" />
        </g>
        </svg>
      </div>
    </>
  );
}
