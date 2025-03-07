<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from '$lib/components/ui/card';
    let { data }: { data: PageData } = $props();
    import type { EventPreviewType, EventPreviewListType } from '$lib/schema/eventSchemas';
    const picEventsList = data.picEvents;

</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each picEventsList as picEvent}
	    {@render eventCard({
	    	picEvent
	    })}
	{/each}
	
</div>



{#snippet eventCard({picEvent}: {picEvent: EventPreviewType})}
	<Card.Root>
		<Card.Header>
			<Card.Title>{picEvent.event_name}</Card.Title>
			<Card.Description>{picEvent.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>{picEvent.date_begin} - {picEvent.date_end}</p>
		</Card.Content>
	</Card.Root>
{/snippet}