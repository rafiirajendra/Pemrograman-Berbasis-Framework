import { EventType } from "@/types/Event.type";

interface EventViewProps {
    events: EventType[];
    isLoading: boolean;
}

const formatEventDate = (value: EventType["date"]) => {
    if (!value) return "-";

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime())
        ? value
        : parsed.toLocaleDateString("id-ID");
};

const EventView = ({ events, isLoading }: EventViewProps) => {
    if (isLoading) return <p>Loading event...</p>;
    if (!events.length) return <p>Event belum tersedia.</p>;

    return (
        <ul>
            {events.map((event) => (
                <li key={event.id}>
                    <strong>{event.name}</strong> - {formatEventDate(event.date)} - {event.location}
                </li>
            ))}
        </ul>
    );
};

export default EventView;
