import type { PageServerLoad } from './$types';
import { EventPreviewSchema, EventPreviewListSchema } from '$lib/schema/eventSchemas';

import getPicEvents from '$lib/server/api/getPicEvents';
import { magnedonBaseOrigin, userId} from '$lib/constants';
export const load = (async () => {
    const picEventsResponse = await getPicEvents(magnedonBaseOrigin, userId)
    const parsedEvents = EventPreviewListSchema.safeParse(picEventsResponse);
    if (!parsedEvents.success) {
        console.error("Invalid event data:", parsedEvents.error.format());
        throw new Error("Invalid event data received");
    }
    const picEvents = parsedEvents.data;
    return { picEvents };
}) satisfies PageServerLoad;