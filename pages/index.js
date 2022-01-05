import { getFeaturedEvents } from "./../dummy-data";
import EventList from "../components/events/eventList";
export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}
