import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import {
  STARTER_KAART_IDS,
  getKaart,
  kaartenNodigVoorLevel,
} from "@/lib/kaarten";

type KaartState = { level: number; kaarten: number; ontgrendeld: boolean };

function kaartKey(userId: string, kaartId: string) {
  return `user:${userId}:kaart:${kaartId}`;
}

async function leesAlleKaarten(userId: string): Promise<Record<string, KaartState>> {
  const ids = ["archer", "dark_knight", "fire_knight", "samurai", "mage", "healer", "cloaked_figure", "smith", "angler", "doctor", "old_man", "witch"];
  const results = await Promise.all(
    ids.map(async (id) => {
      const raw = (await redis.get(kaartKey(userId, id))) as KaartState | null;
      return [id, raw] as const;
    }),
  );
  const state: Record<string, KaartState> = {};
  for (const [id, raw] of results) {
    if (raw) {
      state[id] = {
        level: raw.level ?? 1,
        kaarten: raw.kaarten ?? 0,
        ontgrendeld: true,
      };
    } else if ((STARTER_KAART_IDS as readonly string[]).includes(id)) {
      state[id] = { level: 1, kaarten: 0, ontgrendeld: true };
    } else {
      state[id] = { level: 0, kaarten: 0, ontgrendeld: false };
    }
  }
  return state;
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }
  const state = await leesAlleKaarten(userId);
  return NextResponse.json({ state });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, actie, kaartId, aantal } = body as {
    userId: string;
    actie: "upgrade" | "voeg_toe";
    kaartId: string;
    aantal?: number;
  };

  if (!userId || !kaartId || !actie) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const kaart = getKaart(kaartId);
  if (!kaart) {
    return NextResponse.json({ error: "unknown kaart" }, { status: 404 });
  }

  const key = kaartKey(userId, kaartId);
  const huidig = ((await redis.get(key)) as KaartState | null) ?? {
    level: (STARTER_KAART_IDS as readonly string[]).includes(kaartId) ? 1 : 0,
    kaarten: 0,
    ontgrendeld: (STARTER_KAART_IDS as readonly string[]).includes(kaartId),
  };

  if (actie === "voeg_toe") {
    const n = Math.max(1, aantal ?? 1);
    const nieuw: KaartState = {
      level: huidig.level === 0 ? 1 : huidig.level,
      kaarten: huidig.kaarten + n,
      ontgrendeld: true,
    };
    await redis.set(key, nieuw);
    return NextResponse.json({ state: nieuw });
  }

  if (actie === "upgrade") {
    if (!huidig.ontgrendeld) {
      return NextResponse.json({ error: "nog niet ontgrendeld" }, { status: 400 });
    }
    const nodig = kaartenNodigVoorLevel(kaart, huidig.level);
    if (nodig === null) {
      return NextResponse.json({ error: "max level" }, { status: 400 });
    }
    if (huidig.kaarten < nodig) {
      return NextResponse.json({ error: "niet genoeg kaarten" }, { status: 400 });
    }
    const nieuw: KaartState = {
      level: huidig.level + 1,
      kaarten: huidig.kaarten - nodig,
      ontgrendeld: true,
    };
    await redis.set(key, nieuw);
    return NextResponse.json({ state: nieuw });
  }

  return NextResponse.json({ error: "onbekende actie" }, { status: 400 });
}
