<script lang="ts">
    import { weekStart } from '$lib/stores/calendarStore';
    import dayjs from '$lib/utils/dayjs';
  
    interface PropsSchema {
      currentDate: dayjs.Dayjs;
      events: Array<{ date: dayjs.Dayjs; title: string }>;
    }

    let { currentDate, events }: PropsSchema = $props();
  
    
    let startOfWeek = $derived.by(() => $weekStart === 'monday' ? currentDate.startOf('isoWeek') : currentDate.startOf('week'));
    let  weekDays = $derived(Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day')));

  
    function getEventsForDay(day: dayjs.Dayjs) {
      return events.filter(event => event.date.isSame(day, 'day'));
    }
  
    let weekDayLabels = $derived.by(() => $weekStart === 'monday'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    );
  </script>
  
  <div class="flex-1 grid grid-cols-7 grid-rows-25 gap-px bg-gray-200">
    {#each weekDayLabels as day, index}
      <div class="bg-white p-2 font-semibold text-center">
        {day}
        <div class="text-sm font-normal">{weekDays[index].format('D')}</div>
      </div>
    {/each}
    {#each Array(24) as _, hour}
      {#each weekDays as day, dayIndex}
        <div class="bg-white p-1 border-t border-gray-200 relative">
          {#if dayIndex === 0}
            <span class="absolute top-0 left-0 text-xs text-gray-500">
              {hour.toString().padStart(2, '0')}:00
            </span>
          {/if}
          {#each getEventsForDay(day) as event}
            {#if event.date.hour() === hour}
              
              <div class="mt-4 text-xs bg-blue-100 text-blue-800 p-1 rounded">
                {event.title}
              </div>
            {/if}
          {/each}
        </div>
      {/each}
    {/each}
  </div>
  
  