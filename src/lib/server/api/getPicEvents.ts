import { EventTypeSchema } from "$lib/schema/eventSchemas";
import type { EventType } from "$lib/schema/eventSchemas";
import { z } from "zod";
const getPicEvents = async (
  magnedonBaseOrigin: string,
  userId: string,
): Promise<EventType[]> => {
  
  const path = `/@magnedon/api/client/pic_joined_events/${userId}/`;

  const res = await fetch(magnedonBaseOrigin + path);

  if (!res.ok) {
    throw new Error("Failed to fetch pic joined events");
  }

  const json = await res.json();
  // zodでバリデーションを実施
  const parsed = z.array(EventTypeSchema).safeParse(json.data);

  if (!parsed.success) {
    console.error("Invalid event data:", parsed.error.format());
    throw new Error("Invalid event data received");
  }

  return parsed.data; // バリデーション済みデータを返す
};

export default getPicEvents;
