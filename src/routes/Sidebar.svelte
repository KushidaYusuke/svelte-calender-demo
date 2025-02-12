<script lang="ts">
    import { Calendar } from 'lucide-svelte';
    import dayjs from '$lib/utils/dayjs';
    export let currentDate: dayjs.Dayjs;
    export let events: Array<{ date: dayjs.Dayjs; title: string }>;
  
    $: currentMonthEvents = events.filter(event => 
       dayjs(event.date).isSame(currentDate, 'month')
      );

  </script>
  
  <aside class="w-64 bg-gray-800 text-white p-4">
    <div class="flex items-center mb-6">
      <Calendar size={24} class="mr-2" />
      <h2 class="text-xl font-semibold">My Calendar</h2>
    </div>
    <h3 class="font-semibold mb-2">Upcoming Events</h3>
    <ul>
      {#each currentMonthEvents as event}
        <li class="mb-2">
          <div class="text-sm font-semibold">{event.date.format('YYYY/MM/DD')}</div>
          <div>{event.title}</div>
        </li>
      {/each}
    </ul>
  </aside>
  
  