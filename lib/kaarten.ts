export type Rarity = "gewoon" | "zeldzaam" | "episch" | "legendarisch";

export interface Kaart {
  id: string;
  naam: string;
  rarity: Rarity;
  type: "held" | "npc";
  sprite: string;
  beschrijving: string;
  stats: {
    aanval: number;
    verdediging: number;
    snelheid: number;
    speciale: number;
  };
  upgradeKaarten: number[];
  maxLevel: number;
}

const STANDAARD_UPGRADE = [2, 4, 8, 16, 32, 64, 100];

export const kaarten: Kaart[] = [
  {
    id: "archer",
    naam: "Boogschutter",
    rarity: "zeldzaam",
    type: "held",
    sprite: "/assets/heroes/archer/archer_idle.png",
    beschrijving: "Snel en nauwkeurig, raakt vijanden van afstand.",
    stats: { aanval: 7, verdediging: 3, snelheid: 8, speciale: 6 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "dark_knight",
    naam: "Donkere Ridder",
    rarity: "episch",
    type: "held",
    sprite: "/assets/heroes/dark_knight/dark_knight_idle.png",
    beschrijving: "Zware aanvaller met hoge verdediging.",
    stats: { aanval: 9, verdediging: 8, snelheid: 4, speciale: 7 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "fire_knight",
    naam: "Vuurridder",
    rarity: "episch",
    type: "held",
    sprite: "/assets/heroes/fire_knight/fire_knight_idle.png",
    beschrijving: "Verbrandt vijanden met zijn vuurzwaard.",
    stats: { aanval: 10, verdediging: 6, snelheid: 5, speciale: 9 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "samurai",
    naam: "Samurai",
    rarity: "episch",
    type: "held",
    sprite: "/assets/heroes/samurai/samurai_idle.png",
    beschrijving: "Snel en dodelijk, meester van het zwaard.",
    stats: { aanval: 9, verdediging: 5, snelheid: 9, speciale: 8 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "mage",
    naam: "Magiër",
    rarity: "legendarisch",
    type: "held",
    sprite: "/assets/heroes/mage/mage_idle.png",
    beschrijving: "Machtige tovenaar die meerdere vijanden raakt.",
    stats: { aanval: 10, verdediging: 3, snelheid: 5, speciale: 10 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "healer",
    naam: "Genezer",
    rarity: "zeldzaam",
    type: "held",
    sprite: "/assets/heroes/healer/healer_idle.png",
    beschrijving: "Heelt bondgenoten tijdens de strijd.",
    stats: { aanval: 3, verdediging: 6, snelheid: 6, speciale: 10 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "cloaked_figure",
    naam: "Schaduwloper",
    rarity: "legendarisch",
    type: "held",
    sprite: "/assets/heroes/cloaked_figure/cloaked_figure_idle.png",
    beschrijving: "Onzichtbare aanvaller die toeslaat vanuit de schaduw.",
    stats: { aanval: 8, verdediging: 4, snelheid: 10, speciale: 9 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "smith",
    naam: "Smid",
    rarity: "gewoon",
    type: "npc",
    sprite: "/assets/npcs/idle/smith_idle.png",
    beschrijving: "Repareert wapens en maakt uitrusting.",
    stats: { aanval: 4, verdediging: 5, snelheid: 3, speciale: 7 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "angler",
    naam: "Visser",
    rarity: "gewoon",
    type: "npc",
    sprite: "/assets/npcs/idle/angler_idle.png",
    beschrijving: "Vangt vis voor voedsel en handel.",
    stats: { aanval: 2, verdediging: 3, snelheid: 5, speciale: 4 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "doctor",
    naam: "Dokter",
    rarity: "zeldzaam",
    type: "npc",
    sprite: "/assets/npcs/idle/doctor_idle.png",
    beschrijving: "Heelt gewonde krijgers na de strijd.",
    stats: { aanval: 1, verdediging: 4, snelheid: 4, speciale: 9 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "old_man",
    naam: "Oude Wijze",
    rarity: "zeldzaam",
    type: "npc",
    sprite: "/assets/npcs/idle/old_man_idle.png",
    beschrijving: "Geeft wijze raad en boost het moreel.",
    stats: { aanval: 1, verdediging: 2, snelheid: 2, speciale: 8 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "witch",
    naam: "Heks",
    rarity: "zeldzaam",
    type: "npc",
    sprite: "/assets/npcs/idle/witch_idle.png",
    beschrijving: "Brouwt drankjes en vervloekt vijanden.",
    stats: { aanval: 6, verdediging: 3, snelheid: 5, speciale: 8 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
];

export const STARTER_KAART_IDS = ["archer", "smith"] as const;

export const RARITY_COLORS: Record<
  Rarity,
  { bg: string; border: string; accent: string; label: string }
> = {
  gewoon: {
    bg: "#1a1a2e",
    border: "#9B9B9B",
    accent: "#C0C0C0",
    label: "GEWOON",
  },
  zeldzaam: {
    bg: "#0d1b2a",
    border: "#4A90D9",
    accent: "#4A90D9",
    label: "ZELDZAAM",
  },
  episch: {
    bg: "#1a0d2e",
    border: "#9B59B6",
    accent: "#B983D9",
    label: "EPISCH",
  },
  legendarisch: {
    bg: "#1a1200",
    border: "#FFD700",
    accent: "#FFD700",
    label: "LEGENDARISCH",
  },
};

export function kaartenNodigVoorLevel(
  kaart: Kaart,
  level: number,
): number | null {
  if (level >= kaart.maxLevel) return null;
  return kaart.upgradeKaarten[level - 1] ?? null;
}

export function getKaart(id: string): Kaart | undefined {
  return kaarten.find((k) => k.id === id);
}
