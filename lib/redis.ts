import { Redis } from "@upstash/redis";

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;

if (!url || !token) {
  throw new Error(
    "Missing KV_REST_API_URL or KV_REST_API_TOKEN. Run `vercel env pull` or set them in Vercel project settings.",
  );
}

export const redis = new Redis({ url, token });

export type TimerStatus = "running" | "paused" | "completed";

export type TimerRecord = {
  userId: string;
  name: string;
  startTime: number;
  duration: number;
  status: TimerStatus;
  updatedAt: number;
};

export const timerKey = (userId: string) => `timer:${userId}`;
