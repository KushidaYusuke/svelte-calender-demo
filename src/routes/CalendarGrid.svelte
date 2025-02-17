<script lang="ts">
    import { weekStart } from '$lib/stores/calendarStore';
    import dayjs from '$lib/utils/dayjs';
    
    interface PropsSchema {
      currentDate: dayjs.Dayjs;
      events: Array<{ date: dayjs.Dayjs; title: string }>;
    }
    let { currentDate, events }: PropsSchema = $props();
  
  
    let firstDayOfMonth = $derived(currentDate.startOf('month'));
    let startOfGrid = $derived.by(() => $weekStart === 'monday' 
      ? firstDayOfMonth.startOf('isoWeek') 
      : firstDayOfMonth.startOf('week')
    );
  
    let weekDays = $derived.by(() => $weekStart === 'monday'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    );
  
    function getEventsForDay(day: dayjs.Dayjs) {
      return events.filter(event => event.date.isSame(day, 'day'));
    }
  
    function isCurrentMonth(day: dayjs.Dayjs) {
      return day.month() === currentDate.month();
    }
  </script>
  
  <div class="flex-1 grid grid-cols-7 grid-rows-7 gap-px bg-gray-200">
    {#each weekDays as day}
      <div class="bg-white p-2 font-semibold text-center">{day}</div>
    {/each}
    {#each Array(42) as _, i}
      {@const day = startOfGrid.add(i, 'day')}
      {@const dayEvents = getEventsForDay(day)}
      <div class="bg-white p-2 {isCurrentMonth(day) ? 'text-gray-800' : 'text-gray-400'} min-h-[100px]">
        <span class="font-semibold">{day.date()}</span>
        {#each dayEvents as event}
          <div class="mt-1 text-xs bg-blue-100 text-blue-800 p-1 rounded">{event.title}</div>
        {/each}
      </div>
    {/each}
  </div>
  
  