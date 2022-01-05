import EventList from "../../components/events/eventList";
import { getFeaturedEvents } from "../../data";

export default function AllEventsPage() {
  return (
    <div>
      <EventList items={getFeaturedEvents} />
    </div>
  );
}
