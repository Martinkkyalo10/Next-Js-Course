import { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/eventList";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";

export default function AllEventsPage(props) {
  const router = useRouter();
  // destructure props object to get events
  const { events } = props;

  // recieve props from event search component to set up programmatic navigation
  function findEventHandler(year, month) {
    // get full path
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }
  return (
    <Fragment>
      {/* pass findEventHandler to EventSearch Component */}
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // get all events
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    // revalidate the page to ensure all new events are picked up
    revalidate: 60,
  };
}
