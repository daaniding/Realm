import { NextResponse } from "next/server";
import {
  redis,
  timerKey,
  type TimerRecord,
  type TimerStatus,
} from "@/lib/redis";

const VALID_STATUSES: TimerStatus[] = ["running", "paused", "completed"];

export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "missing userId" },
      { status: 400 },
    );
  }
  const record = await redis.get<TimerRecord>(timerKey(userId));
  return NextResponse.json({ success: true, timer: record ?? null });
}

export async function POST(req: Request) {
  let body: Partial<TimerRecord>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid json" },
      { status: 400 },
    );
  }
  const { userId, startTime, duration, name } = body;
  if (
    !userId ||
    typeof startTime !== "number" ||
    typeof duration !== "number" ||
    typeof name !== "string"
  ) {
    return NextResponse.json(
      { success: false, error: "missing fields" },
      { status: 400 },
    );
  }
  const record: TimerRecord = {
    userId,
    name,
    startTime,
    duration,
    status: "running",
    updatedAt: Date.now(),
  };
  // Keep for 24h so stale timers get cleaned up
  await redis.set(timerKey(userId), record, { ex: 60 * 60 * 24 });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
  let body: { userId?: string; status?: TimerStatus };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid json" },
      { status: 400 },
    );
  }
  const { userId, status } = body;
  if (!userId || !status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { success: false, error: "bad request" },
      { status: 400 },
    );
  }
  const existing = await redis.get<TimerRecord>(timerKey(userId));
  if (!existing) {
    return NextResponse.json(
      { success: false, error: "no timer for user" },
      { status: 404 },
    );
  }
  const updated: TimerRecord = {
    ...existing,
    status,
    updatedAt: Date.now(),
  };
  await redis.set(timerKey(userId), updated, { ex: 60 * 60 * 24 });
  return NextResponse.json({ success: true });
}
