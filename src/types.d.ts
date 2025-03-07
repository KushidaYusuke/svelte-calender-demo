type EventType = {
    event_id: string
    created_at: string
    updated_at: string
    //
    event_name: string
    event_privacy_type: string
    event_booking_type: string
    event_location: string
    //
    base_limit: number
    created_by: string
    date_begin: string
    date_end: string
    description: string
    extra_info: Object
    is_active: boolean
  }
  
  type ScheduleType = {
    schedule_id: string
    created_at: string
    updated_at: string
    //
    schedule_type: "base" | "temporary"
    //
    canceled: boolean
    created_by: string
    date: string
    description: string
    extra_info: Object
    limit: number
    time_start: string
    time_end: string
  }
  
  type EventItemType = {
    event: EventType
    schedules: ScheduleType[]
    joinedSchedules: ScheduleType[]
  }
  