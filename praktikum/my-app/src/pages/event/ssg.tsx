import { EventType } from "@/types/Event.type";
import { retrieveEvents } from "@/utils/db/servicefirebase";
import EventView from "@/views/event";

const EventSSGPage = (props: { events: EventType[] }) => {
    const { events } = props;

    return (
        <div>
            <h1>Halaman Event SSG</h1>
            <EventView events={events} isLoading={false} />
        </div>
    );
};

export default EventSSGPage;

export async function getStaticProps() {
    try {
        const events = await retrieveEvents("event");

        return {
            props: {
                events,
            },
            revalidate: 60,
        };
    } catch (error) {
        console.error("Failed to fetch events during static generation:", error);

        return {
            props: {
                events: [],
            },
            revalidate: 60,
        };
    }
}
