const SHEETS = [
  "angler",
  "doctor",
  "girl1",
  "girl2",
  "old_man",
  "smith",
  "witch",
] as const;

const BASE = "/assets/npcs/walk/spritesheet%20format";

export default function NpcParade() {
  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 pointer-events-none overflow-hidden"
      style={{
        bottom: 70,
        height: 80,
        zIndex: 5,
      }}
    >
      {SHEETS.map((name, i) => (
        <div
          key={name}
          className="parade-npc"
          style={{
            backgroundImage: `url("${BASE}/${name}_walk_right-Sheet.png")`,
            animationDelay: `${i * 3}s, 0s`,
          }}
        />
      ))}
    </div>
  );
}
