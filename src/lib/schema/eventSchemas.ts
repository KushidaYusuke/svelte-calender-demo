import { z } from "zod";
export const EventTypeSchema = z.object({
    event_id: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    event_name: z.string(),
    event_privacy_type: z.string(),
    event_booking_type: z.string(),
    event_location: z.string(),
    default_booked_limit: z.number(),
    created_by: z.string(),
    date_begin: z.string(),
    date_end: z.string(),
    description: z.string(),
    extra_info: z.record(z.unknown()), // 任意のオブジェクト
    is_active: z.boolean(),
  });

  export const EventRequestSchema = z.object({
    event_id: z.string().regex(/^event-\d{8}$/, {
      message: "event_idは 'event-XXXXXXXX' (Xは数字8桁) の形式で入力してください",
    }),
    event_name: z.string().min(1, "イベント名は必須です"),
    event_type: z.enum(["public", "private"], {
      message: "event_typeは 'public' または 'private' のいずれかである必要があります",
    }),
    date_begin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "date_beginは 'YYYY-MM-DD' の形式で入力してください",
    }),
    date_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "date_endは 'YYYY-MM-DD' の形式で入力してください",
    }),
    default_booked_limit: z.number().int().positive({
      message: "default_booked_limitは正の整数である必要があります",
    }),
    event_location: z.string().min(1, "イベントの場所は必須です"),
    description: z.string().optional(),
    extra_info: z.record(z.unknown()), // extra_info はオブジェクトであることを保証
    user_id: z.string().regex(/^user-\d{8}$/, {
      message: "user_idは 'user-XXXXXXXX' (Xは数字8桁) の形式で入力してください",
    }),
  });

  //イベントを一覧表示する場合に使用するスキーマ
  export const EventPreviewSchema = 
    EventTypeSchema.pick({
      event_id: true,
      event_name: true,
      event_privacy_type: true,
      event_booking_type: true,
      description: true,
      date_begin: true,
      date_end: true,
      is_active: true,
    })

  export const EventPreviewListSchema = z.array(EventPreviewSchema);
  
export type EventType = z.infer<typeof EventTypeSchema>;
export type EventRequestType= z.infer<typeof EventRequestSchema>;
export type EventPreviewType = z.infer<typeof EventPreviewSchema>;
export type EventPreviewListType = z.infer<typeof EventPreviewListSchema>;