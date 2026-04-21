import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { dagSleutel } from "@/lib/opdrachten";

const SECRET = "debug123";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const secret = url.searchParams.get("secret");

  const isDev = process.env.NODE_ENV !== "production";
  if (!isDev && secret !== SECRET) {
    return NextResponse.json(
      { success: false, error: "forbidden" },
      { status: 403 },
    );
  }
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "missing userId" },
      { status: 400 },
    );
  }

  const datum = dagSleutel(new Date());
  const keys = [
    `user:${userId}:dagelijkseopdracht:${datum}`,
    `user:${userId}:wissel:5:${datum}`,
    `user:${userId}:wissel:15:${datum}`,
    `user:${userId}:wissel:30:${datum}`,
    `user:${userId}:wissel:60:${datum}`,
  ];

  const removed = await redis.del(...keys);

  return NextResponse.json({ success: true, datum, keys, removed });
}
