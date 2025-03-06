<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { onMount } from 'svelte';
    import { viewType, weekStart } from '$lib/stores/calendarStore';
    import dayjs from '$lib/utils/dayjs';
    import CalendarHeader from './CalendarHeader.svelte';
    import CalendarGrid from './CalendarGrid.svelte';
    import WeekView from './WeekView.svelte';
    import Sidebar from './Sidebar.svelte';
  
    let currentDate = dayjs();
    
    //すべてのイベントのリスト(後で名前変える)
    let events = [
      { date: dayjs('2025-02-11'), title: '建国記念日' },
      { date: dayjs('2025-02-24'), title: '天皇誕生日 振替休日' },
    ];

    function previousPeriod() {
      currentDate = $viewType === 'month' ? currentDate.subtract(1, 'month') : currentDate.subtract(1, 'week');
    }
  
    function nextPeriod() {
      currentDate = $viewType === 'month' ? currentDate.add(1, 'month') : currentDate.add(1, 'week');
    }
  
    onMount(() => {
      //この部分でAPIからスケジュールを取得する
    });
  </script>
  
  <div class="flex h-screen bg-gray-100">
    <Sidebar {currentDate} {events} />
    <div class="flex-1 flex flex-col overflow-hidden">
      <CalendarHeader {currentDate} {previousPeriod} {nextPeriod} />
      {#if $viewType === 'month'}
        <CalendarGrid {currentDate} {events} />
      {:else}
        <WeekView {currentDate} {events} />
      {/if}
    </div>
  </div>
  
  
