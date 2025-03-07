import type { PageServerLoad } from './$types';
import { EventPreviewSchema, EventPreviewListSchema } from '$lib/schema/eventSchemas';

import getPicEvents from '$lib/server/api/getPicEvents';
import getParticipantEvents from '$lib/server/api/getParticipantEvents';
import { magnedonBaseOrigin, userId} from '$lib/constants';
export const load = (async () => {
    //ユーザーが担当者(PIC)として参加しているイベントを取得
    const picEventsResponse = await getPicEvents(magnedonBaseOrigin, userId)
    const parsedEvents = EventPreviewListSchema.safeParse(picEventsResponse);
    if (!parsedEvents.success) {
        console.error("Invalid event data:", parsedEvents.error.format());
        throw new Error("Invalid event data received");
    }
    const picEvents = parsedEvents.data;
    //ユーザーが参加者(Participant)として参加しているイベントを取得
    const participantEventsResponse = await getParticipantEvents(magnedonBaseOrigin, userId)
    const parsedParticipantEvents = EventPreviewListSchema.safeParse(participantEventsResponse);
    if (!parsedParticipantEvents.success) {
        console.error("Invalid event data:", parsedParticipantEvents.error.format());
        throw new Error("Invalid event data received");
    }
    const participantEvents = parsedParticipantEvents.data;
    
    //ユーザーが参加者or担当者として参加しているイベントを返す
    const bothEvents = picEvents.concat(participantEvents);

    return { picEvents, participantEvents, bothEvents };
}) satisfies PageServerLoad;