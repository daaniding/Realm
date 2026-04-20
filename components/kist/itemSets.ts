import type { Rarity } from "./ChestItem";

export type IconId = "sword" | "coin" | "castle";
export type ChestType = "bronze" | "silver" | "epic" | "legendary";
export type ChestSize = "small" | "medium" | "large" | "mega";

export type ItemSpec = {
  name: string;
  icon: IconId;
  rarity: Rarity;
  rainbow?: boolean;
};

export const ITEM_SETS: Record<ChestType, Record<ChestSize, ItemSpec[]>> = {
  bronze: {
    small: [
      { name: "Hout x3", icon: "castle", rarity: "common" },
      { name: "50 Coins", icon: "coin", rarity: "common" },
    ],
    medium: [
      { name: "Hout x5", icon: "castle", rarity: "common" },
      { name: "75 Coins", icon: "coin", rarity: "common" },
      { name: "Boogschutter", icon: "sword", rarity: "rare" },
    ],
    large: [
      { name: "Hout x8", icon: "castle", rarity: "rare" },
      { name: "150 Coins", icon: "coin", rarity: "rare" },
      { name: "Boogschutter", icon: "sword", rarity: "rare" },
      { name: "Dorp Upgrade", icon: "castle", rarity: "epic" },
    ],
    mega: [
      { name: "Hout x15", icon: "castle", rarity: "epic" },
      { name: "300 Coins", icon: "coin", rarity: "epic" },
      { name: "Dark Knight", icon: "sword", rarity: "epic" },
      { name: "Dorp Upgrade", icon: "castle", rarity: "epic" },
      { name: "Geheim Item", icon: "sword", rarity: "legendary", rainbow: true },
    ],
  },
  silver: {
    small: [
      { name: "100 Coins", icon: "coin", rarity: "common" },
      { name: "Hout x5", icon: "castle", rarity: "rare" },
    ],
    medium: [
      { name: "150 Coins", icon: "coin", rarity: "rare" },
      { name: "Hout x8", icon: "castle", rarity: "rare" },
      { name: "Boogschutter", icon: "sword", rarity: "rare" },
    ],
    large: [
      { name: "200 Coins", icon: "coin", rarity: "rare" },
      { name: "Dark Knight", icon: "sword", rarity: "epic" },
      { name: "Hout x12", icon: "castle", rarity: "epic" },
      { name: "Dorp Upgrade", icon: "castle", rarity: "epic" },
    ],
    mega: [
      { name: "400 Coins", icon: "coin", rarity: "epic" },
      { name: "Dark Knight", icon: "sword", rarity: "epic" },
      { name: "Samurai", icon: "sword", rarity: "legendary" },
      { name: "Dorp Upgrade", icon: "castle", rarity: "epic" },
      { name: "Geheim Item", icon: "sword", rarity: "legendary", rainbow: true },
    ],
  },
  epic: {
    small: [
      { name: "200 Coins", icon: "coin", rarity: "rare" },
      { name: "Dark Knight", icon: "sword", rarity: "epic" },
    ],
    medium: [
      { name: "300 Coins", icon: "coin", rarity: "epic" },
      { name: "Dark Knight", icon: "sword", rarity: "epic" },
      { name: "Samurai", icon: "sword", rarity: "epic" },
    ],
    large: [
      { name: "400 Coins", icon: "coin", rarity: "epic" },
      { name: "Samurai", icon: "sword", rarity: "legendary" },
      { name: "Dorp Upgrade", icon: "castle", rarity: "epic" },
      { name: "Fire Knight", icon: "sword", rarity: "epic" },
    ],
    mega: [
      { name: "600 Coins", icon: "coin", rarity: "legendary" },
      { name: "Samurai", icon: "sword", rarity: "legendary" },
      { name: "Fire Knight", icon: "sword", rarity: "legendary" },
      { name: "Dorp Upgrade", icon: "castle", rarity: "legendary" },
      { name: "Geheim Held", icon: "sword", rarity: "legendary", rainbow: true },
    ],
  },
  legendary: {
    small: [
      { name: "300 Coins", icon: "coin", rarity: "epic" },
      { name: "Samurai", icon: "sword", rarity: "legendary" },
    ],
    medium: [
      { name: "500 Coins", icon: "coin", rarity: "legendary" },
      { name: "Samurai", icon: "sword", rarity: "legendary" },
      { name: "Fire Knight", icon: "sword", rarity: "legendary" },
    ],
    large: [
      { name: "700 Coins", icon: "coin", rarity: "legendary" },
      { name: "Samurai", icon: "sword", rarity: "legendary" },
      { name: "Fire Knight", icon: "sword", rarity: "legendary" },
      { name: "Geheim Held", icon: "sword", rarity: "legendary" },
    ],
    mega: [
      { name: "1000 Coins", icon: "coin", rarity: "legendary", rainbow: true },
      { name: "Samurai", icon: "sword", rarity: "legendary", rainbow: true },
      { name: "Fire Knight", icon: "sword", rarity: "legendary", rainbow: true },
      { name: "Geheim Held", icon: "sword", rarity: "legendary", rainbow: true },
      { name: "ULTRA ITEM", icon: "sword", rarity: "legendary", rainbow: true },
    ],
  },
};
