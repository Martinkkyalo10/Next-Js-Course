import EventList from "../../components/events/eventList";
import { getAllevents } from "../../dummy-data";


export default function AllEventsPage() {
  const events = getAllevents();
  return (
    <div>
      <EventList items={getFeaturedEvents} />
    </div>
  );
}
