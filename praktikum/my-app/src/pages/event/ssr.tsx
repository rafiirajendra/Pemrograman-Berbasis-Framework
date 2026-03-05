import { EventType } from "@/types/Event.type";
import { retrieveEvents } from "@/utils/db/servicefirebase";
import EventView from "@/views/event";

const EventSSRPage = (props: { events: EventType[] }) => {
    const { events } = props;

    return (
        <div>
            <h1>Halaman Event SSR</h1>
            <EventView events={events} isLoading={false} />
        </div>
    );
};

export default EventSSRPage;

export async function getServerSideProps() {
    const events = await retrieveEvents("event");

    return {
        props: {
            events
        }
    };
}
