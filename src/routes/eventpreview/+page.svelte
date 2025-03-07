<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from '$lib/components/ui/card';
    let { data }: { data: PageData } = $props();
    import type { EventPreviewType, EventPreviewListType } from '$lib/schema/eventSchemas';
    const picEventsList = data.picEvents;
	const participantEventsList = data.participantEvents;
	const bothEventsList = data.bothEvents;
    // フィルタ用の選択肢
    type FilterType = { label: string; value: 'pic' | 'participant' | 'both' };

    const filters: FilterType[] = [
        { label: '担当者であるイベント', value: 'pic' },
        { label: '参加者であるイベント', value: 'participant' },
        { label: '担当者or参加者であるイベント', value: 'both' }
    ];
	let selectedFilter: 'pic' | 'participant' | 'both' = $state('pic');
	    // フィルタに応じた表示イベントリスト
	function getFilteredEvents() {
        if (selectedFilter === 'pic') return picEventsList;
        if (selectedFilter === 'participant') return participantEventsList;
        return bothEventsList;
    }
</script>

<h1 class="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl mb-6">
    イベント名をクリックすると、そのイベントの予定表に移動します
</h1>


{@render selectRole()}

<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each getFilteredEvents() as event}
        {@render eventCard({ event })}
    {/each}
</div>




{#snippet selectRole()}
<div class="mb-4 flex gap-4">
    {#each filters as filter}
        <button
            class="px-4 py-2 rounded-md border"
            class:selected={selectedFilter === filter.value}
            onclick={() => selectedFilter = filter.value}
        >
            {filter.label}
        </button>
    {/each}
</div>
{/snippet}



{#snippet eventCard({event}: {event: EventPreviewType})}
	<Card.Root>
		<Card.Header>
			<Card.Title>{event.event_name}</Card.Title>
			<Card.Description>{event.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>開催期間: {event.date_begin} - {event.date_end}</p>
		</Card.Content>
	</Card.Root>
{/snippet}