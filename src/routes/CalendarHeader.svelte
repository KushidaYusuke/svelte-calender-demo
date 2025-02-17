<script lang="ts">
    import { ChevronLeft, ChevronRight } from 'lucide-svelte';
    import { viewType, weekStart } from '$lib/stores/calendarStore';
    import dayjs from '$lib/utils/dayjs';
     
    interface PropsSchema {
      currentDate: dayjs.Dayjs;
      previousPeriod: () => void;
      nextPeriod: () => void;
    }
    let { currentDate, previousPeriod, nextPeriod }: PropsSchema = $props();
  
    let monthYear = $derived(currentDate.format('MMMM YYYY'));
    let weekRange = $derived(getWeekRange(currentDate));
  
    function getWeekRange(date: dayjs.Dayjs) {
      const start = date.startOf($weekStart === 'monday' ? 'isoWeek' : 'week');
      const end = start.add(6, 'day');
      return `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`;
    }
  
    function toggleViewType() {
      $viewType = $viewType === 'month' ? 'week' : 'month';
    }
  
    function toggleWeekStart() {
      $weekStart = $weekStart === 'sunday' ? 'monday' : 'sunday';
    }
  </script>
  
  <header class="bg-white shadow-md p-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold text-gray-800">
      {$viewType === 'month' ? monthYear : weekRange}
    </h1>
    <div class="flex items-center space-x-4">
      <button onclick={toggleViewType} class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        {$viewType === 'month' ? 'Week View' : 'Month View'}
      </button>
      <button onclick={toggleWeekStart} class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
        {$weekStart === 'sunday' ? 'Start on Monday' : 'Start on Sunday'}
      </button>
      <div class="flex space-x-2">
        <button onclick={previousPeriod} class="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={24} />
        </button>
        <button onclick={nextPeriod} class="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  </header>
  
  