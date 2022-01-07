import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/eventList";

export default function HomePage(props) {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    // the page will regenerate after every 0.5 hours after last request
    revalidate: 1800,
  };
}
