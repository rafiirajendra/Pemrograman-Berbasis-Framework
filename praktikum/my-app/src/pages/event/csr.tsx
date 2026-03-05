import EventView from "@/views/event";
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";

const EventCSRPage = () => {
    const { data, isLoading } = useSWR("/api/event", fetcher);

    return (
        <div>
            <h1>Halaman Event CSR</h1>
            <EventView events={data?.data || []} isLoading={isLoading} />
        </div>
    );
};

export default EventCSRPage;
