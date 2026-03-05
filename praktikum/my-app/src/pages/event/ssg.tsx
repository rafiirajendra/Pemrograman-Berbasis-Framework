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
    const events = await retrieveEvents("event");

    return {
        props: {
            events
        }
    };
}
